function crearAsientob() { 

    const asiento1 = document.createElement('div');
    asiento1.className = 'asientob';
    asiento1.addEventListener('click', function() {
        this.classList.toggle('seleccionado');
    });
    return asiento1;
}
function crearAsientov() {
    const asiento2 = document.createElement('div');
    asiento2.className = 'asientov';
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

const numFilas = 20;
let numFilaS = 3;
for (let f = 0; f < numFilas; f++) {
    for (let i = 0; i < 3; i++) standardContainer.appendChild(crearAsientob()); 

    const numDiv = document.createElement('div');
    numDiv.className = 'nro-fila';
    numDiv.textContent = numFilaS++;
    standardContainer.appendChild(numDiv);
    
    for (let i = 0; i < 3; i++) standardContainer.appendChild(crearAsientob());
}

    
    for (let i = 0; i < 3; i++) standardContainer.appendChild(crearAsientob());
}
