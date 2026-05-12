// Lee del localStorage
const origenBusqueda = localStorage.getItem('ultimaBusquedaOrigin');
const destinoBusqueda = localStorage.getItem('ultimaBusquedaDestiny');

const vuelos = [
    { id: "F101", origin: "France", destiny: "Japan", dep: "08:00", arr: "20:00" },
    { id: "F101", origin: "France", destiny: "United Kingdom", dep: "10:00", arr: "22:00" },
    { id: "F101", origin: "Spain", destiny: "Argentina", dep: "16:00", arr: "08:00" },
    { id: "F101", origin: "Germany", destiny: "Argentina", dep: "12:00", arr: "15:00" },
    { id: "F101", origin: "Germany", destiny: "United Kingdom", dep: "12:00", arr: "15:00" },
    { id: "F101", origin: "Japan", destiny: "Spain", dep: "08:00", arr: "20:00" },
    { id: "F101", origin: "United Kingdom", destiny: "Japan", dep: "10:00", arr: "22:00" },
    { id: "F101", origin: "Spain", destiny: "Japan", dep: "16:00", arr: "08:00" },
    { id: "F101", origin: "Spain", destiny: "France", dep: "12:00", arr: "15:00" },
    { id: "F101", origin: "Germany", destiny: "Japan", dep: "12:00", arr: "15:00" }

];

function cargarVuelos() {
    const tablaBody = document.querySelector(".flights-table tbody");

    // filtrar usando los valores recuperados
    const vuelosFiltrados = vuelos.filter(vuelo =>
        vuelo.origin.toLowerCase().trim() === origenBusqueda.toLowerCase().trim() &&
        vuelo.destiny.toLowerCase().trim() === destinoBusqueda.toLowerCase().trim()
    );

    // renderiza
    tablaBody.innerHTML = "";
    if (vuelosFiltrados.length > 0) {
        vuelosFiltrados.forEach(vuelo => {
            tablaBody.innerHTML += `
                <tr>
                    <td><strong>${vuelo.id}</strong></td>
                    <td>${vuelo.origin}</td>
                    <td>${vuelo.destiny}</td>
                    <td>${vuelo.dep}</td>
                    <td>${vuelo.arr}</td>
                    <td><button class="btn-select">Select</button></td>
                </tr>
            `;
        });
    } else {
        tablaBody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px;">
                    <h3>No flights found for this route</h3>
                    <p>From: <b>${origenBusqueda}</b> to: <b>${destinoBusqueda}</b></p>
                </td>
            </tr>`;
    }
}

cargarVuelos();