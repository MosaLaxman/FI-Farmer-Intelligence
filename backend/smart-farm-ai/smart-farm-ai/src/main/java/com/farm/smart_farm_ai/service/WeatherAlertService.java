package com.farm.smart_farm_ai.service;

import com.farm.smart_farm_ai.entity.User;
import com.farm.smart_farm_ai.entity.WeatherAlert;
import com.farm.smart_farm_ai.repository.WeatherAlertRepository;
import com.farm.smart_farm_ai.util.AiTextUtil;
import com.farm.smart_farm_ai.util.LanguagePromptUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

@Service
public class WeatherAlertService {

    private final WeatherAlertRepository alertRepository;
    private final GeminiService geminiService;
    private final ObjectMapper mapper = new ObjectMapper();

    public WeatherAlertService(
            WeatherAlertRepository alertRepository,
            GeminiService geminiService) {

        this.alertRepository = alertRepository;
        this.geminiService = geminiService;
    }

    public void checkAndSaveAlerts(String weatherJson, User user) {
        try {
            JsonNode root = mapper.readTree(weatherJson);
            JsonNode current = root.path("current");

            double temp = current.path("temp_c").asDouble();
            double wind = current.path("wind_kph").asDouble();
            double rain = current.path("precip_mm").asDouble();
            int humidity = current.path("humidity").asInt();

            String languageRule = LanguagePromptUtil
                    .languageInstruction(user.getPreferredLanguage());

            String prompt = """
            You are an agricultural weather advisor.
            %s

            Current Weather Conditions:
            Temperature: %.1f °C
            Rainfall: %.1f mm
            Wind Speed: %.1f km/h
            Humidity: %d%%

            Generate short farmer-friendly weather alerts.
            If no risk, give a normal advisory.

            Respond strictly in PLAIN TEXT.
            Do NOT use markdown, bullets, or symbols.
                    
            Format EXACTLY as:
            Alert: <short alert type>
            Message: <clear farmer-friendly message>
            """.formatted(
                    languageRule,
                    temp,
                    rain,
                    wind,
                    humidity
            );

            String raw = geminiService.getAiRecommendation(prompt);
            String alertText = AiTextUtil.clean(
                    geminiService.extractTextFromGeminiResponse(raw)
            );


            alertRepository.save(new WeatherAlert(
                    "Weather Advisory",
                    alertText,
                    user
            ));

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
