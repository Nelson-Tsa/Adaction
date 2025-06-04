package com.Adaction.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Adaction.demo.modele.Admin;

public interface AdminRepository extends JpaRepository<Admin, Long> {
  Optional<Admin> findByEmail(String email);
}
