import { db } from './firebase-config.js';
import { collection, getDocs } from 'firebase/firestore';

async function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productosSnapshot = await getDocs(collection(db, 'productos'));
    const productos = productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const cartItems = productos.filter(producto => cart.includes(producto.id));

    const cartTable = document.getElementById('cart-items');
    let total = 0;
    cartTable.innerHTML = '';
    cartItems.forEach(item => {
        total += item.precio;
        cartTable.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>1</td>
                <td>$${item.precio}</td>
                <td>$${item.precio}</td>
                <td><button class="btn btn-danger" onclick="removeFromCart('${item.id}')">Eliminar</button></td>
            </tr>
        `;
    });

    document.getElementById('total-price').innerText = total.toFixed(2);
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(id => id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

document.getElementById('checkout').addEventListener('click', () => {
    alert('Compra realizada con éxito');
    localStorage.removeItem('cart');
    renderCart();
});

renderCart();
