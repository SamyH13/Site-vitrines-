<script type="module">
// === firebase-config.js ===
// Charge les SDK Firebase (version modules)
import { initializeApp }    from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth }          from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore }     from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getStorage }       from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

// ⚠️ Garde exactement TA config :
const firebaseConfig = {
  apiKey: "AIzaSyDd-wmlJDIScJSWNyefvlLNyurT3zAc_hk",
  authDomain: "site-vitrine-d2a44.firebaseapp.com",
  projectId: "site-vitrine-d2a44",
  storageBucket: "site-vitrine-d2a44.firebasestorage.app",
  messagingSenderId: "155990687587",
  appId: "1:155990687587:web:a6d449c3bf02e9eb17dd56"
};

// Initialise l’app + expose les services pour le reste du site
const app = initializeApp(firebaseConfig);
window.firebaseServices = {
  app,
  auth: getAuth(app),
  db: getFirestore(app),
  storage: getStorage(app),
};
</script>
