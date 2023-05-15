"use strict"
const formulario = document.querySelector("#form");

var textCaptcha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("");
var captchaAleatorio;
var captchaGenerado = [];
var inputUsuario = document.querySelector("#input-rta-usuario");
var mensajeEnviado = document.querySelector("#msj-form-enviado");

function obtenerDatosForm(formulario) {
    var formData = new FormData(formulario);
    var nombre = formData.get("nombre");
    var apellido = formData.get("apellido");
    var email = formData.get("email");
    var mensaje = formData.get("mensaje");
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
    var myInput = document.getElementById('captcha');
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
