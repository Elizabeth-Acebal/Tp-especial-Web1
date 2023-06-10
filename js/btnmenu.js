"use strict"

document.querySelector(".btn-menu").addEventListener("click", cambiarMenu);
let btnAgregar=document.querySelectorAll(".btn-agregar");



let compra=[ ];
 //menu responsive
function cambiarMenu(){
    document.querySelector(".menu").classList.toggle("cambio");
}

for(let botonAgregar of btnAgregar){
    botonAgregar.addEventListener("click", agregar);
}
    function agregar() {
        let nombre = this.parentNode.querySelector("#nombre-prod").dataset.nombre;
        let precio = this.parentNode.querySelector("#precio-prod").dataset.precio;
        let objetoProducto = { nombre, precio };
        compra.push(objetoProducto);
        console.log(compra);
    }


    function mostrar() {
        let tabla = document.querySelector("#tabla"); // Obtener referencia a la tabla
        tabla.innerHTML = "<tr><th>Nombre</th><th>Precio</th></tr>"; // Agregar encabezado de la tabla
        for (let producto of compra) { // Recorrer el arreglo de objetos
            tabla.innerHTML += "<tr><td>" + producto.nombre + "</td><td>" + producto.precio + "</td></tr>"; // Agregar fila de la tabla con los datos de cada objeto
        }
        }
    

console.log(tabla);