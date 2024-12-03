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
    }
});
