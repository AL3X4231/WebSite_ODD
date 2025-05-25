// Fonction pour obtenir la distance entre deux pays (par leur capitale)
async function getDistanceBetweenCountries(country1, country2) {
    const url = `https://www.distance.to/${encodeURIComponent(country1)}/${encodeURIComponent(country2)}`;
    try {
        const response = await fetch(url);
        const text = await response.text();
        const match = text.match(/([0-9,.]+)\s*km/);
        if (match) {
            return `${match[1]} km`;
        } else {
            return "Distance non trouvée";
        }
    } catch (error) {
        return "Erreur lors de la récupération de la distance";
    }
}

// Exemple d'utilisation
getDistanceBetweenCountries("Armenia", "Brazil").then(distance => {
    console.log("Distance France - Brésil :", distance);
});

function calculerEmpreinteCarboneVol(distanceKm, typeVol = "long") {
    // Facteurs d'émission moyens
    const facteurs = {
        court: 0.25, // court-courrier
        long: 0.15   // long-courrier
    };
    const facteur = typeVol === "court" ? facteurs.court : facteurs.long;
    return distanceKm * facteur; // résultat en kg CO₂
}

// Exemple d'utilisation
const distance = 11000; // distance en km
const empreinte = calculerEmpreinteCarboneVol(distance, "long");
console.log(`Empreinte carbone : ${empreinte.toFixed(2)} kg CO₂`);



