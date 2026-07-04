package com.skillgap.dto.user;

import com.skillgap.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

/**
 * Response DTO for user profile.
 * Excludes sensitive fields like passwordHash.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String id;
    private String email;
    private String firstName;
    private String lastName;
    private String role;
    private String authProvider;
    private boolean emailVerified;
    private String avatarUrl;
    private PreferencesDto preferences;
    private UsageDto usage;
    private Instant createdAt;
    private Instant updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PreferencesDto {
        private String theme;
        private String aiProvider;
        private boolean emailNotifications;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UsageDto {
        private int analysisCount;
        private Instant lastAnalysisAt;
        private int monthlyAnalysisCount;
        private Instant monthlyResetAt;
    }

    /**
     * Convert a User model to UserResponse DTO.
     */
    public static UserResponse fromUser(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .authProvider(user.getAuthProvider())
                .emailVerified(user.isEmailVerified())
                .avatarUrl(user.getAvatarUrl())
                .preferences(user.getPreferences() != null
                        ? PreferencesDto.builder()
                            .theme(user.getPreferences().getTheme())
                            .aiProvider(user.getPreferences().getAiProvider())
                            .emailNotifications(user.getPreferences().isEmailNotifications())
                            .build()
                        : null)
                .usage(user.getUsage() != null
                        ? UsageDto.builder()
                            .analysisCount(user.getUsage().getAnalysisCount())
                            .lastAnalysisAt(user.getUsage().getLastAnalysisAt())
                            .monthlyAnalysisCount(user.getUsage().getMonthlyAnalysisCount())
                            .monthlyResetAt(user.getUsage().getMonthlyResetAt())
                            .build()
                        : null)
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}
