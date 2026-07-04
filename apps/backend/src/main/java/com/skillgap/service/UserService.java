package com.skillgap.service;

import com.skillgap.dto.user.*;
import com.skillgap.exception.BadRequestException;
import com.skillgap.exception.ResourceNotFoundException;
import com.skillgap.exception.UnauthorizedException;
import com.skillgap.model.User;
import com.skillgap.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * User service — handles user profile business logic.
 */
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Get user profile by ID.
     */
    public UserResponse getUserById(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User"));
        return UserResponse.fromUser(user);
    }

    /**
     * Update user profile.
     */
    public UserResponse updateProfile(String userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User"));

        if (request.getFirstName() != null) {
            user.setFirstName(request.getFirstName().trim());
        }
        if (request.getLastName() != null) {
            user.setLastName(request.getLastName().trim());
        }
        if (request.getAvatarUrl() != null) {
            user.setAvatarUrl(request.getAvatarUrl());
        }

        user = userRepository.save(user);
        return UserResponse.fromUser(user);
    }

    /**
     * Change user password.
     */
    public void changePassword(String userId, ChangePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User"));

        if (!"local".equals(user.getAuthProvider())) {
            throw new BadRequestException(
                    "Password cannot be changed for accounts using external authentication");
        }

        // Verify current password
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new UnauthorizedException("Current password is incorrect");
        }

        // Update password
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }

    /**
     * Update user preferences.
     */
    public UserResponse updatePreferences(String userId, UpdatePreferencesRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User"));

        User.Preferences prefs = user.getPreferences();
        if (prefs == null) {
            prefs = new User.Preferences();
        }

        if (request.getTheme() != null) {
            prefs.setTheme(request.getTheme());
        }
        if (request.getAiProvider() != null) {
            prefs.setAiProvider(request.getAiProvider());
        }
        if (request.getEmailNotifications() != null) {
            prefs.setEmailNotifications(request.getEmailNotifications());
        }

        user.setPreferences(prefs);
        user = userRepository.save(user);
        return UserResponse.fromUser(user);
    }

    /**
     * Deactivate user account (soft delete).
     */
    public void deactivateAccount(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User"));

        user.setActive(false);
        userRepository.save(user);
    }
}
