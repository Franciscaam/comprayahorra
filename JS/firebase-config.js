<<<<<<< HEAD
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
=======
// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
>>>>>>> adfec6722ea876cee011ad0804b08833ba4cf0da

const firebaseConfig = {
  apiKey: "AIzaSyDjEYkB7x3Cr4DqiWW99DTM-n0U7dUi9SA",
  authDomain: "comprayahorra-64d1b.firebaseapp.com",
  projectId: "comprayahorra-64d1b",
  storageBucket: "comprayahorra-64d1b.appspot.com",
  messagingSenderId: "758003505488",
  appId: "1:758003505488:web:dbf3945461d5f0a633b455",
  measurementId: "G-PT9G7B16EH"
};

<<<<<<< HEAD
// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
=======
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
>>>>>>> adfec6722ea876cee011ad0804b08833ba4cf0da
