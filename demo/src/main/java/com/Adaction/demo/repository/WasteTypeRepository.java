package com.Adaction.demo.repository;

import com.Adaction.demo.modele.WasteType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WasteTypeRepository extends JpaRepository<WasteType, Long> {
    // Custom query methods can be defined here if needed

}
