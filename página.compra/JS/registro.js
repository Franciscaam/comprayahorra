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
    }
});
