// Lee del localStorage
const origenBusqueda = localStorage.getItem('ultimaBusquedaOrigin');
const destinoBusqueda = localStorage.getItem('ultimaBusquedaDestiny');

const vuelos = [
    { id: "F001", origin: "United States", destiny: "United Kingdom", dep: "08:00", arr: "20:00" },
    { id: "F002", origin: "United States", destiny: "France", dep: "08:00", arr: "20:00" },
    { id: "F003", origin: "United States", destiny: "China", dep: "08:00", arr: "20:00" },
    { id: "F004", origin: "United States", destiny: "Germany", dep: "08:00", arr: "20:00" },
    { id: "F005", origin: "United States", destiny: "Italy", dep: "08:00", arr: "20:00" },
    { id: "F006", origin: "United States", destiny: "Argentina", dep: "08:00", arr: "20:00" },
    { id: "F007", origin: "United States", destiny: "Japan", dep: "08:00", arr: "20:00" },
    { id: "F008", origin: "United States", destiny: "Venezuela", dep: "08:00", arr: "20:00" },

    { id: "F009", origin: "United Kingdom", destiny: "United States", dep: "08:00", arr: "20:00" },
    { id: "F010", origin: "United Kingdom", destiny: "France", dep: "08:00", arr: "20:00" },
    { id: "F011", origin: "United Kingdom", destiny: "China", dep: "08:00", arr: "20:00" },
    { id: "F012", origin: "United Kingdom", destiny: "Germany", dep: "08:00", arr: "20:00" },
    { id: "F013", origin: "United Kingdom", destiny: "Italy", dep: "08:00", arr: "20:00" },
    { id: "F014", origin: "United Kingdom", destiny: "Argentina", dep: "08:00", arr: "20:00" },
    { id: "F015", origin: "United Kingdom", destiny: "Japan", dep: "08:00", arr: "20:00" },
    { id: "F016", origin: "United Kingdom", destiny: "Venezuela", dep: "08:00", arr: "20:00" },

    { id: "F017", origin: "France", destiny: "United States", dep: "08:00", arr: "20:00" },
    { id: "F018", origin: "France", destiny: "United Kingdom", dep: "08:00", arr: "20:00" },
    { id: "F019", origin: "France", destiny: "China", dep: "08:00", arr: "20:00" },
    { id: "F020", origin: "France", destiny: "Germany", dep: "08:00", arr: "20:00" },
    { id: "F021", origin: "France", destiny: "Italy", dep: "08:00", arr: "20:00" },
    { id: "F022", origin: "France", destiny: "Argentina", dep: "08:00", arr: "20:00" },
    { id: "F023", origin: "France", destiny: "Japan", dep: "08:00", arr: "20:00" },
    { id: "F024", origin: "France", destiny: "Venezuela", dep: "08:00", arr: "20:00" },

    { id: "F025", origin: "China", destiny: "United States", dep: "08:00", arr: "20:00" },
    { id: "F026", origin: "China", destiny: "United Kingdom", dep: "08:00", arr: "20:00" },
    { id: "F027", origin: "China", destiny: "France", dep: "08:00", arr: "20:00" },
    { id: "F028", origin: "China", destiny: "Germany", dep: "08:00", arr: "20:00" },
    { id: "F029", origin: "China", destiny: "Italy", dep: "08:00", arr: "20:00" },
    { id: "F030", origin: "China", destiny: "Argentina", dep: "08:00", arr: "20:00" },
    { id: "F031", origin: "China", destiny: "Japan", dep: "08:00", arr: "20:00" },
    { id: "F032", origin: "China", destiny: "Venezuela", dep: "08:00", arr: "20:00" },

    { id: "F033", origin: "Germany", destiny: "United States", dep: "08:00", arr: "20:00" },
    { id: "F034", origin: "Germany", destiny: "United Kingdom", dep: "08:00", arr: "20:00" },
    { id: "F035", origin: "Germany", destiny: "France", dep: "08:00", arr: "20:00" },
    { id: "F036", origin: "Germany", destiny: "China", dep: "08:00", arr: "20:00" },
    { id: "F037", origin: "Germany", destiny: "Italy", dep: "08:00", arr: "20:00" },
    { id: "F038", origin: "Germany", destiny: "Argentina", dep: "08:00", arr: "20:00" },
    { id: "F039", origin: "Germany", destiny: "Japan", dep: "08:00", arr: "20:00" },
    { id: "F040", origin: "Germany", destiny: "Venezuela", dep: "08:00", arr: "20:00" },

    { id: "F041", origin: "Italy", destiny: "United States", dep: "08:00", arr: "20:00" },
    { id: "F042", origin: "Italy", destiny: "United Kingdom", dep: "08:00", arr: "20:00" },
    { id: "F043", origin: "Italy", destiny: "France", dep: "08:00", arr: "20:00" },
    { id: "F044", origin: "Italy", destiny: "China", dep: "08:00", arr: "20:00" },
    { id: "F045", origin: "Italy", destiny: "Germany", dep: "08:00", arr: "20:00" },
    { id: "F046", origin: "Italy", destiny: "Argentina", dep: "08:00", arr: "20:00" },
    { id: "F047", origin: "Italy", destiny: "Japan", dep: "08:00", arr: "20:00" },
    { id: "F048", origin: "Italy", destiny: "Venezuela", dep: "08:00", arr: "20:00" },

    { id: "F049", origin: "Argentina", destiny: "United States", dep: "08:00", arr: "20:00" },
    { id: "F050", origin: "Argentina", destiny: "United Kingdom", dep: "08:00", arr: "20:00" },
    { id: "F051", origin: "Argentina", destiny: "France", dep: "08:00", arr: "20:00" },
    { id: "F052", origin: "Argentina", destiny: "China", dep: "08:00", arr: "20:00" },
    { id: "F053", origin: "Argentina", destiny: "Germany", dep: "08:00", arr: "20:00" },
    { id: "F054", origin: "Argentina", destiny: "Italy", dep: "08:00", arr: "20:00" },
    { id: "F055", origin: "Argentina", destiny: "Japan", dep: "08:00", arr: "20:00" },
    { id: "F056", origin: "Argentina", destiny: "Venezuela", dep: "08:00", arr: "20:00" },

    { id: "F057", origin: "Japan", destiny: "United States", dep: "08:00", arr: "20:00" },
    { id: "F058", origin: "Japan", destiny: "United Kingdom", dep: "08:00", arr: "20:00" },
    { id: "F059", origin: "Japan", destiny: "France", dep: "08:00", arr: "20:00" },
    { id: "F060", origin: "Japan", destiny: "China", dep: "08:00", arr: "20:00" },
    { id: "F061", origin: "Japan", destiny: "Germany", dep: "08:00", arr: "20:00" },
    { id: "F062", origin: "Japan", destiny: "Italy", dep: "08:00", arr: "20:00" },
    { id: "F063", origin: "Japan", destiny: "Argentina", dep: "08:00", arr: "20:00" },
    { id: "F064", origin: "Japan", destiny: "Venezuela", dep: "08:00", arr: "20:00" },

    { id: "F065", origin: "Venezuela", destiny: "United States", dep: "08:00", arr: "20:00" },
    { id: "F066", origin: "Venezuela", destiny: "United Kingdom", dep: "08:00", arr: "20:00" },
    { id: "F067", origin: "Venezuela", destiny: "France", dep: "08:00", arr: "20:00" },
    { id: "F068", origin: "Venezuela", destiny: "China", dep: "08:00", arr: "20:00" },
    { id: "F069", origin: "Venezuela", destiny: "Germany", dep: "08:00", arr: "20:00" },
    { id: "F070", origin: "Venezuela", destiny: "Italy", dep: "08:00", arr: "20:00" },
    { id: "F071", origin: "Venezuela", destiny: "Argentina", dep: "08:00", arr: "20:00" },
    { id: "F072", origin: "Venezuela", destiny: "Japan", dep: "08:00", arr: "20:00" }
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
