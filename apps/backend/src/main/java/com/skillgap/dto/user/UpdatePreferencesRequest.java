package com.skillgap.dto.user;

import jakarta.validation.constraints.Pattern;
import lombok.Data;

/**
 * Request DTO for updating user preferences.
 */
@Data
public class UpdatePreferencesRequest {

    @Pattern(regexp = "^(light|dark|system)$", message = "Theme must be light, dark, or system")
    private String theme;

    @Pattern(regexp = "^(openai|gemini|llama)$", message = "AI provider must be openai, gemini, or llama")
    private String aiProvider;

    private Boolean emailNotifications;
}
