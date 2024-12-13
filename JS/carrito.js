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
    const totalElement = document.getElementById('total');
    let total = 0;

    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p class="text-center">El carrito está vacío.</p>';
        totalElement.textContent = 'Total: $0 CLP';
        return;
    }

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

    totalElement.textContent = `Total: $${total.toLocaleString()} CLP`;

    // Actualizar el valor para PayPal (en dólares, por ejemplo: convertir de CLP a USD)
    const usdConversionRate = 0.0013; // Aproximadamente 1 CLP a USD
    const paypalAmount = total * usdConversionRate;
    document.getElementById('paypal-amount').value = paypalAmount.toFixed(2);
}

// Eliminar producto del carrito
function eliminarDelCarrito(id) {
    let carrito = cargarCarrito();
    carrito = carrito.filter(producto => producto.id !== id);
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

    // Limpiar carrito
    localStorage.removeItem('carrito');
    alert('Compra realizada con éxito.');
    renderCarrito();
});

// Hacer las funciones accesibles globalmente para el HTML
window.eliminarDelCarrito = eliminarDelCarrito;

// Inicializar la página del carrito
renderCarrito();
