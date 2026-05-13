document.addEventListener("DOMContentLoaded", () => {
    // 1. Recuperamos las cantidades de localStorage
    // Si no existen (porque entró directo a la página), por defecto asignamos 0, pero forzamos 1 adulto para evitar errores.
    const numAdults = parseInt(localStorage.getItem('cantAdults')) || 1; 
    const numChildren = parseInt(localStorage.getItem('cantChildren')) || 0;
    const numSeniors = parseInt(localStorage.getItem('cantSeniors')) || 0;

    const container = document.getElementById('passengers-container');
    const template = document.getElementById('passenger-template');

    // Función constructora usando el template
    function renderPassengerForms(type, count) {
        for (let i = 1; i <= count; i++) {
            // Clonamos el contenido del template
            const clone = template.content.cloneNode(true);

            // 2. Personalizamos los textos según el tipo (Adult, Child, Senior)
            const typeLabel = `${type} ${i}`;
            clone.querySelector('.passenger-type-label').textContent = typeLabel;
            clone.querySelector('.passenger-title').textContent = `${type} Passenger ${i}`;

            // 3. Modificamos el atributo 'name' de los radio buttons para que sean únicos.
            // Si no hacemos esto, al seleccionar "Yes" en el Pasajero 1, se desmarcará en el Pasajero 2.
            const radios = clone.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                radio.name = `${radio.name}_${type}_${i}`; // Ej: embarazo_Adult_1
            });

            // 4. Lógica aislada para Ocultar/Mostrar Embarazo
            const genderSelect = clone.querySelector('.gender-select');
            const pregnancyDiv = clone.querySelector('.pregnancy-div');

            function validarEmbarazo() {
                // Si es Masculino (opcion2), Ninguno (opcion3) o si es un Niño (Child) -> Ocultamos embarazo
                if (genderSelect.value === 'opcion2' || genderSelect.value === 'opcion3' || type === 'Child') {
                    pregnancyDiv.style.display = 'none';
                } else {
                    pregnancyDiv.style.display = 'block';
                }
            }
            
            genderSelect.addEventListener('change', validarEmbarazo);
            validarEmbarazo(); // Ejecución inicial para asegurar el estado correcto

            // 5. Lógica del Acordeón aislada a este clon específico
            const header = clone.querySelector('.accordion-header');
            header.addEventListener('click', function() {
                this.parentElement.classList.toggle('active');
            });

            // 6. Finalmente, inyectamos el clon listo en el HTML
            container.appendChild(clone);
        }
    }

    // Llamamos a la función para cada categoría
    if (numAdults > 0) renderPassengerForms('Adult', numAdults);
    if (numSeniors > 0) renderPassengerForms('Senior', numSeniors);
    if (numChildren > 0) renderPassengerForms('Child', numChildren);
});
