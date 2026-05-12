
const Gender = document.getElementById('Gender');
const Pregnancy = document.getElementById('Pregnancy');
function validarEmbarazo() {
    if (Gender.value === 'opcion2') {
        Pregnancy.style.display = 'none';
    } else {
        Pregnancy.style.display = 'block';
    }
}
Gender.addEventListener('change', validarEmbarazo);
validarEmbarazo();

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', function() {
    this.parentElement.classList.toggle('active');
  });
});
