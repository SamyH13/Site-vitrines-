// Import des fonctions Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// Configuration Firebase de ton projet
const firebaseConfig = {
  apiKey: "AIzaSyDd-wmlJDIScJSWNyefvlLNyurT3zAc_hk",
  authDomain: "site-vitrine-d2a44.firebaseapp.com",
  projectId: "site-vitrine-d2a44",
  storageBucket: "site-vitrine-d2a44.appspot.com",  // ✅ corrigé ici
  messagingSenderId: "155990687587",
  appId: "1:155990687587:web:a6d449c3bf02e9eb17dd56"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
