

function obtenerNumeroAleatorio() {
    numeroAleatorio = parseInt((Math.random() * 6) + 1);
    return numeroAleatorio;
}

function obtengoRespuestaCorrecta(numero) {
    switch (numero) {
        case 1: {
            respuestaCorrecta = "28ivw";
        } break;
        case 2: {
            respuestaCorrecta = "k4ez";
        } break;
        case 3: {
            respuestaCorrecta = "jw62k";
        } break;
        case 4: {
            respuestaCorrecta = "fh2de";
        } break;
        case 5: {
            respuestaCorrecta = "4d7ys";
        } break;
        case 6: {
            respuestaCorrecta = "xdhyn";
        } break;
    }
    return respuestaCorrecta;
}

function cargarCaptcha() {

    let numeroAleatorio = obtenerNumeroAleatorio();

    imagenCaptcha.src = "../assets/captchas/captcha" + numeroAleatorio + ".png";

    let respuestaCorrecta = obtengoRespuestaCorrecta(numeroAleatorio);

    return respuestaCorrecta;
}

function validoCaptcha(respuestaCorrecta, respuestaUsuario) {

    let captchaOk = false;
    let checkCaptcha = document.querySelector('#checkCaptcha');
    let mensajeCaptcha = document.querySelector('#mensajeCaptcha');
    let formularioEnviado = document.querySelector('#formularioEnviado');

    if (respuestaCorrecta === respuestaUsuario.toLowerCase()) {

        captchaOk = true;
        checkCaptcha.src = "../assets/check.png";
        mensajeCaptcha.innerText = "Cuenta Creada Exitosamente";
        formularioEnviado.classList.remove('formularioEnviado');
        formularioEnviado.classList.add('mostrarMensaje');


    } else {

        checkCaptcha.src = "../assets/noCheck.png";
        mensajeCaptcha.innerText = "Hubo un Error";
        formularioEnviado.classList.remove('formularioEnviado');
        formularioEnviado.classList.add('mostrarMensaje');

    }

    return captchaOk;
}

let respuestaCorrectaCaptcha = cargarCaptcha();

let BASE_URL = 'https://666c911749dbc5d7145e7546.mockapi.io';

async function agregar(e) {

    e.preventDefault();

    let formulario = document.querySelector('#formulario');

    let data = new FormData(formulario);

    let respuestaUsuario = data.get('inputUsuario').toLowerCase();

    let usuario = {
        nombre: data.get('nombre').toLowerCase(),
        apellido: data.get('apellido').toLowerCase(),
        nombreDeUsuario: data.get('nombreDeUsuario').toLowerCase(),
        mail: data.get('mail').toLowerCase(),
        password: data.get('password').toLowerCase(),
        plan: data.get('plan')

    }

    if (validoCaptcha(respuestaCorrectaCaptcha, respuestaUsuario)) {

        try {

            let response = await fetch(BASE_URL + '/usuarios', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(usuario),
            });

            if (response.ok) {
                console.log('Usuario agregado exitosamente');
            } else {
                console.error('Error al agregar usuario');
            }
        } catch (e) {
            console.error('Error en la solicitud', e);
        }
    }
};

let botonFormulario = document.querySelector('botonFormulario');

formulario.addEventListener('submit', agregar);