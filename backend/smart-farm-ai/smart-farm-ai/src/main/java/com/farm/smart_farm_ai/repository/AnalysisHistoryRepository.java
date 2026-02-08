package com.farm.smart_farm_ai.repository;

import com.farm.smart_farm_ai.entity.AnalysisHistory;
import com.farm.smart_farm_ai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnalysisHistoryRepository
        extends JpaRepository<AnalysisHistory, Long> {

    List<AnalysisHistory> findByUser(User user);
}
