/* ==== CONFIG ==== */
const ADMIN_PIN = '2580';
const LS_PRODUCTS = 'mp_products_v1';
const LS_MARKETS  = 'mp_markets_v1';

/* ==== Données par défaut ==== */
const DEFAULT_PRODUCTS = [
  {id:'p1',name:'Dubai Noir',short:'Intense & élégant',
   long:'Notes boisées et épicées avec une tenue remarquable.',
   stars:4.6, price:19.90, stock:8, best:true, img:'assets/parfum1.jpg'},
  {id:'p2',name:'Yara Dubai',short:'Oriental doux',
   long:'Gourmand, vanille et musc, très apprécié au stand.',
   stars:4.7, price:22.00, stock:0, best:true, img:'assets/parfum2.jpg'},
  {id:'p3',name:'Dubai Vert',short:'Frais & luxueux',
   long:'Vert aromatique, propre et lumineux pour le soir.',
   stars:4.4, price:21.50, stock:5, img:'assets/parfum3.jpg'},
  {id:'p4',name:'Oud Desert',short:'Ambré & chaleureux',
   long:'Oud doux, ambré, avec une belle projection et tenue.',
   stars:4.5, price:24.00, stock:3, img:'assets/parfum4.jpg'},
];

const DEFAULT_MARKETS = [
  {date:'2025-09-01', city:'Aix-en-Provence', hours:'9h-13h', present:true},
  {date:'2025-09-03', city:'Marseille Vieux-Port', hours:'10h-14h', present:true},
];

const REVIEWS = {
  p1:[{author:'Lina', stars:5, text:'Super classe, tient très bien toute la journée.', photo:'assets/parfum1.jpg'}],
  p2:[{author:'Yanis',stars:5, text:'Coup de cœur au stand, très doux.', photo:'assets/parfum2.jpg'}],
  p3:[], p4:[]
};

/* ==== State ==== */
let PRODUCTS = load(LS_PRODUCTS, DEFAULT_PRODUCTS);
let MARKETS  = load(LS_MARKETS,  DEFAULT_MARKETS);
let isAdmin  = false;

/* ==== Utils ==== */
function load(key, fallback){ try{const x=JSON.parse(localStorage.getItem(key)); return Array.isArray(x)||typeof x==='object'?x:fallback;}catch(e){return fallback}}
function save(key,val){ localStorage.setItem(key, JSON.stringify(val)); }
const money = n => new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(n);
const star  = n => '★'.repeat(Math.round(n))+'☆'.repeat(5-Math.round(n));
const byId  = id => document.getElementById(id);
const qs    = s => document.querySelector(s);

function card(p){
  return `
  <article class="card">
    <a href="fiche.html?id=${p.id}">
      <img src="${p.img}" alt="${p.name}" onerror="this.src='';this.style.background='#eee'">
    </a>
    ${p.best?'<span class="badge">Best</span>':''}
    <h3>${p.name}</h3>
    <p>${p.short}</p>
    <div class="rating">${star(p.stars)} <span>${p.stars.toFixed(1)} / 5</span></div>
    ${isAdmin
        ? `<div class="admin-tools">
             <label>Prix <input data-id="${p.id}" class="p-price-input" type="number" step="0.1" value="${p.price}"></label>
             <label>Stock <input data-id="${p.id}" class="p-stock-input" type="number" step="1" value="${p.stock}"></label>
             <button data-id="${p.id}" class="p-best btn">Best</button>
           </div>`
        : `<div class="p-price">${money(p.price)}</div>`
     }
    <div class="stockline">${p.stock>0?`${p.stock} en stock`:`<b>RUPTURE</b>`}</div>
    <a class="btn" href="fiche.html?id=${p.id}">Voir la fiche</a>
  </article>`;
}

/* ==== Renders ==== */
function renderBestSellers(target, max=6){
  const el = byId(target); if(!el) return;
  el.innerHTML = PRODUCTS.filter(p=>p.best).slice(0,max).map(p=>`
    <a class="best-card" href="fiche.html?id=${p.id}">
      <img src="${p.img}" alt="${p.name}">
      <div class="best-info">
        <span class="best-name">${p.name}</span>
        <span class="best-price">${money(p.price)}</span>
      </div>
    </a>`).join('');
}

function renderProducts(target, max=0){
  const el = byId(target); if(!el) return;
  const list = max? PRODUCTS.slice(0,max): PRODUCTS;
  el.innerHTML = list.map(card).join('');

  if(isAdmin){
    el.addEventListener('change', e=>{
      const inp = e.target;
      if (inp.classList.contains('p-price-input')){
        const p = PRODUCTS.find(x=>x.id===inp.dataset.id); p.price = parseFloat(inp.value||'0')||0;
        save(LS_PRODUCTS, PRODUCTS);
      }
      if (inp.classList.contains('p-stock-input')){
        const p = PRODUCTS.find(x=>x.id===inp.dataset.id); p.stock = parseInt(inp.value||'0')||0;
        save(LS_PRODUCTS, PRODUCTS);
      }
    });
    el.addEventListener('click', e=>{
      const b = e.target.closest('.p-best'); if(!b) return;
      const p = PRODUCTS.find(x=>x.id===b.dataset.id); p.best = !p.best; save(LS_PRODUCTS, PRODUCTS); renderProducts(target, max);
    });
  }
}

