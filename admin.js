// admin.js
import { auth, db, storage } from "./firebase-config.js";
import { 
  signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  collection, addDoc, getDocs, deleteDoc, doc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { 
  ref, uploadBytes, getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

// ------------------- AUTH -------------------
const loginDiv = document.getElementById("loginDiv");
const dashboard = document.getElementById("dashboard");

document.getElementById("btnLogin").onclick = async () => {
  const email = document.getElementById("email").value.trim();
  const pass = document.getElementById("pass").value.trim();
  try {
    await signInWithEmailAndPassword(auth, email, pass);
  } catch (e) {
    alert(`Erreur de connexion : ${e.code}`);
  }
};

document.getElementById("btnLogout").onclick = async () => {
  await signOut(auth);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    loginDiv.style.display = "none";
    dashboard.style.display = "block";
    chargerProduits();
    chargerMarches();
    chargerAvis();
  } else {
    loginDiv.style.display = "block";
    dashboard.style.display = "none";
  }
});

// ------------------- PRODUITS -------------------
const produitsDiv = document.getElementById("produits");

async function chargerProduits() {
  produitsDiv.innerHTML = "";
  const snap = await getDocs(collection(db, "produits"));
  snap.forEach((docSnap) => {
    const p = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <b>${p.nom}</b> - ${p.prix} € - Stock: ${p.stock}<br>
      ${p.description}<br>
      <img src="${p.image || ""}" width="80"><br>
      <button onclick="supprimerProduit('${docSnap.id}')">Supprimer</button>
      <hr>`;
    produitsDiv.appendChild(div);
  });
}

document.getElementById("addProduitForm").onsubmit = async (e) => {
  e.preventDefault();
  const nom = document.getElementById("nomProduit").value;
  const description = document.getElementById("descProduit").value;
  const prix = document.getElementById("prixProduit").value;
  const stock = document.getElementById("stockProduit").value;
  const fichier = document.getElementById("imgProduit").files[0];
  let imageURL = "";

  if (fichier) {
    const storageRef = ref(storage, "produits/" + fichier.name);
    await uploadBytes(storageRef, fichier);
    imageURL = await getDownloadURL(storageRef);
  }

  await addDoc(collection(db, "produits"), { nom, description, prix, stock, image: imageURL });
  alert("Produit ajouté !");
  chargerProduits();
};

window.supprimerProduit = async (id) => {
  await deleteDoc(doc(db, "produits", id));
  chargerProduits();
};

// ------------------- MARCHÉS -------------------
const marchesDiv = document.getElementById("marches");

async function chargerMarches() {
  marchesDiv.innerHTML = "";
  const snap = await getDocs(collection(db, "marches"));
  snap.forEach((docSnap) => {
    const m = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <b>${m.ville}</b> - ${m.date} (${m.horaire})<br>
      <button onclick="supprimerMarche('${docSnap.id}')">Supprimer</button>
      <hr>`;
    marchesDiv.appendChild(div);
  });
}

document.getElementById("addMarcheForm").onsubmit = async (e) => {
  e.preventDefault();
  const ville = document.getElementById("villeMarche").value;
  const date = document.getElementById("dateMarche").value;
  const horaire = document.getElementById("horaireMarche").value;

  await addDoc(collection(db, "marches"), { ville, date, horaire });
  alert("Marché ajouté !");
  chargerMarches();
};

window.supprimerMarche = async (id) => {
  await deleteDoc(doc(db, "marches", id));
  chargerMarches();
};

// ------------------- AVIS -------------------
const avisDiv = document.getElementById("avis");

async function chargerAvis() {
  avisDiv.innerHTML = "";
  const snap = await getDocs(collection(db, "avis"));
  snap.forEach((docSnap) => {
    const a = docSnap.data();
    const div = document.createElement("div");
    div.innerHTML = `
      <b>${a.client}</b> sur ${a.produit} : ${a.commentaire} (⭐ ${a.note})<br>
      <button onclick="supprimerAvis('${docSnap.id}')">Supprimer</button>
      <hr>`;
    avisDiv.appendChild(div);
  });
}

window.supprimerAvis = async (id) => {
  await deleteDoc(doc(db, "avis", id));
  chargerAvis();
};
