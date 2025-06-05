import { UpdateButtonComponent } from '../requete/update-button/update-button.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AddButtonComponent } from '../requete/add-button/add-button.component';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { DeleteButtonComponent } from "../requete/delete-button/delete-button.component";

import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-waste-type-list',
  standalone: true,
  imports: [
    CommonModule,
    AddButtonComponent,
    DeleteButtonComponent,
    UpdateButtonComponent
],
  templateUrl: './waste-type-list.component.html',
  styleUrl: './waste-type-list.component.css'
})
export class WasteTypeListComponent implements OnInit {
    wasteTypes: any[] = [];
    isHomePage: boolean = false;
  
    constructor(public authService: AuthService,private apiService: ApiService, private router: Router, private dialogService: DialogService) { 
      // Déterminer si on est sur la page home ou non
      this.isHomePage = (this.router.url === '/home');
    }

    ngOnInit(): void {
      this.apiService.getWasteTypes().subscribe({
        next: (wasteTypes) => {
          this.wasteTypes = wasteTypes;
          console.log(wasteTypes); // Pour déboguer
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des types de déchets:', error);
        }
      });
    }

    openAddDialog() {
      this.dialogService.openEntityForm('wasteType').subscribe(result => {
        if (result) {
          // Rafraîchir la liste après l'ajout
          this.ngOnInit();
        }
      });
    }

    onDeleteClicked(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce type de déchets ?')) {
        this.apiService.delete('wasteTypes', id).subscribe({
          next: () => {
            console.log('Type de déchets supprimé avec succès');
            // Recharger la liste des types de déchets
            this.loadWasteTypes();
          },
          error: (error) => {
            console.error('Erreur lors de la suppression du type de déchets:', error);
          }
        });
      }
    }

    loadWasteTypes(): void {
      this.apiService.getWasteTypes().subscribe((wasteTypes) => {
        this.wasteTypes = wasteTypes;
      });
    }
    onUpdateClicked(id: number): void {
      this.apiService.getWasteType(id).subscribe({
        next: (wasteType) => {
          this.dialogService.openEntityForm('wasteType', wasteType).subscribe(result => {
            if (result) {
              // Mettre à jour le type de déchets avec les nouvelles données
              this.apiService.put('waste-types', id, result).subscribe({
                next: () => {
                  console.log('Type de déchets mise à jour avec succès');
                  // Rafraîchir la liste après la modification
                  this.loadWasteTypes();
                },
                error: (error) => {
                  console.error('Erreur lors de la mise à jour du type de déchets:', error);
                }
              });
            }
          });
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du type de déchets:', error);
        }
      });
    }
}
