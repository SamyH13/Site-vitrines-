// ----------------------
// Liste des produits
// ----------------------
const produits = [
  {
    id: 1,
    nom: "Parfum à la Pomme",
    description: "Frais et fruité, un parfum à la pomme rafraîchissant et plein de vivacité.",
    image: "assets/pomme.jpg",
    prix: 25,
    stock: 12,
    notes: 4.5,
    avis: [
      { auteur: "Sophie", texte: "Super parfum, très frais et agréable !", note: 5 },
      { auteur: "Karim", texte: "J’aime bien mais un peu trop sucré à mon goût.", note: 4 }
    ],
    suggestions: [2, 3, 4] // produits associés
  },
  {
    id: 2,
    nom: "Éclat d’Agrumes",
    description: "Un mélange pétillant d’orange et de citron pour une énergie instantanée.",
    image: "assets/agrumes.jpg",
    prix: 30,
    stock: 20,
    notes: 4.7,
    avis: [
      { auteur: "Nina", texte: "Mon préféré, il sent l’été !", note: 5 }
    ],
    suggestions: [1, 3]
  },
  {
    id: 3,
    nom: "Soleil des Alpes",
    description: "Un parfum floral et léger rappelant l’air pur des montagnes.",
    image: "assets/alpes.jpg",
    prix: 28,
    stock: 10,
    notes: 4.2,
    avis: [
      { auteur: "Léo", texte: "Très agréable, pas trop fort.", note: 4 }
    ],
    suggestions: [1, 2]
  },
  {
    id: 4,
    nom: "Brise de Rose",
    description: "Délicat parfum de rose fraîche, idéal pour le quotidien.",
    image: "assets/rose.jpg",
    prix: 32,
    stock: 15,
    notes: 4.8,
    avis: [
      { auteur: "Amira", texte: "Un parfum incroyable, je l’adore !", note: 5 }
    ],
    suggestions: [1, 3]
  }
];

// ----------------------
// Liste des marchés
// ----------------------
const marches = [
  { date: "2025-08-23", lieu: "Tarascon - Place du Marché", horaire: "9h - 13h" },
  { date: "2025-08-25", lieu: "Arles - Boulevard des Lices", horaire: "8h - 12h" },
  { date: "2025-08-30", lieu: "Avignon - Place Pie", horaire: "9h - 14h" }
];

// ----------------------
// Sondages / idées
// ----------------------
const idees = [
  {
    question: "Quel prochain parfum aimeriez-vous voir ?",
    options: ["Pomme Verte", "Mangue", "Coco Vanille"],
    votes: [5, 2, 3]
  },
  {
    question: "Voulez-vous des coffrets cadeaux pour Noël ?",
    options: ["Oui", "Non"],
    votes: [12, 1]
  }
];
