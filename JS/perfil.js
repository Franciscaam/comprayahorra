
import { db } from './firebase-config.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js';
import { collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

const auth = getAuth();

// Mostrar la información del usuario
function mostrarInformacionUsuario(user) {
    const userRef = collection(db, 'usuarios');
    const q = query(userRef, where('email', '==', user.email));
    getDocs(q)
        .then(snapshot => {
            if (!snapshot.empty) {
                const data = snapshot.docs[0].data();
                console.log('Datos del usuario:', data); // Verificar los datos obtenidos
                document.getElementById('user-nombre').textContent = data.nombre || 'No especificado';
                document.getElementById('user-email').textContent = data.email || 'No especificado';
                document.getElementById('user-telefono').textContent = data.telefono || 'No especificado';
                document.getElementById('user-run').textContent = data.run || 'No especificado';
            } else {
                console.error('No se encontró el usuario en la colección usuarios.');
            }
        })
        .catch(error => {
            console.error('Error al obtener datos del usuario:', error);
        });
}
// Mostrar historial de compras
async function mostrarHistorialCompras(userId) {
    const historialContainer = document.getElementById('historial-compras');
    const comprasRef = collection(db, 'ventas');
    const q = query(comprasRef, where('userId', '==', userId));

    try {
        const snapshot = await getDocs(q);
        console.log('Ventas del usuario:', snapshot.docs.map(doc => doc.data())); // Verificar las ventas recuperadas

        if (snapshot.empty) {
            historialContainer.innerHTML = '<p class="text-center">No hay compras registradas.</p>';
            return;
        }

        snapshot.forEach(doc => {
            const compra = doc.data();
            historialContainer.innerHTML += `
                <div class="col-md-4">
                    <div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title">Compra ID: ${doc.id}</h5>
                            <p><strong>Producto ID:</strong> ${compra.productoId}</p>
                            <p><strong>Cantidad:</strong> ${compra.cantidadVendida}</p>
                            <p><strong>Precio Total:</strong> $${compra.precioVenta}</p>
                            <p><strong>IVA:</strong> $${compra.iva}</p>
                            <p><strong>Fecha:</strong> ${new Date(compra.fechaVenta.seconds * 1000).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error('Error al cargar historial de compras:', error);
    }
}


// Verificar el usuario logueado
onAuthStateChanged(auth, user => {
    if (user) {
        console.log('Usuario logueado:', user.email); // Verificar email del usuario logueado
        mostrarInformacionUsuario(user);
        mostrarHistorialCompras(user.uid);
    } else {
        console.warn('No hay un usuario logueado.');
        window.location.href = 'login.html'; // Redirigir al login si no está logueado
    }
});