package com.Adaction.demo.repository;

import com.Adaction.demo.modele.Collect;
import org.springframework.data.jpa.repository.JpaRepository;
public interface CollectRepository extends JpaRepository<Collect, Long> {
    // Custom query methods can be defined here if needed

}
