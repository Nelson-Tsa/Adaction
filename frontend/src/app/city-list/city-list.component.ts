import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from '../requete/add-button/add-button.component';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { DeleteButtonComponent } from '../requete/delete-button/delete-button.component';
import { UpdateButtonComponent } from '../requete/update-button/update-button.component';
@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [
    CommonModule,
    AddButtonComponent,
    DeleteButtonComponent,
    UpdateButtonComponent
  ],
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.css'
})
export class CityListComponent implements OnInit {

  cities: any[] = [];
  isHomePage: boolean = false;
  
  constructor(private apiService: ApiService, private router: Router, private dialogService: DialogService) { 
    // Déterminer si on est sur la page home ou non
    this.isHomePage = (this.router.url === '/home');
  }

  ngOnInit(): void {
    this.apiService.getCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  loadCities(): void {
    this.apiService.getCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  onDeleteClicked(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ville ?')) {
      this.apiService.delete('cities', id).subscribe({
        next: () => {
          console.log('Ville supprimée avec succès');
          // Recharger la liste des villes
          this.loadCities();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression de la ville:', error);
        }
      });
    }
  }

  openAddDialog() {
    this.dialogService.openEntityForm('city').subscribe(result => {
      if (result) {
        // Rafraîchir la liste après l'ajout
        this.ngOnInit();
      }
    });
  }

  onUpdateClicked(id: number): void {
    this.apiService.getCity(id).subscribe({
      next: (city) => {
        this.dialogService.openEntityForm('city', city).subscribe(result => {
          if (result) {
            // Mettre à jour l'association avec les nouvelles données
            this.apiService.put('cities', id, result).subscribe({
              next: () => {
                console.log('Ville mise à jour avec succès');
                // Rafraîchir la liste après la modification
                this.loadCities();
              },
              error: (error) => {
                console.error('Erreur lors de la mise à jour de la ville:', error);
              }
            });
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la ville:', error);
      }
    });
  }
}
