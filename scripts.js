// Definición de productos (array de objetos)
const productos = [
    { id: 1, nombre: 'Producto 1', precio: 100 },
    { id: 2, nombre: 'Producto 2', precio: 200 },
    { id: 3, nombre: 'Producto 3', precio: 300 }
];

// Carrito de compras (array vacío)
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(prod => prod.id === id);
    if (producto) {
        carrito.push(producto);
        console.log(`El ${producto.nombre} ha sido agregado al carrito.`);
    } else {
        console.warn('El producto no existe.');
    }
}

// Función para mostrar el carrito
function mostrarCarrito() {
    console.table(carrito);
}

// Interacción con el usuario
let agregarMas = true;
while (agregarMas) {
    const idProducto = parseInt(prompt('Ingrese el ID del producto que desea agregar al carrito:'));
    if (isNaN(idProducto)) {
        alert('Debe ingresar un número válido.');
    } else {
        agregarAlCarrito(idProducto);
    }
    agregarMas = confirm('¿Desea agregar más productos al carrito?');
}
const verCarrito = confirm('¿Desea ver el carrito?');
if (verCarrito) {
    mostrarCarrito();
}