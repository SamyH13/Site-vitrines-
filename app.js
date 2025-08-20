/* ========= OUTILS ========= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const stars = n => "★".repeat(Math.round(n)) + "☆".repeat(5 - Math.round(n));

/* ========= PRODUITS.HTML ========= */
(function renderProductsList(){
  const wrap = $("#liste-produits");
  if(!wrap) return;

  produits.forEach(p => {
    wrap.insertAdjacentHTML("beforeend", `
      <article class="card">
        <img src="${p.image}" alt="${p.nom}">
        <h3>${p.nom}</h3>
        <p>${p.short}</p>
        <div class="rating">${stars(p.notes)} <span>${p.notes.toFixed(1)} / 5</span></div>
        <div style="display:flex; gap:10px; justify-content:center">
          <a class="btn" href="fiche.html?id=${encodeURIComponent(p.id)}">Voir la fiche</a>
          <a class="btn secondary" href="avis.html?id=${encodeURIComponent(p.id)}">Voir les avis</a>
        </div>
      </article>
    `);
  });
})();

/* ========= FICHE.HTML ========= */
(function renderProductPage(){
  const ficheWrap = $("#fiche-wrap");
  if(!ficheWrap) return;

  const id = new URLSearchParams(location.search).get("id");
  const p = produits.find(x => x.id === id) || produits[0];
  const sug = produits.filter(x => p.suggestions.includes(x.id)).slice(0,3);

  ficheWrap.innerHTML = `
    <section class="fiche">
      <div class="fiche-img"><img src="${p.image}" alt="${p.nom}"></div>
      <div class="fiche-info">
        <h1>${p.nom}</h1>
        <p>${p.description}</p>
        <div class="rating">${stars(p.notes)} <span>${p.notes.toFixed(1)} / 5</span></div>
        <a class="btn" href="avis.html?id=${encodeURIComponent(p.id)}">Voir les avis clients</a>
      </div>
    </section>

    <section class="suggestions">
      <h2>Vous aimerez aussi…</h2>
      <div class="cards">
        ${sug.map(s => `
          <article class="card">
            <img src="${s.image}" alt="${s.nom}">
            <h3>${s.nom}</h3>
            <a class="btn" href="fiche.html?id=${encodeURIComponent(s.id)}">Découvrir</a>
          </article>
        `).join("")}
      </div>
    </section>
  `;
})();

/* ========= AVIS.HTML (option, si tu l’utilises) ========= */
(function renderReviews(){
  const avisContainer = $("#avis-container");
  if(!avisContainer) return;

  const id = new URLSearchParams(location.search).get("id");
  const p = produits.find(x => x.id === id) || produits[0];

  avisContainer.innerHTML = `
    <h1>${p.nom}</h1>
    <div class="rating" style="margin-bottom:16px">${stars(p.notes)} <span>${p.notes.toFixed(1)} / 5</span></div>
    <ul class="avis-list">
      ${p.avis.map(a => `
        <li class="avis">
          ${a.photo ? `<img src="${a.photo}" alt="photo">` : ""}
          <div>
            <b>${a.auteur}</b> — ${stars(a.note)}
            <p>${a.texte}</p>
          </div>
        </li>
      `).join("")}
    </ul>
  `;
})();

/* ========= MARCHES.HTML (option, si tu l’utilises) ========= */
(function renderMarkets(){
  const body = $("#tbody-marches");
  if(!body) return;

  // tri par date croissante
  const rows = [...marches].sort((a,b)=> a.date.localeCompare(b.date));
  rows.forEach(m => {
    body.insertAdjacentHTML("beforeend", `
      <tr>
        <td>${m.date}</td>
        <td>${m.lieu}</td>
        <td>${m.horaire}</td>
        <td>${m.statut === "annule" ? "Annulé" : "OK"}</td>
      </tr>
    `);
  });
})();
