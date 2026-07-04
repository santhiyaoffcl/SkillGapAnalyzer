package com.skillgap.dto.analysis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateAnalysisRequest {
    private String targetRole;
    private List<String> currentSkills;
    private List<String> matchedSkills;
    private List<String> missingSkills;
    private int matchPercentage;
    private String recommendation;
    private String estimatedTime;
}
