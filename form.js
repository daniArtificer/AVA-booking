document.addEventListener("DOMContentLoaded", () => {
    // 1. Recuperar los datos guardados en la página principal
    const adults = parseInt(localStorage.getItem('adultsCount')) || 0;
    const children = parseInt(localStorage.getItem('childrenCount')) || 0;
    const seniors = parseInt(localStorage.getItem('seniorsCount')) || 0;

    const container = document.getElementById('passengers-container');
    const template = document.getElementById('passenger-template');

    // Contador global para que los radio buttons no se mezclen entre formularios
    let passengerId = 1;

    // 2. Función para clonar el molde y personalizarlo
    function createPassengerForm(typeLabel, index) {
        const clone = template.content.cloneNode(true);

        // Personalizar títulos
        clone.querySelector('.passenger-type-label').textContent = `${typeLabel} ${index}`;
        clone.querySelector('.passenger-heading').textContent = `${typeLabel} Passenger ${index}`;

        // Hacer que los radio buttons sean únicos para este formulario
        const radiosSexo = clone.querySelectorAll('input[name="sexo"]');
        radiosSexo.forEach(r => r.name = `sexo_p${passengerId}`);

        const radiosDisab = clone.querySelectorAll('input[name="disability"]');
        radiosDisab.forEach(r => r.name = `disability_p${passengerId}`);

        // Lógica del Acordeón para este clon específico
        const header = clone.querySelector('.accordion-header');
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });

        // Lógica de Género / Embarazo para este clon específico
        const genderSelect = clone.querySelector('.gender-select');
        const pregnancySection = clone.querySelector('.pregnancy-section');

        function togglePregnancy() {
            if (genderSelect.value === 'opcion2') { // Si es Male
                pregnancySection.style.display = 'none';
            } else {
                pregnancySection.style.display = 'block';
            }
        }
        genderSelect.addEventListener('change', togglePregnancy);
        togglePregnancy(); // Ejecutar al inicio

        // Añadir el formulario ya configurado al contenedor
        container.appendChild(clone);
        passengerId++;
    }

    // 3. Generar formularios según el conteo
    for (let i = 1; i <= adults; i++) createPassengerForm('Adult', i);
    for (let i = 1; i <= children; i++) createPassengerForm('Child', i);
    for (let i = 1; i <= seniors; i++) createPassengerForm('Senior', i);

    // Si no hay pasajeros (por ejemplo si entras a la página directamente), mostrar mensaje
    if (adults + children + seniors === 0) {
        container.innerHTML = "<h2>No passengers selected. Please go back and search again.</h2>";
    }
});
