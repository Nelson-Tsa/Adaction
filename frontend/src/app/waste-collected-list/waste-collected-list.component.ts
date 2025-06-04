import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AddButtonComponent } from '../requete/add-button/add-button.component';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { DeleteButtonComponent } from "../requete/delete-button/delete-button.component";
import { UpdateButtonComponent } from '../requete/update-button/update-button.component';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-waste-collected-list',
  standalone: true,
  imports: [
    CommonModule,
    AddButtonComponent,
    DeleteButtonComponent,
    UpdateButtonComponent
],
  templateUrl: './waste-collected-list.component.html',
  styleUrl: './waste-collected-list.component.css'
})
export class WasteCollectedListComponent {
    wasteCollecteds: any[] = [];
    isHomePage: boolean = false;
  
    constructor(
      public authService: AuthService,
      private apiService: ApiService, 
      private router: Router,
      private dialogService: DialogService
    ) { 
      // Déterminer si on est sur la page home ou non
      this.isHomePage = (this.router.url === '/home');
    }

    ngOnInit(): void {
      this.apiService.getWasteCollecteds().subscribe({
        next: (wasteCollecteds) => {
          this.wasteCollecteds = wasteCollecteds;
          console.log(wasteCollecteds); // Pour déboguer
        },
        error: (error) => {
          console.error('Erreur lors de la récupération des collectes de déchets:', error);
        }
      });
    }

    openAddDialog() {
      this.dialogService.openEntityForm('wasteCollected').subscribe(result => {
        if (result) {
          // Rafraîchir la liste après ajout réussi
          this.ngOnInit();
        }
      });
    }

    onDeleteClicked(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce collecte de déchets ?')) {
        this.apiService.delete('waste-collected', id).subscribe({
          next: () => {
            console.log('Collecte de déchets supprimée avec succès');
            // Recharger la liste des collectes de déchets
            this.loadWasteCollecteds();
          },
          error: (error) => {
            console.error('Erreur lors de la suppression de la collecte de déchets:', error);
          }
        });
      }
    }

    onUpdateClicked(id: number): void {
      this.apiService.getWasteCollected(id).subscribe({
        next: (wasteCollected) => {
          this.dialogService.openEntityForm('wasteCollected', wasteCollected).subscribe(result => {
            if (result) {
              // Mettre à jour le collecte de déchets avec les nouvelles données
              this.apiService.put('waste-collected', id, result).subscribe({
                next: () => {
                  console.log('Collecte de déchets mise à jour avec succès');
                  // Rafraîchir la liste après la modification
                  this.loadWasteCollecteds();
                },
                error: (error) => {
                  console.error('Erreur lors de la mise à jour du collecte de déchets:', error);
                }
              });
            }
          });
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du collecte de déchets:', error);
        }
      });
    }
    loadWasteCollecteds(): void {
      this.apiService.getWasteCollecteds().subscribe((wasteCollecteds) => {
        this.wasteCollecteds = wasteCollecteds;
      });
    }
}

