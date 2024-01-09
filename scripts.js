document.addEventListener('DOMContentLoaded', () => {
  const finalizarCompraButton = document.getElementById('finalizar-compra');
  finalizarCompraButton.addEventListener('click', finalizarCompra);

  const realizarPagoButton = document.getElementById('realizar-pago');
  realizarPagoButton.addEventListener('click', procesarPago);

  initCatalogo();
  initCarrito();
});

const productos = [
  { id: 1, nombre: 'Corte de Pelo', precio: 2000, imagen: 'img/32d055a9aa13c212e3587d65a89c17d1609d6372.XL2_.jpg' },
  { id: 2, nombre: 'Afeitado', precio: 1570, imagen: 'img/descarga (1).jpeg' },
  { id: 3, nombre: 'Crema para Barba', precio: 2570, imagen: 'img/images.jpeg' },
  { id: 4, nombre: 'Navaja de Afeitar', precio: 3050, imagen: 'img/navaja-de-corte-dorada-uso-profesional-barberia-peluqueria-d_nq_np_848252-mla31115418304_062019-f1-2fb623c948e61b012f15663921653298-1024-1024.jpg' },
  { id: 5, nombre: 'Aceite para Barba', precio: 1800, imagen: 'img/Crema-de-afeitado-Captain-Cook-200x286.jpg' },
  { id: 6, nombre: 'Set de Barbería Completo', precio: 8000, imagen: 'img/Kit-19.jpg' },
  { id: 7, nombre: 'Peine de Madera', precio: 1050, imagen: 'img/88cd07719609976903094867cc1fef68.jpg' },
  { id: 8, nombre: 'Tijeras de Barbero', precio: 2200, imagen: 'img/images (1).jpeg' },
  { id: 9, nombre: 'Gel de Peinado', precio: 1210, imagen: 'img/RWLG8742.jpg' },
  { id: 10, nombre: 'Capa de Barbero', precio: 1500, imagen: 'img/descarga.jpeg' },
  { id: 11, nombre: 'Bálsamo para Barba', precio: 2800, imagen: 'img/71bs6EV0gyL.jpg' },
  { id: 12, nombre: 'Gel para Cabello', precio: 2800, imagen: 'img/descarga (2).jpeg' },
];

let carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];

function getProductById(id) {
  return productos.find(prod => prod.id === id);
}

function mostrarNotificacion(mensaje, tipo) {
  const notificacionesElement = document.getElementById('notificaciones');
  const notificacion = document.createElement('div');
  notificacion.classList.add('alert', `alert-${tipo}`);
  notificacion.textContent = mensaje;
  notificacionesElement.appendChild(notificacion);

  setTimeout(() => {
    notificacionesElement.removeChild(notificacion);
  }, 3000);
}

function agregarAlCarrito(id) {
  const producto = getProductById(id);
  if (producto) {
    carrito.push(producto);
    actualizarCarrito();
    mostrarNotificacion(`El ${producto.nombre} ha sido agregado al carrito.`, 'success');
  } else {
    mostrarNotificacion('El producto no existe.', 'danger');
  }
}

function quitarDelCarrito(id) {
  const index = carrito.findIndex(item => item.id === id);
  if (index !== -1) {
    const productoQuitado = carrito.splice(index, 1)[0];
    actualizarCarrito();
    mostrarNotificacion(`El ${productoQuitado.nombre} ha sido eliminado del carrito.`, 'warning');
  } else {
    mostrarNotificacion('El producto no está en el carrito.', 'danger');
  }
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
    mostrarNotificacion('No hay productos en el carrito. Agrega productos antes de finalizar la compra.', 'warning');
  }
}

function mostrarFormularioCheckout() {
  const checkoutFormElement = document.getElementById('checkout-form');
  checkoutFormElement.style.display = 'block';
}

function procesarPago() {
  const cardholderName = document.getElementById('cardholder-name').value;
  const cardNumber = document.getElementById('card-number').value;
  const expiryDate = document.getElementById('expiry-date').value;

  if (cardholderName && cardNumber && expiryDate) {
    mostrarNotificacion(`Pago realizado con éxito. Titular: ${cardholderName}, Número de Tarjeta: ${cardNumber}, Fecha de Vencimiento: ${expiryDate}`, 'success');
    carrito = [];
    actualizarCarrito();
    ocultarFormularioCheckout();
  } else {
    mostrarNotificacion('Por favor, completa todos los campos del formulario de pago.', 'danger');
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
          <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
          <p>Precio: $${producto.precio.toFixed(2)}</p>
          <button class="btn btn-agregar" data-id="${producto.id}">Agregar al Carrito</button>
      `;
    catalogoElement.appendChild(productoElement);

    const btnAgregar = productoElement.querySelector('.btn-agregar');
    btnAgregar.addEventListener('click', () => agregarAlCarrito(producto.id));
  });
}


function initCarrito() {
  renderizarCarrito();
}