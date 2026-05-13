function cambiarCantidad(tipo, cambio) {
    const elemento = document.getElementById('num-' + tipo);
    let cantidad = parseInt(elemento.innerHTML);

    cantidad += cambio;
    const minimo = 0;

    if (cantidad < minimo) {
        cantidad = minimo;
    }
    
    if (cantidad > 9) {
        cantidad = 9;
    }

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

// ===== GENERAR BOOKING ID =====
function generateBookingId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'AVA-';
    for (let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

const btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click', function(e) {
    const origin = document.getElementById('from').value.trim();
    const destination = document.getElementById('to').value.trim();
    const adults = parseInt(document.getElementById('num-adults').innerHTML);
    const seniors = parseInt(document.getElementById('num-seniors').innerHTML);
    const children = parseInt(document.getElementById('num-children').innerHTML);
    const totalPassengers = adults + children + seniors;

    // Validación de campos vacíos
    if (origin === "" || destination === "" || totalPassengers === 0) {
        e.preventDefault(); 
        alert("Please complete all fields: Origin, Destination and at least 1 Passenger.");
        if (origin === "") document.getElementById('from').style.borderColor = "red";
        if (destination === "") document.getElementById('to').style.borderColor = "red";
        return;
    }

    // Validación de menores no acompañados
    if (children > 0 && adults === 0 && seniors === 0) {
        e.preventDefault(); 
        alert("Booking error: Children are not allowed to travel without an adult or senior companion.");
        return;
    }

    // Tipo de vuelo seleccionado
    let flightType = "Return";
    document.getElementsByName('vuelo').forEach(r => { if (r.checked) flightType = r.value; });

    // Clase seleccionada
    let travelClass = "Economic";
    document.getElementsByName('travel-class').forEach(r => { if (r.checked) travelClass = r.value.charAt(0).toUpperCase() + r.value.slice(1); });

    // Fechas
    const departure = document.getElementById('departure-date').value;
    const returnDate = document.getElementById('return-date').value;

    // Generar Booking ID
    const bookingId = generateBookingId();

    // GUARDAR EN LOCALSTORAGE
    localStorage.setItem('ultimaBusquedaOrigin', origin);
    localStorage.setItem('ultimaBusquedaDestiny', destination);
    localStorage.setItem('cantAdults', adults);
    localStorage.setItem('cantChildren', children);
    localStorage.setItem('cantSeniors', seniors);
    localStorage.setItem('bookingId', bookingId);
    localStorage.setItem('flightType', flightType);
    localStorage.setItem('travelClass', travelClass);
    localStorage.setItem('departureDate', departure);
    localStorage.setItem('returnDate', returnDate);
    localStorage.setItem('totalPassengers', totalPassengers);
});

// Lógica de fechas y tipo de vuelo
const radioVuelos = document.getElementsByName('vuelo');
const cajaReturn = document.getElementById('return-date').parentElement;

function date() {
    let valorSeleccionado = "";
    radioVuelos.forEach(radio => {
        if (radio.checked) valorSeleccionado = radio.value;
    });
  
    if (valorSeleccionado === 'Return') {
        cajaReturn.style.display = 'block';
    } else {
        cajaReturn.style.display = 'none';
    }
}
radioVuelos.forEach(radio => radio.addEventListener('change', date));
date();

window.addEventListener("DOMContentLoaded", function() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDate = `${yyyy}-${mm}-${dd}`;

    document.getElementById('departure-date').setAttribute('min', minDate);

    // ===== CARGAR DATOS DEL BOOKING EN EL CHECK-IN =====
    cargarDatosCheckin();
});

document.getElementById('departure-date').addEventListener('change', function() {
    const departureDate = this.value;
    const returnDateInput = document.getElementById('return-date');
    returnDateInput.setAttribute('min', departureDate);

    if (returnDateInput.value && returnDateInput.value < departureDate) {
        returnDateInput.value = '';
    }
});

// ===== FUNCIÓN PARA CARGAR DATOS EN CHECK-IN =====
function cargarDatosCheckin() {
    const bookingId = localStorage.getItem('bookingId');
    const origin = localStorage.getItem('ultimaBusquedaOrigin');
    const destiny = localStorage.getItem('ultimaBusquedaDestiny');
    const departure = localStorage.getItem('departureDate');
    const returnDate = localStorage.getItem('returnDate');
    const totalPassengers = localStorage.getItem('totalPassengers');
    const travelClass = localStorage.getItem('travelClass');
    const flightType = localStorage.getItem('flightType');

    const noBookingEl = document.getElementById('checkin-no-booking');
    const ticketCard = document.getElementById('ticket-card');
    const formSection = document.getElementById('checkin-form-section');

    if (!bookingId || !origin || !destiny) {
        // No hay booking guardado
        noBookingEl.style.display = 'block';
        ticketCard.style.display = 'none';
        formSection.style.display = 'none';
        return;
    }

    // Hay booking — mostrar ticket y formulario
    noBookingEl.style.display = 'none';
    ticketCard.style.display = 'block';
    formSection.style.display = 'block';

    // Extraer código de ciudad (últimas 3 letras si existen)
    function getCityCode(str) {
        const parts = str.trim().split(' ');
        const last = parts[parts.length - 1];
        return (last.length === 3 && last === last.toUpperCase()) ? last : str.substring(0, 3).toUpperCase();
    }

    function getCityName(str) {
        const parts = str.trim().split(' ');
        const last = parts[parts.length - 1];
        if (last.length === 3 && last === last.toUpperCase()) {
            return parts.slice(0, -1).join(' ');
        }
        return str;
    }

    function formatDate(dateStr) {
        if (!dateStr) return '—';
        const [y, m, d] = dateStr.split('-');
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return `${d} ${months[parseInt(m)-1]} ${y}`;
    }

    document.getElementById('ticket-booking-id').textContent = 'Booking ID: ' + bookingId;
    document.getElementById('ticket-origin-code').textContent = getCityCode(origin);
    document.getElementById('ticket-origin-name').textContent = getCityName(origin);
    document.getElementById('ticket-dest-code').textContent = getCityCode(destiny);
    document.getElementById('ticket-dest-name').textContent = getCityName(destiny);
    document.getElementById('ticket-departure').textContent = formatDate(departure);
    document.getElementById('ticket-return').textContent = (flightType === 'Return' && returnDate) ? formatDate(returnDate) : 'One way';
    document.getElementById('ticket-passengers').textContent = totalPassengers + (totalPassengers === '1' ? ' Passenger' : ' Passengers');
    document.getElementById('ticket-class').textContent = travelClass || 'Economic';
    document.getElementById('ticket-flight-type').textContent = flightType === 'Return' ? 'Round trip' : 'One way';
}

// Escuchar cambios de pestaña para recargar datos
document.getElementById('tab2').addEventListener('change', function() {
    if (this.checked) cargarDatosCheckin();
});
