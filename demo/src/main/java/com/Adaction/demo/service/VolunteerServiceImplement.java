package com.Adaction.demo.service;

import com.Adaction.demo.modele.Role;
import com.Adaction.demo.modele.Volunteer;
import com.Adaction.demo.repository.VolunteerRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import java.util.List;

@Service
@AllArgsConstructor
public class VolunteerServiceImplement implements VolunteerService {
    private final VolunteerRepository volunteerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Volunteer createVolunteer(Volunteer volunteer) {
        volunteer.setRole(Role.VOLONTAIRE);

        volunteer.setPassword(passwordEncoder.encode(volunteer.getPassword()));
        return volunteerRepository.save(volunteer);
    }

    @Override
    public List<Volunteer> getAllVolunteers() {
        return volunteerRepository.findAll();
    }

    @Override
    public Volunteer updateVolunteer(Long id, Volunteer volunteer) {
        return volunteerRepository.findById(id)
                .map(v -> {
                    v.setFirstname(volunteer.getFirstname());
                    v.setLastname(volunteer.getLastname());
                    v.setEmail(volunteer.getEmail());
                    if (volunteer.getPassword() != null && !volunteer.getPassword().isEmpty()) {
                        v.setPassword(passwordEncoder.encode(volunteer.getPassword()));
                    }
                    v.setLocation(volunteer.getLocation());
                    v.setCreated_at(volunteer.getCreated_at());
                    v.setUpdated_at(volunteer.getUpdated_at());
                    return volunteerRepository.save(v);
                }).orElseThrow(() -> new RuntimeException("Volunteer not found with id " + id));
    }

    @Override
    public String deleteVolunteer(Long id) {
        volunteerRepository.deleteById(id);
        return "Volunteer with id " + id + " has been deleted successfully.";
    }
    @Override
    public Volunteer getVolunteerById(Long id) {
        return volunteerRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Volunteer not found with id " + id));
    }
}
