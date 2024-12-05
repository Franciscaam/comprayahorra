import { db } from './firebase-config.js';
<<<<<<< HEAD
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    getDoc,
} from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

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
                        <button class="btn btn-warning mt-2" onclick="registrarVenta('${producto.id}', ${producto.stock}, ${producto.precio})">Registrar Venta</button>
                    </div>
=======
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
>>>>>>> adfec6722ea876cee011ad0804b08833ba4cf0da
                </div>
            </div>
        `;
    });
}

async function deleteProduct(productId) {
<<<<<<< HEAD
    try {
        await deleteDoc(doc(db, 'productos', productId));
        alert('Producto eliminado exitosamente.');
        renderAdminProducts();
    } catch (error) {
        console.error('Error al eliminar el producto:', error.message);
        alert(`Error al eliminar el producto: ${error.message}`);
    }
}

async function editarProducto(productId) {
    try {
        const productDoc = await getDoc(doc(db, 'productos', productId));
        if (productDoc.exists()) {
            const producto = productDoc.data();

            // Llenar el formulario de edición
            document.getElementById('edit-id').value = productId;
            document.getElementById('edit-nombre').value = producto.nombre;
            document.getElementById('edit-descripcion').value = producto.descripcion;
            document.getElementById('edit-precio').value = producto.precio;
            document.getElementById('edit-categoria').value = producto.categoria;
            document.getElementById('edit-stock').value = producto.stock;
            document.getElementById('edit-imagen').value = producto.imagen;

            const modal = new bootstrap.Modal(document.getElementById('editProductModal'));
            modal.show();
        } else {
            alert('Producto no encontrado.');
        }
    } catch (error) {
        console.error('Error al cargar el producto para editar:', error.message);
        alert('Error al cargar el producto.');
    }
}

async function registrarVenta(productId, stockDisponible, precioVenta) {
    const cantidadVendida = parseInt(prompt('Ingrese la cantidad vendida:'), 10);
    if (isNaN(cantidadVendida) || cantidadVendida <= 0 || cantidadVendida > stockDisponible) {
        alert('Cantidad inválida.');
        return;
    }

    const totalVenta = precioVenta * cantidadVendida;
    const iva = totalVenta * 0.19; // 19% IVA
    const fechaVenta = new Date();

    try {
        // Registrar la venta en Firestore
        await addDoc(collection(db, 'ventas'), {
            productoId,
            cantidadVendida,
            precioVenta,
            iva,
            fechaVenta,
        });

        // Actualizar el stock del producto
        await updateDoc(doc(db, 'productos', productId), {
            stock: stockDisponible - cantidadVendida,
        });

        alert('Venta registrada exitosamente.');
        renderAdminProducts(); // Actualizar productos
    } catch (error) {
        console.error('Error al registrar la venta:', error.message);
        alert(`Error al registrar la venta: ${error.message}`);
    }
}

// Hacer las funciones accesibles desde el HTML
window.deleteProduct = deleteProduct;
window.editarProducto = editarProducto;
window.registrarVenta = registrarVenta;
=======
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
>>>>>>> adfec6722ea876cee011ad0804b08833ba4cf0da

renderAdminProducts();