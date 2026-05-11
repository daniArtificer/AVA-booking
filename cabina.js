function crearAsientob() {

    const asiento1 = document.createElement('div');
    asiento1.className = 'asientob';

    const varandal = document.createElement('main');
    varandal.className = 'varandal';

    asiento1.appendChild(varandal);
    asiento1.addEventListener('click', function() {
        this.classList.toggle('seleccionado');
    });
    return asiento1;
}
function crearAsientov() {
    const asiento2 = document.createElement('div');
    asiento2.className = 'asientov';

    const varandal = document.createElement('main');
    varandal.className = 'varandal';

    asiento2.appendChild(varandal);
    asiento2.addEventListener('click', function() {
        this.classList.toggle('seleccionado');
    });
    return asiento2;
}

const vipContainer = document.getElementById('vip');
const numFilasVIP = 2;
let numFila = 1;
for (let i = 0; i < numFilasVIP; i++) {

    for (let j = 0; j < 2; j++) vipContainer.appendChild(crearAsientov());

    const numDiv = document.createElement('div');
    numDiv.className = 'nro-fila';
    numDiv.textContent = numFila++; 
    vipContainer.appendChild(numDiv);

    for (let j = 0; j < 2; j++) vipContainer.appendChild(crearAsientov());
}

const standardContainer = document.getElementById('standard-container');

const numFilas = 22;
let numFilaS = 1;
for (let f = 0; f < numFilas; f++) {
    for (let i = 0; i < 3; i++) standardContainer.appendChild(crearAsientob()); 

    const numDiv = document.createElement('div');
    numDiv.className = 'nro-fila';
    numDiv.textContent = numFilaS++;
    standardContainer.appendChild(numDiv);
    
    for (let i = 0; i < 3; i++) standardContainer.appendChild(crearAsientob());
}

    standardContainer.appendChild(pasillo2);
    for (let i = 0; i < 3; i++) standardContainer.appendChild(crearAsientob());
}
