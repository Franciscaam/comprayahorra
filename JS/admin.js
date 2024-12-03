import { db } from './firebase-config.js';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

async function renderAdminProducts() {
    const productosSnapshot = await getDocs(collection(db, 'productos'));
    const productos = productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const adminList = document.getElementById('product-admin-list');
    adminList.innerHTML = '';
    productos.forEach(producto => {
        adminList.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <h5>${producto.nombre}</h5>
                    <p>${producto.descripcion}</p>
                    <p><strong>Precio:</strong> $${producto.precio}</p>
                    <button class="btn btn-danger" onclick="deleteProduct('${producto.id}')">Eliminar</button>
                </div>
            </div>
        `;
    });
}

async function deleteProduct(productId) {
    await deleteDoc(doc(db, 'productos', productId));
    alert('Producto eliminado');
    renderAdminProducts();
}

document.getElementById('add-product').addEventListener('click', async () => {
    const nombre = prompt('Nombre del producto:');
    const descripcion = prompt('Descripción:');
    const precio = parseFloat(prompt('Precio:'));
    const imagen = prompt('URL de la imagen:');
    await addDoc(collection(db, 'productos'), { nombre, descripcion, precio, imagen });
    alert('Producto agregado');
    renderAdminProducts();
});

renderAdminProducts();
