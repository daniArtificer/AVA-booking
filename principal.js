function cambiarCantidad(tipo, cambio) {
    const elemento = document.getElementById('num-' + tipo);
    let cantidad = parseInt(elemento.innerHTML);
    cantidad += cambio;

    const minimo = 0;
    if (cantidad < minimo) cantidad = minimo;
    if (cantidad > 9) cantidad = 9;

    elemento.innerHTML = cantidad;
    actualizarCajaPrincipal();
}

function actualizarCajaPrincipal() {
    const adultos = parseInt(document.getElementById('num-adults').innerHTML);
    const ninos = parseInt(document.getElementById('num-children').innerHTML);
    const seniors = parseInt(document.getElementById('num-seniors').innerHTML);
    const total = adultos + ninos + seniors;

    let textoResumen = "";
    if (total === 0) {
        textoResumen = "Select Passengers";
    } else if (total === 1 && adultos === 1) {
        textoResumen = "1 Adult";
    } else if (total === 1 && ninos === 1) {
        textoResumen = "1 Child";
    } else if (total === 1 && seniors === 1) {
        textoResumen = "1 Senior";
    } else {
        textoResumen = total + " Passengers";
    }
    document.getElementById('passengers-text').innerHTML = textoResumen + ' ▼';
}

// Lógica de búsqueda y validación
document.querySelector('.search-form').addEventListener('submit', function(event) {
    const origin = document.getElementById('from').value.trim();
    const destination = document.getElementById('to').value.trim();
    const adults = parseInt(document.getElementById('num-adults').innerHTML);
    const ninos = parseInt(document.getElementById('num-children').innerHTML);
    const seniors = parseInt(document.getElementById('num-seniors').innerHTML);
    const totalPassengers = adults + ninos + seniors;

    if (origin === "" || destination === "" || totalPassengers === 0) {
        event.preventDefault(); 
        alert("Please complete all fields: Origin, Destination and at least 1 Passenger.");
        return;
    }

    if (ninos > 0 && adults === 0 && seniors === 0) {
        event.preventDefault(); 
        alert("Booking error: Children are not allowed to travel without an adult or senior companion.");
        return;
    }

    // GUARDAR DATOS PARA LA SIGUIENTE PÁGINA
    localStorage.setItem('ultimaBusquedaOrigin', origin);
    localStorage.setItem('ultimaBusquedaDestiny', destination);
    localStorage.setItem('adultsCount', adults);
    localStorage.setItem('childrenCount', ninos);
    localStorage.setItem('seniorsCount', seniors);
});

// Configuración de fechas
window.addEventListener("DOMContentLoaded", function() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;
    document.getElementById('departure-date').setAttribute('min', minDate);
});

document.getElementById('departure-date').addEventListener('change', function() {
    const departureDate = this.value;
    const returnDateInput = document.getElementById('return-date');
    returnDateInput.setAttribute('min', departureDate);
    if (returnDateInput.value && returnDateInput.value < departureDate) {
        returnDateInput.value = '';
    }
});

// Lógica de visualización de fecha de retorno
const radioVuelos = document.getElementsByName('vuelo');
const cajaReturn = document.getElementById('return-date').parentElement;

function toggleDate() {
    let valorSeleccionado = "";
    radioVuelos.forEach(radio => { if (radio.checked) valorSeleccionado = radio.value; });
    cajaReturn.style.display = (valorSeleccionado === 'Return') ? 'block' : 'none';
}
radioVuelos.forEach(radio => radio.addEventListener('change', toggleDate));
toggleDate();
