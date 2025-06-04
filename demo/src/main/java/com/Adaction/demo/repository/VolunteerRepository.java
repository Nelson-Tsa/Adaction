package com.Adaction.demo.repository;

import com.Adaction.demo.modele.Volunteer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VolunteerRepository extends JpaRepository<Volunteer, Long> {
    // Custom query methods can be defined here if needed
    Volunteer findByEmail(String email);

}
