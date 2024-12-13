// Cargar carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Renderizar productos en el carrito
function renderCarrito() {
    const carrito = cargarCarrito();
    const carritoContainer = document.getElementById('carrito-container');
    const totalContainer = document.getElementById('total-container');
    carritoContainer.innerHTML = '';
    totalContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p class="text-center">El carrito está vacío.</p>';
        totalContainer.innerHTML = '<p class="text-center">Total: $0</p>';
        return;
    }

    let total = 0;

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        carritoContainer.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Cantidad: ${producto.cantidad}</p>
                        <p class="card-text">Precio unitario: $${producto.precio}</p>
                        <p class="card-text">Subtotal: $${subtotal}</p>
                        <button class="btn btn-danger" onclick="eliminarDelCarrito('${producto.id}')">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });

    totalContainer.innerHTML = `<p class="text-end fw-bold">Total: $${total}</p>`;
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    let carrito = cargarCarrito();
    carrito = carrito.filter(producto => producto.id !== id);

    // Guardar cambios en localStorage
    guardarCarrito(carrito);
    renderCarrito();
}

// Finalizar compra
document.getElementById('finalizar-compra').addEventListener('click', () => {
    const carrito = cargarCarrito();

    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    // Aquí puedes agregar lógica adicional para registrar la compra en una base de datos si es necesario.

    // Limpiar carrito
    localStorage.removeItem('carrito');
    alert('Compra realizada con éxito.');
    renderCarrito();
});

// Inicializar la página del carrito
renderCarrito();
