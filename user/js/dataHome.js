window.addEventListener('load', loadPilotosHome);

async function loadPilotosHome() {
    try {

        //intentar acomodar el html por puntaje

        const resultado = await fetch('https://6665f5bfd122c2868e424cdd.mockapi.io/f1/piloto');

        if (!resultado.ok) {
            throw new Error(resultado.status);
        }

        const pilotos = await resultado.json();
        ordenarArreglo(pilotos);

        let posicionesPilotos = document.querySelector('#posicionPilotosHome');

        let posicionesPilotosNuevo = '';

        for (let i = 0; i < pilotos.length; i++) {
            const piloto = pilotos[i];
            posicionesPilotosNuevo += `
                    <div class="rowPiloto">
                        <p>${i + 1}</p>
                        <p class="flex"><span class="desktop">${piloto.nombre}</span> ${piloto.apellido} <span class="desktop"> - ${piloto.equipo}</span>
                        </p>
                        <p>${piloto.puntosTotales} PTS</p>
                    </div>`
        }

        posicionesPilotos.innerHTML = posicionesPilotosNuevo;
    } catch (error) {
        console.error('error', error);
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