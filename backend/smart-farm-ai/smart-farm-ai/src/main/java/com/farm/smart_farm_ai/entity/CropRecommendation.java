package com.farm.smart_farm_ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "crop_recommendations")
public class CropRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String soilMoisture;
    private double soilPh;
    private String location;
    private double landArea;


    @Column(columnDefinition = "TEXT")
    private String recommendation;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public CropRecommendation() {}

    public CropRecommendation(String soilMoisture, double soilPh,
                              String location, double landArea,
                              String recommendation, User user) {
        this.soilMoisture = soilMoisture;
        this.soilPh = soilPh;
        this.location = location;
        this.landArea = landArea;
        this.recommendation = recommendation;
        this.user = user;
        this.createdAt = LocalDateTime.now();
    }


    public String getRecommendation() {
        return recommendation;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
