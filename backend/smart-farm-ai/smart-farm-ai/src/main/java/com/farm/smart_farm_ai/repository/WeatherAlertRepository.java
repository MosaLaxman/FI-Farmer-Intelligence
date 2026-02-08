package com.farm.smart_farm_ai.repository;

import com.farm.smart_farm_ai.entity.User;
import com.farm.smart_farm_ai.entity.WeatherAlert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WeatherAlertRepository extends JpaRepository<WeatherAlert, Long> {
    List<WeatherAlert> findByUser(User user);
}
