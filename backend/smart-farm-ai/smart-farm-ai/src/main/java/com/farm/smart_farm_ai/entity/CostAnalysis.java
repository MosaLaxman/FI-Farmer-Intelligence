package com.farm.smart_farm_ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cost_analysis")
public class CostAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String crop;
    private double landArea; // acres
    private String irrigationType;
    private String fertilizerType;
    private int laborDays;

    @Column(columnDefinition = "TEXT")
    private String aiResult;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public CostAnalysis() {}

    public CostAnalysis(String crop, double landArea,
                        String irrigationType, String fertilizerType,
                        int laborDays, String aiResult, User user) {
        this.crop = crop;
        this.landArea = landArea;
        this.irrigationType = irrigationType;
        this.fertilizerType = fertilizerType;
        this.laborDays = laborDays;
        this.aiResult = aiResult;
        this.user = user;
        this.createdAt = LocalDateTime.now();
    }

    public String getAiResult() {
        return aiResult;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
