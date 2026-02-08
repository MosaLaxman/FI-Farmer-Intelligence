package com.farm.smart_farm_ai.controller;

import com.farm.smart_farm_ai.dto.UpdateLanguageRequest;
import com.farm.smart_farm_ai.entity.User;
import com.farm.smart_farm_ai.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

    private final UserRepository userRepository;

    private static final Set<String> SUPPORTED_LANGUAGES =
            Set.of("en", "hi", "te", "or");

    public UserProfileController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 🌍 UPDATE PREFERRED LANGUAGE
    @PutMapping("/language")
    public String updatePreferredLanguage(
            @RequestBody UpdateLanguageRequest request) {

        if (!SUPPORTED_LANGUAGES.contains(request.getPreferredLanguage())) {
            return "Unsupported language. Use en, hi, te, or";
        }

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPreferredLanguage(request.getPreferredLanguage());
        userRepository.save(user);

        return "Preferred language updated successfully";
    }
}
