"use strict";

document.addEventListener("DOMContentLoaded", function () {
    let btnAgregar = document.querySelectorAll(".btn-agregar");
    let tabla = document.querySelector(".tabla tbody");
    let tablaDom = document.querySelector(".tabla");
    let btnVaciar = document.querySelector("#btn-vaciar");
    btnVaciar.addEventListener("click", vaciar);
    let btnComprar = document.querySelector("#btn-comprar");
    btnComprar.addEventListener("click", comprar);
    let btnAgregarx3 = document.querySelectorAll(".btn-agregarx3");
    let total = document.querySelector(".total");
    let formCompra = document.querySelector(".container-formCompra");
    let tablaClientes = document.querySelector(".tabla-clientes tbody");
    let tablaClientesDom = document.querySelector(".tabla-clientes");
    let textoCompra = document.querySelector(".txt-compra");

    let compra = {
        productos: [],
        clientes: [],
    };

    for (let botonAgregar of btnAgregar) {
        botonAgregar.addEventListener("click", agregar);
    }

    function agregar() {
        tablaDom.classList.add("tabla-visible");
        tablaDom.classList.remove("tabla-oculta");
        btnVaciar.classList.add("tabla-visible");
        btnVaciar.classList.remove("tabla-oculta");
        btnComprar.classList.add("tabla-visible");
        btnComprar.classList.remove("tabla-oculta");

        let contenedor = this.closest(".container-prodCarrito");
        let imagen = contenedor.querySelector("#img-prod-carrito").src;
        let nombre = contenedor.querySelector("#nombre-prod").dataset.nombre;
        let precio = Number(contenedor.querySelector("#precio-prod").dataset.precio);
        let cantidad = 1;
        let productoExiste = false;

        for (let i = 0; i < compra.productos.length; i++) {
            if (compra.productos[i].nombre === nombre) {
                productoExiste = true;
                compra.productos[i].cantidad++;
            }
        }

        if (!productoExiste) {
        let objetoProducto = {
            imagen: imagen,
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
        };
        compra.productos.push(objetoProducto);
        }

        mostrar();
    }

    for (let botonAgregar3 of btnAgregarx3) {
        botonAgregar3.addEventListener("click", agregarX3);
    }

    function agregarX3() {
        for (let i = 0; i < 3; i++) {
        agregar();
        }
    }

    function mostrar() {
        tabla.innerHTML = "";
        let totalCompra = 0;

        for (let i = 0; i < compra.productos.length; i++) {
            if(compra.productos[i].cantidad>3){
                tabla.innerHTML += "<tr class=destacadoMenor>"+
                                        "<td><img src='" + compra.productos[i].imagen + "'></td>"+
                                        "<td>" + compra.productos[i].nombre + "</td>"+
                                        "<td>" + "$"+compra.productos[i].precio + "</td>"+       
                                        "<td><button class='btn-sumar'>+</button>"+compra.productos[i].cantidad+ "<button class='btn-restar'>-</button></td>" +
                                        "<td><button class='btn-delete'><i class='fas fa-trash'></i></button></td>" +     
                                    "</tr>"
            }else{
                tabla.innerHTML += "<tr>"+
                    "<td><img src='" + compra.productos[i].imagen + "'></td>"+
                    "<td>" + compra.productos[i].nombre + "</td>"+
                    "<td>" + "$"+compra.productos[i].precio + "</td>"+       
                    "<td><button class='btn-sumar'>+</button>"+compra.productos[i].cantidad+ "<button class='btn-restar'>-</button></td>" +
                    "<td><button class='btn-delete'><i class='fas fa-trash'></i></button></td>" +     
                "</tr>"
            }

            let btnDelete=document.querySelectorAll(".btn-delete");
            for(let botonDelete of btnDelete){
                botonDelete.addEventListener("click", eliminarItem);
            }
    
            let btnSumar = document.querySelectorAll(".btn-sumar");
            let btnRestar = document.querySelectorAll(".btn-restar");

            btnSumar.forEach((btn, i) => {
                btn.addEventListener("click", () => {
                    actualizarCantidad(i, 1);
                });
            });

            btnRestar.forEach((btn, i) => {
                btn.addEventListener("click", () => {
                if (compra.productos[i].cantidad > 1) {
                    actualizarCantidad(i, -1);
                }
            });
            });

            function actualizarCantidad(index, cambio) {
                compra.productos[index].cantidad += cambio;
                mostrar();
            }

            totalCompra += Number(compra.productos[i].precio) * Number(compra.productos[i].cantidad);
            total.textContent = "TOTAL: $" + totalCompra;

        }
    }

    function eliminarItem() {
        let fila = this.closest("tr");
        let i = Array.from(fila.parentNode.children).indexOf(fila);
        compra.productos.splice(i, 1);
        if(compra.productos.length===0){
            vaciar();
        }
        mostrar();
    }

    function vaciar() {
        tabla.innerHTML = "";
        compra.productos = [];
        compra.clientes = [];
        total.textContent = "";
        tablaDom.classList.remove("tabla-visible");
        tablaDom.classList.add("tabla-oculta");
        btnVaciar.classList.remove("tabla-visible");
        btnVaciar.classList.add("tabla-oculta");
        btnComprar.classList.remove("tabla-visible");
        btnComprar.classList.add("tabla-oculta");
        //tablaClientesDom.classList.remove("tabla-visible");
        //tablaClientesDom.classList.add("tabla-oculta");
    }

    let clienteAgregado = false;

    function comprar(e) {
        e.preventDefault();

        if (!clienteAgregado) {
            formCompra.innerHTML = `<form id="formCliente">
                <h2 class="color-fuente h2-form">Ingrese sus datos para el envio</h2>
                <label for="NombreyApellido">Nombre y Apellido</label>
                <input type="text" name="NombreyApellido" required>
                <label for="Direccion">Dirección</label>
                <input type="text" name="Direccion" required>
                <label for="Telefono">Telefono</label>
                <input type="text" name="Telefono" required>
                <button class="btn-formAgregar">ENVIAR DATOS</button>
                </form>`;

            let formCliente = document.querySelector("#formCliente");
            formCliente.addEventListener("submit", agregarCliente);

            clienteAgregado = true;
        }
    }

    function agregarCliente(e) {
        e.preventDefault();

        if (clienteAgregado) {
            let form = document.querySelector("#formCliente");
            let formData = new FormData(form);

            let NombreyApellido = formData.get("NombreyApellido");
            let Direccion = formData.get("Direccion");
            let Telefono = formData.get("Telefono");

            let nuevoCliente = {
                NombreyApellido: NombreyApellido,
                Direccion: Direccion,
                Telefono: Telefono,
                compra: compra.productos,
            };

            compra.clientes.push(nuevoCliente);
            mostrarClientes();

            clienteAgregado = false;
        }
    }

    function mostrarClientes() {
        tablaClientesDom.classList.remove("tabla-oculta");
        tablaClientesDom.classList.add("tabla-visible");

        tablaClientes.innerHTML = "";

        for (let i = 0; i < compra.clientes.length; i++) {
                tablaClientes.innerHTML += "<tr>"+
                                                "<td>" + compra.clientes[i].NombreyApellido + "</td>"+
                                                "<td>" + compra.clientes[i].Direccion + "</td>"+
                                                "<td>" +compra.clientes[i].Telefono + "</td>"+         
                                            "</tr>"
                }  

            formCliente.classList.add("tabla-oculta");
            vaciar();
            textoCompra.innerHTML += `<p>GRACIAS POR SU COMPRA!!!</p>` +
                                        `<p> Nos contactaremos al teléfono ingresado para continuar con la misma.</p>`;

                                        console.log(compra)
                                        
    }

});