function renderFiche(target){
  const el = byId(target); if(!el) return;
  const id = new URLSearchParams(location.search).get('id');
  const p = PRODUCTS.find(x=>x.id===id) || PRODUCTS[0];
  const avis = REVIEWS[p.id]||[];

  el.innerHTML = `
  <section class="container" style="padding:18px 0">
    <div class="card" style="max-width:900px;margin:0 auto">
      <img src="${p.img}" alt="${p.name}" style="height:300px">
      <div style="padding:10px">
        <h2>${p.name}</h2>
        <p>${p.long}</p>
        <div class="rating">${star(p.stars)} <span>${p.stars.toFixed(1)} / 5</span></div>
        <div class="p-price">${money(p.price)}</div>
        <div class="stockline">${p.stock>0?`${p.stock} en stock`:`<b>RUPTURE</b>`}</div>
        ${isAdmin?`
          <div class="admin-tools">
            <label>Prix <input id="edit-price" type="number" step="0.1" value="${p.price}"></label>
            <label>Stock <input id="edit-stock" type="number" step="1" value="${p.stock}"></label>
            <label>Desc <input id="edit-long" type="text" value="${p.long}"></label>
            <button class="btn" id="save-fiche">Enregistrer</button>
          </div>`:''}
        <a class="btn" href="avis.html?id=${p.id}">Voir les avis</a>
      </div>
    </div>

    <h3 style="margin:16px 0 8px">Vous aimerez aussi…</h3>
    <div id="suggest" class="strip"></div>

    <h3 style="margin:18px 0 8px">Avis récents</h3>
    ${avis.length? `<ul style="list-style:none;padding:0;margin:0">
      ${avis.map(a=>`<li style="display:flex;gap:10px;margin:8px 0">
         <img src="${a.photo}" alt="${a.author}" style="width:64px;height:64px;object-fit:cover;border-radius:8px;background:#eee">
         <div><b>${a.author}</b> — ${'★'.repeat(a.stars)}${'☆'.repeat(5-a.stars)}<br>${a.text}</div>
      </li>`).join('')}
    </ul>` : `<p>Pas encore d’avis pour ce produit.</p>`}
  </section>`;

  // suggestions (autres produits)
  const sug = PRODUCTS.filter(x=>x.id!==p.id).slice(0,6).map(x=>`
    <a class="best-card" href="fiche.html?id=${x.id}">
      <img src="${x.img}" alt="${x.name}"><div class="best-info"><span>${x.name}</span><span class="best-price">${money(x.price)}</span></div>
    </a>`).join('');
  byId('suggest').innerHTML = sug;

  if(isAdmin){
    byId('save-fiche').onclick = ()=>{
      p.price = parseFloat(byId('edit-price').value)||0;
      p.stock = parseInt(byId('edit-stock').value)||0;
      p.long  = byId('edit-long').value||'';
      save(LS_PRODUCTS, PRODUCTS);
      alert('Enregistré');
    };
  }
}

function renderMarkets(target){
  const el = byId(target); if(!el) return;
  el.innerHTML = `
    <tr><th>Date</th><th>Ville</th><th>Horaires</th><th>Présent</th>${isAdmin?'<th></th>':''}</tr>
    ${MARKETS.map((m,i)=>`
      <tr>
        <td>${m.date}</td><td>${m.city}</td><td>${m.hours}</td>
        <td>${m.present?'Oui':'Non'}</td>
        ${isAdmin?`<td><button data-i="${i}" class="btn small del">Suppr</button></td>`:''}
      </tr>`).join('')}
  `;

  if(isAdmin){
    const admin = document.querySelector('[data-admin="Marchés"]');
    const box = (window.marketAdminSel || {}).sel; // noop
    // gestion ajout
    const addBtn = qs('#m-add');
    if(addBtn){
      addBtn.onclick = ()=>{
        const d = qs('#m-date').value, c = qs('#m-city').value.trim(), h = qs('#m-hour').value.trim();
        if(!d||!c) return alert('Date + Ville obligatoires');
        MARKETS.push({date:d, city:c, hours:h, present:true});
        save(LS_MARKETS, MARKETS); renderMarkets(target);
        qs('#m-city').value=''; qs('#m-hour').value='';
      };
    }
    el.addEventListener('click', e=>{
      const b = e.target.closest('.del'); if(!b) return;
      MARKETS.splice(parseInt(b.dataset.i),1);
      save(LS_MARKETS, MARKETS); renderMarkets(target);
    });
  }
}

function renderGallery(target){
  const el = byId(target); if(!el) return;
  // Simple : on réutilise les images produits comme galerie
  el.innerHTML = PRODUCTS.map(p=>`
    <article class="card"><img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3><p>${p.short}</p>
    </article>`).join('');
}

/* ==== ADMIN (PIN) ==== */
function attachAdmin(pageName, opts={}){
  const fab = byId('admin-fab'); if(!fab) return;
  fab.onclick = ()=>{
    if(!isAdmin){
      const pin = prompt('Code admin ?');
      if(pin===ADMIN_PIN){ isAdmin=true; alert('Mode admin activé'); refreshFor(pageName, opts); }
      else alert('Code incorrect');
    }else{
      if(confirm('Quitter le mode admin ?')){ isAdmin=false; alert('Admin désactivé'); refreshFor(pageName, opts); }
    }
  };
}
function refreshFor(page, opts){
  if(page==='Accueil'){ renderBestSellers('best-strip',6); renderProducts('home-grid',6); }
  if(page==='Produits'){ renderProducts('all-products'); }
  if(page==='Fiche'){ renderFiche('fiche'); }
  if(page==='Marchés'){ window.marketAdminSel = {sel: opts.marketAdmin}; 
    document.querySelector(opts.marketAdmin)?.classList.toggle('hidden', !isAdmin);
    renderMarkets('markets'); 
  }
}
