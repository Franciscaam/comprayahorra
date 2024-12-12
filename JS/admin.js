import { db } from './firebase-config.js';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    getDoc,
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

// Renderizar lista de productos
async function renderAdminProducts() {
    const productosSnapshot = await getDocs(collection(db, 'productos'));
    const productos = productosSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    const adminList = document.getElementById('product-admin-list');
    adminList.innerHTML = '';
    productos.forEach((producto) => {
        adminList.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-3">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body">
                        <h5>${producto.nombre}</h5>
                        <p><strong>Categoría:</strong> ${producto.categoria}</p>
                        <p><strong>Descripción:</strong> ${producto.descripcion}</p>
                        <p><strong>Precio de Venta:</strong> $${producto.precio}</p>
                        <p><strong>Stock:</strong> ${producto.stock}</p>
                        <button class="btn btn-primary" onclick="editarProducto('${producto.id}')">Editar</button>
                        <button class="btn btn-danger mt-2" onclick="deleteProduct('${producto.id}')">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Agregar producto
document.getElementById('add-product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const categoria = document.getElementById('categoria').value;
    const nombre = document.getElementById('nombre').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const precio = parseFloat(document.getElementById('precio').value);
    const precioCompra = parseFloat(document.getElementById('precioCompra').value);
    const stock = parseInt(document.getElementById('stock').value, 10);
    const fechaLlegada = document.getElementById('fechaLlegada').value;
    const imagen = document.getElementById('imagen').value.trim();

    try {
        await addDoc(collection(db, 'productos'), {
            categoria,
            nombre,
            descripcion,
            precio,
            precioCompra,
            stock,
            fechaLlegada: new Date(fechaLlegada),
            imagen,
        });
        alert('Producto agregado exitosamente.');
        document.getElementById('add-product-form').reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('addProductModal'));
        modal.hide();
        renderAdminProducts();
    } catch (error) {
        console.error('Error al guardar el producto:', error.message);
        alert(`Error: ${error.message}`);
    }
});

// Editar producto
async function editarProducto(productId) {
    const productDoc = await getDoc(doc(db, 'productos', productId));
    if (productDoc.exists()) {
        const producto = productDoc.data();

        document.getElementById('edit-id').value = productId;
        document.getElementById('edit-categoria').value = producto.categoria;
        document.getElementById('edit-nombre').value = producto.nombre;
        document.getElementById('edit-descripcion').value = producto.descripcion;
        document.getElementById('edit-precio').value = producto.precio;
        document.getElementById('edit-precioCompra').value = producto.precioCompra;
        document.getElementById('edit-stock').value = producto.stock;
        document.getElementById('edit-fechaLlegada').value = producto.fechaLlegada.toDate().toISOString().slice(0, 10);
        document.getElementById('edit-imagen').value = producto.imagen;

        const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
        modal.show();
    }
}

// Guardar cambios en producto editado
document.getElementById('edit-product-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const productId = document.getElementById('edit-id').value;
    const categoria = document.getElementById('edit-categoria').value;
    const nombre = document.getElementById('edit-nombre').value.trim();
    const descripcion = document.getElementById('edit-descripcion').value.trim();
    const precio = parseFloat(document.getElementById('edit-precio').value);
    const precioCompra = parseFloat(document.getElementById('edit-precioCompra').value);
    const stock = parseInt(document.getElementById('edit-stock').value, 10);
    const fechaLlegada = document.getElementById('edit-fechaLlegada').value;
    const imagen = document.getElementById('edit-imagen').value.trim();

    try {
        await updateDoc(doc(db, 'productos', productId), {
            categoria,
            nombre,
            descripcion,
            precio,
            precioCompra,
            stock,
            fechaLlegada: new Date(fechaLlegada),
            imagen,
        });
        alert('Producto actualizado exitosamente.');
        const modal = bootstrap.Modal.getInstance(document.getElementById('editProductModal'));
        modal.hide();
        renderAdminProducts();
    } catch (error) {
        console.error('Error al actualizar el producto:', error.message);
        alert(`Error: ${error.message}`);
    }
});

// Eliminar producto
async function deleteProduct(productId) {
    try {
        await deleteDoc(doc(db, 'productos', productId));
        alert('Producto eliminado exitosamente.');
        renderAdminProducts();
    } catch (error) {
        console.error('Error al eliminar el producto:', error.message);
        alert(`Error al eliminar el producto: ${error.message}`);
    }
}

// Hacer accesibles las funciones desde HTML
window.editarProducto = editarProducto;
window.deleteProduct = deleteProduct;

// Renderizar productos al cargar la página
renderAdminProducts();
