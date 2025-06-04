package com.Adaction.demo.repository;

import com.Adaction.demo.modele.Donnation;
import org.springframework.data.jpa.repository.JpaRepository;
public interface DonnationRepository extends JpaRepository<Donnation, Long> {
    // Custom query methods can be defined here if needed

}
