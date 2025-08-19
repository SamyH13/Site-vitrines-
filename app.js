/* =========================================================
   Marché Provence — app.js (version assets/)
   - Grille produits + prix
   - Mode édition des prix (localStorage)
   - Page avis par produit
   ========================================================= */

/* ---------- Données par défaut ---------- */
const DEFAULT_PRODUCTS = [
  { id:"p1", name:"Dubai Noir",  short:"Intense & élégant",
    long:"Notes boisées et épicées avec une tenue remarquable.",
    stars:4.6, img:"assets/parfum1.jpg", price:19.90 },

  { id:"p2", name:"Yara Dubai",  short:"Oriental doux",
    long:"Gourmand, vanille et musc, très apprécié au stand.",
    stars:4.7, img:"assets/parfum2.jpg", price:22.00 },

  { id:"p3", name:"Dubai Vert",  short:"Frais & luxueux",
    long:"Vert aromatique, propre et lumineux pour le soir.",
    stars:4.4, img:"assets/parfum3.jpg", price:21.50 },

  { id:"p4", name:"Oud Desert",  short:"Ambré & chaleureux",
    long:"Oud doux, ambré, avec une belle projection et tenue.",
    stars:4.5, img:"assets/parfum4.jpg", price:24.00 }
];

/* ---------- Avis (exemple) ---------- */
const REVIEWS = {
  p1: [
    { author:"Lina",  stars:5, text:"Super classe, tient très bien toute la journée.", photo:"assets/parfum1.jpg" }
  ],
  p2: [
    { author:"Yanis", stars:5, text:"Coup de cœur au stand, très doux.", photo:"assets/parfum2.jpg" }
  ],
  p3: [],
  p4: []
};

/* ---------- Persistance ---------- */
const LS_KEY = "marche_provence_products_v1";
function loadProducts(){
  try {
    const raw = localStorage.getItem(LS_KEY);
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length) return parsed;
  } catch(e){}
  return DEFAULT_PRODUCTS;
}
function saveProducts(arr){ localStorage.setItem(LS_KEY, JSON.stringify(arr)); }
function resetProducts(){ localStorage.removeItem(LS_KEY); location.reload(); }

/* ---------- Helpers ---------- */
const EURO = new Intl.NumberFormat('fr-FR', { style:'currency', currency:'EUR' });
const star = n => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));
function imgTag(src, alt){
  // si l’image ne charge pas, on garde un fond neutre
  return `<img src="${src}" alt="${alt}" onerror="this.style.background='#eee';this.src='';this.alt='Image indisponible';">`;
}

/* ---------- États ---------- */
let PRODUCTS = loadProducts();
let EDIT_MODE = false;

/* =========================================================
   Rendu : Page Produits (grille)
   ========================================================= */
function renderProducts(targetId){
  const el = document.getElementById(targetId);
  if (!el) return;

  el.innerHTML = PRODUCTS.map((p, idx) => `
    <article class="card">
      ${imgTag(p.img, p.name)}
      <h3>${p.name}</h3>
      <p>${p.short}</p>
      <div class="rating">${star(p.stars)} <span>${p.stars.toFixed(1)} / 5</span></div>

      ${
        EDIT_MODE
        ? `<div class="p-price">
             <label style="font-size:.9rem;color:#555">Prix (€)</label><br>
             <input type="number" min="0" step="0.1" value="${p.price.toFixed(2)}"
                    data-idx="${idx}" class="price-input">
           </div>`
        : `<div class="p-price">${EURO.format(p.price)}</div>`
      }

      <a class="btn" href="avis.html?id=${p.id}">Voir les avis</a>
    </article>
  `).join('');

  if (EDIT_MODE){
    document.querySelectorAll('.price-input').forEach(inp=>{
      inp.addEventListener('change', e=>{
        const i = Number(e.target.dataset.idx);
        const val = parseFloat(e.target.value || '0');
        if (!isNaN(val)) PRODUCTS[i].price = val;
      });
    });
  }
}

/* =========================================================
   Rendu : Page Avis d’un produit
   ========================================================= */
function renderAvis(targetId){
  const zone = document.getElementById(targetId);
  if (!zone) return;

  const id = new URLSearchParams(location.search).get('id') || PRODUCTS[0].id;
  const p  = PRODUCTS.find(x => x.id === id) || PRODUCTS[0];
  const avis = REVIEWS[id] || [];

  const avisList = avis.length
    ? `<ul class="avis-list">
         ${avis.map(a=>`
           <li class="avis">
             ${imgTag(a.photo, a.author)}
             <div>
               <b>${a.author}</b> — ${"★".repeat(a.stars)}${"☆".repeat(5-a.stars)}
               <p>${a.text}</p>
             </div>
           </li>
         `).join("")}
       </ul>`
    : `<p>Pas encore d’avis pour ce produit.</p>`;

  zone.innerHTML = `
    <section class="produits">
      <div class="card" style="max-width:900px;margin:0 auto;">
        ${imgTag(p.img, p.name).replace('height:220px','height:300px')}
        <h3 style="padding:10px">${p.name}</h3>
        <p style="padding:0 10px">${p.long}</p>
        <div class="rating">${star(p.stars)} <span>${p.stars.toFixed(1)} / 5</span></div>
        <div class="p-price" style="padding:0 10px 12px">${EURO.format(p.price)}</div>
        <div style="padding:0 10px 14px">
          <a class="btn" href="produits.html">← Retour aux produits</a>
        </div>
      </div>
      <h2 style="margin:20px 0 8px">Avis clients</h2>
      ${avisList}
    </section>
  `;
}

/* =========================================================
   Barre Admin (produits.html)
   ========================================================= */
function attachAdminBar(){
  const bar = document.getElementById('admin-bar');
  if (!bar) return;

  const refresh = () => renderProducts('grid');

  bar.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const action = btn.dataset.action;

    if (action === 'toggle'){
      EDIT_MODE = !EDIT_MODE;
      btn.textContent = EDIT_MODE ? 'Terminer l’édition' : 'Mode édition prix';
      refresh();
    }
    if (action === 'save'){
      saveProducts(PRODUCTS);
      alert('Prix enregistrés (sur cet appareil).');
    }
    if (action === 'reset'){
      if (confirm('Réinitialiser les prix par défaut ?')) resetProducts();
    }
  });
}

/* =========================================================
   Expose global
   ========================================================= */
window.renderProducts  = renderProducts;
window.renderAvis      = renderAvis;
window.attachAdminBar  = attachAdminBar;
