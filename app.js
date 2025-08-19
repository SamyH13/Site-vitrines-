/* =========================================================
   Marché Provence — app.js (MVP GitHub Pages, localStorage)
   Pages: Accueil, Produits, Fiche produit, Marchés, Photos, Idées
   Admin: bouton flottant pour éditer (sauvegarde locale)
   ========================================================= */

/* ----------------- Données par défaut ------------------ */
const DEFAULT_PRODUCTS = [
  { id:"p1", name:"Dubai Noir", short:"Intense & élégant",
    long:"Notes boisées et épicées avec une tenue remarquable.",
    stars:4.6, img:"assets/parfum1.jpg", price:19.90, stock:8, related:["p2","p3"] },

  { id:"p2", name:"Yara Dubai", short:"Oriental doux",
    long:"Gourmand, vanille et musc, très apprécié au stand.",
    stars:4.7, img:"assets/parfum2.jpg", price:22.00, stock:0, related:["p1","p4"] },

  { id:"p3", name:"Dubai Vert", short:"Frais & luxueux",
    long:"Vert aromatique, propre et lumineux pour le soir.",
    stars:4.4, img:"assets/parfum3.jpg", price:21.50, stock:3, related:["p1","p2"] },

  { id:"p4", name:"Oud Desert", short:"Ambré & chaleureux",
    long:"Oud doux, ambré, avec une belle projection et tenue.",
    stars:4.5, img:"assets/parfum4.jpg", price:24.00, stock:12, related:["p2","p3"] }
];

const DEFAULT_MARKETS = [
  { id:"m1", date:"2025-08-24", ville:"Aubagne", heure:"08:00–13:00", present:true, note:"Place habituelle" },
  { id:"m2", date:"2025-08-31", ville:"La Ciotat", heure:"09:00–12:30", present:true, note:"Selon météo" }
];

const DEFAULT_PHOTOS = [
  { id:"ph1", url:"assets/parfum1.jpg", legend:"Stand - Dubai Noir" },
  { id:"ph2", url:"assets/parfum2.jpg", legend:"Yara Dubai" }
];

const DEFAULT_IDEAS = [
  { id:"i1", title:"Parfum à la pomme", desc:"Pomme verte fraîche, musc blanc.",
    votes:5, hidden:false, comments:[
      {author:"Nadia", text:"Je valide !"}, {author:"Marc", text:"Oui pour l’été"}
    ] }
];

const DEFAULT_REVIEWS = {
  p1: [ { author:"Lina",  stars:5, text:"Super classe, tient très bien.", photo:"assets/parfum1.jpg" } ],
  p2: [ { author:"Yanis", stars:5, text:"Coup de cœur, très doux.", photo:"assets/parfum2.jpg" } ],
  p3: [],
  p4: []
};

/* ----------------- Persistance locale ------------------ */
const LS = {
  products: "mp_products_v2",
  markets:  "mp_markets_v1",
  photos:   "mp_photos_v1",
  ideas:    "mp_ideas_v1"
};

function loadLS(key, fallback){ try{
  const raw = localStorage.getItem(key); const p = JSON.parse(raw);
  return Array.isArray(fallback) ? (Array.isArray(p)?p:fallback) : (p||fallback);
}catch(e){ return fallback; }}

let PRODUCTS = loadLS(LS.products, DEFAULT_PRODUCTS);
let MARKETS  = loadLS(LS.markets,  DEFAULT_MARKETS);
let PHOTOS   = loadLS(LS.photos,   DEFAULT_PHOTOS);
let IDEAS    = loadLS(LS.ideas,    DEFAULT_IDEAS);
let REVIEWS  = DEFAULT_REVIEWS;

const EURO = new Intl.NumberFormat('fr-FR', {style:'currency', currency:'EUR'});
const star = n => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));
const imgTag = (src,alt) =>
  `<img src="${src}" alt="${alt}" onerror="this.src='';this.style.background='#eee';this.alt='Image indisponible'">`;

function saveAll(){
  localStorage.setItem(LS.products, JSON.stringify(PRODUCTS));
  localStorage.setItem(LS.markets,  JSON.stringify(MARKETS));
  localStorage.setItem(LS.photos,   JSON.stringify(PHOTOS));
  localStorage.setItem(LS.ideas,    JSON.stringify(IDEAS));
  alert("Modifications enregistrées (sur cet appareil).");
}

