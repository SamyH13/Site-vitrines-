/* =========================
   Données du site (modifiables)
   ========================= */

// Produits
const produits = [
  {
    id: "pomme",
    nom: "Parfum à la Pomme",
    short: "Frais et fruité",
    description:
      "Frais et fruité. Un parfum à la pomme rafraîchissant et plein de vivacité.",
    image: "assets/pomme.jpg",
    prix: 25,
    stock: 12,
    notes: 4.5,          // note manuelle
    avis: [
      { auteur: "Sophie", texte: "Super parfum, très frais et agréable !", note: 5, photo: "assets/avis1.jpg" },
      { auteur: "Karim",  texte: "J’aime bien mais un peu sucré pour moi.", note: 4, photo: "assets/avis2.jpg" }
    ],
    suggestions: ["agrumes", "alpes", "rose"]
  },
  {
    id: "agrumes",
    nom: "Éclat d’Agrumes",
    short: "Notes fraîches",
    description: "Un mélange pétillant d’orange et de citron pour une énergie instantanée.",
    image: "assets/agrumes.jpg",
    prix: 30,
    stock: 20,
    notes: 4.7,
    avis: [{ auteur: "Nina", texte: "Mon préféré, il sent l’été !", note: 5, photo: "assets/avis3.jpg" }],
    suggestions: ["pomme", "alpes"]
  },
  {
    id: "alpes",
    nom: "Soleil des Alpes",
    short: "Floral doux",
    description: "Un parfum floral et léger rappelant l’air pur des montagnes.",
    image: "assets/alpes.jpg",
    prix: 28,
    stock: 10,
    notes: 4.2,
    avis: [{ auteur: "Léo", texte: "Très agréable, pas trop fort.", note: 4, photo: "assets/avis4.jpg" }],
    suggestions: ["pomme", "agrumes"]
  },
  {
    id: "rose",
    nom: "Brise de Rose",
    short: "Élégant & floral",
    description: "Délicat parfum de rose fraîche, idéal pour le quotidien.",
    image: "assets/rose.jpg",
    prix: 32,
    stock: 15,
    notes: 4.8,
    avis: [{ auteur: "Amira", texte: "Incroyable, je l’adore !", note: 5, photo: "assets/avis5.jpg" }],
    suggestions: ["pomme", "alpes"]
  }
];

// Marchés (utile pour marches.html)
const marches = [
  { date: "2025-08-23", lieu: "Tarascon – Place du Marché", horaire: "09:00–13:00", statut: "ok" },
  { date: "2025-08-25", lieu: "Arles – Bd des Lices",       horaire: "08:00–12:00", statut: "ok" },
  { date: "2025-08-30", lieu: "Avignon – Place Pie",         horaire: "09:00–14:00", statut: "annule" }
];
