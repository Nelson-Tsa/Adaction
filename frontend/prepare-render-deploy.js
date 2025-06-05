const fs = require('fs');
const path = require('path');

// Créer un fichier netlify.toml avec des règles de redirection
const netlifyConfig = `
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;

fs.writeFileSync(path.join(__dirname, 'netlify.toml'), netlifyConfig);
console.log('netlify.toml créé avec des règles de redirection');

// Créer un fichier de configuration pour le routage sur Render
const renderConfig = {
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/.*",
      "dest": "/index.html"
    }
  ]
};

fs.writeFileSync(path.join(__dirname, 'render.json'), JSON.stringify(renderConfig, null, 2));
console.log('render.json créé avec des règles de routage');

// Modifier le package.json pour exécuter ce script lors du build
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Modifier la commande de build
if (packageJson.scripts && packageJson.scripts.build) {
  packageJson.scripts.build = `${packageJson.scripts.build} && node prepare-render-deploy.js`;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('package.json mis à jour pour exécuter le script de préparation');
}
