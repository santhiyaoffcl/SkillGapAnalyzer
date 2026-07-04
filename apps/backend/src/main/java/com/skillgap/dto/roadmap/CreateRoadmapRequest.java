package com.skillgap.dto.roadmap;

import com.skillgap.model.Roadmap.Phase;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateRoadmapRequest {
    private String analysisId;
    private String title;
    private String targetRole;
    private List<Phase> phases;
}
