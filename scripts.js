// // Definición de productos (array de objetos)
// const barberiaProductos = [
//   { id: 1, nombre: 'Corte de Pelo', precio: 20 },
//   { id: 2, nombre: 'Afeitado', precio: 15 },
//   // Agrega más productos según sea necesario
// ];

// // Carrito de compras (array vacío)
// let carrito = [];

// function agregarAlCarrito(id) {
//   const producto = barberiaProductos.find(prod => prod.id === id);
//   if (producto) {
//     if (!carrito.includes(producto)) {
//       carrito.push(producto);
//       alert(`El ${producto.nombre} ha sido agregado al carrito.`);
//     } else {
//       alert(`El ${producto.nombre} ya está en el carrito.`);
//     }
//   } else {
//     alert(`El producto con el ID ${id} no existe.`);
//   }
//   updateCart();
// }

// function updateCart() {
//   localStorage.setItem('cart', JSON.stringify(carrito));
//   renderCart();
//   renderProducts(); // Actualiza la lista de productos al agregar al carrito
// }

// // function renderProducts() {
// //   const productListElement = document.getElementById('product-list');
// //   productListElement.innerHTML = ''; // Limpiar la lista antes de volver a renderizar

// //   barberiaProductos.forEach(producto => {
// //     const productElement = document.createElement('div');
// //     productElement.classList.add('col-md-6', 'mb-4');
// //     productElement.innerHTML = `
// //       <div class="card">
// //         <div class="card-body">
// //           <h5 class="card-title">${producto.nombre}</h5>
// //           <p class="card-text">$${producto.precio.toFixed(2)}</p>
// //           <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
// //         </div>
// //       </div>
// //     `;
// //     productListElement.appendChild(productElement);
// //   });
// // }

// // function initBarbershop() {
// //   renderProducts();
// //   renderCart();
// // }

// // ... (código anterior)

// function renderProducts() {
//   const productListElement = document.getElementById('product-list');
//   productListElement.innerHTML = ''; // Limpiar la lista antes de volver a renderizar

//   barberiaProductos.forEach(producto => {
//     const productElement = document.createElement('div');
//     productElement.classList.add('col-md-6', 'mb-4');
//     productElement.innerHTML = `
//       <div class="card">
//         <div class="card-body">
//           <h5 class="card-title">${producto.nombre}</h5>
//           <p class="card-text">$${producto.precio.toFixed(2)}</p>
//           <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
//         </div>
//       </div>
//     `;
//     productListElement.appendChild(productElement);
//   });
// }

// function initBarbershop() {
//   renderProducts();
//   renderCart(); // Llamada a renderCart después de renderProducts
// }

// // ... (código posterior)


// // Inicializar la tienda
// initBarbershop();


// Definición de productos (array de objetos)
const barberiaProductos = [
  { id: 1, nombre: 'Corte de Pelo', precio: 20 },
  { id: 2, nombre: 'Afeitado', precio: 15 },
  // Agrega más productos según sea necesario
];

// Carrito de compras (array vacío)
let carrito = [];

function agregarAlCarrito(id) {
  const producto = barberiaProductos.find(prod => prod.id === id);
  if (producto) {
    if (!carrito.includes(producto)) {
      carrito.push(producto);
      alert(`El ${producto.nombre} ha sido agregado al carrito.`);
    } else {
      alert(`El ${producto.nombre} ya está en el carrito.`);
    }
  } else {
    alert(`El producto con el ID ${id} no existe.`);
  }
  updateCart();
}

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(carrito));
  renderCart();
  renderProducts();
}

function renderProducts() {
  const productListElement = document.getElementById('product-list');
  productListElement.innerHTML = '';

  barberiaProductos.forEach(producto => {
    const productElement = document.createElement('div');
    productElement.classList.add('col-md-6', 'mb-4');
    productElement.innerHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">$${producto.precio.toFixed(2)}</p>
          <button class="btn btn-primary" onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        </div>
      </div>
    `;
    productListElement.appendChild(productElement);
  });
}

function renderCart() {
  const cartItemsElement = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');
  const cartCountElement = document.getElementById('cart-count');

  cartItemsElement.innerHTML = '';
  let total = 0;

  carrito.forEach(item => {
    const cartItemElement = document.createElement('li');
    cartItemElement.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
    cartItemsElement.appendChild(cartItemElement);
    total += item.precio;
  });

  cartTotalElement.textContent = total.toFixed(2);
  cartCountElement.textContent = carrito.length.toString();
}

// Inicializar la tienda
renderProducts();
renderCart();
