
/* ====== Données & stockage ====== */
const DEFAULT_DATA = {
  products: [
    { id: "p1", name: "Parfum Dubaï • Oud Royal", category: "Parfums", price: 35, stock: 12, desc: "Un oud intense et boisé, longue tenue.", image: "" },
    { id: "p2", name: "Encens Bakhoor Aswad", category: "Encens", price: 12, stock: 24, desc: "Bakhoor noir traditionnel, senteur chaleureuse.", image: "" },
    { id: "p3", name: "Huile d'Argan Pure", category: "Huiles", price: 15, stock: 18, desc: "Pressée à froid, idéale cheveux & peau.", image: "" },
    { id: "p4", name: "Henné Naturel", category: "Henné", price: 8, stock: 30, desc: "Poudre 100% végétale pour tatouages & soins.", image: "" },
    { id: "p5", name: "Masque Visage Ghassoul", category: "Beauté", price: 10, stock: 10, desc: "Argile marocaine pour purifier la peau.", image: "" }
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

/* ====== Utils ====== */
const byId = (id) => document.getElementById(id);
const fmtEUR = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
const todayISO = () => new Date().toISOString().slice(0,10);
function starHTML(avg) {
  let out = '';
  for (let i=1; i<=5; i++) {
    out += `<span class="star">${i <= Math.round(avg) ? '★' : '☆'}</span>`;
  }
  return out;
}
function readReviews(productId) {
  const key = `reviews_${productId}`;
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
}
function writeReviews(productId, arr) {
  const key = `reviews_${productId}`;
  localStorage.setItem(key, JSON.stringify(arr));
}

/* ====== Rendu Produits ====== */
function renderProducts(filterCat = "Toutes", search = "") {
  const wrap = byId('productsWrap');
  wrap.innerHTML = "";
  const list = DATA.products
    .filter(p => filterCat === "Toutes" || p.category === filterCat)
    .filter(p => (p.name + " " + p.desc).toLowerCase().includes(search.toLowerCase()));
  if (!list.length) {
    wrap.innerHTML = '<p>Aucun produit trouvé.</p>';
    return;
  }
  for (const p of list) {
    const reviews = readReviews(p.id);
    const avg = reviews.length ? (reviews.reduce((a,b)=>a+b.rating,0)/reviews.length) : 0;
    const card = document.createElement('article');
    card.className = 'card product';
    card.innerHTML = `
      <img src="${p.image || 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'1200\' height=\'800\'><rect width=\'100%\' height=\'100%\' fill=\'#f0f0f0\'/><text x=\'50%\' y=\'50%\' dominant-baseline=\'middle\' text-anchor=\'middle\' fill=\'#777\' font-family=\'sans-serif\' font-size=\'42\'>Photo produit</text></svg>')}" alt="${p.name}">
      <div class="content">
        <div>
          <h3>${p.name} <span class="kebab" title="ID: ${p.id}">⋮</span></h3>
          <div class="small">${p.category}</div>
        </div>
        <div class="rating" title="${reviews.length ? (avg.toFixed(1) + '/5 (' + reviews.length + ' avis)') : 'Pas encore d\'avis'}">${starHTML(avg)} <span class="small" style="margin-left:.4rem;">${reviews.length ? avg.toFixed(1) : '—'}</span></div>
        <div class="price">${fmtEUR(p.price)}</div>
        <div class="stock">Stock: <span class="badge ${p.stock<=5?'low':'ok'}">${p.stock<=5?'Faible':''} ${p.stock}</span></div>
        <p>${p.desc}</p>
        <div class="cta">
          <button class="btn" onclick="openReview('${p.id}','${p.name}')">Laisser un avis</button>
          <button class="btn secondary" onclick="editStock('${p.id}')">Mettre à jour le stock</button>
        </div>
        <div class="reviews" id="reviews_${p.id}"></div>
      </div>`;
    wrap.appendChild(card);
    renderReviews(p.id);
  }
}

function renderReviews(productId) {
  const container = byId('reviews_'+productId);
  const arr = readReviews(productId);
  if (!arr.length) { container.innerHTML = '<p class="small">Pas encore d’avis.</p>'; return; }
  container.innerHTML = arr.slice(-3).reverse().map(r => `
    <div class="review">
      <h4>${r.name} — ${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</h4>
      <div class="small">${new Date(r.date).toLocaleDateString('fr-FR')}</div>
      <p>${r.comment}</p>
    </div>
  `).join("");
}

/* ====== Modal avis (ultra simple) ====== */
function openReview(productId, productName) {
  const name = prompt("Votre prénom ?");
  if (!name) return;
  const rating = Number(prompt("Notez le produit de 1 à 5 :"));
  if (!(rating>=1 && rating<=5)) return alert("Note invalide.");
  const comment = prompt("Votre avis (optionnel) :") || "";
  const arr = readReviews(productId);
  arr.push({ name, rating, comment, date: new Date().toISOString() });
  writeReviews(productId, arr);
  renderReviews(productId);
  renderProducts(currentFilters.category, currentFilters.search);
  alert("Merci pour votre avis !");
}

/* ====== Stock ====== */
function editStock(productId) {
  const p = DATA.products.find(x=>x.id===productId);
  if (!p) return;
  const val = prompt(`Nouveau stock pour "${p.name}" :`, p.stock);
  if (val===null) return;
  const n = Number(val);
  if (!Number.isFinite(n) || n < 0) return alert("Valeur invalide.");
  p.stock = n;
  saveData();
  renderProducts(currentFilters.category, currentFilters.search);
}

/* ====== Filtres ====== */
const currentFilters = { category: "Toutes", search: "" };
function setupFilters() {
  const sel = byId('filterCat');
  const cats = ["Toutes", ...new Set(DATA.products.map(p=>p.category))];
  sel.innerHTML = cats.map(c => `<option value="${c}">${c}</option>`).join("");
  sel.value = currentFilters.category;
  sel.onchange = (e) => { currentFilters.category = e.target.value; renderProducts(currentFilters.category, currentFilters.search); };
  byId('searchInput').oninput = (e) => { currentFilters.search = e.target.value; renderProducts(currentFilters.category, currentFilters.search); };
}

/* ====== Propositions (votes) ====== */
function renderProposals() {
  const wrap = byId('proposalsWrap');
  if (!DATA.proposals.length) { wrap.innerHTML = '<p>Aucune proposition.</p>'; return; }
  wrap.innerHTML = "";
  for (const it of DATA.proposals) {
    const row = document.createElement('div');
    row.className = 'card';
    row.innerHTML = `
      <div class="content vote-item">
        <div><strong>${it.title}</strong><div class="small">ID: ${it.id}</div></div>
        <div class="vote-buttons">
          <button class="vote" onclick="vote('${it.id}', 'up')">👍 <b>${it.up}</b></button>
          <button class="vote" onclick="vote('${it.id}', 'down')">👎 <b>${it.down}</b></button>
        </div>
      </div>`;
    wrap.appendChild(row);
  }
}
function vote(id, dir) {
  const it = DATA.proposals.find(x=>x.id===id);
  if (!it) return;
  const votedKey = `voted_${id}`;
  if (localStorage.getItem(votedKey)) { alert("Vous avez déjà voté pour cette proposition."); return; }
  it[dir]++;
  localStorage.setItem(votedKey, "1");
  saveData();
  renderProposals();
}
function addProposal() {
  const title = prompt("Nouvelle idée de produit ?");
  if (!title) return;
  const id = "np" + Math.random().toString(36).slice(2,7);
  DATA.proposals.push({ id, title, up: 0, down: 0 });
  saveData();
  renderProposals();
}

/* ====== Marchés ====== */
function renderMarkets() {
  const tbody = byId('marketsBody');
  const future = DATA.markets
    .filter(m => m.date >= todayISO())
    .sort((a,b) => a.date.localeCompare(b.date));
  tbody.innerHTML = future.map(m => `
    <tr>
      <td>${new Date(m.date).toLocaleDateString('fr-FR', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}</td>
      <td>${m.city}</td>
      <td>${m.place}</td>
      <td>${m.hours}</td>
      <td>${m.notes || ''}</td>
    </tr>
  `).join("") || '<tr><td colspan="5">Aucune date à venir.</td></tr>';
}
function addMarket() {
  const date = prompt("Date (AAAA-MM-JJ) ?");
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return alert("Date invalide.");
  const city = prompt("Ville ?") || "";
  const place = prompt("Lieu (place, rue…) ?") || "";
  const hours = prompt("Horaires ? (ex: 8h–13h)") || "";
  const notes = prompt("Notes (optionnel) :") || "";
  const id = "m" + Math.random().toString(36).slice(2,7);
  DATA.markets.push({ id, date, city, place, hours, notes });
  saveData();
  renderMarkets();
}

/* ====== Import / Export ====== */
function exportData() {
  const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'site-data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
function importData(evt) {
  const file = evt.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const obj = JSON.parse(e.target.result);
      if (!obj.products || !obj.proposals || !obj.markets) throw new Error("Fichier invalide");
      DATA = obj;
      saveData();
      setupFilters();
      renderProducts(currentFilters.category, currentFilters.search);
      renderProposals();
      renderMarkets();
      alert("Données importées avec succès.");
    } catch (err) {
      alert("Erreur d'import : " + err.message);
    }
  };
  reader.readAsText(file);
}

/* ====== Init ====== */
window.addEventListener('DOMContentLoaded', () => {
  setupFilters();
  renderProducts(currentFilters.category, currentFilters.search);
  renderProposals();
  renderMarkets();
  // Gestion import
  byId('importFile').addEventListener('change', importData);
});
