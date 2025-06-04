package com.Adaction.demo.service;

import com.Adaction.demo.modele.Donnation;
import com.Adaction.demo.repository.DonnationRepository;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import java.util.List;

@Service
@AllArgsConstructor
public class  DonnationServiceImplement implements DonnationService {

    private final DonnationRepository donnationRepository;
    @Override
    public Donnation createDonnation(Donnation donnation) {
        // Implementation logic for creating a donation
        return donnationRepository.save(donnation); // Replace with actual implementation
    }

    @Override
    public List<Donnation> getAllDonnations() {
       return donnationRepository.findAll(); // Replace with actual implementation
    }

    @Override
    public Donnation updateDonnation(Long id, Donnation donnation) {
        return donnationRepository.findById(id)
            .map(d -> {
                d.setDate(donnation.getDate());
                d.setVolunteerId(donnation.getVolunteerId());
                d.setAmount(donnation.getAmount());
                d.setAssociationId(donnation.getAssociationId());
                return donnationRepository.save(d);
            }).orElseThrow(() -> new RuntimeException("Donation not found with id " + id));
    }

    @Override
    public String deleteDonnation(Long id) {
        donnationRepository.deleteById(id);
    // return;
        return "Donnation with id " + id + " has been deleted successfully.";
    }

    @Override
    public Donnation getDonnationById(Long id) {
        return donnationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Donation not found with id " + id));
    }
}
