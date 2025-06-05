const fs = require('fs');
const path = require('path');

// Définition des chemins de fichiers à corriger
const filesToFix = [
  'frontend/src/app/app.component.ts',
  'frontend/src/app/login/login.component.ts',
  'frontend/src/app/requete/update-button/update-button.component.ts'
];

// Fonction pour ajouter "standalone: true" à un fichier de composant
function addStandaloneTrue(filePath) {
  const fullPath = path.join(__dirname, filePath);
  
  // Vérifier si le fichier existe
  if (!fs.existsSync(fullPath)) {
    console.log(`Fichier non trouvé: ${fullPath}`);
    return;
  }
  
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Chercher le décorateur @Component
  const componentRegex = /@Component\(\{([^}]*)\}\)/s;
  const match = content.match(componentRegex);
  
  if (match) {
    let componentConfig = match[1];
    
    // Vérifier si standalone est déjà défini
    if (!componentConfig.includes('standalone')) {
      // Ajouter standalone: true après la première propriété
      componentConfig = componentConfig.replace(/(\s*[a-zA-Z]+\s*:\s*[^,]+,?)/, '$1\n  standalone: true,');
      
      // Remplacer l'ancien contenu par le nouveau
      content = content.replace(componentRegex, `@Component({\n${componentConfig}\n})`);
      
      // Écrire le fichier mis à jour
      fs.writeFileSync(fullPath, content);
      console.log(`Ajout de "standalone: true" à ${filePath}`);
    } else {
      console.log(`"standalone" est déjà défini dans ${filePath}`);
    }
  } else {
    console.log(`Le décorateur @Component n'a pas été trouvé dans ${filePath}`);
  }
}

// Fonction pour créer ou mettre à jour le module
function createOrUpdateModule() {
  const modulePath = path.join(__dirname, 'frontend/src/app/app.module.ts');
  let content;
  
  if (fs.existsSync(modulePath)) {
    content = fs.readFileSync(modulePath, 'utf8');
    // Vérifier si UpdateButtonComponent est déjà déclaré
    if (!content.includes('UpdateButtonComponent')) {
      // Ajouter UpdateButtonComponent aux déclarations
      content = content.replace(
        /declarations\s*:\s*\[([\s\S]*?)\]/,
        `declarations: [$1,\n    UpdateButtonComponent\n  ]`
      );
      
      // Ajouter l'import si nécessaire
      if (!content.includes("import { UpdateButtonComponent }")) {
        const importStatement = "import { UpdateButtonComponent } from './requete/update-button/update-button.component';\n";
        content = importStatement + content;
      }
    }
  } else {
    // Créer un nouveau module si inexistant
    content = `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpdateButtonComponent } from './requete/update-button/update-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    UpdateButtonComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  exports: [
    UpdateButtonComponent
  ]
})
export class AppModule { }
`;
  }
  
  fs.writeFileSync(modulePath, content);
  console.log(`Module mis à jour: ${modulePath}`);
}

// Fonction pour modifier les composants qui importent UpdateButtonComponent
function fixImportingComponents() {
  const componentsToFix = [
    'frontend/src/app/association-list/association-list.component.ts',
    'frontend/src/app/city-list/city-list.component.ts',
    'frontend/src/app/collect-list/collect-list.component.ts',
    'frontend/src/app/donnation-list/donnation-list.component.ts',
    'frontend/src/app/volunteer-list/volunteer-list.component.ts',
    'frontend/src/app/waste-collected-list/waste-collected-list.component.ts',
    'frontend/src/app/waste-type-list/waste-type-list.component.ts'
  ];
  
  componentsToFix.forEach(filePath => {
    const fullPath = path.join(__dirname, filePath);
    
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Remplacer l'import direct de UpdateButtonComponent par import du module
      content = content.replace(
        /import\s*{[^}]*UpdateButtonComponent[^}]*}\s*from\s*['"]\.\.\/requete\/update-button\/update-button\.component['"];?/,
        ''
      );
      
      // Ajouter l'import du module s'il n'existe pas déjà
      if (!content.includes('import { AppModule }')) {
        content = `import { AppModule } from '../app.module';\n${content}`;
      }
      
      // Remplacer UpdateButtonComponent dans imports par AppModule
      content = content.replace(
        /imports\s*:\s*\[([\s\S]*?)UpdateButtonComponent([\s\S]*?)\]/,
        'imports: [$1AppModule$2]'
      );
      
      fs.writeFileSync(fullPath, content);
      console.log(`Correction de l'import dans ${filePath}`);
    } else {
      console.log(`Fichier non trouvé: ${fullPath}`);
    }
  });
}

// Exécuter les corrections
console.log("Début des corrections...");

filesToFix.forEach(file => {
  addStandaloneTrue(file);
});

createOrUpdateModule();
fixImportingComponents();

console.log("Corrections terminées!");
