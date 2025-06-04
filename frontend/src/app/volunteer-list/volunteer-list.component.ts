import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { AddButtonComponent } from '../requete/add-button/add-button.component';
import { Router } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { DeleteButtonComponent } from "../requete/delete-button/delete-button.component";
import { UpdateButtonComponent } from '../requete/update-button/update-button.component';

@Component({
  selector: 'app-volunteer-list',
  standalone: true,
  imports: [
    CommonModule,
    AddButtonComponent,
    DeleteButtonComponent,
    UpdateButtonComponent
],
  templateUrl: './volunteer-list.component.html',
  styleUrl: './volunteer-list.component.css'
})
export class VolunteerListComponent implements OnInit {

  volunteers: any[] = [];
  isHomePage: boolean = false;
  
  constructor(private apiService: ApiService, private router: Router, private dialogService: DialogService) { 
    // Déterminer si on est sur la page home ou non
    this.isHomePage = (this.router.url === '/home');
  }

  ngOnInit(): void {
    this.apiService.getVolunteers().subscribe({
      next: (volunteers) => {
        this.volunteers = volunteers;
        console.log(volunteers); // Pour déboguer
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des volontaires:', error);
      }
    });
  }

  openAddDialog() {
    this.dialogService.openEntityForm('volunteer').subscribe(result => {
      if (result) {
        // Rafraîchir la liste après l'ajout
        this.ngOnInit();
      }
    });
  }

  loadVolunteers(): void {
    this.apiService.getVolunteers().subscribe((volunteers) => {
      this.volunteers = volunteers;
    });
  }

  onDeleteClicked(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce volontaire ?')) {
      this.apiService.delete('volunteers', id).subscribe({
        next: () => {
          console.log('Volontaire supprimé avec succès');
          // Recharger la liste des volontaires
          this.loadVolunteers();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du volontaire:', error);
        }
      });
    }
  }

  onUpdateClicked(id: number): void {
    this.apiService.getVolunteer(id).subscribe({
      next: (volunteer) => {
        this.dialogService.openEntityForm('volunteer', volunteer).subscribe(result => {
          if (result) {
            // Mettre à jour le volontaire avec les nouvelles données
            this.apiService.put('volunteers', id, result).subscribe({
              next: () => {
                console.log('Volontaire mise à jour avec succès');
                // Rafraîchir la liste après la modification
                this.loadVolunteers();
              },
              error: (error) => {
                console.error('Erreur lors de la mise à jour du volontaire:', error);
              }
            });
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du volontaire:', error);
      }
    });
  }
}