/* ----------------- UI: Admin toggle ------------------ */
let ADMIN = false;
function mountAdminFab(){
  const fab = document.createElement('button');
  fab.className = 'admin-fab';
  fab.title = "Mode admin";
  fab.textContent = "⚙️";
  fab.onclick = ()=>{
    ADMIN = !ADMIN;
    fab.style.background = ADMIN ? "#9b59b6" : "#6f24d2";
    document.body.classList.toggle('admin-on', ADMIN);
    // re-render si des vues existent
    if (document.getElementById('grid')) renderProducts('grid');
    if (document.getElementById('product-zone')) renderProductPage('product-zone');
    if (document.getElementById('markets-zone')) renderMarkets('markets-zone');
    if (document.getElementById('photos-zone')) renderPhotos('photos-zone');
    if (document.getElementById('ideas-zone')) renderIdeas('ideas-zone');
  };
  document.body.appendChild(fab);
}

/* ----------------- Produits (grille) ------------------ */
function renderProducts(targetId){
  const el = document.getElementById(targetId); if(!el) return;
  el.innerHTML = PRODUCTS.map((p, idx)=>{

    const stockBadge = p.stock <= 0
      ? `<span class="badge danger">RUPTURE</span>`
      : p.stock <= 3
        ? `<span class="badge warn">Victime de son succès (${p.stock})</span>`
        : `<span class="badge ok">${p.stock} en stock</span>`;

    const priceBlock = ADMIN
      ? `<div class="p-price">
           <input class="price-input" type="number" step="0.1" value="${p.price.toFixed(2)}" data-idx="${idx}">
           <input class="stock-input" type="number" step="1" min="0" value="${p.stock}" data-idx="${idx}" style="width:70px;margin-left:6px">
         </div>`
      : `<div class="p-price">${EURO.format(p.price)}</div>`;

    return `
      <article class="card">
        <a href="produit.html?id=${p.id}" class="card-link">
          ${imgTag(p.img,p.name)}
          <h3>${p.name}</h3>
          <p>${p.short}</p>
        </a>
        <div class="rating">${star(p.stars)} <span>${p.stars.toFixed(1)} / 5</span></div>
        ${priceBlock}
        <div class="stockline">${stockBadge}</div>
        <a class="btn small" href="avis.html?id=${p.id}">Voir les avis</a>
      </article>
    `;
  }).join('');

  if (ADMIN){
    el.querySelectorAll('.price-input').forEach(inp=>{
      inp.onchange = e => { const i=+inp.dataset.idx; PRODUCTS[i].price = +inp.value||0; };
    });
    el.querySelectorAll('.stock-input').forEach(inp=>{
      inp.onchange = e => { const i=+inp.dataset.idx; PRODUCTS[i].stock = Math.max(0, parseInt(inp.value||"0",10)); renderProducts(targetId); };
    });
  }
}

/* ----------------- Fiche produit + suggestions ------------------ */
function renderProductPage(targetId){
  const zone = document.getElementById(targetId); if(!zone) return;
  const id = new URLSearchParams(location.search).get('id') || PRODUCTS[0].id;
  const p  = PRODUCTS.find(x=>x.id===id) || PRODUCTS[0];

  const stockBadge = p.stock<=0
    ? `<span class="badge danger">RUPTURE</span>`
    : p.stock<=3 ? `<span class="badge warn">Victime de son succès (${p.stock})</span>`
                 : `<span class="badge ok">${p.stock} en stock</span>`;

  const priceBlock = ADMIN
    ? `<div class="p-price">
         <input class="price-edit" type="number" step="0.1" value="${p.price.toFixed(2)}">
         <input class="stock-edit" type="number" min="0" step="1" value="${p.stock}" style="width:70px;margin-left:6px">
       </div>`
    : `<div class="p-price">${EURO.format(p.price)}</div>`;

  // Suggestions: related sinon autres
  const rel = (p.related && p.related.map(id=>PRODUCTS.find(x=>x.id===id)).filter(Boolean))
              || PRODUCTS.filter(x=>x.id!==p.id).slice(0,8);

  const sugg = rel.map(s=>`
      <div class="sugg-card">
        <a href="produit.html?id=${s.id}">
          ${imgTag(s.img,s.name)}
          <h4>${s.name}</h4>
          <p>${EURO.format(s.price)}</p>
        </a>
      </div>`).join('');

  zone.innerHTML = `
    <section class="produit-detail">
      <div class="card big">
        ${imgTag(p.img,p.name)}
        <h3>${p.name}</h3>
        <p>${p.long}</p>
        <div class="rating">${star(p.stars)} <span>${p.stars.toFixed(1)} / 5</span></div>
        ${priceBlock}
        <div class="stockline" style="margin-bottom:10px">${stockBadge}</div>
        <div class="btn-row">
          <a class="btn" href="avis.html?id=${p.id}">Voir les avis</a>
          <a class="btn secondary" href="produits.html">← Tous les produits</a>
        </div>
      </div>

      <h2>Vous aimerez aussi</h2>
      <div class="carousel">
        ${sugg}
      </div>
    </section>
  `;

  if (ADMIN){
    zone.querySelector('.price-edit').onchange = e => { p.price = +e.target.value||0; };
    zone.querySelector('.stock-edit').onchange = e => { p.stock = Math.max(0, parseInt(e.target.value||"0",10)); renderProductPage(targetId); };
  }
}

