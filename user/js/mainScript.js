document.addEventListener('DOMContentLoaded', function () {
    /* Menu Hamburguesa */

    let botonMenuHamburguesa = document.querySelector("#botonMenuHamburguesa");
    let navegacionMobile = document.querySelector("#navegacionMobile");


    function desplegarMenu() {
        botonMenuHamburguesa.classList.toggle('botonMenuHamburguesaActivo');
        navegacionMobile.classList.toggle('menuDesplegado');
    }

    botonMenuHamburguesa.addEventListener("click", desplegarMenu);

    /* MODO OSCURO*/

    let botonModoOscuro = document.querySelector("#botonModoOscuro");

    function modoOscuro() {

        let homeCronogramaSection = document.querySelector(".homeCronograma");
        let homePosicionesSection = document.querySelector(".homePosiciones");
        let pageCronograma = document.querySelector(".mainCronograma");
        let pagePosiciones = document.querySelector("#pagePosiciones");
        let backgroundHomePilotos = document.querySelectorAll(".backgroundPiloto");
        let rowPosicionPilotos = document.querySelectorAll(".rowPiloto");

        let rowCardEventAnteriorCronograma = document.querySelectorAll(".cardEventAnteriorCronograma");
        let rowPosiciones = document.querySelectorAll(".tablaFlexible");


        if (homeCronogramaSection && homePosicionesSection && backgroundHomePilotos && rowPosicionPilotos) {

            homePosicionesSection.classList.toggle("homePosicionesOscuro");
            homeCronogramaSection.classList.toggle("backgroundOscuro");

            for (let i = 0; i < backgroundHomePilotos.length; i++) {
                backgroundHomePilotos[i].classList.toggle("backgroundOscuro");
            }
            for (let i = 0; i < rowPosicionPilotos.length; i++) {
                rowPosicionPilotos[i].classList.toggle("backgroundOscuro");
            }
        }


        if (pageCronograma && rowCardEventAnteriorCronograma) {
            pageCronograma.classList.toggle("backgroundOscuro");

            for (let i = 0; i < rowCardEventAnteriorCronograma.length; i++) {
                rowCardEventAnteriorCronograma[i].classList.toggle("backgroundRow")
            }
        }

        if (rowPosiciones) {

            pagePosiciones.classList.toggle("backgroundOscuro");
            for (let i = 0; i < rowPosiciones.length; i++) {
                rowPosiciones[i].classList.toggle("backgroundRow");
            }
        }


    }

    botonModoOscuro.addEventListener("click", modoOscuro);

    /* boton ver mas*/

    let botonesVerMas = document.querySelectorAll('.verMas');

    for (let i = 0; i < botonesVerMas.length; i++) {

        botonesVerMas[i].addEventListener("click", function (e) {
            let cronogramaLocal = this.previousElementSibling;
            cronogramaLocal.classList.toggle("oculto")
        })
    }


})
