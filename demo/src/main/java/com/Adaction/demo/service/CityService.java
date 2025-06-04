package com.Adaction.demo.service;

import com.Adaction.demo.modele.City;
import java.util.List;
public interface CityService {

    City createCity(City city);

    List<City> getAllCities();

    City getCityById(Long id);
    
    City updateCity(Long id, City city);

    String deleteCity(Long id);
}
