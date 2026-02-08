package com.farm.smart_farm_ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "analysis_history")
public class AnalysisHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String crop;
    private String soilMoisture;
    private double soilPh;
    private String location;

    @Column(columnDefinition = "TEXT")
    private String aiResult;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public AnalysisHistory() {}

    public AnalysisHistory(String crop, String soilMoisture, double soilPh,
                           String location, String aiResult, User user) {
        this.crop = crop;
        this.soilMoisture = soilMoisture;
        this.soilPh = soilPh;
        this.location = location;
        this.aiResult = aiResult;
        this.user = user;
        this.createdAt = LocalDateTime.now();
    }

    // getters
    public String getAiResult() {
        return aiResult;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
