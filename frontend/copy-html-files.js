const fs = require('fs');
const path = require('path');

// Chemin vers le dossier de build
const distPath = path.join(__dirname, 'dist', 'frontend');

// Vérifier si le dossier existe
if (fs.existsSync(distPath)) {
  // Lire le contenu du fichier index.html
  const indexHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
  
  // Créer les fichiers 200.html et 404.html avec le même contenu
  fs.writeFileSync(path.join(distPath, '200.html'), indexHtml);
  fs.writeFileSync(path.join(distPath, '404.html'), indexHtml);
  
  console.log('Fichiers 200.html et 404.html créés avec succès');
} else {
  console.error('Le dossier dist/frontend n\'existe pas');
}
