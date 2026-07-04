package com.skillgap.controller;

import com.skillgap.dto.ApiResponse;
import com.skillgap.dto.roadmap.CreateRoadmapRequest;
import com.skillgap.dto.roadmap.UpdateTaskRequest;
import com.skillgap.model.Roadmap;
import com.skillgap.service.RoadmapService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Roadmap controller — handles endpoints for study roadmaps and tasks.
 */
@RestController
@RequestMapping("/roadmaps")
public class RoadmapController {

    private final RoadmapService roadmapService;

    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Roadmap>> saveRoadmap(
            Authentication authentication,
            @RequestBody CreateRoadmapRequest request) {
        String userId = authentication.getName();
        Roadmap roadmap = roadmapService.saveRoadmap(userId, request);
        return ResponseEntity.ok(ApiResponse.success(roadmap, "Roadmap saved successfully"));
    }

    @GetMapping("/my-history")
    public ResponseEntity<ApiResponse<List<Roadmap>>> getMyRoadmaps(Authentication authentication) {
        String userId = authentication.getName();
        List<Roadmap> roadmaps = roadmapService.getMyRoadmaps(userId);
        return ResponseEntity.ok(ApiResponse.success(roadmaps, "Roadmaps retrieved"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Roadmap>> getRoadmapById(
            Authentication authentication,
            @PathVariable String id) {
        String userId = authentication.getName();
        Roadmap roadmap = roadmapService.getRoadmapById(id, userId);
        return ResponseEntity.ok(ApiResponse.success(roadmap, "Roadmap retrieved"));
    }

    @PatchMapping("/{id}/tasks")
    public ResponseEntity<ApiResponse<Roadmap>> updateTaskStatus(
            Authentication authentication,
            @PathVariable String id,
            @RequestBody UpdateTaskRequest request) {
        String userId = authentication.getName();
        Roadmap roadmap = roadmapService.updateTaskStatus(id, userId, request);
        return ResponseEntity.ok(ApiResponse.success(roadmap, "Task status updated"));
    }
}
