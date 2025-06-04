import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Import pour la localisation française
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';  

// Enregistrement des données de localisation française
registerLocaleData(localeFr);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