/* ----------------- Marchés (liste + admin) ------------------ */
function renderMarkets(targetId){
  const z = document.getElementById(targetId); if(!z) return;
  const rows = MARKETS
    .sort((a,b)=>a.date.localeCompare(b.date))
    .map((m,i)=>`
      <tr>
        <td>${new Date(m.date).toLocaleDateString('fr-FR')}</td>
        <td>${m.ville}</td>
        <td>${m.heure}</td>
        <td>${m.present ? "✅ présent" : "❌ absent"}</td>
        <td>${m.note||""}</td>
        ${ADMIN ? `<td>
          <button class="mini" data-i="${i}" data-a="toggle">${m.present?"Marquer absent":"Marquer présent"}</button>
          <button class="mini danger" data-i="${i}" data-a="del">Supprimer</button>
        </td>`:``}
      </tr>
    `).join('');

  z.innerHTML = `
    <div class="markets">
      ${ADMIN ? `
      <div class="admin-tools">
        <input id="m-date" type="date">
        <input id="m-ville" placeholder="Ville">
        <input id="m-heure" placeholder="Heure (ex: 08:00–13:00)">
        <input id="m-note" placeholder="Note (facultatif)">
        <button id="m-add" class="btn small">Ajouter</button>
      </div>`:''}
      <table class="table">
        <thead><tr><th>Date</th><th>Ville</th><th>Horaire</th><th>Présence</th><th>Note</th>${ADMIN?'<th></th>':''}</tr></thead>
        <tbody>${rows || ''}</tbody>
      </table>
    </div>
  `;

  if (ADMIN){
    z.querySelector('#m-add')?.addEventListener('click', ()=>{
      const d = z.querySelector('#m-date').value;
      const v = z.querySelector('#m-ville').value.trim();
      const h = z.querySelector('#m-heure').value.trim();
      const n = z.querySelector('#m-note').value.trim();
      if(!d||!v||!h) return alert("Date, ville et horaire requis.");
      MARKETS.push({id:`m${Date.now()}`, date:d, ville:v, heure:h, present:true, note:n});
      renderMarkets(targetId);
    });
    z.querySelectorAll('button.mini').forEach(btn=>{
      btn.onclick = ()=>{
        const i = +btn.dataset.i, a=btn.dataset.a;
        if(a==="toggle"){ MARKETS[i].present=!MARKETS[i].present; renderMarkets(targetId); }
        if(a==="del"){ if(confirm("Supprimer cette date ?")){ MARKETS.splice(i,1); renderMarkets(targetId);} }
      };
    });
  }
}

/* ----------------- Photos (galerie par URL) ------------------ */
function renderPhotos(targetId){
  const z = document.getElementById(targetId); if(!z) return;
  z.innerHTML = `
    ${ADMIN ? `
    <div class="admin-tools">
      <input id="ph-url" placeholder="URL de la photo (https://...)">
      <input id="ph-leg" placeholder="Légende (facultatif)">
      <button id="ph-add" class="btn small">Ajouter</button>
    </div>`:''}
    <div class="photos-grid">
      ${PHOTOS.map((p,i)=>`
        <figure>
          ${imgTag(p.url, p.legend||"Photo")}
          <figcaption>${p.legend||""}</figcaption>
          ${ADMIN?`<button class="mini danger" data-i="${i}">Supprimer</button>`:''}
        </figure>
      `).join('')}
    </div>
  `;
  if (ADMIN){
    z.querySelector('#ph-add')?.addEventListener('click', ()=>{
      const url = z.querySelector('#ph-url').value.trim();
      if(!url) return alert("Ajoute une URL valide (hébergée).");
      const leg = z.querySelector('#ph-leg').value.trim();
      PHOTOS.unshift({id:`ph${Date.now()}`, url, legend:leg});
      renderPhotos(targetId);
    });
    z.querySelectorAll('button.mini.danger').forEach(b=>{
      b.onclick = ()=>{ const i=+b.dataset.i; PHOTOS.splice(i,1); renderPhotos(targetId); };
    });
  }
}

