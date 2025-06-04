package com.Adaction.demo.repository;

import com.Adaction.demo.modele.Association;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AssociationRepository extends JpaRepository<Association, Long> {
    // Custom query methods can be defined here if needed

}
