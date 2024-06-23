"use strict";

document.addEventListener('DOMContentLoaded', () => {
    window.addEventListener('load', obtenerPilotos);

    const URLPILOTOS = 'https://6665f5bfd122c2868e424cdd.mockapi.io/f1/piloto';

    let botonAgregar = document.querySelector('#mostrarMas');

    botonAgregar.addEventListener('click', (e) => {
        e.preventDefault();
        let agregarPiloto = document.querySelector('#agregarPiloto');
        agregarPiloto.classList.toggle('oculto');
    });

    async function obtenerPilotos() {
        try {
            const response = await fetch(URLPILOTOS);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const pilotos = await response.json();
            ordenarArreglo(pilotos);
            mostrar(pilotos);
        } catch (error) {
            console.error('Error al obtener los pilotos:', error);
        }
    }

    function ordenarArreglo(arreglo) {
        let n = arreglo.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arreglo[j].puntosTotales < arreglo[j + 1].puntosTotales) {
                    let temp = arreglo[j];
                    arreglo[j] = arreglo[j + 1];
                    arreglo[j + 1] = temp;
                }
            }
        }
    }

    function mostrar(arreglo) {
        let tablaPilotosAdmin = document.querySelector('#tablaPilotosAdmin');
        let nuevaLista = '';

        for (let i = 0; i < arreglo.length; i++) {
            let piloto = arreglo[i];

            nuevaLista += `
                <tr class="row rowPilotosAdmin${piloto.id}">
                    <form id="formModificarPiloto${piloto.id}" class="formularioModificar">
                        <td class='celdaFijaAdmin'>
                            <p  class="datoPiloto${piloto.id}">${piloto.nombre}</p>                            
                        </td>
                        <td class='celdaFijaAdmin'> 
                            <p class="datoPiloto${piloto.id}">${piloto.apellido}</p>                            
                        </td>
                        <td class='celdaFijaAdmin '>
                            <p  class="datoPiloto${piloto.id}">${piloto.equipo}</p>                            
                        </td>
                        <td class='celdaFijaAdmin '>
                            <p  class="datoPiloto${piloto.id}">${piloto.puntosTotales}</p>                            
                            
                        </td>
                        <td>
                            <button class="btnBorrarPiloto botonAdminCarreras" value="${piloto.id}">✖️</button>
                        </td>                        
                    </form>
                </tr>`;
        }

        tablaPilotosAdmin.innerHTML = nuevaLista;

        let botonesBorrar = document.querySelectorAll(".btnBorrarPiloto");
        let botonesModificar = document.querySelectorAll(".btnModificarPiloto");        


        for (let i = 0; i < botonesBorrar.length; i++) {
            let btnBorrar = botonesBorrar[i];
            let btnModificar = botonesModificar[i];

            let idPiloto = btnBorrar.getAttribute('value');

            btnBorrar.addEventListener('click', (e) => {
                e.preventDefault();
                borrarPiloto(idPiloto);
            });
           

        }
    }

   


    async function borrarPiloto(id) {
        try {
            let respuesta = await fetch(`${URLPILOTOS}/${id}`, {
                method: 'DELETE'
            });

            if (respuesta.ok) {
                console.log('Piloto borrado exitosamente: ' + id);
                obtenerPilotos();
            } else {
                throw new Error(`Error al borrar piloto: ${respuesta.status}`);
            }
        } catch (e) {
            console.error('Error al borrar el piloto:', e);
        }
    }

    async function agregarPiloto(e) {
        e.preventDefault();

        let formulario = document.querySelector('#FormPiloto');
        let data = new FormData(formulario);

        let piloto = {
            nombre: data.get('nombre').toLowerCase(),
            apellido: data.get('apellido').toLowerCase(),
            equipo: data.get('equipo').toLowerCase(),
            puntosTotales: parseInt(data.get('puntosTotales'))
        };

        try {
            let respuesta = await fetch(URLPILOTOS, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(piloto),
            });

            if (respuesta.ok) {
                console.log('Piloto agregado exitosamente');
                obtenerPilotos();
            } else {
                console.error('Error al agregar piloto');
            }
        } catch (e) {
            console.error('Error en la solicitud', e);
        }

        formulario.reset();
    }

    let formAgregaPilotos = document.querySelector('#FormPiloto');
    formAgregaPilotos.addEventListener('submit', agregarPiloto);

   

})




