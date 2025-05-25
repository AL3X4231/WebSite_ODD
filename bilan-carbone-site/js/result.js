// Variables des pourcentages et leurs noms
const variables = [
    { name: 'Transport', value: 12 },
    { name: 'Housing', value: 30 },
    { name: 'Food', value: 7 },
    { name: 'Buy', value: 16 },
    { name: 'Waste and recycle', value: 2 }
];

// Trie les variables en ordre décroissant de valeur
variables.sort((a, b) => b.value - a.value);

function renderGraph() {
    const graph = document.getElementById('graph');
    graph.innerHTML = '';
    const colors = ['#4caf50', '#2196f3', '#ffeb3b', '#f44336', '#9c27b0']; // vert, bleu, jaune, rouge, violet
    variables.forEach((item, idx) => {
        const barContainer = document.createElement('div');
        barContainer.className = 'bar-container';
        const label = document.createElement('span');
        label.className = 'bar-label';
        label.textContent = `${item.name}`;
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.width = item.value + '%';
        bar.style.background = colors[idx % colors.length];
        bar.textContent = item.value + '%';
        barContainer.appendChild(label);
        barContainer.appendChild(bar);
        graph.appendChild(barContainer);
    });
}

function generateAnalysis() {
    const analysisTextElement = document.getElementById('analysis-text');
    if (!analysisTextElement) return;

    // Find the category with the highest emission
    // The 'variables' array is already sorted in descending order by value in result.js
    const highestEmissionCategory = variables[0];

    let analysisHTML = '';

    if (highestEmissionCategory) {
        analysisHTML += `<p>Votre principale source d'émissions provient de la catégorie "<strong>${highestEmissionCategory.name}</strong>" avec <strong>${highestEmissionCategory.value}%</strong> du total. `;
        switch (highestEmissionCategory.name) {
            case 'transport':
                analysisHTML += "Envisagez des alternatives plus écologiques comme le vélo, la marche, les transports en commun, ou le covoiturage. Pour les longues distances, le train est souvent une meilleure option que l'avion ou la voiture individuelle.</p>";
                break;
            case 'housing':
                analysisHTML += "Pensez à améliorer l'isolation de votre logement, à opter pour des sources d'énergie renouvelable, ou à réduire votre consommation d'énergie (chauffage, climatisation, appareils électroménagers). Chaque petit geste compte !</p>";
                break;
            case 'food':
                analysisHTML += "Réduire la consommation de viande (surtout bovine), privilégier les produits locaux et de saison, et minimiser le gaspillage alimentaire sont des actions efficaces.</p>";
                break;
            case 'buy':
                analysisHTML += "Adopter une consommation plus responsable : acheter moins mais mieux, privilégier les produits durables, réparables, et d'occasion. Pensez à l'impact de la fabrication et du transport des biens que vous achetez.</p>";
                break;
            case 'waste and recycle':
                analysisHTML += "Optimisez votre tri des déchets, compostez si possible, et réduisez votre production de déchets à la source en évitant les produits sur-emballés et à usage unique.</p>";
                break;
            default:
                analysisHTML += "Essayez d'identifier les leviers spécifiques dans cette catégorie pour réduire votre impact.</p>";
        }
    }

    analysisHTML += "<p><strong>Conseils généraux pour réduire votre empreinte :</strong></p>" +
                    "<ul>" +
                    "<li><strong>Sensibilisez votre entourage :</strong> Partagez vos découvertes et encouragez les autres à évaluer et réduire leur propre empreinte.</li>" +
                    "<li><strong>Compensez vos émissions :</strong> Si possible, vous pouvez investir dans des projets de compensation carbone certifiés.</li>" +
                    "<li><strong>Adoptez un mode de vie sobre :</strong> Questionnez vos besoins réels et cherchez à réduire votre consommation globale.</li>" +
                    "</ul>";

    analysisTextElement.innerHTML = analysisHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    renderGraph();
    generateAnalysis(); // Call the new function
});
