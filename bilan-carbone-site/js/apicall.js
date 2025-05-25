// transport footprint


async function getDistanceBetweenCountries(country1, country2) {
    const country1coords = await getCountryCoordinates(country1);
    const country2coords = await getCountryCoordinates(country2);
    console.log(`Coordinates for ${country1}:`, country1coords);
    console.log(`Coordinates for ${country2}:`, country2coords);


    return haversineDistance(country1coords.lat, country1coords.lon, country2coords.lat, country2coords.lon);
}

function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const toRad = angle => (angle * Math.PI) / 180;
  
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
  
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; 
}

async function getCountryCoordinates(country) {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    const data = await res.json();
    return {
      lat: data[0].latlng[0],
      lon: data[0].latlng[1]
    };
}



function calculerEmpreinteCarboneVol(distanceKm) {

    return distanceKm * 0.25; 
}


const EMISSION_FACTORS = {
    fuel: {
        essence: 2.31,
        diesel: 2.60,
        gpl: 1.60,
        electrique: 0, 
        hybride: 1.50 
    },
    publicTransport: {
        bus: 0.068,
        metro: 0.004,
        train: 0.014,
        avion: 0.285
    }
};

function calculateVehicleEmissions(fuelType, consumption, kmPerYear) {
    if (!fuelType || !consumption || !kmPerYear) return 0;

    const factorPerLiter = EMISSION_FACTORS.fuel[fuelType];
    const litersConsumedPerYear = (consumption / 100) * kmPerYear;

    return litersConsumedPerYear * factorPerLiter; // kg CO2/an
}

function calculatePublicTransportEmissions(transportType, frequency = 220) {
    if (!transportType || transportType === 'aucun') return 0;

    const averageDistancePerDay = {
        bus: 15,
        metro: 10,
        train: 30,
    };

    return averageDistancePerDay[transportType] * EMISSION_FACTORS.publicTransport[transportType] * frequency;
}


function calculateTransportFootprint(formData) {
    let vehicleEmissions = calculateVehicleEmissions(
        formData.fuelType,
        formData.consumption,
        formData.kmPerYear
    );

    const publicTransportEmissions = calculatePublicTransportEmissions(
        formData.publicTransport
    );
    
    if (formData.carpooling === 'oui') {
        vehicleEmissions *= 0.7; 
    }
    
    let totalEmissions = vehicleEmissions + publicTransportEmissions;

    return totalEmissions;
}


function extractFlightData() {
    const flights = [];
    const flightGroups = document.querySelectorAll('.flight-input-group');
    
    flightGroups.forEach(group => {
        const groupId = group.id.split('-').pop();
        const departure = document.getElementById(`flight-departure-${groupId}`)?.value;
        const arrival = document.getElementById(`flight-arrival-${groupId}`)?.value;
        
        if (departure && arrival) {
            flights.push({
                departure,
                arrival
            });
        }
    });
    
    return flights;
}


async function calculateFlightEmissions(flights) {
    let totalEmissions = 0;
    
    for (const flight of flights) {
        try {
            const distance = await getDistanceBetweenCountries(flight.departure, flight.arrival);
            
            if (!isNaN(distance)) {
                
                const flightEmissions = calculerEmpreinteCarboneVol(distance);
                totalEmissions += flightEmissions;
            }
        } catch (error) {
            console.error(`Error calculating flight emissions: ${error}`);
        }
    }
    
    return totalEmissions;
}

