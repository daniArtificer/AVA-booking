function cargarVuelos() {
    const tablaBody = document.querySelector(".flights-table tbody");
    if (!origenBusqueda || !destinoBusqueda) {
        tablaBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Please perform a search from the main page.</td></tr>`;
        return;
    }

    // 2. Creamos una lista con TODOS los vuelos de todos los días
    let todosLosVuelos = [];
    Object.values(baseDeDatosVuelos).forEach(vuelosDelDia => {
        todosLosVuelos = todosLosVuelos.concat(vuelosDelDia);
    });

    // 3. Filtramos únicamente por origen y destino
    const vuelosFiltrados = todosLosVuelos.filter(vuelo => {
        return vuelo.origin.toLowerCase() === origenBusqueda.toLowerCase().trim() && 
               vuelo.destiny.toLowerCase() === destinoBusqueda.toLowerCase().trim();
    });

    // 4. Mostramos los resultados
    if (tablaBody) {
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
                        <td><button class="btn-select" onclick="confirmarVuelo('${vuelo.id}')">Select</button></td>
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
}
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}
const vuelos = [
    { id: "F101", origin: "France", destiny: "Japan", dep: "08:00", arr: "20:00" },
    { id: "F101", origin: "France", destiny: "United Kingdom", dep: "10:00", arr: "22:00" },
    { id: "F101", origin: "Spain", destiny: "Argentina", dep: "16:00", arr: "08:00" },
    { id: "F101", origin: "Germany", destiny: "Argentina", dep: "12:00", arr: "00:00" }
];

// 2. Función para obtener parámetros de la URL.
function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// 3. Lee los parámetros ANTES de usarlos
const origenBusqueda = getQueryParam('origin');
const destinoBusqueda = getQueryParam('destiny');

// 4. Función principal para pintar los vuelos
function cargarVuelos() {
    const tablaBody = document.querySelector(".flights-table tbody");

    // Muestra mensaje si falta info
    if (!origenBusqueda || !destinoBusqueda) {
        tablaBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Please perform a search from the main page.</td></tr>`;
        return;
    }

    // Filtro de vuelos según origen y destino
    const vuelosFiltrados = vuelos.filter(vuelo => 
        vuelo.origin.toLowerCase().trim() === origenBusqueda.toLowerCase().trim() && 
        vuelo.destiny.toLowerCase().trim() === destinoBusqueda.toLowerCase().trim()
    );

    // Pinta la tabla o el mensaje vacío
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

// 5. Llama la función después de definirlo todo
cargarVuelos();
// Obtenerlos al cargar la página
