// 1. Recuperamos los datos de la búsqueda
const origenBusqueda = localStorage.getItem('ultimaBusquedaOrigin') || "";
const destinoBusqueda = localStorage.getItem('ultimaBusquedaDestiny') || "";

const destinosMaestros = [
    { pais: "Spain", cod: "JBU" },
    { pais: "United States", cod: "DTT" },
    { pais: "United Kingdom", cod: "LON" },
    { pais: "France", cod: "PAR" },
    { pais: "China", cod: "BJS" },
    { pais: "Germany", cod: "XHJ" },
    { pais: "Italy", cod: "MXP" },
    { pais: "Mexico", cod: "ACA" },
    { pais: "Argentina", cod: "BUE" },
    { pais: "Japan", cod: "TYO" },
    { pais: "Venezuela", cod: "CCS" }
];

// 2. Definición de estados y sus clases CSS
const estadosVuelo = [
    { texto: "On time", clase: "normal" },
    { texto: "Delayed", clase: "delayed" },
    { texto: "Boarding", clase: "on-boarding" }
];

function generarHora() {
    const horas = ["01", "03", "05", "08", "10", "12", "14", "17", "20", "22"];
    const mins = ["00", "15", "30", "45"];
    const ampm = Math.random() > 0.5 ? "AM" : "PM";
    return `${horas[Math.floor(Math.random() * horas.length)]}:${mins[Math.floor(Math.random() * mins.length)]} ${ampm}`;
}

function cargarVuelos() {
    const tablaBody = document.querySelector(".flights-table tbody");
    if (!tablaBody) return;

    let listaVuelosAMostrar = [];

    // Función auxiliar para obtener un estado aleatorio
    const obtenerEstadoAzar = () => estadosVuelo[Math.floor(Math.random() * estadosVuelo.length)];

    if (origenBusqueda && destinoBusqueda) {
        const infoOrig = destinosMaestros.find(d => d.pais.toLowerCase() === origenBusqueda.toLowerCase().trim());
        const infoDest = destinosMaestros.find(d => d.pais.toLowerCase() === destinoBusqueda.toLowerCase().trim());

        const nombreOrigen = infoOrig ? `${infoOrig.pais} ${infoOrig.cod}` : origenBusqueda;
        const nombreDestino = infoDest ? `${infoDest.pais} ${infoDest.cod}` : destinoBusqueda;

        listaVuelosAMostrar.push({
            id: "AVA-" + Math.floor(Math.random() * 900 + 100),
            origin: nombreOrigen,
            destiny: nombreDestino,
            dep: "08:00 AM",
            arr: "11:30 AM",
            status: obtenerEstadoAzar()
        });

        listaVuelosAMostrar.push({
            id: "AVA-" + Math.floor(Math.random() * 900 + 100),
            origin: nombreOrigen,
            destiny: nombreDestino,
            dep: "04:00 PM",
            arr: "07:30 PM",
            status: obtenerEstadoAzar()
        });
    }

    for (let i = 0; i < 6; i++) {
        const azarOrig = destinosMaestros[Math.floor(Math.random() * destinosMaestros.length)];
        let azarDest = destinosMaestros[Math.floor(Math.random() * destinosMaestros.length)];

        while (azarDest.pais === azarOrig.pais) {
            azarDest = destinosMaestros[Math.floor(Math.random() * destinosMaestros.length)];
        }

        listaVuelosAMostrar.push({
            id: "AVA-" + Math.floor(Math.random() * 900 + 100),
            origin: `${azarOrig.pais} ${azarOrig.cod}`,
            destiny: `${azarDest.pais} ${azarDest.cod}`,
            dep: generarHora(),
            arr: generarHora(),
            status: obtenerEstadoAzar()
        });
    }

    tablaBody.innerHTML = "";
    listaVuelosAMostrar.forEach(vuelo => {
        // Bloqueo de acceso: si el estado es Boarding, el botón se deshabilita
        const isBoarding = vuelo.status.texto === "Boarding";
        const linkHTML = isBoarding 
            ? `<span class="btn-select disabled" onclick="alert('This flight is already boarding and cannot be booked.')">Select</span>`
            : `<a href="form.html" class="btn-select">Select</a>`;

        tablaBody.innerHTML += `
            <tr>
                <td><strong>${vuelo.id}</strong></td>
                <td>${vuelo.origin}</td>
                <td>${vuelo.destiny}</td>
                <td>${vuelo.dep}</td>
                <td>${vuelo.arr}</td>
                <td><span class="status-badge ${vuelo.status.clase}">${vuelo.status.texto}</span></td>
                <td>${linkHTML}</td>
            </tr>
        `;
    });
}

document.addEventListener('DOMContentLoaded', cargarVuelos);
