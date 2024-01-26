// API de Unsplash
async function obtenerFotoAleatoria() {
  try {
    const response = await fetch('https://api.unsplash.com/photos/random?query=barbershop&client_id=IkSxnPsQnlR6P9xno0yHg8Fp8ZysP9e2zd0qzcpIYms');
    const data = await response.json();

    return data.urls.regular;
  } catch (error) {
    console.error('Error al obtener la foto aleatoria de Unsplash:', error);
    return null;
  }
}

//  Carrito
const Carrito = {
  carrito: [],

  init() {
    this.carrito = JSON.parse(sessionStorage.getItem('carrito')) || [];
    this.renderizarCarrito();
  },

  getProductById(id) {
    return productos.find(prod => prod.id === id);
  },

  mostrarNotificacion(mensaje, tipo) {
    Swal.fire({
      text: mensaje,
      icon: tipo,
      timer: 1500,
      showConfirmButton: false
    });
  },

  agregarAlCarrito(id) {
    const producto = this.getProductById(id);
    if (producto) {
      this.carrito.push(producto);
      this.actualizarCarrito();
      this.mostrarNotificacion(`${producto.nombre} ha sido agregado al carrito.`, 'success');
    } else {
      this.mostrarNotificacion('El producto no existe.', 'danger');
    }
  },

  quitarDelCarrito(id) {
    const index = this.carrito.findIndex(item => item.id === id);
    if (index !== -1) {
      const productoQuitado = this.carrito.splice(index, 1)[0];
      this.actualizarCarrito();
      this.mostrarNotificacion(`${productoQuitado.nombre} ha sido eliminado del carrito.`, 'warning');
    } else {
      this.mostrarNotificacion('El producto no está en el carrito.', 'danger');
    }
  },

  mostrarCarrito() {
    console.table(this.carrito);
  },

  actualizarCarrito() {
    sessionStorage.setItem('carrito', JSON.stringify(this.carrito));
    this.renderizarCarrito();
  },

  renderizarCarrito() {
    const carritoListElement = document.getElementById('carrito-list');
    const carritoTotalElement = document.getElementById('carrito-total');

    carritoListElement.innerHTML = '';

    let total = 0;

    this.carrito.forEach(item => {
      const carritoItemElement = document.createElement('li');
      carritoItemElement.innerHTML = `
        <span>${item.nombre} - $${item.precio.toFixed(2)}</span>
        <button class="btn btn-danger btn-sm ml-2" onclick="Carrito.quitarDelCarrito(${item.id})">Quitar</button>
      `;
      carritoListElement.appendChild(carritoItemElement);
      total += item.precio;
    });

    carritoTotalElement.textContent = `Total: $${total.toFixed(2)}`;
  },

  finalizarCompra() {
    if (this.carrito.length > 0) {
      this.mostrarFormularioCheckout();
      document.getElementById('finalizar-compra').style.display = 'block';
    } else {
      this.mostrarNotificacion('No hay productos en el carrito. Agrega productos antes de finalizar la compra.', 'warning');
    }
  },

  mostrarFormularioCheckout() {
    const checkoutFormElement = document.getElementById('checkout-form');
    checkoutFormElement.style.display = 'block';
  },

  procesarPago() {
    const cardholderName = document.getElementById('cardholder-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;

    if (cardholderName && cardNumber && expiryDate) {
      this.mostrarNotificacion(`Pago realizado con éxito. Titular: ${cardholderName}, Número de Tarjeta: ${cardNumber}, Fecha de Vencimiento: ${expiryDate}`, 'success');
      this.carrito = [];
      this.actualizarCarrito();
      this.ocultarFormularioCheckout();
    } else {
      this.mostrarNotificacion('Por favor, completa todos los campos del formulario de pago.', 'danger');
    }
  },

  ocultarFormularioCheckout() {
    const checkoutFormElement = document.getElementById('checkout-form');
    checkoutFormElement.style.display = 'none';

    document.getElementById('cardholder-name').value = '';
    document.getElementById('card-number').value = '';
    document.getElementById('expiry-date').value = '';
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  const urlFotoAleatoria = await obtenerFotoAleatoria();

  if (urlFotoAleatoria) {
    document.body.style.backgroundImage = `url('${urlFotoAleatoria}')`;
    document.body.style.backgroundSize = 'cover';
  }

  // Inicializar el carrito
  Carrito.init();
});

document.addEventListener('DOMContentLoaded', () => {
  const finalizarCompraButton = document.getElementById('finalizar-compra');
  finalizarCompraButton.addEventListener('click', () => Carrito.finalizarCompra());

  const realizarPagoButton = document.getElementById('realizar-pago');
  realizarPagoButton.addEventListener('click', () => Carrito.procesarPago());

  initCatalogo();
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

function initCatalogo() {
  const catalogoElement = document.getElementById('catalogo');

  productos.forEach(producto => {
    const productoElement = document.createElement('div');
    productoElement.classList.add('producto');
    productoElement.innerHTML = `
      <h3>${producto.nombre}</h3>
      <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
      <p>Precio: $${producto.precio.toFixed(2)}</p>
      <button class="btn btn-agregar" data-id="${producto.id}" onclick="Carrito.agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
    `;
    catalogoElement.appendChild(productoElement);
  });
}
