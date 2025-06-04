package com.Adaction.demo.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.Adaction.demo.modele.WasteCollected;
import com.Adaction.demo.service.WasteCollectedService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/waste-collected")
@AllArgsConstructor
public class WasteCollectedController {

    private final WasteCollectedService wasteCollectedService;

    @GetMapping("/read")
    public List<WasteCollected> getAllWasteCollecteds() {
        return wasteCollectedService.getAllWasteCollecteds();
    }
    @GetMapping("/read/{id}")
    public WasteCollected getWasteCollectedById(@PathVariable Long id) {
        return wasteCollectedService.getWasteCollectedById(id);
    }
    @PostMapping("/create")
    public WasteCollected createWasteCollected(@RequestBody WasteCollected wasteCollected) {
        return wasteCollectedService.createWasteCollected(wasteCollected);
    }
    @PutMapping("/update/{id}")
    public WasteCollected updateWasteCollected(@PathVariable Long id, @RequestBody WasteCollected wasteCollected) {
        return wasteCollectedService.updateWasteCollected(id, wasteCollected);
    }
    @DeleteMapping("/delete/{id}")
    public Map<String, String> deleteWasteCollected(@PathVariable Long id) {
          String result = wasteCollectedService.deleteWasteCollected(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return response;
    }
}
