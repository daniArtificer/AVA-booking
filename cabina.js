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
for (let i = 0; i < numFilasVIP; i++) {

    for (let j = 0; j < 2; j++) vipContainer.appendChild(crearAsientov());

    const pasillo1 = document.createElement('div');
    pasillo1.className = 'pasillo1';
    vipContainer.appendChild(pasillo1);

    for (let j = 0; j < 2; j++) vipContainer.appendChild(crearAsientov());
}

const standardContainer = document.getElementById('standard-container');

const numFilas = 22;

for (let f = 0; f < numFilas; f++) {
    for (let i = 0; i < 3; i++) standardContainer.appendChild(crearAsientob()); 
    const pasillo2 = document.createElement('div');
    pasillo2.className = 'pasillo';
    standardContainer.appendChild(pasillo2);
    for (let i = 0; i < 3; i++) standardContainer.appendChild(crearAsientob());
}
