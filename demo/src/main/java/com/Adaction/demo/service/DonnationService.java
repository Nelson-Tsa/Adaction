package com.Adaction.demo.service;

import com.Adaction.demo.modele.Donnation;
import java.util.List;

public interface  DonnationService {
    Donnation createDonnation(Donnation donnation);

    List<Donnation> getAllDonnations();

    Donnation updateDonnation(Long id, Donnation donnation);

    String deleteDonnation(Long id);
    
    Donnation getDonnationById(Long id);
}
