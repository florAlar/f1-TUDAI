window.addEventListener('load', obtenerCarreras);


const URLBASE = 'https://6665f5bfd122c2868e424cdd.mockapi.io/f1/resultadosCarrera';

let botonAgregar = document.querySelector('#mostrarMasFormulario');

botonAgregar.addEventListener('click', (e) => {
    e.preventDefault();
    let agregarCarrera = document.querySelector('#agregarCarreras');
    agregarCarrera.classList.toggle('oculto');
});

async function obtenerCarreras() {

    const response = await fetch(URLBASE);

    if (!response.ok) {
        throw new Error(`error : ${response.status}`);
    }

    const carreras = await response.json();

    mostrarCarreras(carreras)


}


function mostrarCarreras(arreglo) {

    let tablaCarrerasAdmin = document.querySelector('#tablaCarrerasAdmin');
    let nuevaListaCarreras = '';

    for (let i = 0; i < arreglo.length; i++) {
        let carrera = arreglo[i];


        nuevaListaCarreras += `
        <tr class="rowCarrerasAdmin">
                    <td class="celdaFijaAdmin">${carrera.granPremio}</td>
                    <td class="desktop celdaFijaAdmin">${carrera.fecha}</td>
                    <td class="celdaFijaAdmin">${carrera.pilotoGanador}</td>
                    <td class="celdaFijaAdmin">${carrera.equipoGanador}</td>                    
                    <td class="desktop celdaFijaAdmin">${carrera.mejorTiempo}</td>
                    <td><button class=" botonAdminCarreras btnEliminarCarrera" value="${carrera.id}">✖️</button></td>
        </tr>
                
            `


    }
    tablaCarrerasAdmin.innerHTML = nuevaListaCarreras

    let botonesEliminarCarrera = document.querySelectorAll('.btnEliminarCarrera');

    for (let btn of botonesEliminarCarrera) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let idCarrera = btn.getAttribute('value');
            eliminarCarrera(idCarrera)
        })
    }
}


async function eliminarCarrera(id) {
    try {
        let respuesta = await fetch(`${URLBASE}/${id}`, {
            method: 'DELETE'
        });

        if (respuesta.ok) {
            console.log('Piloto borrado exitosamente: ' + id);
            obtenerCarreras();
        } else {
            throw new Error(`Error al borrar piloto: ${respuesta.status}`);
        }
    } catch (e) {
        console.error('Error al borrar el piloto:', e);
    }
}

async function agregarCarrera(e){

    e.preventDefault();

        let formulario = document.querySelector('#FormCarreras');
        let data = new FormData(formulario);

        let piloto = {
            granPremio: data.get('granPremio').toLowerCase(),
            equipoGanador: data.get('equipo').toLowerCase(),
            mejorTiempo: data.get('tiempoCarrera').toLowerCase(),
            pilotoGanador: data.get('ganador').toLowerCase(),
            fecha: data.get('fecha').toLowerCase()
        };

        try {
            let respuesta = await fetch(URLBASE, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(piloto),
            });

            if (respuesta.ok) {
                console.log('carrera agregado exitosamente');
                obtenerCarreras();
            } else {
                console.error('Error al agregar piloto');
            }
        } catch (e) {
            console.error('Error en la solicitud', e);
        }

        formulario.reset();
    }

let formAgregaCarrera = document.querySelector('#FormCarreras');

formAgregaCarrera.addEventListener('submit', agregarCarrera);