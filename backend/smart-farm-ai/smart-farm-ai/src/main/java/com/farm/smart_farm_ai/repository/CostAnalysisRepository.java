package com.farm.smart_farm_ai.repository;

import com.farm.smart_farm_ai.entity.CostAnalysis;
import com.farm.smart_farm_ai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CostAnalysisRepository
        extends JpaRepository<CostAnalysis, Long> {

    List<CostAnalysis> findByUser(User user);
}
