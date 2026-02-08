package com.farm.smart_farm_ai.util;

public class AiTextUtil {

    private AiTextUtil() {
        // utility class
    }

    /**
     * Cleans AI-generated text by removing markdown
     * and unnecessary formatting characters.
     */
    public static String clean(String text) {
        if (text == null || text.isBlank()) {
            return "";
        }

        return text
                .replaceAll("\\*\\*", "")     // bold **
                .replaceAll("[*_`>#]", "")    // markdown symbols
                .replaceAll("•", "")          // bullets
                .trim();
    }
}
