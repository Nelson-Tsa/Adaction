package com.Adaction.demo.service;

import com.Adaction.demo.modele.*;
import com.Adaction.demo.repository.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.DeserializationFeature;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
@AllArgsConstructor

public class DataLoader implements CommandLineRunner {

    private final AssociationRepository associationRepository;
    private final CityRepository cityRepository;
    private final WasteTypeRepository wasteTypeRepository;
    private final VolunteerRepository volunteerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        loadAssociations();
        loadCities();
        loadWasteTypes();
        loadVolunteers();
    }

    private void loadAssociations() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            InputStream inputStream = getClass().getResourceAsStream("/data/associations.json");
            List<Association> associations = mapper.readValue(inputStream, new TypeReference<List<Association>>() {});
            
            for (Association association : associations) {
                // Vérifiez si l'association existe déjà par nom ou autre identifiant unique
                if (associationRepository.findByName(association.getName()) == null) {
                    associationRepository.save(association);
                }
            }
            
            System.out.println("Associations chargées avec succès!");
        } catch (IOException e) {
            System.err.println("Impossible de charger les associations: " + e.getMessage());
        }
    }

    // Des méthodes similaires pour les autres entités
    private void loadCities() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            InputStream inputStream = getClass().getResourceAsStream("/data/cities.json");
            List<City> cities = mapper.readValue(inputStream, new TypeReference<List<City>>() {});
            
            for (City city : cities) {
                if (cityRepository.findByName(city.getName()) == null) {
                    cityRepository.save(city);
                }
            }
            
            System.out.println("Cities chargées avec succès!");
        } catch (IOException e) {
            System.err.println("Impossible de charger les villes: " + e.getMessage());
        }
    }

    private void loadWasteTypes() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            InputStream inputStream = getClass().getResourceAsStream("/data/waste_types.json");
            List<WasteType> wasteTypes = mapper.readValue(inputStream, new TypeReference<List<WasteType>>() {});
            
            for (WasteType wasteType : wasteTypes) {
                if (wasteTypeRepository.findByLabel(wasteType.getLabel()) == null) {
                    wasteTypeRepository.save(wasteType);
                }
            }
            
            System.out.println("Types de déchets chargées avec succès!");
        } catch (IOException e) {
            System.err.println("Impossible de charger les types de déchets: " + e.getMessage());
        }
    }

    private void loadVolunteers() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            mapper.registerModule(new JavaTimeModule());
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            InputStream inputStream = getClass().getResourceAsStream("/data/volunteers.json");
            List<Volunteer> volunteers = mapper.readValue(inputStream, new TypeReference<List<Volunteer>>() {});
            
            for (Volunteer volunteer : volunteers) {
                if (volunteerRepository.findByEmail(volunteer.getEmail()) == null) {
                    // Encoder le mot de passe
                    volunteer.setPassword(passwordEncoder.encode(volunteer.getPassword()));
                    // Définir le rôle
                    volunteer.setRole(Role.VOLONTAIRE);
                    volunteerRepository.save(volunteer);
                }
            }
            
            System.out.println("Volontaires chargés avec succès!");
        } catch (IOException e) {
            System.err.println("Impossible de charger les volontaires: " + e.getMessage());
        }
    }
}