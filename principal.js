
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