package com.Adaction.demo.repository;
import com.Adaction.demo.modele.WasteCollected;
import org.springframework.data.jpa.repository.JpaRepository;
public interface WasteCollectedRepository extends JpaRepository<WasteCollected, Long> {
    // Custom query methods can be defined here if needed

}
