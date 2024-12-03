import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { db } from './firebase-config.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const auth = getAuth();
const perfilForm = document.getElementById('perfil-form');
const cerrarSesionBtn = document.getElementById('cerrar-sesion');

let userId;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        userId = user.uid;
        const userDoc = await getDoc(doc(db, 'usuarios', userId));
        if (userDoc.exists()) {
            const data = userDoc.data();
            document.getElementById('nombre').value = data.nombre;
            document.getElementById('run').value = data.run;
            document.getElementById('telefono').value = data.telefono;
            document.getElementById('email').value = data.email;

            // Mostrar opción de admin si corresponde
            if (data.rol === 'admin') {
                document.querySelector('.admin-only').classList.remove('d-none');
            }
        } else {
            alert('No se encontraron datos del usuario.');
        }
    } else {
        alert('Debes iniciar sesión para acceder a tu perfil.');
        window.location.href = 'login.html';
    }
});

perfilForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;

    try {
        await updateDoc(doc(db, 'usuarios', userId), {
            nombre,
            telefono,
        });
        alert('Perfil actualizado correctamente.');
    } catch (error) {
        console.error('Error al actualizar el perfil:', error);
        alert('Hubo un problema al actualizar tu perfil.');
    }
});

cerrarSesionBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'login.html';
    });
});
