package com.Adaction.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.*;

import com.Adaction.demo.modele.Donnation;
import com.Adaction.demo.service.DonnationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/donnations")
@AllArgsConstructor
public class DonnationController {

    private final DonnationService donnationService;

    @GetMapping("/read")
    public List<Donnation> getAllDonnations() {
        return donnationService.getAllDonnations();
    }
    @GetMapping("/read/{id}")
    public Donnation getDonnationById(@PathVariable Long id) {
        return donnationService.getDonnationById(id);
    }
    @PostMapping("/create")
    public Donnation createDonnation(@RequestBody Donnation donnation) {
        return donnationService.createDonnation(donnation);
    }
    @PutMapping("/update/{id}")
    public Donnation updateDonnation(@PathVariable Long id, @RequestBody Donnation donnation) {
        return donnationService.updateDonnation(id, donnation);
    }
    @DeleteMapping("/delete/{id}")
    public Map<String, String> deleteDonnation(@PathVariable Long id) {
        String result = donnationService.deleteDonnation(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return response;
    }
}
