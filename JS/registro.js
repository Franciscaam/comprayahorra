<<<<<<< HEAD
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

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
const db = getFirestore(app);

// Manejo del formulario de registro
document.getElementById('registro-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const run = document.getElementById('run').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

=======
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from './firebase-config.js';
import { doc, setDoc } from 'firebase/firestore';

const modal = new bootstrap.Modal(document.getElementById('feedbackModal'));
const modalMessage = document.getElementById('modalMessage');
const feedbackModalLabel = document.getElementById('feedbackModalLabel');

document.getElementById('registro-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const run = document.getElementById('run').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const auth = getAuth();
>>>>>>> adfec6722ea876cee011ad0804b08833ba4cf0da
    try {
        // Crear usuario en Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Guardar datos adicionales en Firestore
        await setDoc(doc(db, 'usuarios', user.uid), {
            nombre,
            run,
            telefono,
            email,
<<<<<<< HEAD
            rol: 'cliente', // Rol predeterminado
        });

        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.href = 'login.html'; // Redirigir al login después del registro
    } catch (error) {
        // Manejo de errores comunes
        let errorMessage;
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Este correo ya está registrado. Intenta con otro correo.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'El correo ingresado no es válido. Por favor verifica.';
                break;
            case 'auth/weak-password':
                errorMessage = 'La contraseña debe tener al menos 6 caracteres.';
                break;
            case 'firestore/permission-denied':
                errorMessage = 'No tienes permiso para guardar estos datos. Contacta al administrador.';
                break;
            default:
                errorMessage = `Hubo un problema al crear tu cuenta. Error: ${error.message}`;
                break;
        }
        alert(errorMessage); // Mostrar mensaje de error al usuario
=======
            rol: 'cliente',
        });

        // Mostrar mensaje de éxito
        feedbackModalLabel.textContent = 'Registro Exitoso';
        modalMessage.textContent = 'Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.';
        modal.show();

        // Redirigir después de 2 segundos
        setTimeout(() => {
            modal.hide();
            window.location.href = 'login.html';
        }, 2000);
    } catch (error) {
        console.error('Error en el registro:', error);

        // Mostrar mensaje de error
        feedbackModalLabel.textContent = 'Error en el Registro';
        modalMessage.textContent = `Hubo un problema al crear tu cuenta. Error: ${error.message}`;
        modal.show();
>>>>>>> adfec6722ea876cee011ad0804b08833ba4cf0da
    }
});
