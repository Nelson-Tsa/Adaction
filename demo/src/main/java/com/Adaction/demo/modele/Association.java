package com.Adaction.demo.modele;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "association")
@Getter
@Setter 
@NoArgsConstructor
@AllArgsConstructor
public class Association {
 @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String name;
       
    @Column(nullable = false, length = 1000)
    private String description;
    
    private Integer points;

    private String image;
    
}
