package com.farm.smart_farm_ai.controller;

import com.farm.smart_farm_ai.entity.User;
import com.farm.smart_farm_ai.entity.WeatherAlert;
import com.farm.smart_farm_ai.repository.UserRepository;
import com.farm.smart_farm_ai.repository.WeatherAlertRepository;
import com.farm.smart_farm_ai.service.WeatherAlertService;
import com.farm.smart_farm_ai.service.WeatherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/alerts")
public class WeatherAlertController {

    private final WeatherService weatherService;
    private final WeatherAlertService alertService;
    private final WeatherAlertRepository alertRepository;
    private final UserRepository userRepository;

    public WeatherAlertController(
            WeatherService weatherService,
            WeatherAlertService alertService,
            WeatherAlertRepository alertRepository,
            UserRepository userRepository) {

        this.weatherService = weatherService;
        this.alertService = alertService;
        this.alertRepository = alertRepository;
        this.userRepository = userRepository;
    }

    // 🔔 Generate alerts
    @PostMapping("/check/{username}")
    public String checkWeatherAlerts(@PathVariable String username,
                                     @RequestParam String location) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String weatherData = weatherService.getWeatherByLocation(location);
        alertService.checkAndSaveAlerts(weatherData, user);

        return "Weather alerts checked and saved";
    }

    // 📜 Fetch alerts
    @GetMapping("/{username}")
    public List<WeatherAlert> getUserAlerts(@PathVariable String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return alertRepository.findByUser(user);
    }
}