/*"use strict"

document.addEventListener('DOMContentLoaded', function () {

    let btnAgregar=document.querySelectorAll(".btn-agregar");
    let tabla = document.querySelector(".tabla tbody");
    let tablaDom=document.querySelector(".tabla");
    let btnVaciar=document.querySelector("#btn-vaciar");
    btnVaciar.addEventListener("click",vaciar);
    let btncomprar=document.querySelector("#btn-comprar");
    btncomprar.addEventListener("click",comprar);
    let btnAgregarx3=document.querySelectorAll(".btn-agregarx3");
    let total=document.querySelector(".total");
    let formCompra=document.querySelector(".container-formCompra");
    let tablaclientes=document.querySelector(".tabla-clientes tbody");
    let tablaclientesDom=document.querySelector(".tabla-clientes");
    let textocompra=document.querySelector(".txt-compra");
    

    let compra=[];
    let clientes=[];
    

    for(let botonAgregar of btnAgregar){
        botonAgregar.addEventListener("click", agregar);
    }
    function agregar() { 
        tablaDom.classList.add("tabla-visible");
        tablaDom.classList.remove("tabla-oculta");
        btnVaciar.classList.add("tabla-visible");
        btnVaciar.classList.remove("tabla-oculta");
        btncomprar.classList.add("tabla-visible");
        btncomprar.classList.remove("tabla-oculta");
        
        /* let imagen = this.parentNode.querySelector("#img-prod-carrito").src;
        let nombre = this.parentNode.querySelector("#nombre-prod").dataset.nombre;
        let precio = Number(this.parentNode.querySelector("#precio-prod").dataset.precio);*/
       
       /* let contenedor = this.closest(".container-prodDormitorio");
        let imagen = contenedor.querySelector("#img-prod-carrito").src;
        let nombre = contenedor.querySelector("#nombre-prod").dataset.nombre;
        let precio = Number(contenedor.querySelector("#precio-prod").dataset.precio);
        let cantidad=1;
        let productoExiste = false;
        for(let i = 0; i < compra.length; i++){
            if(compra[i].nombre===nombre ){
                productoExiste = true;
                compra[i].cantidad++; 
                
            }
        }
        if(!productoExiste){
            let objetoProducto = { 
                imagen:imagen,
                nombre:nombre, 
                precio:precio, 
                cantidad: cantidad,
                
            };
            compra.push(objetoProducto);
        }
        console.log(compra);
        mostrar();
        
        

    }
    //ver PORQUE NO ANDA
    for(let botonAgregar3 of btnAgregarx3){
        botonAgregar3.addEventListener("click", agregarX3);
    }
    function agregarX3() {
    
        for (let i = 0; i < 3; i++) {
            agregar();
        }

    }
    //REDUCIR CODIGO

    function mostrar() {
        tabla.innerHTML="";
        let totalCompra=0;

      for (let i=0;i<compra.length;i++) { // Recorrer el arreglo de objetos

            if(compra[i].cantidad>3){
                tabla.innerHTML += "<tr class=destacadoMenor>"+
                                        "<td><img src='" + compra[i].imagen + "'></td>"+
                                        "<td>" + compra[i].nombre + "</td>"+
                                        "<td>" + "$"+compra[i].precio + "</td>"+       
                                        "<td><button class='btn-sumar'>+</button>"+compra[i].cantidad+ "<button class='btn-restar'>-</button></td>" +
                                        "<td><button class='btn-delete'><i class='fas fa-trash'></i></button></td>" +     
                                    "</tr>"
            }else{
                tabla.innerHTML += "<tr>"+
                    "<td><img src='" + compra[i].imagen + "'></td>"+
                    "<td>" + compra[i].nombre + "</td>"+
                    "<td>" + "$"+compra[i].precio + "</td>"+       
                    "<td><button class='btn-sumar'>+</button>"+compra[i].cantidad+ "<button class='btn-restar'>-</button></td>" +
                    "<td><button class='btn-delete'><i class='fas fa-trash'></i></button></td>" +     
                "</tr>"
            }

            let btnDelete=document.querySelectorAll(".btn-delete");
            for(let botonDelete of btnDelete){
                botonDelete.addEventListener("click", eliminarItem);
            }
            let btnSumar = document.querySelectorAll(".btn-sumar");
            let btnRestar = document.querySelectorAll(".btn-restar");*/

           /* for (let i = 0; i < btnSumar.length; i++) {
                let cantidad=compra[i].cantidad;
                btnSumar[i].addEventListener("click", function() {
                    cantidad++;
                    compra[i].cantidad = cantidad;
                    mostrar();// actualizar tabla y total
                });
                
                btnRestar[i].addEventListener("click", function() {
                    if (cantidad > 1) {
                        cantidad--;
                        compra[i].cantidad = cantidad;  
                        mostrar();// actualizar tabla y total
                    }
                });*/
              /*  btnSumar.forEach((btn, i) => {
                    btn.addEventListener("click", () => {
                        actualizarCantidad(i, 1);
                    });
                });

                btnRestar.forEach((btn, i) => {
                    btn.addEventListener("click", () => {
                    if (compra[i].cantidad > 1) {
                        actualizarCantidad(i, -1);
                    }
                });
                });

                function actualizarCantidad(index, cambio) {
                    compra[index].cantidad += cambio;
                    mostrar();
            }

    
            console.log(compra)
            totalCompra += Number(compra[i].precio) * Number(compra[i].cantidad);
            total.innerHTML = "TOTAL: $" + totalCompra; // Actualizar el total sin mostrar el total anterior
        
        }
    } */
   

    /* el método splice para eliminar un elemento específico del array. 
    Además, es importante eliminar el elemento correspondiente del array compra para que no se muestre en la tabla. 
    */
    

   /* function eliminarItem(){
        let fila = this.closest('tr');
        let i = Array.from(fila.parentNode.children).indexOf(fila);
        compra.splice(i, 1);
        if(compra.length===0){
            vaciar();
        }
        mostrar();
    }

    function vaciar(){
        tabla.innerHTML="";
        compra=[];
        clientes=[];
        total.textContent = "";
        tablaDom.classList.remove("tabla-visible");
        tablaDom.classList.add("tabla-oculta");
        btnVaciar.classList.remove("tabla-visible");
        btnVaciar.classList.add("tabla-oculta"); 
        btncomprar.classList.remove("tabla-visible");
        btncomprar.classList.add("tabla-oculta"); 
      // tablaclientesDom.classList.remove("tabla-visible");
       // tablaclientesDom.classList.add("tabla-oculta");
        
    }

    let clienteAgregado = false;
    function comprar(e){
        e.preventDefault();

        if (!clienteAgregado) {
        formCompra.innerHTML += 
                                `<form id=formCliente > 
                                <h2 class=color-fuente h2-form>Ingrese sus datos para el envio</h2>
                                    <label for="Nombre y Apellido">Nombre y Apellido</label>
                                    <input type="text" name="NombreyApellido" required>
                                    <label for="Direccion">Dirección</label>
                                    <input type="text" name="Direccion" required>
                                    <label for="Telefono">Telefono</label>
                                    <input type="text" name="Telefono" required>
                                    <button class=btn-formAgregar>ENVIAR DATOS</button>
                                </form>`
                    
                                let formCliente=document.querySelector("#formCliente");
                                formCliente.addEventListener("submit",agregarCliente);

                                
                                clienteAgregado = true; 
        }                        

    }

    
   
   function agregarCliente(e){
        e.preventDefault();
        if (clienteAgregado) { 
        let form = document.querySelector("#formCliente");
        let formData = new FormData(form);

        let NombreyApellido=formData.get("NombreyApellido");
        let Direccion=formData.get("Direccion");
        let Telefono=formData.get("Telefono");
        
        let nuevoCliente = {
            NombreyApellido:NombreyApellido,
            Direccion:Direccion,
            Telefono:Telefono,

        };

        
        clientes.push(nuevoCliente);
        console.log(clientes);
        mostrarClientes();

        clienteAgregado = false; 
        }
     
    }
    
    function mostrarClientes(){
        tablaclientesDom.classList.remove("tabla-oculta");
        tablaclientesDom.classList.add("tabla-visible");


        tablaclientes.innerHTML="";
        

        for (let i=0;i<clientes.length;i++) {
        tablaclientes.innerHTML += "<tr>"+
                                        "<td>" + clientes[i].NombreyApellido + "</td>"+
                                        "<td>" + clientes[i].Direccion + "</td>"+
                                        "<td>" +clientes[i].Telefono + "</td>"+         
                                    "</tr>"
        }  
           
           
        formCliente.classList.add("tabla-oculta");
        vaciar();
            textocompra.innerHTML += `<p>GRACIAS POR SU COMPRA!!!</p>` +
                                    `<p> Nos contactaremos al teléfono ingresado para continuar con la misma.</p>`;
                                    
          
           

    }*/
   
                                 
    
//})