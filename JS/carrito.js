// Cargar carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Renderizar productos en el carrito
function renderCarrito() {
    const carrito = cargarCarrito();
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p class="text-center">El carrito está vacío.</p>';
        return;
    }

    carrito.forEach(producto => {
        carritoContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Cantidad: ${producto.cantidad}</p>
                        <p class="card-text">Precio unitario: $${producto.precio}</p>
                        <p class="card-text">Subtotal: $${producto.precio * producto.cantidad}</p>
                        <button class="btn btn-danger" onclick="eliminarDelCarrito('${producto.id}')">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    let carrito = cargarCarrito();
    carrito = carrito.filter(producto => producto.id !== id);

    // Guardar cambios en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderCarrito();
}

// Finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
    const carrito = cargarCarrito();

    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    // Limpiar carrito
    localStorage.removeItem('carrito');
    alert('Compra realizada con éxito.');
    renderCarrito();
});

// Inicializar la página del carrito
renderCarrito();
