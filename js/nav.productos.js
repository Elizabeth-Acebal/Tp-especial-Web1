document.addEventListener('DOMContentLoaded', function () {
   


    async function cargarContenido(id) {


        let container = document.querySelector("#contenido");
        try {
            container.innerHTML = ""; // Elimina el contenido existente
            let response = await fetch(`${window.location.origin}/${id}.html`);

            if (response.ok) {
                let content = await response.text();
                container.innerHTML = content;
            } else {
                container.innerHTML = "Error loading for" + id + "...";
            }
        } catch (error) {
            container.innerHTML = "Error";
        }
    }

    function push(event) {
        //le pasamos por parametro el id o el link que clikeamos
        let id = event.target.id;
        //vemos que boton clickeamos
        document.title = id;
        cargarContenido(id);
        //gregamos el estado cuando cambie de direccion {}}
        window.history.pushState({ id }, `${id}`, `/${id}`);
        //guardamos el id en el estado, el titulo/nombre de la pagina y a ure

    }

    window.onload = (event) => {
        // cuando la página se carga
        // agrega un evento historial al hacer clic en mis elementos
        //navegacion en productos
        window.document.querySelector("#btn-dormitorio").addEventListener("click", (event) => push(event));
        window.document.querySelector("#btn-cortinas").addEventListener("click", (event) => push(event));
        window.document.querySelector("#btn-muebles").addEventListener("click", (event) => push(event));
        window.document.querySelector("#btn-deco").addEventListener("click", (event) => push(event));
        
    };




    window.addEventListener("popstate", (event) => {
        //agara el estado anterior
        let stateId = event.state.id;

       // SelecTab(stateId); //selecciona estado anterior
        cargarContenido(stateId);//carga el estado anterior
    });
});