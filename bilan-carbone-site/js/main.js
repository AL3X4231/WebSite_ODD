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

    // Form containers
    const forms = [
        document.querySelector('.transport-form-container'),
        document.querySelector('.housing-form-container'),
        document.querySelector('.food-form-container'),
        document.querySelector('.conso-form-container'),
        document.querySelector('.dechets-form-container')
    ];
    let currentStep = 0;
    
    // Circles (steps) in the progress bar
    const steps = document.querySelectorAll('.steps-bar .step');
    // Container for the progress lines
    const stepsBar = document.querySelector('.steps-bar');    function showStep(idx) {
        // Update form visibility
        forms.forEach((form, i) => {
            if (form) form.style.display = (i === idx) ? 'block' : 'none';
        });
        
        // Update step circles
        steps.forEach((step, i) => {
            if (i < idx) {
                // Previous steps
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (i === idx) {
                // Current step
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                // Future steps
                step.classList.remove('active');
                step.classList.remove('completed');
            }
        });
        
        // Update progress lines
        stepsBar.classList.remove('step-1-active', 'step-2-active', 'step-3-active', 'step-4-active', 'step-5-active');
        stepsBar.classList.add(`step-${idx + 1}-active`);
    }// Next/Prev buttons for each step
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
    });      // Initialiser l'affichage avec le premier formulaire et mettre à jour la barre de progression
    showStep(currentStep);
});