package com.Adaction.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.Adaction.demo.modele.City;
import com.Adaction.demo.service.CityService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/cities")
@AllArgsConstructor
public class CityController {

    private final CityService cityService;

    @PostMapping("/create")
    public City create(@RequestBody City city) {
        return cityService.createCity(city);
    }

     @GetMapping("/read")
    public List<City> read() {
        return cityService.getAllCities();
    }
    @GetMapping("/read/{id}")
    public City readById(@PathVariable Long id) {
        return cityService.getCityById(id);
    }

    @PutMapping("/update/{id}")
    public City update(@PathVariable Long id, @RequestBody City city) {
        return cityService.updateCity(id, city);
    }

    @DeleteMapping("/delete/{id}")
    public Map<String, String> delete(@PathVariable Long id) {
          String result = cityService.deleteCity(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return response;
    }
}
