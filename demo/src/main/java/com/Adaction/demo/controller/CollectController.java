package com.Adaction.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.Adaction.demo.modele.Collect;
import com.Adaction.demo.service.CollectService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/collects")
@AllArgsConstructor
public class CollectController {

    private final CollectService collectService;

    @PostMapping("/create")
    public Collect create(@RequestBody Collect collect) {
        return collectService.createCollect(collect);
    }

    @GetMapping("/read")
    public List<Collect> read() {
        return collectService.getAllCollects();
    }
    @GetMapping("/read/{id}")
    public Collect readById(@PathVariable Long id) {
        return collectService.getCollectById(id);
    }

    @PutMapping("/update/{id}")
    public Collect update(@PathVariable Long id, @RequestBody Collect collect) {
        return collectService.updateCollect(id, collect);
    }

    @DeleteMapping("/delete/{id}")
    public Map<String, String> delete(@PathVariable Long id) {
          String result = collectService.deleteCollect(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return response;
    }
}
