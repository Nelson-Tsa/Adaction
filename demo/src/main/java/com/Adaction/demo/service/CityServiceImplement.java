package com.Adaction.demo.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.Adaction.demo.modele.City;
import com.Adaction.demo.repository.CityRepository;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class CityServiceImplement implements CityService {

    private final CityRepository cityRepository;    

    @Override
    public List<City> getAllCities() {
        return cityRepository.findAll();
    }

    @Override
    public City createCity(City city) {
        return cityRepository.save(city);
    }

    @Override
    public City updateCity(Long id, City city) {
        return cityRepository.findById(id)
            .map(c -> {
                c.setName(city.getName());
                c.setLatitude(city.getLatitude());
                c.setLongitude(city.getLongitude());
                return cityRepository.save(c);
            }).orElseThrow(() -> new RuntimeException("City not found with id " + id));
    }

    @Override
    public String deleteCity(Long id) {
        cityRepository.deleteById(id);
        return "City with id " + id + " has been deleted successfully.";
    }

    @Override
    public City getCityById(Long id) {
        return cityRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("City not found with id " + id));
    }
}
