const adults = parseInt(localStorage.getItem('passengers_adults')) || 0;
const children = parseInt(localStorage.getItem('passengers_children')) || 0;
const seniors = parseInt(localStorage.getItem('passengers_seniors')) || 0;

function labelForType(type, n) {
    switch(type) {
        case 'adult': return `Adult ${n}`;
        case 'child': return `Child ${n}`;
        case 'senior': return `Senior ${n}`;
    }
}

function titleForType(type) {
    switch(type) {
        case 'adult': return `Adult Passenger Details`;
        case 'child': return `Child Passenger Details`;
        case 'senior': return `Senior Passenger Details`;
    }
}
// Opcional: puedes poner campos diferentes para niño/senior
function formFieldsForType(type, n) {
    let base = `
        <div>
            <label>
                First name
                <input type="text" name="name${type}${n}" required>
            </label>
            <label>
                Last name
                <input type="text" name="last${type}${n}" required>
            </label>
        </div>
        <div>
            <label>
                Date of Birth
                <input type="date" name="birth${type}${n}" required>
            </label>
        </div>
    `;
    // Adultos tienen todos los campos, niños y seniors pueden variar si quieres.
    if (type === 'adult') {
        base += `
        <div>
            <label>
                Email
                <input type="email" name="email${n}" required>
            </label>
        </div>
        <div>
            <label>
                Passport
                <input type="text" name="passport${n}" required>
            </label>
        </div>
        <select class="Gender" name="gender${n}"> 
            <option value="female" selected>Female</option>
            <option value="male">Male</option>
            <option value="none">None</option>
        </select>
        <div class="Pregnancy" style="display:none;">
            <p>Are you Pregnant?</p>
            <input class="ask" type="radio" name="pregnant${n}" value="no" checked="checked" /> no<br/>
            <input class="ask" type="radio" name="pregnant${n}" value="yes"/> yes
        </div>
        <div>
            <div class="disability">
                <p>Do you have any disabilities?</p>
                <input class="ask" type="radio" name="disability${n}" value="no" checked="checked" /> no<br/>
                <input class="ask" type="radio" name="disability${n}" value="yes"/> yes
            </div>
        </div>
        `;
    } else {
        // Menos campos para niños/seniors si deseas
    }
    return base;
}

function createAccordionItem(type, n) {
    // Cada item es desplegable con acordeón estilo
    return `
    <div class="accordion-item">
        <div class="accordion-header">
            <div class="accordion-info">
                <span>${labelForType(type, n+1)}</span>
                <small>Fill the passenger details</small>
            </div>
            <div class="accordion-toggle">&#8250;</div>
        </div>
        <div class="accordion-panel">
            <section>
                <h3>${titleForType(type)}</h3>
                <form class="passenger-form" action="#" method="POST">
                    ${formFieldsForType(type, n)}
                </form>
            </section>
        </div>
    </div>
    `;
}

// Inserta acordeones dinámicamente
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('passengerAccordion');
    let html = '';
    for(let i = 0; i < adults; i++) {
        html += createAccordionItem('adult', i);
    }
    for(let i = 0; i < children; i++) {
        html += createAccordionItem('child', i);
    }
    for(let i = 0; i < seniors; i++) {
        html += createAccordionItem('senior', i);
    }
    if (!html) {
        container.innerHTML = '<p>No passengers selected.</p>';
        return;
    }
    // Único gran formulario para todos:
    container.innerHTML = `
        <form id="allPassengers">
            ${html}
            <button type="submit" id="submit" style="margin-top: 40px;">Submit All</button>
        </form>
    `;

    // Acordeón: expande contrae
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            this.parentElement.classList.toggle('active');
        });
    });
    // Mostrar/ocultar embarazo solo si FEMALE
    document.querySelectorAll('.Gender').forEach(select => {
        select.addEventListener('change', function() {
            const pregnancyDiv = this.parentElement.querySelector('.Pregnancy');
            if (this.value === 'female') {
                pregnancyDiv.style.display = 'block';
            } else {
                pregnancyDiv.style.display = 'none';
            }
        });
        // Inicializa
        select.dispatchEvent(new Event('change'));
    });
});
