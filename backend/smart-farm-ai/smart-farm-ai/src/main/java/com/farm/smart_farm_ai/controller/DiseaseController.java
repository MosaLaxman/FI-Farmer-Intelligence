package com.farm.smart_farm_ai.controller;

import com.farm.smart_farm_ai.service.GeminiService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@RestController
@RequestMapping("/api/disease")
public class DiseaseController {

    private final GeminiService geminiService;

    public DiseaseController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/detect")
    public String detectDisease(@RequestParam("image") MultipartFile file) {

        try {
            // 🔹 Convert image to Base64
            String base64Image = Base64.getEncoder().encodeToString(file.getBytes());

            // 🔹 Prompt
            String prompt = """
You are an agricultural expert.

Analyze the crop leaf image.

Respond STRICTLY in this format (no extra text, no markdown):

Disease: ...
Cause: ...
Treatment: ...
Prevention: ...
""";

            // 🔹 Call Gemini
            String raw = geminiService.getAiRecommendationWithImage(prompt, base64Image);

            // 🔹 Extract text
            return geminiService.extractTextFromGeminiResponse(raw);

        } catch (Exception e) {
            return "Error processing image";
        }
    }
}