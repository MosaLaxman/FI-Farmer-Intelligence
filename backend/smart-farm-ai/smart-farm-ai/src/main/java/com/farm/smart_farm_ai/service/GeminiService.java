package com.farm.smart_farm_ai.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    // 🔹 TEXT-ONLY AI (existing)
    public String getAiRecommendation(String prompt) {
        try {
            Map<String, Object> body = Map.of(
                    "contents", new Object[]{
                            Map.of(
                                    "parts", new Object[]{
                                            Map.of("text", prompt)
                                    }
                            )
                    }
            );

            String json = objectMapper.writeValueAsString(body);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(json, headers);

            String url = apiUrl + "?key=" + apiKey;

            return restTemplate.postForObject(url, entity, String.class);

        } catch (Exception e) {
            return "Gemini API error: " + e.getMessage();
        }
    }

    // 🔥 NEW: IMAGE + TEXT (Gemini Vision)
    public String getAiRecommendationWithImage(String prompt, String base64Image) {
        try {
            String requestBody = """
            {
              "contents": [
                {
                  "parts": [
                    { "text": "%s" },
                    {
                      "inline_data": {
                        "mime_type": "image/jpeg",
                        "data": "%s"
                      }
                    }
                  ]
                }
              ]
            }
            """.formatted(prompt, base64Image);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            String url = apiUrl + "?key=" + apiKey;

            return restTemplate.postForObject(url, entity, String.class);

        } catch (Exception e) {
            return "Gemini Image API error: " + e.getMessage();
        }
    }

    // 🔹 EXTRACT TEXT FROM RESPONSE
    public String extractTextFromGeminiResponse(String geminiResponse) {
        try {
            JsonNode root = objectMapper.readTree(geminiResponse);

            return root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            return "Failed to parse Gemini response";
        }
    }
}