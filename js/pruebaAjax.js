"use strict"
const BASE_API="https://64961c16b08e17c9179303d9.mockapi.io/api/clientes";

let clientes=[
    compra=[],
];



document.addEventListener('DOMContentLoaded', function () {

    let id;



    async function obtenerDatos(){
        try{
            let res= await fetch(BASE_API);
            let clientes= await res.json();
            console.log(clientes);
            tabla.innerHTML="";
            for(const cliente of clientes){
                id=cliente.id;
                tabla.innerHTML += `
                            <tr>+
                                <td><img src='${cliente.producto.imagen}'></td>+
                                <td> ${cliente.producto.nombre}</td>+
                                <td> ${cliente.producto.precio}</td>+       
                                <td><button class='btn-sumar'>+</button>${cliente.producto.cantidad} <button class='btn-restar'>-</button></td> +
                                <td><button class='btn-delete'><i class='fas fa-trash'></i></button></td>" +     
                            </tr>
            `;
            }
        }catch(error){
            console.log(error);
        }
    }
        obtenerDatos();
    //let btnAgregar=document.querySelectorAll(".btn-agregar");
   /* let tabla = document.querySelector(".tabla tbody");
    let tablaDom=document.querySelector(".tabla");
    let btnVaciar=document.querySelector("#btn-vaciar");
    btnVaciar.addEventListener("click",vaciar);
    let total=document.querySelector(".total");
    let cantidad=1;


    async function agregar(event){
        event.preventDefault();

        tabla.innerHTML="<h1>loading...</h1>";
            try{
                let response=await fetch("http://127.0.0.1:5501/decoProd.html");
                if(response.ok){
                    let t=await response.text();
                    container.innerHTML=t;
                }
            //le AGREGO LA FUNCION AL NUEVO BOTON.
        
                document.querySelector('.btn-sumar').addEventListener("click", function() {
                    cantidad++;
                    mostrar();// actualizar tabla y total
                });


            }
    
            catch(error){
                console.log(error);   
                container.innerHTML="error";
            }
        }  
    
        let btnAgregar=document.querySelectorAll(".btn-agregar");
        btnAgregar.forEach(e=>e.addEventListener("click",agregar));


   /* function agregar() {
        tablaDom.classList.add("tabla-visible");
        tablaDom.classList.remove("tabla-oculta");
        btnVaciar.classList.add("tabla-visible");
        btnVaciar.classList.remove("tabla-oculta");
        
        
        let imagen = this.parentNode.querySelector("#img-prod-carrito").src;
        let nombre = this.parentNode.querySelector("#nombre-prod").dataset.nombre;
        let precio = this.parentNode.querySelector("#precio-prod").dataset.precio;

        let productoExiste = false;
        for(let i = 0; i < compra.length; i++){
            if(compra[i].nombre === nombre){
                productoExiste = true;
                compra[i].cantidad++;
                break;
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
    function mostrar() {

        tabla.innerHTML="";
    
        
       for (let producto of compra) { // Recorrer el arreglo de objetos
        
        tabla.innerHTML += "<tr>"+
                                "<td><img src='" + producto.imagen + "'></td>"+
                                "<td>" + producto.nombre + "</td>"+
                                "<td>" + producto.precio + "</td>"+       
                                "<td><button class='btn-sumar'>+</button>"+producto.cantidad+ "<button class='btn-restar'>-</button></td>" +
                                "<td><button class='btn-delete'><i class='fas fa-trash'></i></button></td>" +     
                            "</tr>"
                        
    
                            } 
                            
                            
/*El problema se debe a que los botones de eliminar se agregan dinámicamente cuando se agrega un producto,
    por lo que la asignación del evento click en los botones de eliminar debe realizarse cada vez que se agregue un producto al carrito. 
    Para solucionarlo, se puede mover el código que asigna el evento click de los botones de eliminar dentro de la función mostrar()
     después de crear las filas en la tabla: */
                          /*  let btnDelete=document.querySelectorAll(".btn-delete");
                            for(let botonDelete of btnDelete){
                                botonDelete.addEventListener("click", eliminarItem);
                            }
                            let btnSumar = document.querySelectorAll(".btn-sumar");
                            for (let i = 0; i < btnSumar.length; i++) {
                                btnSumar[i].addEventListener("click", function() {
                                cantidad++;
                                compra[i].cantidad = cantidad;
                                mostrar();// actualizar tabla y total
                            });
                            }
                            let btnRestar = document.querySelectorAll(".btn-restar");
                            for (let i = 0; i < btnRestar.length; i++) {
                                btnRestar[i].addEventListener("click", function() {
                                if (cantidad > 1) {
                                    cantidad--;
                                    compra[i].cantidad = cantidad;
                                    mostrar();// actualizar tabla y total
                                }

                            });
                            total.innerHTML += "TOTAL: $" + calcularTotal();
                                }

                               
    }
    
    /* el método splice para eliminar un elemento específico del array. 
    Además, es importante eliminar el elemento correspondiente del array compra para que no se muestre en la tabla. 
    */
    
    
  /*  function calcularTotal() {
        let totalCompra=0;
        for (let producto of compra) {
            totalCompra += Number(producto.precio);
            console.log(producto.precio)
        }
       
        console.log(totalCompra)
        return totalCompra;
       
    }

    function eliminarItem(){
        let fila = this.closest('tr');
        let i = Array.from(fila.parentNode.children).indexOf(fila);
        compra.splice(i, 1);
       // fila.remove();
        cantidad=1;
        mostrar();
    }

    function vaciar(){
        tabla.innerHTML="";
        compra=[];
        total.textContent = "";
        cantidad=1;
    }*/
    

    

})