package com.farm.smart_farm_ai.service;

import com.farm.smart_farm_ai.entity.User;
import com.farm.smart_farm_ai.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String register(String username, String password, String language) {

        if (userRepository.findByUsername(username).isPresent()) {
            return "Username already exists";
        }

        User user = new User(
                username,
                passwordEncoder.encode(password),
                language
        );

        userRepository.save(user);
        return "User registered successfully";
    }


    public String login(String username, String password) {

        return userRepository.findByUsername(username)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> "Login successful")
                .orElse("Invalid username or password");
    }
}
