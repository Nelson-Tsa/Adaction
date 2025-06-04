import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AddButtonComponent } from '../requete/add-button/add-button.component';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { DeleteButtonComponent } from '../requete/delete-button/delete-button.component';
import { DatePipe } from '@angular/common';
import { UpdateButtonComponent } from "../requete/update-button/update-button.component";


@Component({
  selector: 'app-collect-list',
  standalone: true,
  imports: [
    CommonModule,
    AddButtonComponent,
    DeleteButtonComponent,
    DatePipe,
    UpdateButtonComponent
],
  templateUrl: './collect-list.component.html',
  styleUrl: './collect-list.component.css'
})
export class CollectListComponent {
  collects: any[] = [];
  isHomePage: boolean = false;
  
  constructor(private apiService: ApiService, private router: Router, private dialogService: DialogService) { 
    // Déterminer si on est sur la page home ou non
    this.isHomePage = (this.router.url === '/home');
  }

  ngOnInit(): void {
    this.apiService.getCollects().subscribe((collects) => {
      this.collects = collects;
      console.log(collects);
    });
  }

  openAddDialog() {
    this.dialogService.openEntityForm('collect').subscribe(result => {
      if (result) {
        // Rafraîchir la liste après l'ajout
        this.ngOnInit();
      }
    });
  }

  onDeleteClicked(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette collecte ?')) {
      this.apiService.delete('collects', id).subscribe({
        next: () => {
          console.log('Collecte supprimée avec succès');
          // Recharger la liste des collectes
          this.loadCollects();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la collecte:', error);
        }
      });
    }
  }

  onUpdateClicked(id: number): void {
    this.apiService.getCollect(id).subscribe({
      next: (collect) => {
        this.dialogService.openEntityForm('collect', collect).subscribe(result => {
          if (result) {
            // Mettre à jour la collecte avec les nouvelles données
            this.apiService.put('collects', id, result).subscribe({
              next: () => {
                console.log('Collecte mise à jour avec succès');
                // Rafraîchir la liste après la modification
                this.loadCollects();
              },
              error: (error) => {
                console.error('Erreur lors de la mise à jour de la collecte:', error);
              }
            });
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la collecte:', error);
      }
    });
  }

  loadCollects(): void {
    this.apiService.getCollects().subscribe((collects) => {
      this.collects = collects;
    });
  }
}
