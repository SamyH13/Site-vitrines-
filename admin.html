<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Administration</title>
  <style>
    :root { font-family: system-ui, sans-serif; }
    body { margin: 0; background:#f7f7f9; }
    header { display:flex; justify-content:space-between; align-items:center; padding:14px 16px; background:#111; color:#fff; }
    header h1 { font-size:18px; margin:0; }
    header button { background:#fff; border:0; padding:8px 12px; border-radius:8px; cursor:pointer; }
    .wrap { max-width:1000px; margin:20px auto; padding:0 14px; }
    .card { background:#fff; border:1px solid #e9e9ee; border-radius:12px; padding:16px; margin-bottom:16px; }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    label { font-size:13px; color:#333; margin-bottom:4px; display:block; }
    input, textarea, select { width:100%; padding:10px; border:1px solid #d9d9e3; border-radius:8px; font-size:14px; }
    textarea { min-height:80px; resize:vertical; }
    .row { display:flex; gap:10px; }
    .row > * { flex:1; }
    .actions { display:flex; gap:8px; }
    .btn { background:#111; color:#fff; border:0; padding:10px 14px; border-radius:10px; cursor:pointer; }
    .btn.secondary { background:#e9e9ee; color:#111; }
    .btn.danger { background:#e53935; }
    table { width:100%; border-collapse:collapse; }
    th, td { text-align:left; padding:10px; border-bottom:1px solid #eee; font-size:14px; vertical-align:top; }
    .thumb { width:56px; height:56px; object-fit:cover; border-radius:8px; background:#f0f0f3; }
    .badge { font-size:12px; padding:2px 8px; border-radius:999px; background:#f0f0f3; }
    #loginCard { max-width:420px; margin:60px auto; }
    #loginMsg, #formMsg { font-size:13px; color:#e53935; margin-top:8px; min-height:18px; }
    .hide { display:none; }
  </style>
</head>
<body>
  <header>
    <h1>Admin — Produits</h1>
    <div class="actions">
      <span id="userEmail" class="badge"></span>
      <button id="btnLogout" class="hide">Se déconnecter</button>
    </div>
  </header>

  <div class="wrap">

    <!-- Connexion -->
    <section id="loginCard" class="card">
      <h2>Connexion administrateur</h2>
      <div class="grid">
        <div>
          <label>Email</label>
          <input id="loginEmail" type="email" placeholder="exemple@mail.com" />
        </div>
        <div>
          <label>Mot de passe</label>
          <input id="loginPassword" type="password" placeholder="••••••••" />
        </div>
      </div>
      <div class="actions" style="margin-top:12px;">
        <button id="btnLogin" class="btn">Se connecter</button>
      </div>
      <div id="loginMsg"></div>
    </section>

    <!-- Dashboard -->
    <section id="dash" class="hide">
      <!-- Formulaire produit -->
      <div class="card">
        <h2 id="formTitle">Nouveau produit</h2>
        <input type="hidden" id="docId" />
        <div class="grid">
          <div>
            <label>Nom</label>
            <input id="name" placeholder="Parfum Oud Royal" />
          </div>
          <div>
            <label>Catégorie</label>
            <input id="category" placeholder="Parfums, Encens, Huiles…" />
          </div>
          <div class="row">
            <div>
              <label>Prix (€)</label>
              <input id="price" type="number" step="0.01" placeholder="35" />
            </div>
            <div>
              <label>Stock</label>
              <input id="stock" type="number" step="1" placeholder="10" />
            </div>
          </div>
          <div style="grid-column:1/-1;">
            <label>Description</label>
            <textarea id="desc" placeholder="Notes boisées, longue tenue…"></textarea>
          </div>
          <div>
            <label>Image produit (JPG/PNG)</label>
            <input id="imageFile" type="file" accept="image/*" />
          </div>
          <div>
            <label>URL image (si déjà hébergée)</label>
            <input id="imageUrl" placeholder="https://…" />
          </div>
        </div>

        <div class="actions" style="margin-top:12px;">
          <button id="btnSave" class="btn">Enregistrer</button>
          <button id="btnReset" class="btn secondary" type="button">Réinitialiser</button>
        </div>
        <div id="formMsg"></div>
      </div>

      <!-- Liste produits -->
      <div class="card">
        <h2>Produits</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="productsTbody"></tbody>
        </table>
      </div>
    </section>
  </div>

  <!-- 1) Firebase config d'abord -->
  <script type="module" src="./firebase-config.js"></script>
  <!-- 2) Puis la logique admin -->
  <script type="module" src="./admin.js"></script>
</body>
</html>
