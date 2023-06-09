"use strict"
const formulario = document.querySelector("#form");

let recargar = document.querySelector("#btn-recargar").addEventListener("click", crearCaptcha);
let cerrarMensaje = document.querySelector("#btn-cerrar-mensaje").addEventListener("click", ocultarMensajes);;

let textCaptcha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
let captchaAleatorio;
let captchaGenerado = [];
let inputUsuario = document.querySelector("#input-rta-usuario");
let mensajeEnviado = document.querySelector("#msj-form-enviado");

function obtenerDatosForm(formulario) {
    let formData = new FormData(formulario);
    let nombre = formData.get("nombre");
    let apellido = formData.get("apellido");
    let email = formData.get("email");
    let mensaje = formData.get("mensaje");
}

function crearCaptcha() {
    document.querySelector("#captcha").innerHTML = '';
    captchaGenerado = [];
    captchaAleatorio = '';

    for (let i = 1; i <= 7; i++) {
        captchaGenerado.push(textCaptcha[Math.floor(Math.random() * textCaptcha.length)])
    }
    captchaAleatorio = captchaGenerado.join('');
    document.querySelector("#captcha").innerHTML = captchaAleatorio;
}
window.onload = function () {
    let myInput = document.getElementById('captcha');
    myInput.oncopy = function (e) {
        e.preventDefault();
    }
}

formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    obtenerDatosForm(formulario);
    let check = document.querySelector("#chequer");
    let respuestaCaptcha = document.querySelector("#respuesta-captcha");
    let checkCorrecto = false;
    let captchaCorrecto = false;
    if (inputUsuario.value.toString() === captchaAleatorio) {
        respuestaCaptcha.innerHTML = "Correcto.";
        respuestaCaptcha.classList.remove('mensaje-respuesta-incorrecta');
        respuestaCaptcha.classList.add('mensaje-respuesta-correcta');
        captchaCorrecto = true;
    } else {
        respuestaCaptcha.innerHTML = "Incorrectos.";
        respuestaCaptcha.classList.remove('mensaje-respuesta-correcta');
        respuestaCaptcha.classList.add('mensaje-respuesta-incorrecta');
    }
    if (check.checked != true) {
        document.querySelector("#respuesta-check").innerHTML = "Falta check.";
        document.querySelector("#respuesta-check").classList.add('mensaje-respuesta-incorrecta');
    } else {
        document.querySelector("#respuesta-check").innerHTML = "";
        document.querySelector("#respuesta-check").classList.remove('mensaje-respuesta-incorrecta');
        checkCorrecto = true;
    }
    if (captchaCorrecto && checkCorrecto) {
        document.querySelector("#msj-form-enviado").classList.remove('ocultar-mensaje-alerta');
        respuestaCaptcha.innerHTML = "";
        formulario.reset();
        check.checked = false;
        crearCaptcha();

    }
}
)

crearCaptcha();

function ocultarMensajes() {
    document.querySelector("#msj-form-enviado").classList.add('ocultar-mensaje-alerta');
}
