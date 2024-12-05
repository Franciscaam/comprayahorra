import { db } from './firebase-config.js';
import { collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

// Renderizar lista de productos en el panel de administración
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
                    </div>
                </div>
            </div>
        `;
    });
}

// Manejo del formulario para agregar producto
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

// Renderizar productos al cargar la página
renderAdminProducts();
