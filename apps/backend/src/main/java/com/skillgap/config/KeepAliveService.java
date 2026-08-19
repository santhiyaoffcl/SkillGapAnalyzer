package com.skillgap.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * Service to keep the application alive and prevent Render free tier instance spindown.
 * Sends periodic keep-alive pings to the health check endpoint.
 */
@Service
public class KeepAliveService {

    private static final Logger logger = LoggerFactory.getLogger(KeepAliveService.class);

    // Create RestTemplate internally to avoid Spring bean dependency issues
    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Scheduled task that runs every 10 minutes (600000 milliseconds).
     * Sends a self-ping to keep the backend instance alive on Render free tier.
     */
    @Scheduled(fixedDelay = 600000) // 10 minutes
    public void keepAlive() {
        try {
            String backendUrl = System.getenv("BACKEND_URL");
            if (backendUrl == null || backendUrl.isBlank()) {
                // Self-ping on localhost using the configured server port
                String port = System.getenv("PORT");
                if (port == null || port.isBlank()) port = "4000";
                backendUrl = "http://localhost:" + port;
            }

            // Call the health check endpoint to keep backend alive
            restTemplate.getForObject(backendUrl + "/api/v1/health", String.class);
            logger.info("✓ Keep-alive ping successful at: {}", System.currentTimeMillis());

        } catch (Exception e) {
            // Log but don't fail - this is just a maintenance task
            logger.warn("⚠ Keep-alive ping failed (non-critical): {}", e.getMessage());
        }
    }
}