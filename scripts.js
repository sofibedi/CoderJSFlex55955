const productos = [
  { id: 1, nombre: 'Corte de Pelo', precio: 2000 },
  { id: 2, nombre: 'Afeitado', precio: 1570 },
  { id: 3, nombre: 'Crema para Barba', precio: 2570 },
  { id: 4, nombre: 'Navaja de Afeitar', precio: 3050 },
  { id: 5, nombre: 'Aceite para Barba', precio: 1800 },
  { id: 6, nombre: 'Set de Barbería Completo', precio: 8000 },
  { id: 7, nombre: 'Peine de Madera', precio: 1050 },
  { id: 8, nombre: 'Tijeras de Barbero', precio: 2200 },
  { id: 9, nombre: 'Gel de Peinado', precio: 1210 },
  { id: 10, nombre: 'Capa de Barbero', precio: 1500 },
  { id: 11, nombre: 'Bálsamo para Barba', precio: 2800 },
  { id: 12, nombre: 'Gel para Cabello', precio: 2800 },
];

let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

function agregarAlCarrito(id) {
    const producto = getProductById(id);
    if (producto) {
        carrito.push(producto);
        actualizarCarrito();
        console.log(`El ${producto.nombre} ha sido agregado al carrito.`);
    } else {
        console.warn('El producto no existe.');
    }
}

function quitarDelCarrito(id) {
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        const productoQuitado = carrito.splice(index, 1)[0];
        actualizarCarrito();
        console.log(`El ${productoQuitado.nombre} ha sido eliminado del carrito.`);
    } else {
        console.warn('El producto no está en el carrito.');
    }
}

function getProductById(id) {
    return productos.find(prod => prod.id === id);
}

function mostrarCarrito() {
    console.table(carrito);
}

function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
}

function renderizarCarrito() {
    const carritoListElement = document.getElementById('carrito-list');
    const carritoTotalElement = document.getElementById('carrito-total');

    carritoListElement.innerHTML = '';

    let total = 0;

    carrito.forEach(item => {
        const carritoItemElement = document.createElement('li');
        carritoItemElement.innerHTML = `
            <span>${item.nombre} - $${item.precio.toFixed(2)}</span>
            <button class="btn btn-danger btn-sm ml-2" onclick="quitarDelCarrito(${item.id})">Quitar</button>
        `;
        carritoListElement.appendChild(carritoItemElement);
        total += item.precio;
    });

    carritoTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

function finalizarCompra() {
    if (carrito.length > 0) {
        mostrarFormularioCheckout();
    } else {
        alert('No hay productos en el carrito. Agrega productos antes de finalizar la compra.');
    }
}

function mostrarFormularioCheckout() {
    const checkoutFormElement = document.getElementById('checkout-form');
    checkoutFormElement.style.display = 'block';
}

function procesarPago() {
    // Obtén los datos del formulario de pago
    const cardholderName = document.getElementById('cardholder-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;

    // Verifica si los campos están llenos
    if (cardholderName && cardNumber && expiryDate) {
        alert(`Pago realizado con éxito. Titular: ${cardholderName}, Número de Tarjeta: ${cardNumber}, Fecha de Vencimiento: ${expiryDate}`);
        carrito = []; // Limpia el carrito después del pago
        actualizarCarrito();
        ocultarFormularioCheckout();
    } else {
        alert('Por favor, completa todos los campos del formulario de pago.');
    }
}

function ocultarFormularioCheckout() {
    const checkoutFormElement = document.getElementById('checkout-form');
    checkoutFormElement.style.display = 'none';
}

function initCatalogo() {
    const catalogoElement = document.getElementById('catalogo');

    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button class="btn btn-agregar" data-id="${producto.id}">Agregar al Carrito</button>
        `;
        catalogoElement.appendChild(productoElement);

        // Agrega evento click utilizando addEventListener
        const btnAgregar = productoElement.querySelector('.btn-agregar');
        btnAgregar.addEventListener('click', () => agregarAlCarrito(producto.id));
    });
}

function initCarrito() {
    renderizarCarrito();
    const finalizarCompraButton = document.getElementById('finalizar-compra');
    finalizarCompraButton.addEventListener('click', finalizarCompra);

    // Agrega evento click al botón de realizar pago
    const realizarPagoButton = document.getElementById('realizar-pago');
    realizarPagoButton.addEventListener('click', procesarPago);
}

// Llama a initCatalogo y initCarrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initCatalogo();
    initCarrito();
});