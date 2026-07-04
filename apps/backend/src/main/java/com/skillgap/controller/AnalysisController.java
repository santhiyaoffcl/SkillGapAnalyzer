package com.skillgap.controller;

import com.skillgap.dto.ApiResponse;
import com.skillgap.dto.analysis.CreateAnalysisRequest;
import com.skillgap.model.Analysis;
import com.skillgap.service.AnalysisService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Analysis controller — handles endpoints for skill gap analyses.
 */
@RestController
@RequestMapping("/analyses")
public class AnalysisController {

    private final AnalysisService analysisService;

    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Analysis>> saveAnalysis(
            Authentication authentication,
            @RequestBody CreateAnalysisRequest request) {
        String userId = authentication.getName();
        Analysis analysis = analysisService.saveAnalysis(userId, request);
        return ResponseEntity.ok(ApiResponse.success(analysis, "Analysis saved successfully"));
    }

    @GetMapping("/my-history")
    public ResponseEntity<ApiResponse<List<Analysis>>> getMyAnalyses(Authentication authentication) {
        String userId = authentication.getName();
        List<Analysis> analyses = analysisService.getMyAnalyses(userId);
        return ResponseEntity.ok(ApiResponse.success(analyses, "Analysis history retrieved"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Analysis>> getAnalysisById(
            Authentication authentication,
            @PathVariable String id) {
        String userId = authentication.getName();
        Analysis analysis = analysisService.getAnalysisById(id, userId);
        return ResponseEntity.ok(ApiResponse.success(analysis, "Analysis retrieved"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnalysis(
            Authentication authentication,
            @PathVariable String id) {
        String userId = authentication.getName();
        analysisService.deleteAnalysis(id, userId);
        return ResponseEntity.noContent().build();
    }
}
