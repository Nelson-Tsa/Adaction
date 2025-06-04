package com.Adaction.demo.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.Adaction.demo.modele.WasteType;
import com.Adaction.demo.service.WasteTypeService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/wasteTypes")
@AllArgsConstructor
public class WasteTypeController {

    private final WasteTypeService wasteTypeService;
   

    @GetMapping("/read")
    public List<WasteType> read() {
        return wasteTypeService.getAllWasteTypes();
    }

    @GetMapping("/read/{id}")
    public WasteType getWasteTypeById(@PathVariable Long id) {
        return wasteTypeService.getWasteTypeById(id);
    }
    
    @PostMapping("/create")
    public WasteType create(@RequestBody WasteType wasteType) {
        return wasteTypeService.createWasteType(wasteType);
    }
    @PutMapping("/update/{id}")
    public WasteType update(@PathVariable Long id, @RequestBody WasteType wasteType) {
        return wasteTypeService.updateWasteType(id, wasteType);
    }
    @DeleteMapping("/delete/{id}")
    public Map<String, String> delete(@PathVariable Long id) {
        String result = wasteTypeService.deleteWasteType(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return response;
    }
}
