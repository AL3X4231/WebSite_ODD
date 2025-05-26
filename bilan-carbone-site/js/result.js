
const transport = parseFloat(localStorage.getItem("transportFootprint")) || 0;
const housing = parseFloat(localStorage.getItem("housingFootprint")) || 0;
const food = parseFloat(localStorage.getItem("foodFootprint")) || 0;
const consumption = parseFloat(localStorage.getItem("consumptionFootprint")) || 0;
const waste = parseFloat(localStorage.getItem("wasteFootprint")) || 0;


const total = transport + housing + food + consumption + waste || 1; 


const variables = [
    { name: 'Transport', value: transport, percent: (transport / total * 100).toFixed(1) },
    { name: 'Housing', value: housing, percent: (housing / total * 100).toFixed(1) },
    { name: 'Food', value: food, percent: (food / total * 100).toFixed(1) },
    { name: 'Buy', value: consumption, percent: (consumption / total * 100).toFixed(1) },
    { name: 'Waste and recycle', value: waste, percent: (waste / total * 100).toFixed(1) }
];

variables.sort((a, b) => b.value - a.value);


function renderGraph() {
    const graph = document.getElementById('graph');
    graph.innerHTML = '';

   
    const totalSection = document.createElement('div');
    totalSection.className = 'total-emissions';
    totalSection.innerHTML = `
        <h3>Total Carbon Footprint</h3>
        <p class="total-value">${total.toFixed(1)} kg CO₂/year</p>
    `;
    graph.appendChild(totalSection);

    const colors = ['#4caf50', '#2196f3', '#ffeb3b', '#f44336', '#9c27b0'];

    variables.forEach((item, idx) => {
        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';

        const label = document.createElement('span');
        label.className = 'bar-label';
        label.textContent = `${item.name}: ${item.value.toFixed(1)} kg CO₂ (${item.percent}%)`;

        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.width = item.percent + '%';
        bar.style.background = colors[idx % colors.length];
        bar.textContent = `${item.percent}%`;

        barContainer.appendChild(label);
        barContainer.appendChild(bar);
        graph.appendChild(barContainer);
    });
}


function generateAnalysis() {
    const analysisTextElement = document.getElementById('analysis-text');
    if (!analysisTextElement) return;

    const highest = variables[0];
    let html = `<p>Your largest source of emissions is "<strong>${highest.name}</strong>" with <strong>${highest.percent}%</strong> of the total (${highest.value.toFixed(1)} kg CO₂/year).</p>`;

    switch (highest.name.toLowerCase()) {
        case 'transport':
            html += "Consider alternatives like biking, public transit, or carpooling. For long trips, trains are better than planes or solo driving.</p>";
            break;
        case 'housing':
            html += "Improve insulation, switch to renewable energy, or reduce heating/cooling usage to cut emissions.</p>";
            break;
        case 'food':
            html += "Eat less meat, prefer seasonal/local food, and reduce food waste to make a difference.</p>";
            break;
        case 'buy':
            html += "Buy fewer but better-quality products, second-hand items, and avoid overconsumption.</p>";
            break;
        case 'waste and recycle':
            html += "Recycle more, compost organic waste, and reduce single-use items and packaging.</p>";
            break;
    }

    html += "<p><strong>General tips:</strong></p><ul>" +
        "<li><strong>Raise awareness:</strong> Share what you’ve learned and help others reduce their footprint too.</li>" +
        "<li><strong>Offset carbon:</strong> Support certified carbon offsetting projects if possible.</li>" +
        "<li><strong>Live simply:</strong> Reflect on your real needs and reduce consumption overall.</li>" +
        "</ul>";

    analysisTextElement.innerHTML = html;
}


document.addEventListener('DOMContentLoaded', () => {
    renderGraph();
    generateAnalysis();
});
