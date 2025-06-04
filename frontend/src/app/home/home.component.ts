import { Component } from '@angular/core';
import { DonnationListComponent } from '../donnation-list/donnation-list.component';
import { AssociationListComponent } from '../association-list/association-list.component';
import { CityListComponent } from '../city-list/city-list.component';
import { CollectListComponent } from '../collect-list/collect-list.component';
import { VolunteerListComponent } from '../volunteer-list/volunteer-list.component';
import { WasteCollectedListComponent } from '../waste-collected-list/waste-collected-list.component';
import { WasteTypeListComponent } from '../waste-type-list/waste-type-list.component';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AssociationListComponent,
    CityListComponent,
    CollectListComponent,
    VolunteerListComponent,
    WasteCollectedListComponent,
    WasteTypeListComponent,
    DonnationListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private apiService: ApiService) {}
}
