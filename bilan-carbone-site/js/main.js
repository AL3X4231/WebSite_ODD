document.addEventListener('DOMContentLoaded', function() {
    const bars = document.querySelectorAll('.bar-chart .bar');
    const desc = document.getElementById('bar-desc');
    bars.forEach(bar => {
        bar.addEventListener('mouseenter', () => {
            desc.textContent = bar.getAttribute('data-desc');
        });
        bar.addEventListener('mouseleave', () => {
            desc.textContent = '';
        });
    });

  
    const forms = [
        document.querySelector('.transport-form-container'),
        document.querySelector('.housing-form-container'),
        document.querySelector('.food-form-container'),
        document.querySelector('.conso-form-container'),
        document.querySelector('.dechets-form-container')
    ];
    let currentStep = 0;
    
 
    const steps = document.querySelectorAll('.steps-bar .step');
   
    const stepsBar = document.querySelector('.steps-bar');    function showStep(idx) {
      
        forms.forEach((form, i) => {
            if (form) form.style.display = (i === idx) ? 'block' : 'none';
        });
        
      
        steps.forEach((step, i) => {
            if (i < idx) {
              
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (i === idx) {
             
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
              
                step.classList.remove('active');
                step.classList.remove('completed');
            }
        });
        
     
        stepsBar.classList.remove('step-1-active', 'step-2-active', 'step-3-active', 'step-4-active', 'step-5-active');
        stepsBar.classList.add(`step-${idx + 1}-active`);
    }
    document.querySelector('.btn-next-transport')?.addEventListener('click', function(e) {
        e.preventDefault();
        currentStep = 1;
        showStep(currentStep);
    });
    document.querySelector('.btn-prev-housing')?.addEventListener('click', function(e) {
        e.preventDefault();
        currentStep = 0;
        showStep(currentStep);
    });
    document.querySelector('.btn-next-housing')?.addEventListener('click', function(e) {
        e.preventDefault();
        currentStep = 2;
        showStep(currentStep);
    });
    document.querySelector('.btn-prev-food')?.addEventListener('click', function(e) {
        e.preventDefault();
        currentStep = 1;
        showStep(currentStep);
    });
    document.querySelector('.btn-next-food')?.addEventListener('click', function(e) {
        e.preventDefault();
        currentStep = 3;
        showStep(currentStep);
    });
    document.querySelector('.btn-prev-conso')?.addEventListener('click', function(e) {
        e.preventDefault();
        currentStep = 2;
        showStep(currentStep);
    });
    document.querySelector('.btn-next-conso')?.addEventListener('click', function(e) {
        e.preventDefault();
        currentStep = 4;
        showStep(currentStep);
    });
    document.querySelector('.btn-prev-dechets')?.addEventListener('click', function(e) {
        e.preventDefault();
        currentStep = 3;
        showStep(currentStep);
    });


    const addFlightBtn = document.getElementById('add-flight-btn');
    const flightInputsContainer = document.getElementById('flight-inputs-container');
    let flightCount = 0;

 
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
        "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
        "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
        "Denmark", "Djibouti", "Dominica", "Dominican Republic",
        "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
        "Fiji", "Finland", "France",
        "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
        "Haiti", "Honduras", "Hungary",
        "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
        "Jamaica", "Japan", "Jordan",
        "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
        "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
        "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
        "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
        "Oman",
        "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
        "Qatar",
        "Romania", "Russia", "Rwanda",
        "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
        "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
        "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
        "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
        "Yemen",
        "Zambia", "Zimbabwe"
    ];

    addFlightBtn?.addEventListener('click', function() {
        flightCount++;
        const flightInputGroup = document.createElement('div');
        flightInputGroup.classList.add('flight-input-group');
        flightInputGroup.setAttribute('id', `flight-group-${flightCount}`); 

        const departureLabel = document.createElement('label');
        departureLabel.setAttribute('for', `flight-departure-${flightCount}`);
        departureLabel.textContent = `Vol ${flightCount}: Departure`;

        const departureSelect = document.createElement('select');
        departureSelect.setAttribute('id', `flight-departure-${flightCount}`);
        departureSelect.setAttribute('name', `flight-departure-${flightCount}`);
    
        const defaultDepartureOption = document.createElement('option');
        defaultDepartureOption.value = "";
        defaultDepartureOption.textContent = "Select a country";
        departureSelect.appendChild(defaultDepartureOption);
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.toLowerCase().replace(/\\s+/g, '-');
            option.textContent = country;
            departureSelect.appendChild(option);
        });

        const arrivalLabel = document.createElement('label');
        arrivalLabel.setAttribute('for', `flight-arrival-${flightCount}`);
        arrivalLabel.textContent = 'Arrival';

        const arrivalSelect = document.createElement('select');
        arrivalSelect.setAttribute('id', `flight-arrival-${flightCount}`);
        arrivalSelect.setAttribute('name', `flight-arrival-${flightCount}`);
 
        const defaultArrivalOption = document.createElement('option');
        defaultArrivalOption.value = "";
        defaultArrivalOption.textContent = "Select a country";
        arrivalSelect.appendChild(defaultArrivalOption);
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.toLowerCase().replace(/\\s+/g, '-');
            option.textContent = country;
            arrivalSelect.appendChild(option);
        });

   
        const removeFlightBtn = document.createElement('button');
        removeFlightBtn.setAttribute('type', 'button');
        removeFlightBtn.classList.add('btn-remove-flight');
        removeFlightBtn.textContent = '-';
        removeFlightBtn.addEventListener('click', function() {
            flightInputGroup.remove();
        });

        flightInputGroup.appendChild(departureLabel);
        flightInputGroup.appendChild(departureSelect);
        flightInputGroup.appendChild(arrivalLabel);
        flightInputGroup.appendChild(arrivalSelect);
        flightInputGroup.appendChild(removeFlightBtn); 
        flightInputsContainer.appendChild(flightInputGroup);
    });

    
    showStep(currentStep);
});