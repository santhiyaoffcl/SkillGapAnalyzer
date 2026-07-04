package com.skillgap.controller;

import com.skillgap.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

/**
 * Health check controller.
 */
@RestController
public class HealthController {

    private final Instant startTime = Instant.now();

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> health() {
        long uptimeSeconds = Instant.now().getEpochSecond() - startTime.getEpochSecond();

        Map<String, Object> data = Map.of(
                "status", "ok",
                "timestamp", Instant.now().toString(),
                "uptime", uptimeSeconds + "s",
                "environment", System.getProperty("spring.profiles.active", "development")
        );

        return ResponseEntity.ok(ApiResponse.success(data, "API is healthy"));
    }
}
