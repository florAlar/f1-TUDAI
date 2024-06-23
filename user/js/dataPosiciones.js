window.addEventListener('load', loadGrandPrixResults);

async function loadGrandPrixResults() {

    try {
        //
        const response = await fetch('https://6665f5bfd122c2868e424cdd.mockapi.io/f1/resultadosCarrera');

        if (!response.ok) {
            throw new Error(`error : ${response.status}`);
        }


        const resultado = await response.json();

        let cuerpoTabla = document.querySelector("#tablaResultados");
        let nuevoCuerpoTabla = "";


        for (let i = 0; i < resultado.length; i++) {
            const carrera = resultado[i];
            nuevoCuerpoTabla += `

            <tr class="tablaFlexible">
                    <td class="celdaFija">${resultado[i].granPremio}</th>
                    <td class="desktop celdaFija">${carrera.fecha}</th>
                    <td class="celdaFija">${carrera.pilotoGanador}</th>
                    <td class="celdaFija">${carrera.equipoGanador}</th>                    
                    <td class="desktop">${carrera.mejorTiempo}</th>

                </tr>
            `
        }
        cuerpoTabla.innerHTML = nuevoCuerpoTabla;
    }
    catch (error) {
        console.error('error', error);
    }
}
