import { db } from './firebase-config.js';
import { collection, getDocs, query, where } from 'firebase/firestore';

const productList = document.getElementById('product-list');
const filtroCategoria = document.getElementById('categoria');
const filtroBuscar = document.getElementById('buscar');
const filtrarBtn = document.getElementById('filtrar');

// Función para cargar productos desde Firestore
async function cargarProductos(categoria = '', busqueda = '') {
    productList.innerHTML = '<p class="text-center">Cargando productos...</p>';

    let productosQuery = collection(db, 'productos');
    if (categoria) {
        productosQuery = query(productosQuery, where('categoria', '==', categoria));
    }

    try {
        const productosSnapshot = await getDocs(productosQuery);
        const productos = productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const productosFiltrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );

        renderProductos(productosFiltrados);
    } catch (error) {
        console.error('Error al cargar productos:', error);
        productList.innerHTML = '<p class="text-center text-danger">Error al cargar los productos.</p>';
    }
}

// Función para mostrar los productos en el DOM
function renderProductos(productos) {
    productList.innerHTML = '';

    if (productos.length === 0) {
        productList.innerHTML = '<p class="text-center">No se encontraron productos.</p>';
        return;
    }

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('col-md-4', 'mb-4');
        productoDiv.innerHTML = `
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p><strong>Precio:</strong> $${producto.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito('${producto.id}')">Agregar al Carrito</button>
                </div>
            </div>
        `;
        productList.appendChild(productoDiv);
    });
}

// Función para agregar un producto al carrito
window.agregarAlCarrito = function (productoId) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(productoId);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito.');
};

// Eventos para filtrar productos
filtrarBtn.addEventListener('click', () => {
    const categoria = filtroCategoria.value;
    const busqueda = filtroBuscar.value;
    cargarProductos(categoria, busqueda);
});

// Cargar productos al inicio
cargarProductos();
