package com.Adaction.demo.service;



    import java.util.List;

import org.springframework.stereotype.Service;

import com.Adaction.demo.modele.Association;
import com.Adaction.demo.repository.AssociationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AssociationServiceImplement implements AssociationService {

    private final AssociationRepository associationRepository;
    @Override
    public Association createAssociation(Association association) {
        return associationRepository.save(association); 
    }

    @Override
    public List<Association> getAllAssociations() {
        return associationRepository.findAll();
    }
    
    @Override
    public Association getAssociationById(Long id) {
        return associationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Association not found with id " + id));
    }

    @Override
    public Association updateAssociation(Long id, Association association) {
      return associationRepository.findById(id)
        .map(a -> {
            a.setName(association.getName());
            a.setDescription(association.getDescription());
            a.setPoints(association.getPoints());
            a.setImage(association.getImage());
            return associationRepository.save(a);
        }).orElseThrow(() -> new RuntimeException("Association not found with id " + id));
    }

    @Override
    public String deleteAssociation(Long id) {
   associationRepository.deleteById(id);
    return "Association with id " + id + " has been deleted successfully.";
    }

}
