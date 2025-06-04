package com.Adaction.demo.modele;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "collect")
@Getter
@Setter 
@NoArgsConstructor
@AllArgsConstructor
public class Collect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // IDs pour les opérations CRUD
    @Column(name = "city_id", nullable = false)
    private Long cityId;
    
    @Column(name = "volunteer_id", nullable = false)
    private Long volunteerId;
    
    // Relations pour les requêtes JOIN mais sans impact sur INSERT/UPDATE
    @ManyToOne
    @JoinColumn(name = "city_id", referencedColumnName = "id", insertable = false, updatable = false)
    private City city;

    @ManyToOne
    @JoinColumn(name = "volunteer_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Volunteer volunteer;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDate createdAt;
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDate updatedAt;
}
