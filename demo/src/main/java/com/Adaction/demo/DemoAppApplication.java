package com.Adaction.demo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.Adaction.demo.modele.Admin;
import com.Adaction.demo.modele.Role;
import com.Adaction.demo.repository.AdminRepository;

@SpringBootApplication
public class DemoAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoAppApplication.class, args);
	}

	@Configuration
	public class AdminInitializer {

		@Bean
		CommandLineRunner initAdmin(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
			return args -> {
				if (adminRepository.findByEmail("admin@adaction.com").isEmpty()) {
					Admin admin = new Admin();
					admin.setName("Super Admin");
					admin.setEmail("admin@adaction.com");
					admin.setPassword(passwordEncoder.encode("admin123"));
					admin.setRole(Role.ADMIN);

					adminRepository.save(admin);
					System.out.println("Admin créé : admin@adaction.com / admin123");
				}
			};
		}
	}
}
