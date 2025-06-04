import { Routes } from '@angular/router';
import { AssociationListComponent } from './association-list/association-list.component';
import { VolunteerListComponent } from './volunteer-list/volunteer-list.component';
import { CityListComponent } from './city-list/city-list.component';
import { CollectListComponent } from './collect-list/collect-list.component';
import { WasteTypeListComponent } from './waste-type-list/waste-type-list.component';
import { WasteCollectedListComponent } from './waste-collected-list/waste-collected-list.component';
import { DonnationListComponent } from './donnation-list/donnation-list.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'association-list',
    pathMatch: 'full',
  },
  {
    path: 'association-list',
    component: AssociationListComponent,
  },
  {
    path: 'volunteer-list',
    component: VolunteerListComponent,
  },
  {
    path: 'city-list',
    component: CityListComponent,
  },
  {
    path: 'collect-list',
    component: CollectListComponent,
  },
  {
    path: 'waste-type-list',
    component: WasteTypeListComponent,
  },
  {
    path: 'waste-collected-list',
    component: WasteCollectedListComponent,
  },
  {
    path: 'donnation-list',
    component: DonnationListComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
];
