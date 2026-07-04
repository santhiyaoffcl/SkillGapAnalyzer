package com.skillgap.repository;

import com.skillgap.model.Analysis;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnalysisRepository extends MongoRepository<Analysis, String> {

    List<Analysis> findByUserIdOrderByCreatedAtDesc(String userId);

    Optional<Analysis> findByIdAndUserId(String id, String userId);

    long countByUserId(String userId);
}
