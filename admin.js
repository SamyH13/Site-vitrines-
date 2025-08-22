// === admin.js ===
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
  collection, addDoc, updateDoc, deleteDoc, doc,
  onSnapshot, serverTimestamp, query, orderBy
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

import {
  ref as storageRef, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

// Raccourcis services
const { auth, db, storage } = window.firebaseServices;

// --------- Sélecteurs
const el = (id) => document.getElementById(id);
const loginCard = el('loginCard');
const dash = el('dash');
const loginEmail = el('loginEmail');
const loginPassword = el('loginPassword');
const loginMsg = el('loginMsg');
const btnLogin = el('btnLogin');
const btnLogout = el('btnLogout');
const userEmail = el('userEmail');

const formTitle = el('formTitle');
const docId = el('docId');
const nameInput = el('name');
const categoryInput = el('category');
const priceInput = el('price');
const stockInput = el('stock');
const descInput = el('desc');
const imageFile = el('imageFile');
const imageUrl = el('imageUrl');
const btnSave = el('btnSave');
const btnReset = el('btnReset');
const formMsg = el('formMsg');

const productsTbody = el('productsTbody');

// --------- Auth
btnLogin?.addEventListener('click', async () => {
  loginMsg.textContent = "Connexion…";
  try {
    await signInWithEmailAndPassword(auth, loginEmail.value.trim(), loginPassword.value);
    loginMsg.textContent = "";
  } catch (e) {
    loginMsg.textContent = "Erreur : " + (e?.message || e);
  }
});

btnLogout?.addEventListener('click', async () => {
  try { await signOut(auth); } catch {}
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginCard.classList.add('hide');
    dash.classList.remove('hide');
    btnLogout.classList.remove('hide');
    userEmail.textContent = user.email || '';
  } else {
    loginCard.classList.remove('hide');
    dash.classList.add('hide');
    btnLogout.classList.add('hide');
    userEmail.textContent = '';
  }
});

// --------- Helpers
function resetForm() {
  docId.value = "";
  formTitle.textContent = "Nouveau produit";
  nameInput.value = "";
  categoryInput.value = "";
  priceInput.value = "";
  stockInput.value = "";
  descInput.value = "";
  imageFile.value = "";
  imageUrl.value = "";
  formMsg.textContent = "";
}

btnReset?.addEventListener('click', resetForm);

// Upload image si fichier sélectionné → retourne l’URL
async function maybeUploadImage() {
  const file = imageFile.files?.[0];
  if (!file) return null;
  const filePath = `products/${Date.now()}_${file.name}`;
  const ref = storageRef(storage, filePath);
  await uploadBytes(ref, file);
  return await getDownloadURL(ref);
}

// --------- CRUD Produits
btnSave?.addEventListener('click', async () => {
  try {
    formMsg.style.color = "#111";
    formMsg.textContent = "Enregistrement…";

    // récup champs
    const data = {
      name: nameInput.value.trim(),
      category: categoryInput.value.trim(),
      price: Number(priceInput.value || 0),
      stock: Number(stockInput.value || 0),
      desc: (descInput.value || "").trim(),
      imageUrl: (imageUrl.value || "").trim(),
      updatedAt: serverTimestamp(),
    };

    // upload fichier si présent
    const uploaded = await maybeUploadImage();
    if (uploaded) data.imageUrl = uploaded;

    // validations simples
    if (!data.name) throw new Error("Le nom est obligatoire.");
    if (!data.category) throw new Error("La catégorie est obligatoire.");
    if (Number.isNaN(data.price)) throw new Error("Prix invalide.");
    if (Number.isNaN(data.stock)) throw new Error("Stock invalide.");

    if (docId.value) {
      // UPDATE
      const ref = doc(db, "products", docId.value);
      await updateDoc(ref, data);
      formMsg.style.color = "#2e7d32";
      formMsg.textContent = "Produit mis à jour.";
    } else {
      // CREATE
      await addDoc(collection(db, "products"), {
        ...data,
        createdAt: serverTimestamp(),
      });
      formMsg.style.color = "#2e7d32";
      formMsg.textContent = "Produit ajouté.";
    }

    resetForm();
  } catch (e) {
    formMsg.style.color = "#e53935";
    formMsg.textContent = "Erreur : " + (e?.message || e);
  }
});

// Liste en temps réel
const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
onSnapshot(q, (snap) => {
  productsTbody.innerHTML = "";
  snap.forEach((d) => {
    const p = d.data() || {};
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img class="thumb" src="${p.imageUrl || ""}" alt="" /></td>
      <td><strong>${p.name || ""}</strong></td>
      <td><span class="badge">${p.category || ""}</span></td>
      <td>${(p.price ?? 0).toString()} €</td>
      <td>${(p.stock ?? 0).toString()}</td>
      <td>${(p.desc || "").slice(0,140)}${(p.desc||"").length>140?"…":""}</td>
      <td>
        <div class="actions">
          <button class="btn secondary" data-edit="${d.id}">Modifier</button>
          <button class="btn danger" data-del="${d.id}">Supprimer</button>
        </div>
      </td>
    `;
    productsTbody.appendChild(tr);
  });

  // Boutons Modifier / Supprimer
  productsTbody.querySelectorAll("[data-edit]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-edit");
      const docData = snap.docs.find(x => x.id === id)?.data();
      if (!docData) return;
      docId.value = id;
      formTitle.textContent = "Modifier le produit";
      nameInput.value = docData.name || "";
      categoryInput.value = docData.category || "";
      priceInput.value = docData.price ?? "";
      stockInput.value = docData.stock ?? "";
      descInput.value = docData.desc || "";
      imageUrl.value = docData.imageUrl || "";
      imageFile.value = ""; // on ne pré-remplit pas un input file
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  productsTbody.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-del");
      if (!confirm("Supprimer ce produit ?")) return;
      try {
        await deleteDoc(doc(db, "products", id));
      } catch (e) {
        alert("Erreur : " + (e?.message || e));
      }
    });
  });
});
