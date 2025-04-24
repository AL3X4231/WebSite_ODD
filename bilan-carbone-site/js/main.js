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
});