const EURO = new Intl.NumberFormat("fr-FR", { style:"currency", currency:"EUR" });

const PRODUCTS = [
  { id:"p1", name:"Dubai Noir", short:"Intense & élégant", stars:4.6,
    img:"assets/parfum1.jpg", price:19.90, stock:8, bestseller:true },
  { id:"p2", name:"Yara Dubai", short:"Oriental doux", stars:4.7,
    img:"assets/parfum2.jpg", price:22.00, stock:0, bestseller:true },
  { id:"p3", name:"Dubai Vert", short:"Frais & luxueux", stars:4.4,
    img:"assets/parfum3.jpg", price:21.50, stock:5 },
  { id:"p4", name:"Oud Desert", short:"Ambré & chaleureux", stars:4.5,
    img:"assets/parfum4.jpg", price:24.00, stock:3 }
];

// Badges stock
function stockBadge(p){
  if (p.stock <= 0) return `<span style="color:red;font-weight:bold">RUPTURE</span>`;
  return `<span style="color:green">${p.stock} en stock</span>`;
}

// Étoiles
function star(note){
  const full = Math.floor(note);
  const half = note - full >= .5;
  return "★".repeat(full) + (half?"☆":"") + "☆".repeat(5-full-(half?1:0));
}

// Grille Produits
function renderProducts(targetId){
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = PRODUCTS.map(p => `
    <article class="card">
      ${p.bestseller ? '<span class="badge best">Best seller</span>' : ''}
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.short}</p>
      <div class="rating">${star(p.stars)} <span>${p.stars.toFixed(1)} / 5</span></div>
      <div class="p-price">${EURO.format(p.price)}</div>
      <div class="stockline">${stockBadge(p)}</div>
      <a class="btn small" href="#">Voir les avis</a>
    </article>
  `).join('');
}
window.renderProducts = renderProducts;

// Best-sellers
function renderBestSellers(targetId, max = 6){
  const el = document.getElementById(targetId);
  if (!el) return;
  const list = PRODUCTS.filter(p => p.bestseller).slice(0, max);
  el.innerHTML = list.map(p => `
    <a class="best-card" href="produit.html?id=${p.id}" aria-label="${p.name}">
      <span class="best-badge">Best seller</span>
      <img src="${p.img}" alt="${p.name}">
      <div class="best-info">
        <div class="best-name">${p.name}</div>
        <div class="best-price">${EURO.format(p.price)}</div>
      </div>
    </a>
  `).join('');
}
window.renderBestSellers = renderBestSellers;
