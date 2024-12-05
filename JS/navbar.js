import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
import { getDoc, doc } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

// Verificar autenticación y rol del usuario
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
        if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.rol === 'administrador') {
                document.querySelector('.admin-only').classList.remove('d-none');
            }
        } else {
            console.error('No se encontró el documento del usuario en Firestore.');
        }
    } else {
        console.log('No hay usuario autenticado.');
        window.location.href = 'login.html';
    }
});
// Manejo de cierre de sesión
document.getElementById('logout').addEventListener('click', async () => {
    try {
        await auth.signOut();
        alert('Sesión cerrada.');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
    }
});
