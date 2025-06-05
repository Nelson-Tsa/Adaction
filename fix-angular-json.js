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

    // Corriger la configuration des assets pour build
    if (angularJson.projects?.frontend?.architect?.build?.options?.assets) {
      angularJson.projects.frontend.architect.build.options.assets = [
        {
          "glob": "**/*",
          "input": "public",
          "output": "/assets"
        },
        "src/favicon.ico"
      ];
    }

    // Corriger la configuration des assets pour test
    if (angularJson.projects?.frontend?.architect?.test?.options?.assets) {
      angularJson.projects.frontend.architect.test.options.assets = [
        {
          "glob": "**/*",
          "input": "public",
          "output": "/assets"
        },
        "src/favicon.ico"
      ];
    }

    // Écrire les modifications dans le fichier
    fs.writeFile(angularJsonPath, JSON.stringify(angularJson, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Erreur lors de l\'écriture du fichier:', writeErr);
        return;
      }
      console.log('Le fichier angular.json a été corrigé avec succès!');
    });
  } catch (parseErr) {
    console.error('Erreur lors du parsing du fichier JSON:', parseErr);
  }
});
