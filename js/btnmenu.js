"use strict"
document.querySelector(".btn-menu").addEventListener("click", cambiarMenu);

function cambiarMenu(){
    document.querySelector(".menu").classList.toggle("cambio");
}