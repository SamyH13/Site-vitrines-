# Marché Provence — Site vitrine

Ce dépôt contient le site vitrine statique (HTML/CSS/JS).

## Déploiement rapide sur GitHub Pages

1. **Créer le dépôt**
   - Sur GitHub, créez un dépôt **marche-provence-site** (public).
   - Ne cochez rien (pas de README initial).

2. **Envoyer les fichiers**
   ```bash
   git init
   git remote add origin https://github.com/UTILISATEUR/marche-provence-site.git
   git checkout -b main
   git add .
   git commit -m "Mise en ligne initiale"
   git push -u origin main
   ```

3. **Activer GitHub Pages**
   - Allez dans **Settings → Pages**.
   - **Build and deployment** : Source = **GitHub Actions** (un workflow *pages.yml* est déjà prêt).
   - Le site se publie automatiquement. L’URL ressemble à :
     `https://UTILISATEUR.github.io/marche-provence-site/`

## Mettre à jour le catalogue / les dates
- Dans le site en ligne, utilisez **Exporter** pour récupérer `site-data.json`,
  modifiez-le puis **Importer** pour mettre à jour.
- Pour modifier le contenu (textes, styles…), éditez les fichiers puis validez :
  ```bash
  git add -A
  git commit -m "Maj contenu/produits"
  git push
  ```

## Structure
- `index.html` — page principale
- `styles.css` — style
- `app.js` — logique (produits, avis, votes, marchés, import/export)
- `assets/logo.jpg` — logo Marché Provence
- `.github/workflows/pages.yml` — déploiement automatique sur Pages
- `.nojekyll` — empêche le traitement Jekyll

_Fichiers générés le 2025-08-17._
