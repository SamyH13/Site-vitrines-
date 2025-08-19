// --- Données vitrine (modifie librement) ---
const PRODUCTS = [
  { id:"pomme",   name:"Parfum à la Pomme", short:"Frais et fruité", 
    long:"Frais et fruité. Un parfum à la pomme rafraîchissant et plein de vivacité.",
    stars:4.5, img:"assets/pomme.jpg" },
  { id:"agrumes", name:"Éclat d’Agrumes",   short:"Notes d’orange et citron",
    long:"Explosion d’agrumes lumineux : orange, citron, bergamote.",
    stars:4.2, img:"assets/agrumes.jpg" },
  { id:"alpes",   name:"Soleil des Alpes",  short:"Floral doux",
    long:"Fleurs blanches & musc, doux et propre.",
    stars:4.3, img:"assets/alpes.jpg" },
  { id:"rose",    name:"Brise de Rose",     short:"Élégant & floral",
    long:"Rose veloutée, élégante et intemporelle.",
    stars:4.4, img:"assets/rose.jpg" }
];

const REVIEWS = {
  pomme: [
    { author:"Marie", stars:5, text:"Super parfum, tient toute la journée !", photo:"assets/avis1.jpg" },
    { author:"Jules", stars:4, text:"Bonne odeur, un peu légère pour moi.",   photo:"assets/avis2.jpg" }
  ],
  agrumes: [],
  alpes:   [],
  rose:    []
};

// --- Helpers ---
const star = n => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

// --- Rendu de la grille produits (pour produits.html) ---
function renderProducts(targetId){
  const el = document.getElementById(targetId);
  el.innerHTML = PRODUCTS.map(p => `
    <article class="card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.short}</p>
      <div class="rating">${star(p.stars)} <span>${p.stars.toFixed(1)} / 5</span></div>
      <a class="btn" href="avis.html?id=${p.id}">Voir les avis</a>
    </article>
  `).join('');
}

// --- Rendu de la page d'avis (pour avis.html) ---
function renderAvis(targetId){
  const params = new URLSearchParams(location.search);
  const id = params.get('id') || PRODUCTS[0].id;
  const p = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  const avis = REVIEWS[id] || [];

  const list = avis.length
    ? `<ul class="avis-list">
        ${avis.map(a => `
          <li class="avis">
            <img src="${a.photo}" alt="${a.author}">
            <div>
              <b>${a.author}</b> — ${"★".repeat(a.stars)}${"☆".repeat(5-a.stars)}
              <p>${a.text}</p>
            </div>
          </li>`).join("")}
       </ul>`
    : `<p>Pas encore d’avis pour ce produit.</p>`;

  document.getElementById(targetId).innerHTML = `
    <section class="produits">
      <div class="card" style="max-width:900px;margin:0 auto;">
        <img src="${p.img}" alt="${p.name}" style="height:300px">
        <h3 style="padding:10px">${p.name}</h3>
        <p style="padding:0 10px">${p.long}</p>
        <div class="rating">${star(p.stars)} <span>${p.stars.toFixed(1)} / 5</span></div>
        <div style="padding:0 10px 12px">
          <a class="btn" href="produits.html">← Retour aux produits</a>
        </div>
      </div>
      <h2 style="margin:20px 0 8px">Avis clients</h2>
      ${list}
    </section>
  `;
}
