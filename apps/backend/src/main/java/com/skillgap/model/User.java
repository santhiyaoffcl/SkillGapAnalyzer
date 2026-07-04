package com.skillgap.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

/**
 * User model — represents an application user account.
 *
 * SECURITY:
 * - Password is stored as a BCrypt hash
 * - Email is always stored lowercase for consistent lookups
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String passwordHash;

    private String firstName;

    private String lastName;

    @Builder.Default
    private String role = "user"; // guest, user, premium, admin

    @Builder.Default
    private String authProvider = "local"; // local, google

    @Indexed(sparse = true)
    private String googleId;

    @Builder.Default
    private boolean emailVerified = false;

    private String emailVerifyToken;
    private Instant emailVerifyExpiry;

    private String passwordResetToken;
    private Instant passwordResetExpiry;

    private String avatarUrl;

    @Builder.Default
    private Preferences preferences = new Preferences();

    @Builder.Default
    private Usage usage = new Usage();

    @Builder.Default
    private boolean active = true;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    /**
     * User preferences sub-document.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Preferences {
        @Builder.Default
        private String theme = "system"; // light, dark, system
        @Builder.Default
        private String aiProvider = "openai"; // openai, gemini, llama
        @Builder.Default
        private boolean emailNotifications = true;
    }

    /**
     * Usage tracking sub-document.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Usage {
        @Builder.Default
        private int analysisCount = 0;
        private Instant lastAnalysisAt;
        @Builder.Default
        private int monthlyAnalysisCount = 0;
        @Builder.Default
        private Instant monthlyResetAt = Instant.now();
    }

    /**
     * Get the user's full name.
     */
    public String getFullName() {
        return firstName + " " + lastName;
    }
}
