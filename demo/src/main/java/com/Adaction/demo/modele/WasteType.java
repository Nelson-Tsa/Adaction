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
@Table(name = "waste_type")
@Getter
@Setter 
@NoArgsConstructor
@AllArgsConstructor
public class WasteType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String value;
    
    @Column(nullable = false)
    private String label;
    
    @Column(name = "class_name")
    private String className;
    
    private Integer points;
}
