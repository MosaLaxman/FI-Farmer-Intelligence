package com.farm.smart_farm_ai.controller;

import com.farm.smart_farm_ai.dto.CostAnalysisRequest;
import com.farm.smart_farm_ai.entity.CostAnalysis;
import com.farm.smart_farm_ai.entity.User;
import com.farm.smart_farm_ai.repository.CostAnalysisRepository;
import com.farm.smart_farm_ai.repository.UserRepository;
import com.farm.smart_farm_ai.service.GeminiService;
import com.farm.smart_farm_ai.util.AiTextUtil;
import com.farm.smart_farm_ai.util.LanguagePromptUtil;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cost-optimization")
public class CostOptimizationController {

    private final GeminiService geminiService;
    private final UserRepository userRepository;
    private final CostAnalysisRepository costRepo;

    public CostOptimizationController(
            GeminiService geminiService,
            UserRepository userRepository,
            CostAnalysisRepository costRepo) {

        this.geminiService = geminiService;
        this.userRepository = userRepository;
        this.costRepo = costRepo;
    }

    // 💰 Analyze cost (LANGUAGE-AWARE)
    @PostMapping
    public String analyzeCost(@RequestBody CostAnalysisRequest request) {

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String languageRule = LanguagePromptUtil
                .languageInstruction(user.getPreferredLanguage());

        String prompt = """
        You are an agricultural economics expert.
        %s

        Estimate farming cost and suggest reduction tips.

        Crop: %s
        Land Area: %.2f acres
        Irrigation Type: %s
        Fertilizer Type: %s
        Labor Days: %d
        Respond strictly in PLAIN TEXT.
        Do NOT use markdown, bullets, or symbols.
        Format EXACTLY as:
        Estimated Cost: <text>
        Water Cost: <text>
        Fertilizer Cost: <text>
        Labor Cost: <text>
        Tip 1: <text>
        Tip 2: <text>
        Tip 3: <text>
        """.formatted(
                languageRule,
                request.getCrop(),
                request.getLandArea(),
                request.getIrrigationType(),
                request.getFertilizerType(),
                request.getLaborDays()
        );

        String raw = geminiService.getAiRecommendation(prompt);
        String result = AiTextUtil.clean(
                geminiService.extractTextFromGeminiResponse(raw)
        );

        costRepo.save(new CostAnalysis(
                request.getCrop(),
                request.getLandArea(),
                request.getIrrigationType(),
                request.getFertilizerType(),
                request.getLaborDays(),
                result,
                user
        ));

        return result;
    }

    // 📜 Fetch history
    @GetMapping("/{username}")
    public List<CostAnalysis> getCostHistory(@PathVariable String username) {

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return costRepo.findByUser(user);
    }
}
