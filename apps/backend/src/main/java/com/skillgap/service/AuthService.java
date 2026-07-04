package com.skillgap.service;

import com.skillgap.dto.auth.AuthResponse;
import com.skillgap.dto.auth.LoginRequest;
import com.skillgap.dto.auth.RegisterRequest;
import com.skillgap.dto.user.UserResponse;
import com.skillgap.exception.ConflictException;
import com.skillgap.exception.ResourceNotFoundException;
import com.skillgap.exception.UnauthorizedException;
import com.skillgap.model.RefreshToken;
import com.skillgap.model.User;
import com.skillgap.repository.RefreshTokenRepository;
import com.skillgap.repository.UserRepository;
import com.skillgap.security.JwtTokenProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.List;

/**
 * Auth service — handles all authentication business logic.
 *
 * DESIGN:
 * - Refresh tokens are stored as SHA-256 hashes (never plaintext)
 * - Token rotation: old refresh token is revoked on each refresh
 * - Access tokens are short-lived, refresh tokens are long-lived
 */
@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);
    private static final SecureRandom RANDOM = new SecureRandom();

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.jwt.refresh-expiration-ms}")
    private long refreshExpirationMs;

    public AuthService(UserRepository userRepository,
                       RefreshTokenRepository refreshTokenRepository,
                       JwtTokenProvider jwtTokenProvider,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Register a new user.
     */
    public AuthResponse register(RegisterRequest request, String userAgent, String ip) {
        String email = request.getEmail().toLowerCase().trim();

        // Check if user already exists
        if (userRepository.existsByEmail(email)) {
            throw new ConflictException("An account with this email already exists");
        }

        // Create user
        User user = User.builder()
                .email(email)
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName().trim())
                .lastName(request.getLastName().trim())
                .role("user")
                .authProvider("local")
                .build();

        user = userRepository.save(user);
        log.info("New user registered: {}", user.getEmail());

        // Generate tokens
        String accessToken = jwtTokenProvider.generateAccessToken(
                user.getId(), user.getEmail(), user.getRole());
        String refreshToken = createRefreshToken(user.getId(), userAgent, ip);

        return AuthResponse.builder()
                .user(UserResponse.fromUser(user))
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    /**
     * Login with email and password.
     */
    public AuthResponse login(LoginRequest request, String userAgent, String ip) {
        String email = request.getEmail().toLowerCase().trim();

        // Find user
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UnauthorizedException("Invalid email or password"));

        if (!user.isActive()) {
            throw new UnauthorizedException("Account has been deactivated");
        }

        if (!"local".equals(user.getAuthProvider())) {
            throw new UnauthorizedException(
                    "This account uses " + user.getAuthProvider() +
                    " authentication. Please sign in with " + user.getAuthProvider() + ".");
        }

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Invalid email or password");
        }

        log.info("User logged in: {}", user.getEmail());

        // Generate tokens
        String accessToken = jwtTokenProvider.generateAccessToken(
                user.getId(), user.getEmail(), user.getRole());
        String refreshToken = createRefreshToken(user.getId(), userAgent, ip);

        return AuthResponse.builder()
                .user(UserResponse.fromUser(user))
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    /**
     * Refresh the access token using a valid refresh token.
     * Implements token rotation.
     */
    public AuthResponse refreshAccessToken(String refreshTokenValue, String userAgent, String ip) {
        String tokenHash = hashToken(refreshTokenValue);

        RefreshToken storedToken = refreshTokenRepository.findByTokenHash(tokenHash)
                .orElseThrow(() -> new UnauthorizedException("Invalid refresh token"));

        if (storedToken.isRevoked()) {
            // Possible token reuse attack — revoke ALL tokens for this user
            List<RefreshToken> activeTokens =
                    refreshTokenRepository.findByUserIdAndRevokedFalse(storedToken.getUserId());
            activeTokens.forEach(t -> t.setRevoked(true));
            refreshTokenRepository.saveAll(activeTokens);
            log.warn("Refresh token reuse detected for user {}. All sessions revoked.",
                    storedToken.getUserId());
            throw new UnauthorizedException("Refresh token has been revoked. All sessions invalidated.");
        }

        if (storedToken.getExpiresAt().isBefore(Instant.now())) {
            throw new UnauthorizedException("Refresh token has expired");
        }

        // Revoke old token (rotation)
        storedToken.setRevoked(true);
        refreshTokenRepository.save(storedToken);

        // Find user
        User user = userRepository.findById(storedToken.getUserId())
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        if (!user.isActive()) {
            throw new UnauthorizedException("Account has been deactivated");
        }

        // Issue new token pair
        String accessToken = jwtTokenProvider.generateAccessToken(
                user.getId(), user.getEmail(), user.getRole());
        String newRefreshToken = createRefreshToken(user.getId(), userAgent, ip);

        return AuthResponse.builder()
                .user(UserResponse.fromUser(user))
                .accessToken(accessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    /**
     * Logout — revoke the provided refresh token.
     */
    public void logout(String refreshTokenValue) {
        if (refreshTokenValue == null || refreshTokenValue.isBlank()) return;

        String tokenHash = hashToken(refreshTokenValue);
        refreshTokenRepository.findByTokenHash(tokenHash).ifPresent(token -> {
            token.setRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    /**
     * Logout from all devices.
     */
    public void logoutAll(String userId) {
        List<RefreshToken> activeTokens =
                refreshTokenRepository.findByUserIdAndRevokedFalse(userId);
        activeTokens.forEach(t -> t.setRevoked(true));
        refreshTokenRepository.saveAll(activeTokens);
        log.info("All sessions revoked for user {}", userId);
    }

    /**
     * Get the current user's profile.
     */
    public UserResponse getMe(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        return UserResponse.fromUser(user);
    }

    // ── Internal Helpers ──

    private String createRefreshToken(String userId, String userAgent, String ip) {
        byte[] tokenBytes = new byte[40];
        RANDOM.nextBytes(tokenBytes);
        String rawToken = Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);

        String tokenHash = hashToken(rawToken);

        RefreshToken refreshToken = RefreshToken.builder()
                .userId(userId)
                .tokenHash(tokenHash)
                .userAgent(userAgent)
                .ip(ip)
                .expiresAt(Instant.now().plusMillis(refreshExpirationMs))
                .build();

        refreshTokenRepository.save(refreshToken);
        return rawToken;
    }

    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : hash) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("SHA-256 algorithm not available", e);
        }
    }
}
