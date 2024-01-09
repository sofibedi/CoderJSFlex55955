const productos = [
  { id: 1, nombre: 'Corte de Pelo', precio: 20 },
  { id: 2, nombre: 'Afeitado', precio: 15 },
  { id: 3, nombre: 'Crema para Barba', precio: 25 },
  { id: 4, nombre: 'Navaja de Afeitar', precio: 30 },
  { id: 5, nombre: 'Aceite para Barba', precio: 18 },
  { id: 6, nombre: 'Set de Barbería Completo', precio: 80 },
  { id: 7, nombre: 'Peine de Madera', precio: 10 },
  { id: 8, nombre: 'Tijeras de Barbero', precio: 22 },
  { id: 9, nombre: 'Gel de Peinado', precio: 12 },
  { id: 10, nombre: 'Capa de Barbero', precio: 15 },
  { id: 11, nombre: 'Bálsamo para Barba', precio: 28 },
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function agregarAlCarrito(id) {
  const producto = productos.find(prod => prod.id === id);
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
    alert('¡Compra finalizada! Gracias por tu compra.');
    carrito = [];
    actualizarCarrito();
  } else {
    alert('No hay productos en el carrito. Agrega productos antes de finalizar la compra.');
  }
}

function initCatalogo() {
  const catalogoElement = document.getElementById('catalogo');

  productos.forEach(producto => {
    const productoElement = document.createElement('div');
    productoElement.classList.add('producto');
    productoElement.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-agregar">Agregar al Carrito</button>
    `;
    catalogoElement.appendChild(productoElement);
  });
}

function initCarrito() {
  renderizarCarrito();
  const finalizarCompraButton = document.getElementById('finalizar-compra');
  finalizarCompraButton.addEventListener('click', finalizarCompra);
}

initCatalogo();
initCarrito();