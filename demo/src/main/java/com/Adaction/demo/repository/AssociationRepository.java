package com.Adaction.demo.repository;

import com.Adaction.demo.modele.Association;
import org.springframework.data.jpa.repository.JpaRepository;
public interface AssociationRepository extends JpaRepository<Association, Long> {
    Association findByName(String name);

}
