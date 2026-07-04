package com.skillgap.repository;

import com.skillgap.model.Roadmap;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoadmapRepository extends MongoRepository<Roadmap, String> {

    List<Roadmap> findByUserIdOrderByCreatedAtDesc(String userId);

    Optional<Roadmap> findByIdAndUserId(String id, String userId);

    Optional<Roadmap> findByAnalysisIdAndUserId(String analysisId, String userId);
}
