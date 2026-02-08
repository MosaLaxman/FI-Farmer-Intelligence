package com.farm.smart_farm_ai.dto;

public class AnalyzeResponse {

    private String water;
    private String fertilizer;
    private String labor;

    public AnalyzeResponse(String water, String fertilizer, String labor) {
        this.water = water;
        this.fertilizer = fertilizer;
        this.labor = labor;
    }

    public String getWater() {
        return water;
    }

    public String getFertilizer() {
        return fertilizer;
    }

    public String getLabor() {
        return labor;
    }
}
