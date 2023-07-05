document.addEventListener('DOMContentLoaded', function () {
    document.querySelector("#btn-administrar").addEventListener("click", administrar);
    document.querySelector("#btn-comprar").addEventListener("click", comprar);
    document.querySelector("#producto1").addEventListener("click", agregarProd1);
    document.querySelector("#vaciar").addEventListener("click", vaciarTabla);
    document.querySelector("#producto3").addEventListener("click", agregarProd1)
    document.querySelector("#botonx3").addEventListener("click", agregarX3)
});


let datosProductos = [
    {   producto: 'Lamparas', 
        cantidad: 10,
        precio: 0 },

    {   producto: 'Banquetas',
        cantidad: 5,
        precio: 0 },

    {   producto: 'Sillones',
        cantidad: 8, 
        precio: 0 },
];
actualizarTabla();
let datosProductosCarrito = [];

function agregarProd1() {
    let cantInput = document.querySelector("#cantidad").value;
    let precioInput = document.querySelector("#precio").value;
    let prodInput = document.querySelector("#producto").value;
    let itemProducto = {
        producto: prodInput,
        cantidad: cantInput,
        precio: precioInput,
    }
    datosProductos.push(itemProducto);
    actualizarTabla();
}

function actualizarTabla() {
    let productosDom = document.querySelector("#lista-prod-agregado");
    productosDom.innerHTML = "";
    let filaHTML;
    for (const [indice, prod] of datosProductos.entries()) {
        if (indice < 3) {
            filaHTML = "<tr class='destacado'>";
        }
        else { // sino esto 
            filaHTML = "<tr>";
        };
        productosDom.innerHTML +=
            filaHTML +
            "<td>" + prod.producto + "</td>" +
            "<td>" + prod.precio + "</td>" +
            "<td>" + prod.cantidad + "</td>" +
            `<td><button type='button' class='btn-eliminar' onclick='eliminarElemento( ` + indice + ` )'>elminar</button>` +
            "</tr>";


    }
}
function actualizarTablaCarrito() {
    console.table(datosProductosCarrito);
    let productosDom = document.querySelector("#lista-prod-agregado-carrito");
    productosDom.innerHTML = "";

    for (const [indice, prod] of datosProductosCarrito.entries()) {

        productosDom.innerHTML +=
            "<tr>" +
            "<td>" + prod.producto + "</td>" +
            "<td>" + prod.precio + "</td>" +
            "<td><button type='button'  class='btn-eliminar' onclick='eliminarElementoCarrito( `+ indice +`  )'>elminar</button></td>" +
            "</tr>";
    }
}

function actualizarTablaCompra() {
    console.table(datosProductosCarrito);
    let productosDom = document.querySelector("#lista-prod-compra");
    productosDom.innerHTML = "";

    for (const [indice, prod] of datosProductos.entries()) {

        productosDom.innerHTML +=
            "<tr>" +
            "<td>" + prod.producto + "</td>" +
            "<td>" + prod.precio + "</td>" +
            "<td>" + prod.cantidad + "</td>" +
            " <td><button type='button' class='agregar-prod' onclick='agregarCarrito( " + indice + " )'>Agregar</button></td>" +
            "</tr>";
    }


}
function vaciarTabla() {
    datosProductos = [];
    datosProductosCarrito = []
    actualizarTabla();
}

function eliminarElemento(indice) {
    datosProductos.splice(indice, 1);
    actualizarTabla();
}

function eliminarElementoCarrito(indice) {
    datosProductosCarrito.splice(indice, 1);
    actualizarTablaCarrito();
}

function agregarCarrito(indice) {
    if (datosProductos[indice].cantidad > 0) {
        datosProductos[indice].cantidad -= 1;

        let itemProducto = {
            producto: datosProductos[indice].producto,
            precio: datosProductos[indice].precio,
        }
        datosProductosCarrito.push(datosProductos[indice]);

        actualizarTablaCarrito();
        actualizarTablaCompra();
    }
}

function comprar() {
    let domAdministrar = document.getElementById("administrar");
    domAdministrar.style.display = 'none';
    let dom = document.getElementById("compra");
    dom.style.display = 'block';
    actualizarTablaCompra();
    actualizarTablaCarrito();
}

function administrar() {
    let domAdministrar = document.getElementById("administrar");
    domAdministrar.style.display = 'block';
    let dom = document.getElementById("compra");
    dom.style.display = 'none';
}

function agregarX3() {

    for (let index = 0; index < 3; index++) {
        let itemProducto = {
            producto: 'producto' + index,
            cantidad: 20,
            precio: 45,
        }
        datosProductos.push(itemProducto);


    }
    actualizarTabla();
}