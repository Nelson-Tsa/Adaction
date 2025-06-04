package com.Adaction.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.Adaction.demo.modele.Association;
import com.Adaction.demo.service.AssociationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/associations")
@AllArgsConstructor
public class AssociationController {
    private final AssociationService associationService;

    @PostMapping("/create")
    // @PostMapping
    public Association create(@RequestBody Association association) {
        return associationService.createAssociation(association);
    }

    @GetMapping("/read")
    // @GetMapping
    public List<Association> read() {
        return associationService.getAllAssociations();
    }

    @GetMapping("/read/{id}")
    public Association readById(@PathVariable Long id) {
        return associationService.getAssociationById(id);
    }

    @PutMapping("/update/{id}")
    // @PutMapping("/{id}")
    public Association update(@PathVariable Long id, @RequestBody Association association) {
        return associationService.updateAssociation(id, association);
    }

    @DeleteMapping("/delete/{id}")
    public Map<String, String> delete(@PathVariable Long id) {
        String result = associationService.deleteAssociation(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return response;
    }
}
