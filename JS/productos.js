import { db } from './firebase-config.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js';

let carrito = [];

// Renderizar productos en la página
async function renderProductos() {
    const productosSnapshot = await getDocs(collection(db, 'productos'));
    const productos = productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const productosContainer = document.getElementById('product-list');
    productosContainer.innerHTML = '';

    productos.forEach(producto => {
        productosContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p><strong>Precio:</strong> $${producto.precio}</p>
                        <p><strong>Categoría:</strong> ${producto.categoria}</p>
                        <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito('${producto.id}', '${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Agregar producto al carrito (disponible globalmente)
window.agregarAlCarrito = function (id, nombre, precio) {
    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
        productoExistente.cantidad += 1; // Incrementar la cantidad si ya existe
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 }); // Agregar un nuevo producto
    }

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    alert(`Producto "${nombre}" agregado al carrito.`);
    console.log('Carrito actualizado:', carrito);
};

// Cargar el carrito al iniciar
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado); // Recuperar el carrito desde localStorage
    }
}

// Filtros de búsqueda
document.getElementById('filtrar').addEventListener('click', async () => {
    const categoria = document.getElementById('categoria').value;
    const buscar = document.getElementById('buscar').value.toLowerCase();

    const productosSnapshot = await getDocs(collection(db, 'productos'));
    const productos = productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const productosFiltrados = productos.filter(producto =>
        (categoria === '' || producto.categoria === categoria) &&
        (buscar === '' || producto.nombre.toLowerCase().includes(buscar))
    );

    const productosContainer = document.getElementById('product-list');
    productosContainer.innerHTML = '';

    productosFiltrados.forEach(producto => {
        productosContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p><strong>Precio:</strong> $${producto.precio}</p>
                        <p><strong>Categoría:</strong> ${producto.categoria}</p>
                        <button class="btn btn-primary mt-auto" onclick="agregarAlCarrito('${producto.id}', '${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
                    </div>
                </div>
            </div>
        `;
    });
});

// Inicializar página
cargarCarrito(); // Cargar el carrito desde localStorage
renderProductos(); // Renderizar los productos
