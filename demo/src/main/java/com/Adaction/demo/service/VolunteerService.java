package com.Adaction.demo.service;

import com.Adaction.demo.modele.Volunteer;
import java.util.List;
public interface VolunteerService {

    Volunteer createVolunteer(Volunteer volunteer);

    List<Volunteer> getAllVolunteers();
    Volunteer getVolunteerById(Long id);

    Volunteer updateVolunteer(Long id, Volunteer volunteer);

    String deleteVolunteer(Long id);
}
