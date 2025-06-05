import { UpdateButtonComponent } from '../requete/update-button/update-button.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AddButtonComponent } from '../requete/add-button/add-button.component';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { DeleteButtonComponent } from '../requete/delete-button/delete-button.component';
import { DatePipe } from '@angular/common';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-donnation-list',
  standalone: true,
  imports: [
    CommonModule,
    AddButtonComponent,
    DeleteButtonComponent,
    DatePipe,
    UpdateButtonComponent

  ],
  providers: [],
  templateUrl: './donnation-list.component.html',
  styleUrl: './donnation-list.component.css'
})
export class DonnationListComponent implements OnInit {
    donnations: any[] = [];
  isHomePage: boolean = false;
  
  constructor(public authService: AuthService,private apiService: ApiService, private router: Router, private dialogService: DialogService) { 
    // Déterminer si on est sur la page home ou non
    this.isHomePage = (this.router.url === '/home');
  }

    ngOnInit(): void {
      this.apiService.getDonnations().subscribe((donnations) => {
        this.donnations = donnations;
        console.log(donnations);
      });
    }

   
    openAddDialog() {
    this.dialogService.openEntityForm('donation').subscribe(result => {
      if (result) {
        // Rafraîchir la liste après ajout réussi
        this.ngOnInit();
      }
    });
    }

    onDeleteClicked(id: number): void {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce don ?')) {
        this.apiService.delete('donnations', id).subscribe({
          next: () => {
            console.log('Don supprimé avec succès');
            // Recharger la liste des dons
            this.loadDonations();
          },
          error: (error) => {
            console.error('Erreur lors de la suppression du don:', error);
          }
        });
      }
    }

    loadDonations(): void {
      this.apiService.getDonnations().subscribe((donnations) => {
        this.donnations = donnations;
      });
    }

    onUpdateClicked(id: number): void {
      this.apiService.getDonnation(id).subscribe({
        next: (donnation) => {
          console.log('Données du don récupérées:', donnation);
          this.dialogService.openEntityForm('donation', donnation).subscribe(result => {
            if (result) {
              // Mettre à jour le don avec les nouvelles données
              this.apiService.put('donnations', id, result).subscribe({
                next: () => {
                  console.log('Don mise à jour avec succès');
                  // Rafraîchir la liste après la modification
                  this.loadDonations();
                },
                error: (error) => {
                  console.error('Erreur lors de la mise à jour du don:', error);
                }
              });
            }
          });
        },
        error: (error) => {
          console.error('Erreur lors de la récupération du don:', error);
        }
      });
    }
}
