package com.farm.smart_farm_ai.controller;

import com.farm.smart_farm_ai.dto.LoginResponse;
import com.farm.smart_farm_ai.entity.User;
import com.farm.smart_farm_ai.repository.UserRepository;
import com.farm.smart_farm_ai.service.AuthService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserRepository userRepository;

    public AuthController(AuthService authService,
                          UserRepository userRepository) {
        this.authService = authService;
        this.userRepository = userRepository;
    }

    // ✅ REGISTER USER
    @PostMapping("/register")
    public String register(@RequestBody Map<String, String> body) {

        return authService.register(
                body.get("username"),
                body.get("password"),
                body.get("preferredLanguage") // en / hi / te / or
        );
    }

    // ✅ LOGIN USER (RETURN DATA FOR FRONTEND)
    @PostMapping("/login")
    public LoginResponse login(@RequestBody Map<String, String> body) {

        // validate credentials (delegated)
        authService.login(
                body.get("username"),
                body.get("password")
        );

        // fetch user for response
        User user = userRepository.findByUsername(body.get("username"))
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new LoginResponse(
                user.getUsername(),
                user.getPreferredLanguage()
        );
    }
}
