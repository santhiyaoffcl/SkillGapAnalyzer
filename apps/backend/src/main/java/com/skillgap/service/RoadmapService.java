package com.skillgap.service;

import com.skillgap.dto.roadmap.CreateRoadmapRequest;
import com.skillgap.dto.roadmap.UpdateTaskRequest;
import com.skillgap.exception.BadRequestException;
import com.skillgap.exception.ResourceNotFoundException;
import com.skillgap.model.Roadmap;
import com.skillgap.repository.RoadmapRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Roadmap service — handles business logic for study roadmaps and task completion.
 */
@Service
public class RoadmapService {

    private final RoadmapRepository roadmapRepository;

    public RoadmapService(RoadmapRepository roadmapRepository) {
        this.roadmapRepository = roadmapRepository;
    }

    /**
     * Save a new learning roadmap.
     */
    public Roadmap saveRoadmap(String userId, CreateRoadmapRequest request) {
        Roadmap roadmap = Roadmap.builder()
                .userId(userId)
                .analysisId(request.getAnalysisId())
                .title(request.getTitle())
                .targetRole(request.getTargetRole())
                .phases(request.getPhases())
                .progressPercentage(0)
                .status("IN_PROGRESS")
                .build();

        return roadmapRepository.save(roadmap);
    }

    /**
     * Get all roadmaps for a user.
     */
    public List<Roadmap> getMyRoadmaps(String userId) {
        return roadmapRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    /**
     * Get a specific roadmap by ID.
     */
    public Roadmap getRoadmapById(String id, String userId) {
        return roadmapRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap"));
    }

    /**
     * Toggle or update a task's completion status and recalculate overall progress.
     */
    public Roadmap updateTaskStatus(String id, String userId, UpdateTaskRequest request) {
        Roadmap roadmap = getRoadmapById(id, userId);

        List<Roadmap.Phase> phases = roadmap.getPhases();
        if (request.getPhaseIndex() < 0 || request.getPhaseIndex() >= phases.size()) {
            throw new BadRequestException("Invalid phase index");
        }

        Roadmap.Phase phase = phases.get(request.getPhaseIndex());
        if (request.getTaskIndex() < 0 || request.getTaskIndex() >= phase.getTasks().size()) {
            throw new BadRequestException("Invalid task index");
        }

        Roadmap.Task task = phase.getTasks().get(request.getTaskIndex());
        task.setCompleted(request.isCompleted());

        // Recalculate progress percentage
        int totalTasks = 0;
        int completedTasks = 0;
        for (Roadmap.Phase p : phases) {
            if (p.getTasks() != null) {
                totalTasks += p.getTasks().size();
                for (Roadmap.Task t : p.getTasks()) {
                    if (t.isCompleted()) {
                        completedTasks++;
                    }
                }
            }
        }

        int progress = (totalTasks > 0) ? Math.round(((float) completedTasks / totalTasks) * 100) : 0;
        roadmap.setProgressPercentage(progress);
        if (progress == 100) {
            roadmap.setStatus("COMPLETED");
        } else {
            roadmap.setStatus("IN_PROGRESS");
        }

        return roadmapRepository.save(roadmap);
    }
}
