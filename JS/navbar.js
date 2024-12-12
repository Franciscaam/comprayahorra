import { auth, db } from './firebase-config.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
import { getDoc, doc } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

// Verificar autenticación y rol del usuario
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const userDoc = await getDoc(doc(db, 'usuarios', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log(`Usuario autenticado: ${userData.nombre} (${userData.rol})`);

                // Mostrar opciones de administración solo para administradores
                if (userData.rol === 'administrador') {
                    document.querySelectorAll('.admin-only').forEach((el) => {
                        el.classList.remove('d-none');
                    });
                }
            } else {
                console.error('No se encontró el documento del usuario en Firestore.');
            }
        } catch (error) {
            console.error('Error al obtener los datos del usuario:', error.message);
        }
    } else {
        console.log('No hay usuario autenticado.');
        // Mostrar opciones mínimas para usuarios no autenticados
        document.querySelectorAll('.admin-only').forEach((el) => {
            el.classList.add('d-none');
        });
    }
});

// Manejo de cierre de sesión
document.getElementById('logout').addEventListener('click', async () => {
    try {
        await auth.signOut();
        alert('Sesión cerrada.');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error al cerrar sesión:', error.message);
    }
});