function handleTransportSubmit() {
    const formData = {
        vehicleType: document.getElementById('vehicle-type')?.value,
        consumption: parseFloat(document.getElementById('conso-moyenne')?.value),
        kmPerYear: parseFloat(document.getElementById('km-an')?.value),
        publicTransport: document.getElementById('transports-communs')?.value,
        carpooling: document.getElementById('covoiturage')?.value,
        fuelType: document.getElementById('vehicle-type')?.value, 
        flights: extractFlightData()
    };



    const nonFlightEmissions = calculateTransportFootprint(formData);
    
    
    calculateFlightEmissions(formData.flights).then(flightEmissions => {
        const totalEmissions = nonFlightEmissions + flightEmissions;
        console.log('Flight emissions:', flightEmissions.toFixed(2), 'kg CO2');
        console.log(`Total transport carbon footprint (including flights): ${totalEmissions.toFixed(2)} kg CO2/year`)

        localStorage.setItem("transportFootprint", totalEmissions);
        
    }).catch(error => {
        console.error('Error in flight emissions calculation:', error);
        return nonFlightEmissions; 
    });
}



// housing footprint

const HOUSING_EMISSION_FACTORS = {
    electricite: 0.05, // kg CO2/kWh
    gaz: 0.204,
    fioul: 2.96,       // kg CO2/litre
    bois: 0.02
};

const THERMAL_INSULATION_FACTORS = {
    good: 1.0,
    average: 1.1,
    poor: 1.2
};

const RENEWABLE_ENERGY_FACTORS = {
    yes: 0.8,
    no: 1.0
};

function calculateHousingEmissions(formData) {
    const { energySource, annualConsumption, inhabitants, thermicIsolation, renewableEnergy } = formData;

    if (!energySource || !annualConsumption || annualConsumption <= 0 || !inhabitants || inhabitants <= 0) {
        return { total: 0, perPerson: 0 };
    }

    const baseFactor = HOUSING_EMISSION_FACTORS[energySource];
    const isolationFactor = THERMAL_INSULATION_FACTORS[thermicIsolation] ?? 1;
    const renewableFactor = RENEWABLE_ENERGY_FACTORS[renewableEnergy] ?? 1;

    // Émissions brutes
    let emissions = annualConsumption * baseFactor;

    // Ajustements isolation et renouvelable
    emissions *= isolationFactor;
    emissions *= renewableFactor;

    const perPerson = emissions / inhabitants;

    return {
        total: emissions,
        perPerson: perPerson
    };
}

function handleHousingSubmit() {
    const formData = {
        housingType: document.getElementById('housing-type').value,
        surface: parseFloat(document.getElementById('surface').value),
        inhabitants: parseInt(document.getElementById('habitants').value),
        energySource: document.getElementById('energy-source').value,
        annualConsumption: parseFloat(document.getElementById('annual-consumption').value),
        thermicIsolation: document.getElementById('thermic-isolation').value,
        renewableEnergy: document.getElementById('renewable-energy').value
    };


    const result = calculateHousingEmissions(formData);
    localStorage.setItem("housingFootprint", result.perPerson);
    console.log(`Total logement : ${result.total.toFixed(2)} kg CO₂/an`);
    console.log(`Par personne : ${result.perPerson.toFixed(2)} kg CO₂/an`);
}



// food footprint

const DIET_BASE_EMISSIONS = {
    omnivore: 2500,
    flexitarien: 1900,
    vegetarien: 1400,
    vegetalien: 1000
};

const FOOD_WASTE_FACTORS = {
    faible: 1.0,
    modere: 1.1,
    eleve: 1.25
};

const PROCESSED_FOOD_FACTORS = {
    faible: 1.0,
    moderee: 1.1,
    elevee: 1.2
};

function calculateFoodEmissions(formData) {
    const {
        regime,
        viandeRouge,
        produitsTransformes,
        produitsLocaux,
        repasViande,
        gaspillage
    } = formData;

    if (!regime || !DIET_BASE_EMISSIONS[regime]) return 0;

    let emissions = DIET_BASE_EMISSIONS[regime];

    
    if (regime === 'omnivore' && viandeRouge === 'oui') {
        emissions += 300; 
    }

    
    emissions *= PROCESSED_FOOD_FACTORS[produitsTransformes] ?? 1;

   
    if (produitsLocaux === 'oui') {
        emissions *= 0.9; 
    }

   
    if (repasViande) {
        const matches = repasViande.match(/\d+/);
        if (matches) {
            const freq = parseInt(matches[0]);
            if (freq > 7) emissions += 200;
            else if (freq <= 1) emissions -= 100;
        }
    }

    emissions *= FOOD_WASTE_FACTORS[gaspillage] ?? 1;

    return emissions;
}

