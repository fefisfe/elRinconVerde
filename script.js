let carrito = [];

const contador = document.getElementById('contador');
const listaCarrito = document.getElementById('listaCarrito');
const totalCarrito = document.getElementById('totalCarrito');
const botonesAgregar = document.querySelectorAll('.btn-agregar');
const btnVaciar = document.getElementById('btnVaciarCarrito');


botonesAgregar.forEach((boton) => {
boton.addEventListener('click', (e) => {
    const nombre = e.target.getAttribute('data-nombre');
    const precio = parseFloat(e.target.getAttribute('data-precio'));

    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
    productoExistente.cantidad++;
    } else {
    carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
});
});


function actualizarCarrito() {
const totalUnidades = carrito.reduce((acc, item) => acc + item.cantidad, 0);
contador.textContent = totalUnidades;

if (carrito.length === 0) {
    listaCarrito.innerHTML = '<li class="list-group-item text-center text-muted">El carrito está vacío</li>';
    totalCarrito.textContent = '$0';
    return;
}

listaCarrito.innerHTML = '';
let totalPrecio = 0;

carrito.forEach((producto, index) => {
    const subtotal = producto.precio * producto.cantidad;
    totalPrecio += subtotal;

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
    <div>
        <span class="fw-bold">${producto.nombre}</span>
        <div class="text-muted small">$${producto.precio.toLocaleString('es-AR')} c/u</div>
    </div>
    <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary btn-restar" data-index="${index}">-</button>
        <span class="fw-bold px-1">${producto.cantidad}</span>
        <button class="btn btn-sm btn-outline-secondary btn-sumar" data-index="${index}">+</button>
        <span class="fw-bold text-success ms-2">$${subtotal.toLocaleString('es-AR')}</span>
        <button class="btn btn-sm btn-outline-danger ms-1 btn-eliminar" data-index="${index}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></button>
    </div>
    `;
    listaCarrito.appendChild(li);
});

totalCarrito.textContent = `$${totalPrecio.toLocaleString('es-AR')}`;
}



const modalCheckout = document.getElementById('modalCheckout');
const totalCheckout = document.getElementById('totalCheckout');
const formCheckout = document.getElementById('formCheckout');


if (modalCheckout) {
modalCheckout.addEventListener('show.bs.modal', () => {
    const totalPrecio = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    if (totalCheckout) {
    totalCheckout.textContent = `$${totalPrecio.toLocaleString('es-AR')}`;
    }
});
}


if (formCheckout) {
formCheckout.addEventListener('submit', (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
    }

    alert('¡Gracias por tu compra! En breve te contactaremos para coordinar el envío.');

    // Limpiar carrito y cerrar modal
    carrito = [];
    actualizarCarrito();

    const modalInstance = bootstrap.Modal.getInstance(modalCheckout);
    if (modalInstance) modalInstance.hide();
});
}

listaCarrito.addEventListener('click', (e) => {
const index = e.target.getAttribute('data-index');
if (index === null) return;

if (e.target.classList.contains('btn-sumar')) {
    carrito[index].cantidad++;
} else if (e.target.classList.contains('btn-restar')) {
    carrito[index].cantidad--;
    if (carrito[index].cantidad === 0) {
    carrito.splice(index, 1);
    }
} else if (e.target.classList.contains('btn-eliminar')) {
    carrito.splice(index, 1);
}

actualizarCarrito();
});


if (btnVaciar) {
btnVaciar.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});
}

const titulo = document.getElementById('tituloPagina');
const botonCatalogo = document.getElementById('botonCatalogo');


titulo.addEventListener('mouseenter', () => {
    titulo.classList.add('titulo-hover');
});

titulo.addEventListener('mouseleave', () => {
    titulo.classList.remove('titulo-hover');
});


botonCatalogo.addEventListener('mouseenter', () => {
    botonCatalogo.classList.add('btn-hover');
});

botonCatalogo.addEventListener('mouseleave', () => {
    botonCatalogo.classList.remove('btn-hover');
});
