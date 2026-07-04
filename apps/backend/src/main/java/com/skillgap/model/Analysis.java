package com.skillgap.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/**
 * Analysis model — represents a saved AI Skill Gap Analysis.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "analyses")
public class Analysis {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String targetRole;

    @Builder.Default
    private List<String> currentSkills = new ArrayList<>();

    @Builder.Default
    private List<String> matchedSkills = new ArrayList<>();

    @Builder.Default
    private List<String> missingSkills = new ArrayList<>();

    private int matchPercentage;

    private String recommendation;

    private String estimatedTime;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
