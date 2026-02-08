package com.farm.smart_farm_ai.dto;

public class CropPredictionRequest {

    private String username;
    private String soilMoisture;
    private double soilPh;
    private String location;
    private String season;
    private double landArea; // acres

    public String getUsername() {
        return username;
    }

    public String getSoilMoisture() {
        return soilMoisture;
    }

    public double getSoilPh() {
        return soilPh;
    }

    public String getLocation() {
        return location;
    }

    public String getSeason() {
        return season;
    }

    public double getLandArea() {
        return landArea;
    }
}
