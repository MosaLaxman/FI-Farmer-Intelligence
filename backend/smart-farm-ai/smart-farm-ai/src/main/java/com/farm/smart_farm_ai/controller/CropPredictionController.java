package com.farm.smart_farm_ai.controller;

import com.farm.smart_farm_ai.dto.CropPredictionRequest;
import com.farm.smart_farm_ai.entity.CropRecommendation;
import com.farm.smart_farm_ai.entity.User;
import com.farm.smart_farm_ai.repository.CropRecommendationRepository;
import com.farm.smart_farm_ai.repository.UserRepository;
import com.farm.smart_farm_ai.service.GeminiService;
import com.farm.smart_farm_ai.service.WeatherService;
import com.farm.smart_farm_ai.util.AiTextUtil;
import com.farm.smart_farm_ai.util.LanguagePromptUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/crop-prediction")
public class CropPredictionController {

    private final GeminiService geminiService;
    private final WeatherService weatherService;
    private final UserRepository userRepository;
    private final CropRecommendationRepository cropRepo;

    public CropPredictionController(
            GeminiService geminiService,
            WeatherService weatherService,
            UserRepository userRepository,
            CropRecommendationRepository cropRepo) {

        this.geminiService = geminiService;
        this.weatherService = weatherService;
        this.userRepository = userRepository;
        this.cropRepo = cropRepo;
    }

    // 🌱 Predict crops (LANGUAGE-AWARE)
    @PostMapping
    public String predictCrops(@RequestBody CropPredictionRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String weather = weatherService.getWeatherByLocation(request.getLocation());

        String languageRule = LanguagePromptUtil
                .languageInstruction(user.getPreferredLanguage());

        String prompt = """
        You are an agricultural scientist.
        %s

        Suggest the TOP 3 crops suitable for farming.

        Soil Moisture: %s
        Soil pH: %.1f
        Location: %s
        Season: %s
        Land Area: %.2f acres
        Weather: %s

        Consider land size while suggesting crops
        (small land → high-value crops, large land → staple crops).

        Respond strictly in PLAIN TEXT.
        Do NOT use markdown, bullets, numbering, or symbols.
                
        Format EXACTLY as:
        Crop 1: <crop name> - <reason>
        Crop 2: <crop name> - <reason>
Crop 3: <crop name> - <reason>
        """.formatted(
                languageRule,
                request.getSoilMoisture(),
                request.getSoilPh(),
                request.getLocation(),
                request.getSeason(),
                request.getLandArea(),
                weather
        );

        String raw = geminiService.getAiRecommendation(prompt);
        String recommendation = AiTextUtil.clean(
                geminiService.extractTextFromGeminiResponse(raw)
        );

        cropRepo.save(new CropRecommendation(
                request.getSoilMoisture(),
                request.getSoilPh(),
                request.getLocation(),
                request.getLandArea(),
                recommendation,
                user
        ));

        return recommendation;
    }

    // 📜 History
    @GetMapping("/{username}")
    public List<CropRecommendation> getHistory(@PathVariable String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return cropRepo.findByUser(user);
    }
}
