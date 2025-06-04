package com.Adaction.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Adaction.demo.modele.AssociationLogin;

public interface AssociationLoginRepository extends JpaRepository<AssociationLogin, Long> {
  AssociationLogin findByEmail(String email);
}
