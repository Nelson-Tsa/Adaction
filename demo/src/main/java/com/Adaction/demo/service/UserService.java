package com.Adaction.demo.service;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.Adaction.demo.modele.User;
import com.Adaction.demo.modele.Volunteer;
import com.Adaction.demo.repository.UserRepository;
import com.Adaction.demo.repository.VolunteerRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

  private final UserRepository userRepository;
  private final VolunteerRepository volunteerRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email);
    if (user != null) {
      return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
          Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())));
    }

    Volunteer volunteer = volunteerRepository.findByEmail(email);
    if (volunteer != null) {
      return new org.springframework.security.core.userdetails.User(volunteer.getEmail(), volunteer.getPassword(),
          Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + volunteer.getRole().name())));
    }

    throw new UsernameNotFoundException("User or Volunteer not found with email : " + email);
  }
}
