package com.Adaction.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        // Autoriser plusieurs origines
        config.addAllowedOrigin("http://localhost:4200"); // URL de dev local sans slash
        config.addAllowedOrigin("https://adactionapp.vercel.app"); // URL de Vercel sans slash
        config.addAllowedOrigin("https://adaction-frontend.onrender.com"); // URL de Render
        // Ajouter les versions avec www. si nécessaire
        config.addAllowedOrigin("https://www.adactionapp.vercel.app"); // Version avec www
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}
