package com.Adaction.demo.modele;

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
@Table(name = "waste_collected")
@Getter
@Setter 
@NoArgsConstructor
@AllArgsConstructor
public class WasteCollected {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Garder uniquement l'ID pour les opérations CRUD
    @Column(name = "collect_id", nullable = false)
    private Long collectId;
    
    @Column(name = "waste_type_id", nullable = false)
    private Long wasteTypeId;
    
    // Relations pour maintenir les contraintes de clé étrangère et permettre les requêtes JOIN
    // insertable=false, updatable=false signifie que ces objets ne seront pas utilisés pour les opérations INSERT/UPDATE
    @ManyToOne
    @JoinColumn(name = "collect_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Collect collect;
    
    @ManyToOne
    @JoinColumn(name = "waste_type_id", referencedColumnName = "id", insertable = false, updatable = false)
    private WasteType wasteType;

    private Integer quantity;
}
