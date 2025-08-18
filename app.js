/* ====== Données & stockage ====== */
const DEFAULT_DATA = {
  products: [
    {
      id: "p1",
      name: "Collection Parfums Dubaï (50 ml)",
      category: "Parfums",
      price: 29.90,
      stock: 12,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601",
      desc: "Parfums orientaux inspirés de Dubaï : notes oud, musc, rose. Flacon 50 ml."
    },
    {
      id: "p2",
      name: "Bakhoor – Encens oriental",
      category: "Encens",
      price: 9.90,
      stock: 20,
      image: "https://images.pexels.com/photos/7234182/pexels-photo-7234182.jpeg",
      desc: "Fragments de bakhoor à brûler dans une mabkhara. Parfume la maison."
    },
    {
      id: "p3",
      name: "Henné Naturel (100 g)",
      category: "Beauté",
      price: 6.90,
      stock: 18,
      image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Henna_Powder_and_Leaves.jpg",
      desc: "Henné pur pour coloration végétale et soins capillaires."
    },
    {
      id: "p4",
      name: "Huile Capillaire Amla (100 ml)",
      category: "Huiles",
      price: 8.90,
      stock: 16,
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601",
      desc: "Huile nourrissante amla pour fortifier et faire briller les cheveux."
    },
    {
      id: "p5",
      name: "Eau de Rose (250 ml)",
      category: "Beauté",
      price: 7.90,
      stock: 14,
      image: "https://images.unsplash.com/photo-1615634260167-8343e5f1a15f",
      desc: "Eau florale apaisante pour le visage et les cheveux."
    },
    {
      id: "p6",
      name: "Huile d’Argan Cosmétique (100 ml)",
      category: "Huiles",
      price: 12.90,
      stock: 15,
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
      desc: "Huile d’argan pressée à froid pour peau et cheveux."
    },
    {
      id: "p7",
      name: "Musc Tahara (roll-on 6 ml)",
      category: "Parfums",
      price: 5.90,
      stock: 25,
      image: "https://images.unsplash.com/photo-1605978547351-8b5d7d5a2f4b",
      desc: "Musc blanc propre et doux, format roll-on pratique."
    },
    {
      id: "p8",
      name: "Bakhoor – Charbons auto-allumants (10 pcs)",
      category: "Encens",
      price: 3.90,
      stock: 30,
      image: "https://images.pexels.com/photos/7234182/pexels-photo-7234182.jpeg",
      desc: "Charbons rapides pour brûleurs d’encens. Idéal avec bakhoor."
    }
  ],
  proposals: [
    { id: "np1", title: "Parfum Dubaï • Rose & Musc", up: 2, down: 0 },
    { id: "np2", title: "Encens bakhoor au jasmin", up: 1, down: 0 },
    { id: "np3", title: "Huile capillaire amla", up: 0, down: 0 }
  ],
  markets: [
    { id: "m1", date: "2025-09-05", city: "Tarascon", hours: "8h–13h", place: "Place du Marché", notes: "" },
    { id: "m2", date: "2025-09-12", city: "Arles", hours: "8h–13h", place: "Boulevard des Lices", notes: "Grand marché" }
  ]
};

const LS_KEY = "site_marche_data_v1";
function loadData() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return structuredClone(DEFAULT_DATA);
  try { return JSON.parse(raw); } catch { return structuredClone(DEFAULT_DATA); }
}
function saveData() { localStorage.setItem(LS_KEY, JSON.stringify(DATA)); }
let DATA = loadData();
