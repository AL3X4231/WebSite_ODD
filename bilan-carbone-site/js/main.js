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

    function showStep(idx) {
        forms.forEach((form, i) => {
            if (form) form.style.display = (i === idx) ? 'block' : 'none';
        });
    }

    // Next/Prev buttons for each step
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
});