/* ----------------- Idées & votes ------------------ */
function renderIdeas(targetId){
  const z = document.getElementById(targetId); if(!z) return;
  z.innerHTML = `
    ${ADMIN?`
    <div class="admin-tools">
      <input id="id-title" placeholder="Nouvelle idée (ex: Encens bakhour)">
      <input id="id-desc" placeholder="Petite description">
      <button id="id-add" class="btn small">Ajouter</button>
    </div>`:''}
    <ul class="ideas-list">
      ${IDEAS.filter(i=>!i.hidden).map((it,idx)=>`
        <li>
          <div class="idea-head">
            <strong>${it.title}</strong>
            <span class="votes">👍 ${it.votes||0}</span>
          </div>
          <p>${it.desc||""}</p>
          <div class="idea-actions">
            <button class="mini" data-i="${idx}" data-a="vote">Voter</button>
            <input class="comment-inp" data-i="${idx}" placeholder="Votre avis (facultatif)">
            <button class="mini" data-i="${idx}" data-a="comment">Envoyer</button>
            ${ADMIN?`<button class="mini danger" data-i="${idx}" data-a="hide">Masquer</button>`:''}
          </div>
          <div class="comments">
            ${(it.comments||[]).map(c=>`<div class="cmt"><b>${c.author||"Client"}</b> — ${c.text}</div>`).join('')}
          </div>
        </li>`).join('')}
    </ul>
    ${ADMIN?`<button class="btn secondary" id="save-all" style="margin-top:12px">Enregistrer tout</button>`:''}
  `;

  if (ADMIN){
    z.querySelector('#id-add')?.addEventListener('click', ()=>{
      const t = z.querySelector('#id-title').value.trim();
      const d = z.querySelector('#id-desc').value.trim();
      if(!t) return;
      IDEAS.unshift({id:`i${Date.now()}`, title:t, desc:d, votes:0, hidden:false, comments:[]});
      renderIdeas(targetId);
    });
    z.querySelector('#save-all')?.addEventListener('click', saveAll);
  }
  z.querySelectorAll('button.mini').forEach(btn=>{
    btn.onclick = ()=>{
      const i = +btn.dataset.i, a = btn.dataset.a;
      if(a==="vote"){ IDEAS[i].votes = (IDEAS[i].votes||0)+1; renderIdeas(targetId); }
      if(a==="comment"){
        const input = z.querySelector(`.comment-inp[data-i="${i}"]`);
        const text = input.value.trim(); if(!text) return;
        (IDEAS[i].comments ||= []).push({author:"Client", text});
        input.value=""; renderIdeas(targetId);
      }
      if(a==="hide" && ADMIN){ IDEAS[i].hidden=true; renderIdeas(targetId); }
    };
  });
}

/* ----------------- Reviews (page avis.html) ------------------ */
function renderAvisList(targetId){
  const zone = document.getElementById(targetId); if(!zone) return;
  const id = new URLSearchParams(location.search).get('id') || PRODUCTS[0].id;
  const p = PRODUCTS.find(x=>x.id===id) || PRODUCTS[0];
  const avis = REVIEWS[id] || [];
  zone.innerHTML = `
    <div class="card big">
      <h3>Avis — ${p.name}</h3>
      <ul class="avis-list">${avis.map(a=>`
        <li class="avis">
          ${imgTag(a.photo,a.author)}
          <div><b>${a.author}</b> — ${"★".repeat(a.stars)}${"☆".repeat(5-a.stars)}<p>${a.text}</p></div>
        </li>`).join('')}</ul>
      <a class="btn secondary" href="produit.html?id=${p.id}">← Retour produit</a>
    </div>
  `;
}

/* ----------------- Expose global ------------------ */
window.renderProducts   = renderProducts;
window.renderProductPage= renderProductPage;
window.renderMarkets    = renderMarkets;
window.renderPhotos     = renderPhotos;
window.renderIdeas      = renderIdeas;
window.renderAvisList   = renderAvisList;
window.saveAll          = saveAll;

/* init admin FAB */
document.addEventListener('DOMContentLoaded', mountAdminFab);
