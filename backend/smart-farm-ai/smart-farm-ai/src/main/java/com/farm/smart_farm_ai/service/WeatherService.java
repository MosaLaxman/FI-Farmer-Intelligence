package com.farm.smart_farm_ai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    @Value("${weather.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getWeatherByLocation(String location) {
        String url = apiUrl + "?key=" + apiKey + "&q=" + location + "&aqi=no";
        return restTemplate.getForObject(url, String.class);
    }
}
