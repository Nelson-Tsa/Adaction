// Script personnalisé pour le déploiement sur Vercel
const { execSync } = require('child_process');

// Exécution de la commande de build
try {
  console.log('Installation des dépendances sans frozen-lockfile...');
  execSync('pnpm install --no-frozen-lockfile', { stdio: 'inherit' });
  
  console.log('Build de l\'application Angular...');
  execSync('pnpm ng build --configuration production', { stdio: 'inherit' });
} catch (error) {
  console.error('Erreur pendant le build:', error);
  process.exit(1);
}
