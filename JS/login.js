<<<<<<< HEAD
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';

const firebaseConfig = {
    apiKey: "AIzaSyDjEYkB7x3Cr4DqiWW99DTM-n0U7dUi9SA",
    authDomain: "comprayahorra-64d1b.firebaseapp.com",
    projectId: "comprayahorra-64d1b",
    storageBucket: "comprayahorra-64d1b.appspot.com",
    messagingSenderId: "758003505488",
    appId: "1:758003505488:web:dbf3945461d5f0a633b455",
    measurementId: "G-PT9G7B16EH"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Manejar el formulario de inicio de sesión
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Usuario autenticado:', userCredential.user);
        alert('Inicio de sesión exitoso');
        // Redirige al usuario a la página principal
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error en el inicio de sesión:', error.message);
        alert(`Error: ${error.message}`);
=======
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebase-config.js';
import { doc, getDoc } from 'firebase/firestore';

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();
    try {
        // Iniciar sesión con Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Verificar rol en Firestore
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.rol === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'index.html';
            }
        } else {
            alert('Usuario no registrado correctamente.');
        }
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        alert('Correo o contraseña incorrectos.');
>>>>>>> adfec6722ea876cee011ad0804b08833ba4cf0da
    }
});
