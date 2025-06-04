import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { Router} from '@angular/router';
import { AddButtonComponent } from '../requete/add-button/add-button.component';
import { DialogService } from '../services/dialog.service';
import { DeleteButtonComponent } from '../requete/delete-button/delete-button.component';
import { UpdateButtonComponent } from '../requete/update-button/update-button.component';

@Component({
  selector: 'app-association-list',
  standalone: true,
  imports: [
    CommonModule,
    AddButtonComponent,
    DeleteButtonComponent,
    UpdateButtonComponent
  ],
  templateUrl: './association-list.component.html',
  styleUrl: './association-list.component.css'
})
export class AssociationListComponent implements OnInit {
  associations: any[] = [];
  isHomePage: boolean = false;
  
  constructor(private apiService: ApiService, private router: Router, private dialogService: DialogService) { 
    // Déterminer si on est sur la page home ou non
    this.isHomePage = (this.router.url === '/home');
  }

  ngOnInit(): void {
    this.loadAssociations();
  }
  
  // Charger la liste des associations
  loadAssociations(): void {
    this.apiService.getAssociations().subscribe({
      next: (associations) => {
        this.associations = associations;
        console.log('Associations chargées:', associations);
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des associations:', error);
      }
    });
  }
  
  // Gérer la suppression d'une association
  onDeleteClicked(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette association ?')) {
      this.apiService.delete('associations', id).subscribe({
        next: () => {
          console.log('Association supprimée avec succès');
          // Recharger la liste des associations
          this.loadAssociations();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de l\'association:', error);
        }
      });
    }
  }

  openAddDialog() {
    this.dialogService.openEntityForm('association').subscribe(result => {
      if (result) {
        // Rafraîchir la liste après l'ajout
        this.ngOnInit();
      }
    });
  }

  onUpdateClicked(id: number): void {
    this.apiService.getAssociation(id).subscribe({
      next: (association) => {
        this.dialogService.openEntityForm('association', association).subscribe(result => {
          if (result) {
            // Mettre à jour l'association avec les nouvelles données
            this.apiService.put('associations', id, result).subscribe({
              next: () => {
                console.log('Association mise à jour avec succès');
                // Rafraîchir la liste après la modification
                this.loadAssociations();
              },
              error: (error) => {
                console.error('Erreur lors de la mise à jour de l\'association:', error);
              }
            });
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'association:', error);
      }
    });
  }
}
