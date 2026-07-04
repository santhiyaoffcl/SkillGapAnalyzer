package com.skillgap.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

/**
 * MongoDB configuration.
 * Enables auditing for @CreatedDate and @LastModifiedDate annotations.
 */
@Configuration
@EnableMongoAuditing
public class MongoConfig {
}
