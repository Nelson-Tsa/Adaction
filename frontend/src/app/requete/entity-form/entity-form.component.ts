import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { City } from '../../models/city.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-entity-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.css']
})
export class EntityFormComponent implements OnInit {
  title: string = '';
  entityForm!: FormGroup;
  fields: any[] = [];
  entityType: string = '';
  
  // Propriétés pour l'autocomplétion des villes
  cityControl = new FormControl('');
  suggestions: City[] = [];
  selectedCity: { name: string, lat: number, lon: number } | null = null;
  showCitySuggestions: boolean = false;
  
  // Listes pour les menus déroulants
  cities: any[] = []
  volunteers: any[] = []
  collects: any[] = []
  wasteTypes: any[] = [];
  associations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EntityFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.entityType = data.entityType || '';
    this.configureForm();
    
    // Si des données d'entité existantes sont fournies, pré-remplir le formulaire
    if (data.entity) {
      setTimeout(() => {
        this.populateFormWithEntityData(data.entity);
      }, 0);
    }
  }

  ngOnInit(): void {
    // Gestion de l'autocomplétion des villes si c'est le formulaire de city
    if (this.entityType === 'city') {
      this.configureCityAutocomplete();
    }
    
    // Charger les données nécessaires selon le type de formulaire
    if (this.entityType === 'donation') {
      this.loadAssociations();
    }
    
    if (this.entityType === 'collect') {
      this.loadCitiesAndVolunteers();
    }
    
    if (this.entityType === 'wasteCollected') {
      this.loadCollectsAndWasteTypes();
    }
  }
  
  // Charger les listes de villes et volontaires pour le formulaire de collecte
  loadCitiesAndVolunteers(): void {
    this.apiService.getCities().subscribe(cities => {
      this.cities = cities;
    });
    
    this.apiService.getVolunteers().subscribe(volunteers => {
      this.volunteers = volunteers;
    });
  }
  
  // Charger les listes d'associations et de volontaires pour le formulaire de don
  loadAssociations(): void {
    this.apiService.getAssociations().subscribe(associations => {
      this.associations = associations;
    });
    
    this.apiService.getVolunteers().subscribe(volunteers => {
      this.volunteers = volunteers;
    });
  }
  
  // Charger les listes de collectes et types de déchets pour le formulaire de déchets collectés
  loadCollectsAndWasteTypes(): void {
    this.apiService.getCollects().subscribe(collects => {
      this.collects = collects;
    });
    
    this.apiService.getWasteTypes().subscribe(wasteTypes => {
      this.wasteTypes = wasteTypes;
    });
  }
  
  // Méthode pour configurer l'autocomplétion des villes
  configureCityAutocomplete(): void {
    this.cityControl.valueChanges.pipe(
      debounceTime(300), // Attendre 300ms pour éviter trop de requêtes
      distinctUntilChanged(), // Ignorer si la valeur n'a pas changé
      switchMap(value => this.searchCities(value || '')),
      catchError(() => of([]))
    ).subscribe(results => {
      this.suggestions = results;
      this.showCitySuggestions = results.length > 0;
    });
  }
  
  // Requête à l'API Nominatim pour rechercher des villes
  searchCities(query: string): Observable<City[]> {
    if (query.length < 2) {
      return of([]);
    }
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5&countrycodes=fr`;
    return this.http.get<City[]>(url);
  }
  
  // Sélection d'une ville dans les suggestions
  selectCity(city: City): void {
    // Déterminer le nom de la ville (city, town ou village selon ce qui est disponible)
    const cityName = city.address.city || city.address.town || city.address.village || '';
    
    this.selectedCity = {
      name: cityName,
      lat: parseFloat(city.lat),
      lon: parseFloat(city.lon)
    };
    
    // Mettre à jour le champ de saisie avec le nom de la ville
    this.cityControl.setValue(cityName);
    
    // Mettre à jour les valeurs dans le formulaire principal
    this.entityForm.patchValue({
      name: cityName,
      latitude: this.selectedCity.lat,
      longitude: this.selectedCity.lon
    });
    
    // Cacher les suggestions
    this.showCitySuggestions = false;
  }

  configureForm() {
    // Configuration du formulaire en fonction du type d'entité
    const formControls: any = {};
    
    switch (this.entityType) {
      case 'association':
        this.title = 'Ajouter une association';
        this.fields = [
          { name: 'name', label: 'Nom', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'text', required: true },
          { name: 'image', label: 'URL de l\'image', type: 'text', required: false }
        ];
        break;
        
      case 'volunteer':
        this.title = 'Ajouter un volontaire';
        this.fields = [
          { name: 'firstname', label: 'Prénom', type: 'text', required: true },
          { name: 'lastname', label: 'Nom', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'text', required: true },
          { name: 'password', label: 'Mot de passe', type: 'text', required: true },
          { name: 'location', label: 'Localisation', type: 'text', required: true }
        ];
        break;
        
      case 'city':
        this.title = 'Ajouter une ville';
        this.fields = [
          { name: 'name', label: 'Nom', type: 'text', required: true },
          { name: 'latitude', label: 'Latitude', type: 'number', required: true },
          { name: 'longitude', label: 'Longitude', type: 'number', required: true }
        ];
        break;
        
      case 'donation':
        this.title = 'Ajouter un don';
        this.fields = [
          { name: 'date', label: 'Date', type: 'date', required: true },
          { name: 'volunteerId', label: 'Volontaire', type: 'select', required: true, options: 'volunteers' },
          { name: 'associationId', label: 'Association', type: 'select', required: true, options: 'associations' },
          { name: 'amount', label: 'Montant', type: 'number', required: true }
        ];
        break;
        
      case 'collect':
        this.title = 'Ajouter une collecte';
        this.fields = [
          { name: 'date', label: 'Date', type: 'date', required: true },
          { name: 'cityId', label: 'Ville', type: 'select', required: true, options: 'cities' },
          { name: 'volunteerId', label: 'Volontaire', type: 'select', required: true, options: 'volunteers' }
        ];
        break;
        
      case 'wasteType':
        this.title = 'Ajouter un type de déchet';
        this.fields = [
          { name: 'label', label: 'Libellé', type: 'text', required: true },
          { name: 'value', label: 'Valeur', type: 'text', required: true },
          { name: 'className', label: 'Nom de la classe', type: 'text', required: true },
          { name: 'points', label: 'Points', type: 'number', required: true }
        ];
        break;
        
      case 'wasteCollected':
        this.title = 'Ajouter un déchet collecté';
        this.fields = [
          { name: 'collectId', label: 'Collecte', type: 'select', required: true, options: 'collects' },
          { name: 'wasteTypeId', label: 'Type de déchet', type: 'select', required: true, options: 'wasteTypes' },
          { name: 'quantity', label: 'Quantité', type: 'number', required: true }
        ];
        break;
        
      default:
        this.title = 'Ajouter';
        this.fields = [];
    }
    
    // Générer dynamiquement les contrôles du formulaire
    this.fields.forEach(field => {
      formControls[field.name] = ['', field.required ? Validators.required : null];
    });
    
    this.entityForm = this.fb.group(formControls);
  }

  onSubmit() {
    if (this.entityForm.valid) {
      const formData = this.entityForm.value;
      
      // Appel API correspondant au type d'entité
      let apiCall;
      const isEditMode = !!this.data.entity; // Vérifier si on est en mode édition
      const entityId = isEditMode ? this.data.entity.id : null;
      
      switch (this.entityType) {
        case 'association':
          apiCall = isEditMode ? 
            this.apiService.put('associations', entityId, formData) : 
            this.apiService.post('associations', formData);
          break;
        case 'volunteer':
          apiCall = isEditMode ? 
            this.apiService.put('volunteers', entityId, formData) : 
            this.apiService.post('volunteers', formData);
          break;
        case 'city':
          apiCall = isEditMode ? 
            this.apiService.put('cities', entityId, formData) : 
            this.apiService.post('cities', formData);
          break;
        case 'donation':
          apiCall = isEditMode ? 
            this.apiService.put('donnations', entityId, formData) : 
            this.apiService.post('donnations', formData);
          break;
        case 'collect':
          apiCall = isEditMode ? 
            this.apiService.put('collects', entityId, formData) : 
            this.apiService.post('collects', formData);
          break;
        case 'wasteType':
          apiCall = isEditMode ? 
            this.apiService.put('wasteTypes', entityId, formData) : 
            this.apiService.post('wasteTypes', formData);
          break;
        case 'wasteCollected':
          apiCall = isEditMode ? 
            this.apiService.put('waste-collected', entityId, formData) : 
            this.apiService.post('waste-collected', formData);
          break;
      }
      
      if (apiCall) {
        apiCall.subscribe({
          next: (response) => {
            const message = isEditMode ? 'Entité mise à jour avec succès:' : 'Entité créée avec succès:';
            console.log(message, response);
            this.dialogRef.close(response);
          },
          error: (error) => {
            const errorType = isEditMode ? 'la mise à jour' : 'la création';
            console.error(`Erreur lors de ${errorType}:`, error);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // Méthode pour pré-remplir le formulaire avec les données d'une entité existante
  populateFormWithEntityData(entity: any): void {
    // Ajuster le titre pour indiquer la modification
    this.title = this.title.replace('Ajouter', 'Modifier');
    
    // En fonction du type d'entité, adapter les données pour le formulaire
    const formData: any = {};
    
    switch (this.entityType) {
      case 'association':
        // Copier directement les champs
        this.fields.forEach(field => {
          formData[field.name] = entity[field.name];
        });
        break;
        
      case 'volunteer':
        // Copier directement les champs
        this.fields.forEach(field => {
          formData[field.name] = entity[field.name];
        });
        break;
        
      case 'city':
        // Copier directement les champs
        this.fields.forEach(field => {
          formData[field.name] = entity[field.name];
        });
        break;
        
      case 'donation':
        // Pour les relations, on doit extraire les IDs
        formData.date = entity.date;
        formData.amount = entity.amount;
        formData.volunteerId = entity.volunteerId || (entity.volunteer ? entity.volunteer.id : null);
        formData.associationId = entity.associationId || (entity.association ? entity.association.id : null);
        break;
        
      case 'collect':
        formData.date = entity.createdAt;
        formData.cityId = entity.cityId || (entity.city ? entity.city.id : null);
        formData.volunteerId = entity.volunteerId || (entity.volunteer ? entity.volunteer.id : null);
        break;
        
      case 'wasteType':
        this.fields.forEach(field => {
          formData[field.name] = entity[field.name];
        });
        break;
        
      case 'wasteCollected':
        formData.quantity = entity.quantity;
        formData.collectId = entity.collectId || (entity.collect ? entity.collect.id : null);
        formData.wasteTypeId = entity.wasteTypeId || (entity.wasteType ? entity.wasteType.id : null);
        break;
    }
    
    // Mettre à jour le formulaire avec les données
    this.entityForm.patchValue(formData);
  }
}