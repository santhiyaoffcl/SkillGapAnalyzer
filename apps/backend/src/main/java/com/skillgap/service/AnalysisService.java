package com.skillgap.service;

import com.skillgap.dto.analysis.CreateAnalysisRequest;
import com.skillgap.exception.ResourceNotFoundException;
import com.skillgap.model.Analysis;
import com.skillgap.repository.AnalysisRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Analysis service — handles business logic for AI skill gap analyses.
 */
@Service
public class AnalysisService {

    private final AnalysisRepository analysisRepository;

    public AnalysisService(AnalysisRepository analysisRepository) {
        this.analysisRepository = analysisRepository;
    }

    /**
     * Save a new skill gap analysis.
     */
    public Analysis saveAnalysis(String userId, CreateAnalysisRequest request) {
        Analysis analysis = Analysis.builder()
                .userId(userId)
                .targetRole(request.getTargetRole())
                .currentSkills(request.getCurrentSkills())
                .matchedSkills(request.getMatchedSkills())
                .missingSkills(request.getMissingSkills())
                .matchPercentage(request.getMatchPercentage())
                .recommendation(request.getRecommendation())
                .estimatedTime(request.getEstimatedTime())
                .build();

        return analysisRepository.save(analysis);
    }

    /**
     * Get all analyses for a user, ordered by newest first.
     */
    public List<Analysis> getMyAnalyses(String userId) {
        return analysisRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    /**
     * Get a specific analysis by ID and ensure it belongs to the user.
     */
    public Analysis getAnalysisById(String id, String userId) {
        return analysisRepository.findByIdAndUserId(id, userId)
                .orElseThrow(() -> new ResourceNotFoundException("Analysis"));
    }

    /**
     * Delete an analysis.
     */
    public void deleteAnalysis(String id, String userId) {
        Analysis analysis = getAnalysisById(id, userId);
        analysisRepository.delete(analysis);
    }
}
