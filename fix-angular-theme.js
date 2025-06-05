const fs = require('fs');
const path = require('path');

const angularJsonPath = path.join(__dirname, 'frontend', 'angular.json');

// Lire le fichier angular.json
fs.readFile(angularJsonPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Erreur lors de la lecture du fichier:', err);
    return;
  }

  try {
    // Parser le fichier JSON
    const angularJson = JSON.parse(data);

    // Corriger le thème Angular Material pour build
    if (angularJson.projects?.frontend?.architect?.build?.options?.styles) {
      // Remplacer azure-blue par indigo-pink (qui est un thème standard)
      angularJson.projects.frontend.architect.build.options.styles = angularJson.projects.frontend.architect.build.options.styles.map(style => {
        if (typeof style === 'string' && style.includes('@angular/material/prebuilt-themes/azure-blue.css')) {
          return '@angular/material/prebuilt-themes/indigo-pink.css';
        }
        return style;
      });
    }

    // Corriger le thème Angular Material pour test
    if (angularJson.projects?.frontend?.architect?.test?.options?.styles) {
      // Remplacer azure-blue par indigo-pink (qui est un thème standard)
      angularJson.projects.frontend.architect.test.options.styles = angularJson.projects.frontend.architect.test.options.styles.map(style => {
        if (typeof style === 'string' && style.includes('@angular/material/prebuilt-themes/azure-blue.css')) {
          return '@angular/material/prebuilt-themes/indigo-pink.css';
        }
        return style;
      });
    }

    // Écrire les modifications dans le fichier
    fs.writeFile(angularJsonPath, JSON.stringify(angularJson, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Erreur lors de l\'écriture du fichier:', writeErr);
        return;
      }
      console.log('Le thème Angular Material a été corrigé avec succès!');
    });
  } catch (parseErr) {
    console.error('Erreur lors du parsing du fichier JSON:', parseErr);
  }
});
