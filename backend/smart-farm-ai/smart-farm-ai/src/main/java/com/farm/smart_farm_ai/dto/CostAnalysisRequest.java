package com.farm.smart_farm_ai.dto;

public class CostAnalysisRequest {

    private String username;
    private String crop;
    private double landArea; // acres
    private String irrigationType; // drip / sprinkler / flood
    private String fertilizerType;
    private int laborDays;

    public String getUsername() {
        return username;
    }

    public String getCrop() {
        return crop;
    }

    public double getLandArea() {
        return landArea;
    }

    public String getIrrigationType() {
        return irrigationType;
    }

    public String getFertilizerType() {
        return fertilizerType;
    }

    public int getLaborDays() {
        return laborDays;
    }
}
