function guardarAlmacenamientoLocal(llave, valor_a_guardar) {
    localStorage.setItem(llave, JSON.stringify(valor_a_guardar));
}
function obtenerAlmacenamientoLocal(llave) {
    const datos = JSON.parse(localStorage.getItem(llave));
    return datos;
}

let productos = obtenerAlmacenamientoLocal("productos") || [];
let mensaje = document.getElementById("mensaje");

const añadirProducto = document.getElementById("productoAñadir");
const añadirValor = document.getElementById("valorAñadir");
const añadirExistencia = document.getElementById("existenciasAñadir");
const añadirImagen = document.getElementById("imagenAñadir");

document.getElementById("botonañadir").addEventListener("click", function(even) {
even.preventDefault();
let productoAñadir = añadirProducto.value;
let valorAñadir = añadirValor.value;
let existenciaAñadir = añadirExistencia.value;
let imagenAñadir = añadirImagen.value;

let van = true;

if (productoAñadir === "" || valorAñadir === "" || existenciaAñadir === "" || imagenAñadir === "") {
    mensaje.classList.add('llenarcampo')
    setTimeout(() => {
        mensaje.classList.remove('llenarcampo')}, 2500)
        van = false;
}
else {
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre === productoAñadir) {
            mensaje.classList.add('repetidoError')
            setTimeout(() => {
                mensaje.classList.remove('repetidoError')}, 2500)
                van = false;
    }   }
}
if (van == true) {
productos.push({
    nombre: productoAñadir,
    valor: valorAñadir,
    existencia: existenciaAñadir,
    urlimagen: imagenAñadir
})
   mensaje.classList.add('realizado')
   setTimeout(() => {
    mensaje.classList.remove('repetidoError')
    window.location.reload();
}, 1500)
    guardarAlmacenamientoLocal("productos", productos);
}
})

//Editar

const productoed = document.getElementById("productoEditar");
const atributoed = document.getElementById("atributoEditar");
const nuevoAtributoed = document.getElementById("nuevoAtributo");

document.getElementById("botonEditar").addEventListener("click", function(even) {
    even.preventDefault();
    let productoEditar = productoed.value;
    let atributoEditar = atributoed.value;
    let nuevoAtributo = nuevoAtributoed.value;
    let van = false;
    if (productoEditar === "" || atributoEditar === "" || nuevoAtributo === "") {
        mensaje.classList.add('llenarcampo')
        setTimeout(() => {
            mensaje.classList.remove('llenarcampo')}, 2500)
    }
    else {
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].nombre === productoEditar) {
                productos[i][atributoEditar] = nuevoAtributo;
                van = true;
            }
        }
        if (van == true) {
            mensaje.classList.add('realizado')
            setTimeout(() => {
                mensaje.classList.remove('realizado')
                window.location.reload();
            }, 1500);
        }
        else {
            mensaje.classList.add('noexisteError')
            setTimeout(() => {
                mensaje.classList.remove('noexisteError')
            }, 2500)
        }
        guardarAlmacenamientoLocal("productos", productos);
    }
})

//Eliminar

const productoel = document.getElementById("productoEliminar");

document.getElementById("botonEliminar").addEventListener("click", function(even) {
    even.preventDefault();
    let productoEliminar = productoel.value;
    let van = false

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].nombre === productoEliminar) {
            productos.splice(i, 1);
            van = true;
        }
    }
    if (van == false) {
        mensaje.classList.add('noExisteError')
        setTimeout(() => {
            mensaje.classList.remove('noExisteError')
        }, 2500) 
    }
    else {
        mensaje.classList.add('realizado')
        setTimeout(() => {
            mensaje.classList.remove('realizado')
            window.location.reload();
        }, 1500)
    }
    guardarAlmacenamientoLocal("productos", productos);
})

//mostrar productos

window.addEventListener("load", () => {
   const productoEd = document.getElementById("productoEditar");
    const productoEl = document.getElementById("productoEliminar");

    for (let i = 0; i < productos.length; i++) {
        productoEd.innerHTML += `<option>${productos[i].nombre}</option>`;
        productoEl.innerHTML += `<option>${productos[i].nombre}</option>`;
    }
    Object.keys(productos[0]).forEach(element => {
        atributoed.innerHTML += `<option>${element}</option>`
    });
    let mostrarProductos = document.getElementById("mostrarproductos");
    mostrarProductos.innerHTML = "";
    for (let i = 0; i < productos.length; i++) {
        mostrarProductos.innerHTML += `<div class="contenedorproducto">
        <img src="${productos[i].urlimagen}">
        <div class="informacion">
        <p>${productos[i].nombre}</p>
        <p class="precio"><span>Precio: $${productos[i].valor}</span></p>
        <p>Existencias: ${productos[i].existencia}</p>
        </div>
        </div>`;
    }
})