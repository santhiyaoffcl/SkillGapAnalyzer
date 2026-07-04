package com.skillgap.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

/**
 * RefreshToken model — stores hashed refresh tokens.
 *
 * WHY SEPARATE COLLECTION:
 * - Avoids write conflicts when multiple devices refresh simultaneously
 * - TTL index auto-deletes expired tokens
 * - Easy to revoke all sessions for a user
 *
 * SECURITY: Token is stored as SHA-256 hash.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "refresh_tokens")
public class RefreshToken {

    @Id
    private String id;

    @Indexed
    private String userId;

    @Indexed(unique = true)
    private String tokenHash;

    private String userAgent;

    private String ip;

    @Builder.Default
    private boolean revoked = false;

    @Indexed(expireAfter = "0s")
    private Instant expiresAt;

    @CreatedDate
    private Instant createdAt;
}
