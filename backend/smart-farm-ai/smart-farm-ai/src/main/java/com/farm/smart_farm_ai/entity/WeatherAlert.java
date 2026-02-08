package com.farm.smart_farm_ai.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "weather_alerts")
public class WeatherAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String alertType;

    @Column(columnDefinition = "TEXT")
    private String message;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public WeatherAlert() {}

    public WeatherAlert(String alertType, String message, User user) {
        this.alertType = alertType;
        this.message = message;
        this.user = user;
        this.createdAt = LocalDateTime.now();
    }

    public String getAlertType() {
        return alertType;
    }

    public String getMessage() {
        return message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
