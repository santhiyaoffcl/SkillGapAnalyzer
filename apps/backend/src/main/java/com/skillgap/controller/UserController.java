package com.skillgap.controller;

import com.skillgap.dto.ApiResponse;
import com.skillgap.dto.user.*;
import com.skillgap.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * User controller — handles user profile endpoints.
 * All routes require authentication.
 *
 *   GET    /users/me              — Get current user profile
 *   PATCH  /users/me              — Update profile
 *   PATCH  /users/me/password     — Change password
 *   PATCH  /users/me/preferences  — Update preferences
 *   DELETE /users/me              — Deactivate account
 */
@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile(Authentication authentication) {
        String userId = authentication.getName();
        UserResponse user = userService.getUserById(userId);
        return ResponseEntity.ok(ApiResponse.success(user, "Profile retrieved"));
    }

    @PatchMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> updateProfile(
            Authentication authentication,
            @Valid @RequestBody UpdateProfileRequest request) {
        String userId = authentication.getName();
        UserResponse user = userService.updateProfile(userId, request);
        return ResponseEntity.ok(ApiResponse.success(user, "Profile updated"));
    }

    @PatchMapping("/me/password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequest request) {
        String userId = authentication.getName();
        userService.changePassword(userId, request);
        return ResponseEntity.ok(ApiResponse.success(null, "Password changed successfully"));
    }

    @PatchMapping("/me/preferences")
    public ResponseEntity<ApiResponse<UserResponse>> updatePreferences(
            Authentication authentication,
            @Valid @RequestBody UpdatePreferencesRequest request) {
        String userId = authentication.getName();
        UserResponse user = userService.updatePreferences(userId, request);
        return ResponseEntity.ok(ApiResponse.success(user, "Preferences updated"));
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deactivateAccount(Authentication authentication) {
        String userId = authentication.getName();
        userService.deactivateAccount(userId);
        return ResponseEntity.noContent().build();
    }
}
