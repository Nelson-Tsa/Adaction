package com.Adaction.demo.service;

import java.util.List;

import com.Adaction.demo.modele.Association;
public interface AssociationService {

    Association createAssociation(Association association);

    List<Association> getAllAssociations();
    
    Association getAssociationById(Long id);

    Association updateAssociation(Long id, Association association);

    String deleteAssociation(Long id);
}
