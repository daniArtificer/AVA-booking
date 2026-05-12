const params = new URLSearchParams(window.location.search);
const fechaBusqueda = params.get('fecha');
const origenBusqueda = params.get('origen'); 
const destinoBusqueda = params.get('destino'); 

// Base de datos global para el AVA-101 recorriendo tus destinos
const baseDeDatosVuelos = {
    "2026-05-12": [
        { id: "AVA-101", origin: "Spain", destiny: "France", dep: "08:00 AM", arr: "10:00 AM" },
        { id: "AVA-101", origin: "France", destiny: "Germany", dep: "02:00 PM", arr: "03:30 PM" },
        { id: "AVA-101", origin: "Germany", destiny: "China", dep: "08:00 PM", arr: "11:30 AM (+1)" }
    ],
    "2026-05-13": [
        { id: "AVA-101", origin: "China", destiny: "Italy", dep: "10:00 PM", arr: "04:00 AM (+1)" }
    ],
    "2026-05-14": [
        { id: "AVA-101", origin: "Italy", destiny: "Mexico", dep: "09:00 AM", arr: "03:00 PM" },
        { id: "AVA-101", origin: "Mexico", destiny: "United States", dep: "07:00 PM", arr: "10:00 PM" }
    ],
    "2026-05-15": [
        { id: "AVA-101", origin: "United States", destiny: "Spain", dep: "11:00 PM", arr: "12:00 PM (+1)" }
    ],
    "2026-05-16": [
        { id: "AVA-101", origin: "Spain", destiny: "Italy", dep: "07:00 AM", arr: "09:15 AM" },
        { id: "AVA-101", origin: "Italy", destiny: "Germany", dep: "01:00 PM", arr: "02:45 PM" }
    ],
    "2026-05-17": [
        { id: "AVA-101", origin: "Germany", destiny: "Mexico", dep: "10:00 AM", arr: "04:30 PM" },
        { id: "AVA-101", origin: "Mexico", destiny: "China", dep: "09:00 PM", arr: "02:00 AM (+2)" }
    ]
};

function cargarVuelos() {
    const tablaBody = document.querySelector(".flights-table tbody");
    const container = document.querySelector(".table-container");
    
    // Si no hay datos de búsqueda, mostramos un aviso
    if (!fechaBusqueda || !origenBusqueda || !destinoBusqueda) {
        tablaBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">Please perform a search from the main page.</td></tr>`;
        return;
    }

    const vuelosDelDia = baseDeDatosVuelos[fechaBusqueda] || [];

    // Filtramos por origen y destino (ignorando mayúsculas/minúsculas)
    const vuelosFiltrados = vuelosDelDia.filter(vuelo => {
        return vuelo.origin.toLowerCase() === origenBusqueda.toLowerCase() && 
               vuelo.destiny.toLowerCase() === destinoBusqueda.toLowerCase();
    });

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
                        <div style="font-size: 50px;">✈️</div>
                        <h3>No flights found for this route</h3>
                        <p>Search: <b>${origenBusqueda}</b> to <b>${destinoBusqueda}</b> on <b>${fechaBusqueda}</b></p>
                        <hr style="width:50%; border:0; border-top:1px solid #eee; margin: 20px auto;">
                        <p style="color: #666; font-size: 14px;">Try these combinations for testing:</p>
                        <ul style="list-style:none; padding:0; font-size: 13px; color: #888;">
                            <li>May 12: Spain to France</li>
                            <li>May 14: Italy to Mexico</li>
                            <li>May 17: Germany to Mexico</li>
                        </ul>
                    </td>
                </tr>`;
        }
    }
}

function confirmarVuelo(id) {
    alert(`Success! Flight ${id} has been added to your cart.`);
}

window.onload = cargarVuelos;