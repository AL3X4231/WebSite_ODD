// Variables des pourcentages
let values = [12, 15, 29, 38, 56];

function renderGraph() {
    const graph = document.getElementById('graph');
    graph.innerHTML = '';
    const colors = ['#4caf50', '#2196f3', '#ffeb3b', '#f44336', '#9c27b0']; // vert, bleu, jaune, rouge, violet
    values.forEach((val, idx) => {
        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';
        const label = document.createElement('span');
        label.className = 'bar-label';
        label.textContent = `Variable ${idx + 1}: ${val}%`;
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.width = val + '%';
        bar.style.background = colors[idx];
        bar.textContent = val + '%';
        barContainer.appendChild(label);
        barContainer.appendChild(bar);
        graph.appendChild(barContainer);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderGraph();
});
