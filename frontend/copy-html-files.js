const fs = require('fs');
const path = require('path');

// Possibles chemins pour le dossier de build (local et Render)
const possiblePaths = [
  path.join(__dirname, 'dist', 'frontend'),
  path.join('/opt/render/project/src/frontend/dist/frontend'),
  path.join(__dirname, '..', 'dist', 'frontend')
];

let distPath = null;
let indexHtmlPath = null;

// Trouver le premier chemin valide contenant index.html
for (const potentialPath of possiblePaths) {
  console.log(`Vérification du chemin: ${potentialPath}`);
  if (fs.existsSync(potentialPath)) {
    console.log(`Le dossier existe: ${potentialPath}`);
    const potentialIndexPath = path.join(potentialPath, 'index.html');
    if (fs.existsSync(potentialIndexPath)) {
      console.log(`Trouvé index.html dans: ${potentialPath}`);
      distPath = potentialPath;
      indexHtmlPath = potentialIndexPath;
      break;
    }
  }
}

if (distPath && indexHtmlPath) {
  try {
    console.log(`Lecture de index.html depuis: ${indexHtmlPath}`);
    // Lire le contenu du fichier index.html
    const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
    
    // Créer les fichiers 200.html et 404.html avec le même contenu
    fs.writeFileSync(path.join(distPath, '200.html'), indexHtml);
    fs.writeFileSync(path.join(distPath, '404.html'), indexHtml);
    
    console.log(`Fichiers 200.html et 404.html créés avec succès dans ${distPath}`);
  } catch (error) {
    console.error(`Erreur lors de la création des fichiers: ${error.message}`);
  }
} else {
  console.error('Impossible de trouver index.html dans les chemins suivants:');
  possiblePaths.forEach(p => console.log(`- ${p}`));
  console.log('Contenu du répertoire courant:');
  try {
    const currentDirFiles = fs.readdirSync(__dirname);
    currentDirFiles.forEach(file => console.log(`- ${file}`));
  } catch (e) {
    console.error(`Erreur lors de la lecture du répertoire courant: ${e.message}`);
  }
}