function handleFoodSubmit() {
    const formData = {
        regime: document.getElementById('regime').value,
        viandeRouge: document.getElementById('viande-rouge').value,
        produitsTransformes: document.getElementById('produits-transformes').value,
        produitsLocaux: document.getElementById('produits-locaux').value,
        repasViande: document.getElementById('repas-viande').value,
        gaspillage: document.getElementById('gaspillage').value
    };

    const foodFootprint = calculateFoodEmissions(formData);
    localStorage.setItem("foodFootprint", foodFootprint);
    console.log(`🍽️ Food carbon footprint: ${foodFootprint.toFixed(2)} kg CO₂/year`);
    return foodFootprint;
}

//buy footprint

function calculateConsoEmissions(formData) {
    const {
        achatVetements,
        achatElectro,
        achatMeubles,
        origineProduits,
        achatMode
    } = formData;

    let emissions = 0;


    const vetementsMap = {
        peu: 100,
        moyen: 300,
        beaucoup: 600
    };
    emissions += vetementsMap[achatVetements] ?? 0;

    const electroMap = {
        rare: 100,
        normal: 300,
        frequent: 500
    };
    emissions += electroMap[achatElectro] ?? 0;


    const meublesMap = {
        peu: 50,
        moyen: 150,
        beaucoup: 300
    };
    emissions += meublesMap[achatMeubles] ?? 0;

 
    const origineFactor = {
        neuf: 1.0,
        reconditionne: 0.85,
        ecoresponsable: 0.7
    };
    emissions *= origineFactor[origineProduits] ?? 1;


    const achatBonus = {
        local: 0,
        'enligne-standard': 50,
        'enligne-express': 100
    };
    emissions += achatBonus[achatMode] ?? 0;

    return emissions;
}

function handleConsoSubmit() {
    const formData = {
        achatVetements: document.getElementById('achat-vetements').value,
        achatElectro: document.getElementById('achat-electro').value,
        achatMeubles: document.getElementById('achat-meubles').value,
        origineProduits: document.getElementById('origine-produits').value,
        achatMode: document.getElementById('achat-mode').value
    };

    const footprint = calculateConsoEmissions(formData);
    localStorage.setItem("consumptionFootprint", footprint);
    console.log(`Consumption carbon footprint: ${footprint.toFixed(2)} kg CO₂/year`);
    return footprint;
}


// waste footprint

function calculateWasteEmissions(formData) {
    const {
        quantiteDechets,
        tri,
        compost,
        usageProduits
    } = formData;

    let emissions = 0;

 
    const baseEmissions = {
        faible: 200,
        moyenne: 400,
        elevee: 600
    };
    emissions += baseEmissions[quantiteDechets] ?? 0;

 
    if (tri === 'oui') emissions *= 0.9; 

    
    if (compost === 'oui') emissions *= 0.9; 

    
    const usageBonus = {
        reutilisable: 0.85,
        mixte: 1.0,
        jetable: 1.2
    };
    emissions *= usageBonus[usageProduits] ?? 1;

    return emissions;
}

function handleWasteSubmit() {
    const formData = {
        quantiteDechets: document.getElementById('quantite-dechets').value,
        tri: document.getElementById('tri').value,
        compost: document.getElementById('compost').value,
        usageProduits: document.getElementById('usage-produits').value
    };

    const wasteFootprint = calculateWasteEmissions(formData);
    localStorage.setItem("wasteFootprint", wasteFootprint);
    console.log(`Waste & recycling carbon footprint: ${wasteFootprint.toFixed(2)} kg CO₂/year`);
    window.location.href = '/result.html';
}

