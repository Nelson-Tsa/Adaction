const express = require('express');
const path = require('path');
const compression = require('compression');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Enable compression
app.use(compression());

// Définir le chemin vers les fichiers statiques
const distPath = path.join(__dirname, 'dist/frontend');
console.log(`Serving static files from: ${distPath}`);

// Vérifier si le répertoire existe
if (fs.existsSync(distPath)) {
  console.log('Le répertoire dist/frontend existe');
  try {
    const files = fs.readdirSync(distPath);
    console.log(`Contenu du répertoire dist/frontend:`);
    files.forEach(file => console.log(`- ${file}`));
  } catch (err) {
    console.error(`Erreur lors de la lecture du répertoire: ${err.message}`);
  }
} else {
  console.error('⚠️ Le répertoire dist/frontend n\'existe PAS ⚠️');
}

// Static files
app.use(express.static(distPath));

// All routes should point to index.html for Angular to handle
app.get('*', (req, res) => {
  const indexPath = path.join(distPath, 'index.html');
  console.log(`Tentative de servir: ${indexPath}`);
  
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Index.html non trouvé. Vérifiez le chemin de build Angular.');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Environnement: ${process.env.NODE_ENV}`);
  console.log(`Répertoire courant: ${__dirname}`);
  console.log(`Server running on port ${PORT}`);
});
