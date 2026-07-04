package com.skillgap.controller;

import com.skillgap.dto.ApiResponse;
import com.skillgap.dto.auth.*;
import com.skillgap.dto.user.UserResponse;
import com.skillgap.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Auth controller — handles authentication endpoints.
 *
 * Public:
 *   POST /auth/register  — Create a new account
 *   POST /auth/login     — Sign in and receive tokens
 *   POST /auth/refresh   — Exchange refresh token for new pair
 *   POST /auth/logout    — Revoke a refresh token
 *
 * Protected:
 *   GET  /auth/me         — Get current user profile
 *   POST /auth/logout-all — Revoke all sessions
 */
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletRequest httpRequest) {

        String userAgent = httpRequest.getHeader("User-Agent");
        String ip = httpRequest.getRemoteAddr();

        AuthResponse result = authService.register(request, userAgent, ip);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success(result, "Account created successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest) {

        String userAgent = httpRequest.getHeader("User-Agent");
        String ip = httpRequest.getRemoteAddr();

        AuthResponse result = authService.login(request, userAgent, ip);
        return ResponseEntity.ok(ApiResponse.success(result, "Login successful"));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(
            @Valid @RequestBody TokenRefreshRequest request,
            HttpServletRequest httpRequest) {

        String userAgent = httpRequest.getHeader("User-Agent");
        String ip = httpRequest.getRemoteAddr();

        AuthResponse result = authService.refreshAccessToken(
                request.getRefreshToken(), userAgent, ip);
        return ResponseEntity.ok(ApiResponse.success(result, "Token refreshed successfully"));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody(required = false) TokenRefreshRequest request) {
        if (request != null && request.getRefreshToken() != null) {
            authService.logout(request.getRefreshToken());
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getMe(Authentication authentication) {
        String userId = authentication.getName();
        UserResponse user = authService.getMe(userId);
        return ResponseEntity.ok(ApiResponse.success(user, "User profile retrieved"));
    }

    @PostMapping("/logout-all")
    public ResponseEntity<ApiResponse<Void>> logoutAll(Authentication authentication) {
        String userId = authentication.getName();
        authService.logoutAll(userId);
        return ResponseEntity.ok(ApiResponse.success(null, "All sessions terminated"));
    }
}
