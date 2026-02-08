package com.farm.smart_farm_ai.repository;

import com.farm.smart_farm_ai.entity.CropRecommendation;
import com.farm.smart_farm_ai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CropRecommendationRepository
        extends JpaRepository<CropRecommendation, Long> {

    List<CropRecommendation> findByUser(User user);
}
