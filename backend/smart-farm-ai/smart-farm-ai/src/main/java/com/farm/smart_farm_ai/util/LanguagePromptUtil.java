package com.farm.smart_farm_ai.util;

public class LanguagePromptUtil {

    public static String languageInstruction(String lang) {
        return switch (lang) {
            case "hi" -> "Respond in Hindi using simple farmer-friendly language. Avoid technical terms.";
            case "te" -> "Respond in Telugu using simple farmer-friendly language. Avoid technical terms.";
            case "or" -> "Respond in Odia using simple farmer-friendly language. Avoid technical terms.";
            default -> "Respond in English using simple and clear language.";
        };
    }
}
