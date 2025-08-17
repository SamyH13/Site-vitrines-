
Site vitrine — Marché Provence — stand de marché (Parfums Dubaï, Encens, Beauté, Henné, Huiles)
=============================================================================

Ce dossier contient un mini-site statique prêt à l’emploi :
- **index.html** — la page du site
- **styles.css** — le style
- **app.js** — la logique (produits, avis, votes, marchés, import/export)

Fonctionnalités
---------------
- Catalogue avec catégories, recherche, prix, **stock** et badge "faible stock".
- **Avis clients** par produit (note 1 à 5 + commentaire), moyenne affichée en étoiles.
- **Votes** sur les idées de nouveaux produits (anti double-vote simple via localStorage).
- **Calendrier des marchés** à venir (tri auto, ajout de dates).
- **Export/Import** des données (JSON) pour sauvegarder vos infos.
- Design responsive (mobile → desktop).

Données & Persistance
---------------------
Aucune base de données n’est nécessaire pour la démo : tout est stocké dans **localStorage** du navigateur.
- Exportez vos données en JSON, puis importez-les sur un autre appareil si besoin.
- Pour un vrai site en ligne multi-appareils, connectez ce front à un backend (ex : Supabase, Firebase) ou un CMS.

Déploiement
-----------
1. Ouvrez **index.html** dans votre navigateur pour tester en local.
2. Hébergez ces fichiers sur **Netlify, Vercel, GitHub Pages** ou votre hébergeur. Aucun serveur n’est requis.

Personnalisation rapide
-----------------------
- Modifiez **DEFAULT_DATA** dans `app.js` pour vos produits, propositions et dates de marché.
- Ajoutez des images produit en mettant une URL (hébergement public) dans la clé `image`.
- Changez les textes (nom du stand (Marché Provence), contact, à propos) dans **index.html**.

Évolution (optionnel)
---------------------
- Authentification simple pour un "mode gérant".
- Vrai système d’avis (modération, pagination) et votes côté serveur.
- Backoffice pour gérer le stock, les produits et le calendrier.
- Carte interactive (Leaflet) avec emplacement du prochain marché.

Fichier généré le 2025-08-17.
