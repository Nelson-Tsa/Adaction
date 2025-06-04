package com.Adaction.demo.modele;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "donnation")
@Getter
@Setter 
@NoArgsConstructor
@AllArgsConstructor
public class Donnation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private LocalDate date;

    // IDs pour les opérations CRUD
    @Column(name = "volunteer_id", nullable = false)
    private Long volunteerId;
    
    @Column(name = "association_id", nullable = false)
    private Long associationId;
    
    private Integer amount;
    
    // Relations pour les requêtes JOIN mais sans impact sur INSERT/UPDATE
    @ManyToOne
    @JoinColumn(name = "volunteer_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Volunteer volunteer;
    
    @ManyToOne
    @JoinColumn(name = "association_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Association association;
}
