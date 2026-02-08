package com.farm.smart_farm_ai.dto;

public class LoginResponse {

    private String username;
    private String preferredLanguage;

    public LoginResponse(String username, String preferredLanguage) {
        this.username = username;
        this.preferredLanguage = preferredLanguage;
    }

    public String getUsername() {
        return username;
    }

    public String getPreferredLanguage() {
        return preferredLanguage;
    }
}
