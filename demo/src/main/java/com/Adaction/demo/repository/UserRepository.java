package com.Adaction.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Adaction.demo.modele.User;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByEmail(String email);
}
