package com.farm.smart_farm_ai.controller;

import com.farm.smart_farm_ai.dto.AnalyzeRequest;
import com.farm.smart_farm_ai.dto.AnalyzeResponse;
import com.farm.smart_farm_ai.entity.AnalysisHistory;
import com.farm.smart_farm_ai.entity.User;
import com.farm.smart_farm_ai.repository.AnalysisHistoryRepository;
import com.farm.smart_farm_ai.repository.UserRepository;
import com.farm.smart_farm_ai.service.GeminiService;
import com.farm.smart_farm_ai.service.WeatherService;
import com.farm.smart_farm_ai.util.AiTextUtil;
import com.farm.smart_farm_ai.util.LanguagePromptUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AnalyzeController {

    private final WeatherService weatherService;
    private final GeminiService geminiService;
    private final UserRepository userRepository;
    private final AnalysisHistoryRepository historyRepository;

    public AnalyzeController(
            WeatherService weatherService,
            GeminiService geminiService,
            UserRepository userRepository,
            AnalysisHistoryRepository historyRepository) {

        this.weatherService = weatherService;
        this.geminiService = geminiService;
        this.userRepository = userRepository;
        this.historyRepository = historyRepository;
    }

    // 🌾 ANALYZE + SAVE HISTORY (LANGUAGE-AWARE)
    @PostMapping("/analyze")
    public AnalyzeResponse analyzeFarmData(@RequestBody AnalyzeRequest request) {

        // 🔐 Fetch user
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 🌦️ Weather data
        String weatherData = weatherService.getWeatherByLocation(request.getLocation());

        // 🌍 Language instruction
        String languageRule = LanguagePromptUtil
                .languageInstruction(user.getPreferredLanguage());

        // 🧠 AI Prompt (language-controlled)
        String prompt = """
        You are an agricultural expert.
        %s

        Based on the following data, give short, clear, actionable advice.

        Crop: %s
        Soil Moisture: %s
        Soil pH: %s
        Weather: %s

        Respond strictly in PLAIN TEXT.
        Do NOT use markdown, bullets, or symbols (*, -, **).
              
        Format EXACTLY as:
        Water: <text>
        Fertilizer: <text>
        Labor: <text>
                
        """.formatted(
                languageRule,
                request.getCrop(),
                request.getSoilMoisture(),
                request.getSoilPh(),
                weatherData
        );

        // 🤖 Gemini call
        String geminiRaw = geminiService.getAiRecommendation(prompt);
        String aiText = AiTextUtil.clean(
                geminiService.extractTextFromGeminiResponse(geminiRaw)
        );

        // 💾 Save history
        AnalysisHistory history = new AnalysisHistory(
                request.getCrop(),
                request.getSoilMoisture(),
                request.getSoilPh(),
                request.getLocation(),
                aiText,
                user
        );
        historyRepository.save(history);

        // 📤 Return clean response
        return new AnalyzeResponse(
                extract(aiText, "Water:"),
                extract(aiText, "Fertilizer:"),
                extract(aiText, "Labor:")
        );
    }

    // 📜 FETCH USER ANALYSIS HISTORY
    @GetMapping("/history/{username}")
    public List<AnalysisHistory> getUserHistory(@PathVariable String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return historyRepository.findByUser(user);
    }

    // 🔎 HELPER METHOD
    private String extract(String text, String key) {
        int start = text.indexOf(key);
        if (start == -1) return "";

        int end = text.indexOf("\n", start);
        if (end == -1) end = text.length();

        return text.substring(start + key.length(), end).trim();
    }

    private String cleanMarkdown(String text) {
        if (text == null) return "";
        return text.replaceAll("[*`_>#-]", "").trim();
    }

}
