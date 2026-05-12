
function cambiarCantidad(tipo, cambio) {
    const elemento = document.getElementById('num-' + tipo);
    let cantidad = parseInt(elemento.innerHTML);

    cantidad += cambio;
    
    const minimo = 0;
    if (cantidad < minimo) cantidad = minimo;
        cantidad = minimo;
    
    if (cantidad > 9) {
        cantidad = 9;
    }

    elemento.innerHTML = cantidad;
}

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

document.querySelector('.btn-search').addEventListener('click', function(event) {
    const origin = document.getElementById('from').value.trim();
    const destination = document.getElementById('to').value.trim();
    const adults = parseInt(document.getElementById('num-adults').innerHTML);
    const ninos = parseInt(document.getElementById('num-children').innerHTML);
    const seniors = parseInt(document.getElementById('num-seniors').innerHTML);

    const totalPassengers = adults + ninos + seniors;

    // Validación
    if (origin === "" || destination === "" || totalPassengers === 0) {
        // Evita que el enlace te lleve a la otra página
        event.preventDefault(); 
        
        alert("Please complete all fields: Origin, Destination and at least 1 Passenger.");
        
        // Opcional: marcar los bordes en rojo para indicar el error
        if (origin === "") document.getElementById('from').style.borderColor = "red";
        if (destination === "") document.getElementById('to').style.borderColor = "red";
    }
});

const btnSearch = document.getElementById('btn-search');

btnSearch.addEventListener('click', function(e) {
    // 1. Get current quantities from the HTML and convert them to numbers [5, 6]
    const adults = parseInt(document.getElementById('num-adults').innerHTML);
    const seniors = parseInt(document.getElementById('num-seniors').innerHTML);
    const children = parseInt(document.getElementById('num-children').innerHTML);

    if (children > 0 && adults === 0 && seniors === 0) {
        
        e.preventDefault(); 
        alert("Booking error: Children are not allowed to travel without an adult or senior companion.");
    }
});

const radioVuelos = document.getElementsByName('vuelo');
const cajaReturn = document.getElementById('return-date').parentElement; // Selecciona el contenedor del input

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
radioVuelos.forEach(radio => {
    radio.addEventListener('change', date);
});
date();

const form = document.querySelector('.search-form');

form.addEventListener('submit', function(event){
    // Obtén los valores deseados
    const origin = document.getElementById('from').value.trim();
    const destination = document.getElementById('to').value.trim();

    // Guarda en localStorage
    localStorage.setItem('ultimaBusquedaOrigin', origin);
    localStorage.setItem('ultimaBusquedaDestiny', destination);

    // Puedes guardar más campos si quieres (pasajeros, etc)
    // El form igual se enviará normalmente
});