document.addEventListener("DOMContentLoaded", () => {
    const numAdults = parseInt(localStorage.getItem('cantAdults')) || 1; 
    const numChildren = parseInt(localStorage.getItem('cantChildren')) || 0;
    const numSeniors = parseInt(localStorage.getItem('cantSeniors')) || 0;

    const container = document.getElementById('passengers-container');
    const template = document.getElementById('passenger-template');

    function renderPassengerForms(type, count) {
        for (let i = 1; i <= count; i++) {
            const clone = template.content.cloneNode(true);
            const typeLabel = `${type} ${i}`;
            clone.querySelector('.passenger-type-label').textContent = typeLabel;
            clone.querySelector('.passenger-title').textContent = `${type} Passenger ${i}`;

            const radios = clone.querySelectorAll('input[type="radio"]');
            radios.forEach(radio => {
                radio.name = `${type}-${i}-${radio.name}`;
            });

            const header = clone.querySelector('.accordion-header');
            header.addEventListener('click', function() {
                this.parentElement.classList.toggle('active');
            });

            container.appendChild(clone);
        }
    }

    renderPassengerForms('Adult', numAdults);
    renderPassengerForms('Senior', numSeniors);
    renderPassengerForms('Child', numChildren);

    // --- LÓGICA DEL BOTÓN SUBMIT ---
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', () => {
        const pasajerosData = [];
        const forms = document.querySelectorAll('.accordion-item');

        forms.forEach(item => {
            const nombre = item.querySelector('input[name="name"]').value;
            const apellido = item.querySelector('input[name="last"]').value;
            const tipoRaw = item.querySelector('.passenger-type-label').textContent;
            const tipo = tipoRaw.split(' ')[0]; // Obtiene "Adult", "Child", etc.

            if (nombre.trim() !== "") {
                pasajerosData.push({
                    nombreCompleto: `${nombre} ${apellido}`,
                    tipo: tipo,
                    asiento: null
                });
            }
        });

        if (pasajerosData.length > 0) {
            localStorage.setItem('datosPasajeros', JSON.stringify(pasajerosData));
            window.location.href = "cabina.html";
        } else {
            alert("Por favor, completa al menos el nombre del primer pasajero.");
        }
    });
});
