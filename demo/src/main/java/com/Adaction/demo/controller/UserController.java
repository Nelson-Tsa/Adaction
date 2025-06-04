package com.Adaction.demo.controller;

import com.Adaction.demo.modele.Role;
import com.Adaction.demo.modele.Admin;
import com.Adaction.demo.modele.AssociationLogin;
import com.Adaction.demo.modele.Volunteer;
import com.Adaction.demo.repository.AdminRepository;
import com.Adaction.demo.repository.AssociationLoginRepository;
import com.Adaction.demo.repository.VolunteerRepository;
import com.Adaction.demo.service.JwtService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class UserController {

  private final AssociationLoginRepository userRepository;
  private final VolunteerRepository volunteerRepository;
  private final AdminRepository adminRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody AssociationLogin user) {
    if (userRepository.findByEmail(user.getEmail()) != null) {
      return ResponseEntity.badRequest().body("Email already exists");
    }

    user.setRole(Role.AUCUN);
    user.setPassword(passwordEncoder.encode(user.getPassword()));

    AssociationLogin savedUser = userRepository.save(user);
    String token = jwtService.generateToken(savedUser.getEmail(), savedUser.getRole().name());

    return ResponseEntity.ok(new AuthResponse(token, savedUser.getUsername(), savedUser.getRole()));
  }

  @PostMapping("/login")
  public ResponseEntity<?> loginUser(@RequestBody AssociationLogin loginRequest) {
    try {
      AssociationLogin user = userRepository.findByEmail(loginRequest.getEmail());
      if (user != null && passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {

        String token = jwtService.generateToken(user.getEmail(), user.getRole().name());

        return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), user.getRole()));
      }

      Volunteer volunteer = volunteerRepository.findByEmail(loginRequest.getEmail());
      if (volunteer != null && passwordEncoder.matches(loginRequest.getPassword(), volunteer.getPassword())) {

        String token = jwtService.generateToken(volunteer.getEmail(), volunteer.getRole().name());

        return ResponseEntity.ok(new AuthResponse(token, volunteer.getFirstname(), volunteer.getRole()));
      }

      Admin admin = adminRepository.findByEmail(loginRequest.getEmail()).orElse(null);
      if (admin != null && passwordEncoder.matches(loginRequest.getPassword(), admin.getPassword())) {

        String token = jwtService.generateToken(admin.getEmail(), admin.getRole().name());

        return ResponseEntity.ok(new AuthResponse(token, admin.getName(), admin.getRole()));
      }

      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User or Volunteer not found");

    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
    }
  }

  @GetMapping("/info-association")
  public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
    String authHeader = request.getHeader("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
    }

    String token = authHeader.substring(7);
    String email = jwtService.extractUsername(token);
    AssociationLogin user = userRepository.findByEmail(email);

    if (user != null) {

      return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), user.getRole()));
    }

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Association not found");
  }

  @GetMapping("/info-volunteer")
  public ResponseEntity<?> getCurrentVolunteer(HttpServletRequest request) {
    String authHeader = request.getHeader("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
    }

    String token = authHeader.substring(7);
    String email = jwtService.extractUsername(token);
    Volunteer volunteer = volunteerRepository.findByEmail(email);

    if (volunteer != null) {

      return ResponseEntity.ok(new AuthResponse(token, volunteer.getFirstname(), volunteer.getRole()));
    }

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Volunteer not found");
  }

  @GetMapping("/info-admin")
  public ResponseEntity<?> getCurrentAdmin(HttpServletRequest request) {
    String authHeader = request.getHeader("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
    }

    String token = authHeader.substring(7);
    String email = jwtService.extractUsername(token);
    Admin admin = adminRepository.findByEmail(email).orElse(null);

    if (admin != null) {

      return ResponseEntity.ok(new AuthResponse(token, admin.getName(), admin.getRole()));
    }

    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Admin not found");
  }

  private record AuthResponse(String token, String username, Role role) {
  }
}
