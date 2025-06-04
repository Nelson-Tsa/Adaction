package com.Adaction.demo.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.Adaction.demo.modele.Volunteer;
import com.Adaction.demo.service.VolunteerService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/volunteers")
@AllArgsConstructor
public class VolunteerController {

    private final VolunteerService volunteerService;

    @GetMapping("/read")
    public List<Volunteer> getAllVolunteers() {
        return volunteerService.getAllVolunteers();
    }
    @GetMapping("/read/{id}")
    public Volunteer getVolunteerById(@PathVariable Long id) {
        return volunteerService.getVolunteerById(id);
    }
    @PostMapping("/create")
    public Volunteer createVolunteer(@RequestBody Volunteer volunteer) {
        return volunteerService.createVolunteer(volunteer);
    }
    @PutMapping("/update/{id}")
    public Volunteer updateVolunteer(@PathVariable Long id, @RequestBody Volunteer volunteer) {
        return volunteerService.updateVolunteer(id, volunteer);
    }
    @DeleteMapping("/delete/{id}")
    public Map<String, String> deleteVolunteer(@PathVariable Long id) {
          String result = volunteerService.deleteVolunteer(id);
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        return response;
    }
}
