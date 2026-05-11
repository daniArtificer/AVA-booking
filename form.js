const Gender = document.getElementById('Gender');
const Pregnancy = document.getElementById('Pregnancy');
function validarEmbarazo() {
    if (this.value === 'opcion1') {
        Pregnancy.style.display = 'block';
    } else {
        Pregnancy.style.display = 'none';
    }
}
Gender.addEventListener('change', validarEmbarazo);
validarEmbarazo();