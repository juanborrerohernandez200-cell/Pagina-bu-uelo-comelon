const header = document.querySelector("#header");
const contenedor = document.querySelector("#contenedor");
const body = document.querySelector("body");

window.addEventListener("scroll", function () {
     if (contenedor.getBoundingClientRect().top < 10) {
         header.classList.add("scroll");
        }
         else {
            header.classList.remove("scroll");
        }
    });
    
    let carrito = [];
    const botonesComprar = document.querySelectorAll(".btn-comprar");
    const contador = document.querySelector("#contador");
    const carritoPanel = document.querySelector("#carrito-panel");
    const abrirCarrito = document.querySelector("#abrir-carrito");
    const cerrarCarrito = document.querySelector("#cerrar-carrito");
    const productosCarrito = document.querySelector("#productos-carrito");
    const total = document.querySelector("#total");
    const vaciarCarrito = document.querySelector("#vaciar-carrito");
    const totalApagar = document.querySelector("#total-Apagar");
    
    botonesComprar.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            const productoExistente = carrito.find(function (producto) {
                return producto.nombre === nombre;
             });
             
             if (productoExistente) {
                 productoExistente.cantidad++;
                }
                else {
                    carrito.push({
                        nombre: nombre,
                        precio: precio,
                        cantidad: 1
                    });
                }
                
                actualizarCarrito();
            });
        });
        
        function actualizarCarrito() {
            productosCarrito.innerHTML = "";
            let totalCarrito = 0;
            let cantidadProductos = 0;
            carrito.forEach(function (producto, index) {
                totalCarrito += producto.precio * producto.cantidad;
                cantidadProductos += producto.cantidad;
                
                const productoHTML = document.createElement("div");
                productoHTML.classList.add("producto-carrito");
                productoHTML.innerHTML = `
                
                <div>

                <h3>${producto.nombre}</h3>

                <p>$${producto.precio.toFixed(2)}</p>

            </div>


            <div class="cantidad">

                <button onclick="disminuirCantidad(${index})">
                    -
                </button>


                <span>
                    ${producto.cantidad}
                </span>


                <button onclick="aumentarCantidad(${index})">
                    +
                </button>

            </div>

        `;
        
        productosCarrito.appendChild(productoHTML);

    });
    
    total.textContent = totalCarrito.toFixed(2);
    
    contador.textContent = cantidadProductos;

}

function aumentarCantidad(index) {
     carrito[index].cantidad++;
      actualizarCarrito();

}

function disminuirCantidad(index) {
    carrito[index].cantidad--;
    if (carrito[index].cantidad === 0) {
         carrito.splice(index, 1);
        }
        actualizarCarrito();
}

abrirCarrito.addEventListener("click", function () {
    carritoPanel.classList.add("mostrar");
});

cerrarCarrito.addEventListener("click", function () {
    carritoPanel.classList.remove("mostrar");
});

vaciarCarrito.addEventListener("click", function () {
    carrito = [];
    actualizarCarrito();
});

totalApagar.addEventListener("click", function () {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos primero.");
         return;
    }
    alert("¡Compra realizada con éxito! 🛒\n\nTotal: $" + total.textContent);
});