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
 * Roadmap model — represents a customized study roadmap and task completion progress.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "roadmaps")
public class Roadmap {

    @Id
    private String id;

    @Indexed
    private String userId;

    @Indexed
    private String analysisId;

    private String title;

    private String targetRole;

    @Builder.Default
    private List<Phase> phases = new ArrayList<>();

    @Builder.Default
    private int progressPercentage = 0;

    @Builder.Default
    private String status = "IN_PROGRESS"; // IN_PROGRESS, COMPLETED, ARCHIVED

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Phase {
        private String phase;
        private String duration;
        private String title;
        @Builder.Default
        private List<Task> tasks = new ArrayList<>();
        private String resource;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Task {
        private String id;
        private String text;
        @Builder.Default
        private boolean completed = false;
    }
}
