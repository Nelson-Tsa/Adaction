const fs = require('fs');
const path = require('path');

// Chemin vers le module Angular
const modulePath = path.join(__dirname, 'frontend/src/app/app.module.ts');

// Fonction pour corriger le module
function fixAppModule() {
  if (!fs.existsSync(modulePath)) {
    console.log(`Module non trouvé: ${modulePath}`);
    return;
  }

  // Lire le contenu actuel du module
  let content = fs.readFileSync(modulePath, 'utf8');

  // Modifier le contenu pour importer UpdateButtonComponent au lieu de le déclarer
  const correctedContent = `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpdateButtonComponent } from './requete/update-button/update-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    UpdateButtonComponent // Importé comme composant standalone
  ],
  exports: []
})
export class AppModule { }
`;

  // Écrire le contenu corrigé
  fs.writeFileSync(modulePath, correctedContent);
  console.log('Module corrigé avec succès!');
}

// Fonction pour corriger les références à UpdateButtonComponent dans les autres composants
function fixComponentReferences() {
  const componentsToFix = [
    'frontend/src/app/association-list/association-list.component.ts',
    'frontend/src/app/city-list/city-list.component.ts',
    'frontend/src/app/collect-list/collect-list.component.ts', 
    'frontend/src/app/donnation-list/donnation-list.component.ts',
    'frontend/src/app/volunteer-list/volunteer-list.component.ts',
    'frontend/src/app/waste-collected-list/waste-collected-list.component.ts',
    'frontend/src/app/waste-type-list/waste-type-list.component.ts'
  ];

  componentsToFix.forEach(componentPath => {
    const fullPath = path.join(__dirname, componentPath);
    
    if (!fs.existsSync(fullPath)) {
      console.log(`Composant non trouvé: ${fullPath}`);
      return;
    }

    let content = fs.readFileSync(fullPath, 'utf8');

    // Remplacer l'import d'AppModule par un import direct d'UpdateButtonComponent
    content = content.replace(
      /import\s*{\s*AppModule\s*}\s*from\s*['"]\.\.\/app\.module['"]\s*;?/,
      `import { UpdateButtonComponent } from '../requete/update-button/update-button.component';`
    );

    // Remplacer AppModule dans les imports par UpdateButtonComponent
    content = content.replace(
      /imports\s*:\s*\[([\s\S]*?)AppModule([\s\S]*?)\]/,
      'imports: [$1UpdateButtonComponent$2]'
    );

    fs.writeFileSync(fullPath, content);
    console.log(`Références corrigées dans: ${componentPath}`);
  });
}

// Exécuter les corrections
console.log("Début des corrections du module et des références...");
fixAppModule();
fixComponentReferences();
console.log("Corrections terminées!");
