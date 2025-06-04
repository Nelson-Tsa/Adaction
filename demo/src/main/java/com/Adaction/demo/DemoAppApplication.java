package com.Adaction.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoAppApplication.class, args);
	}

	// @Bean
	// CommandLineRunner run(UserRepository userRepository, PasswordEncoder
	// passwordEncoder) {
	// return args -> {
	// if (userRepository.findByEmail("admin@gmail.com") == null) {
	// User admin = new User();
	// admin.setUsername("Admin");
	// admin.setEmail("admin@admin.com");
	// admin.setPassword(passwordEncoder.encode("admin123"));
	// admin.setRole(UserRole.ADMIN);
	// userRepository.save(admin);
	// }
	// };
	// }
}
