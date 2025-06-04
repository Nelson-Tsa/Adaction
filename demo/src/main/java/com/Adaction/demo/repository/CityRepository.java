package com.Adaction.demo.repository;

import com.Adaction.demo.modele.City;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CityRepository extends JpaRepository<City, Long> {
    City findByName(String name);
}
