/**
 * Car API Module
 * Handles fetching car data from external APIs or mock data.
 */

const USE_MOCK_DATA = true; // Set to false to use real API
const RAPID_API_KEY = 'YOUR_RAPID_API_KEY_HERE'; // Placeholder for user key
const RAPID_API_HOST = 'cars-by-api-ninjas.p.rapidapi.com';
const RAPID_API_URL = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars';

/**
 * Fetches car data based on filters.
 * @param {Object} filters - Filter criteria (make, year, model, trim).
 * @returns {Promise<Array>} - A promise that resolves to an array of car objects.
 */
export async function fetchCars(filters = {}) {
    if (USE_MOCK_DATA) {
        return fetchMockCars(filters);
    }

    if (!RAPID_API_KEY || RAPID_API_KEY === 'YOUR_RAPID_API_KEY_HERE') {
        console.warn('No API Key provided. Falling back to mock data.');
        return fetchMockCars(filters);
    }

    try {
        // Construct API URL with parameters
        const url = new URL(RAPID_API_URL);
        if (filters.make) url.searchParams.append('make', filters.make);
        if (filters.year) url.searchParams.append('year', filters.year);
        if (filters.model) url.searchParams.append('model', filters.model);
        if (filters.trim) url.searchParams.append('trim', filters.trim);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': RAPID_API_KEY,
                'X-RapidAPI-Host': RAPID_API_HOST
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch cars:', error);
        return [];
    }
}

/**
 * Simulates an API call with mock data.
 * @param {Object} filters 
 * @returns {Promise<Array>}
 */
function fetchMockCars(filters) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // New detailed mock data provided by user
            const mockCars = [
                {
                    "basic": {"year":2023,"make":"Tesla","model":"Model Y","trim":"Performance 4Dr SUV","drive_type":"all-wheel","transmission":"1 speed automatic","recommended_fuel":"Electric"},
                    "specs_and_dimension":{"Engine horsepower":"425hp","Curb weight":"2,066kg","Max seating capacity":"7","Wheelbase":"2,891mm","Wheel size":"20\"","Front tires":"255/45WR19","Rear tires":"255/45WR19"},
                    "powertrain":{"Horsepower":"425hp","Torque":"475 lb.-ft.","Drive type":"all-wheel","Hybrid traction battery all electric range":"330 miles"},
                    "offroad_capability":{"Ground clearance (min)":"168mm"},
                    "top_features":{"interior":["Heated Front Seats","8-Way Power Seats"],"exterior":["20\" Uberturbine Wheels","Sunroof"],"entertainment":["Premium Audio System","Navigation System"],"safety":["Electronic Stability Control","Back-Up Camera"]}
                },
                {
                    "basic":{"year":2022,"make":"BMW","model":"X5","trim":"xDrive40i Sport Utility","drive_type":"all-wheel","transmission":"8-speed automatic","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"335hp","Curb weight":"2,250kg","Max seating capacity":"5","Wheelbase":"2,975mm","Wheel size":"19\"","Front tires":"275/40R19","Rear tires":"315/35R19"},
                    "powertrain":{"Horsepower":"335hp","Torque":"330 lb.-ft.","Drive type":"all-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"203mm"},
                    "top_features":{"interior":["Leather Seats","Power Adjustable Front Seats"],"exterior":["LED Headlights","Panoramic Moonroof"],"entertainment":["Harman Kardon Audio","Navigation System"],"safety":["Lane Departure Warning","Front and Rear Parking Sensors"]}
                },
                {
                    "basic":{"year":2021,"make":"Audi","model":"Q7","trim":"55 Premium Plus SUV","drive_type":"quattro all-wheel","transmission":"8-speed automatic","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"335hp","Curb weight":"2,230kg","Max seating capacity":"7","Wheelbase":"2,994mm","Wheel size":"20\"","Front tires":"255/50R20","Rear tires":"285/45R20"},
                    "powertrain":{"Horsepower":"335hp","Torque":"369 lb.-ft.","Drive type":"quattro all-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"200mm"},
                    "top_features":{"interior":["Ventilated Seats","Digital Cockpit"],"exterior":["LED Headlights","Power Tailgate"],"entertainment":["Bang & Olufsen Audio","Navigation System"],"safety":["Blind Spot Monitoring","Adaptive Cruise Assist"]}
                },
                {
                    "basic":{"year":2023,"make":"Mercedes-Benz","model":"GLE","trim":"450 4MATIC SUV","drive_type":"all-wheel","transmission":"9-speed automatic","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"362hp","Curb weight":"2,250kg","Max seating capacity":"5","Wheelbase":"2,995mm","Wheel size":"20\"","Front tires":"275/45R20","Rear tires":"315/40R20"},
                    "powertrain":{"Horsepower":"362hp","Torque":"369 lb.-ft.","Drive type":"all-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"210mm"},
                    "top_features":{"interior":["Leather Seats","Heated Front Seats"],"exterior":["Panoramic Sunroof","LED Headlights"],"entertainment":["Burmester Audio","Navigation System"],"safety":["Active Brake Assist","Lane Keep Assist"]}
                },
                {
                    "basic":{"year":2020,"make":"Volvo","model":"XC90","trim":"T6 AWD Inscription","drive_type":"all-wheel","transmission":"8-speed automatic","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"316hp","Curb weight":"2,300kg","Max seating capacity":"7","Wheelbase":"2,984mm","Wheel size":"19\"","Front tires":"255/55R19","Rear tires":"275/50R19"},
                    "powertrain":{"Horsepower":"316hp","Torque":"295 lb.-ft.","Drive type":"all-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"218mm"},
                    "top_features":{"interior":["Heated Front Seats","7-Seater Config"],"exterior":["Roof Rails","LED Headlights"],"entertainment":["Bowers & Wilkins Audio","Navigation System"],"safety":["Blind Spot Monitoring","Pilot Assist"]}
                },
                {
                    "basic":{"year":2022,"make":"Lexus","model":"RX","trim":"450h Luxury","drive_type":"all-wheel","transmission":"Electronic CVT","recommended_fuel":"Hybrid"},
                    "specs_and_dimension":{"Engine horsepower":"308hp","Curb weight":"2,200kg","Max seating capacity":"5","Wheelbase":"2,795mm","Wheel size":"20\"","Front tires":"235/55R20","Rear tires":"235/55R20"},
                    "powertrain":{"Horsepower":"308hp","Torque":"247 lb.-ft.","Drive type":"all-wheel","Hybrid traction battery all electric range":"35 miles"},
                    "offroad_capability":{"Ground clearance (min)":"195mm"},
                    "top_features":{"interior":["Leather Seats","Ventilated Front Seats"],"exterior":["Sunroof","LED Headlights"],"entertainment":["Mark Levinson Audio","Navigation System"],"safety":["Lane Departure Alert","Back-Up Camera"]}
                },
                {
                    "basic":{"year":2021,"make":"Porsche","model":"Cayenne","trim":"S SUV","drive_type":"all-wheel","transmission":"8-speed automatic","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"434hp","Curb weight":"2,200kg","Max seating capacity":"5","Wheelbase":"2,895mm","Wheel size":"20\"","Front tires":"265/45R20","Rear tires":"295/40R20"},
                    "powertrain":{"Horsepower":"434hp","Torque":"405 lb.-ft.","Drive type":"all-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"190mm"},
                    "top_features":{"interior":["Leather Seats","Heated Front Seats"],"exterior":["Sport Exhaust","Sunroof"],"entertainment":["Bose Audio","Navigation System"],"safety":["Adaptive Cruise Control","Back-Up Camera"]}
                },
                {
                    "basic":{"year":2019,"make":"Ford","model":"Explorer","trim":"XLT 4WD","drive_type":"all-wheel","transmission":"10-speed automatic","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"300hp","Curb weight":"2,250kg","Max seating capacity":"7","Wheelbase":"2,859mm","Wheel size":"18\"","Front tires":"255/65R18","Rear tires":"255/65R18"},
                    "powertrain":{"Horsepower":"300hp","Torque":"310 lb.-ft.","Drive type":"all-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"200mm"},
                    "top_features":{"interior":["Leather Seats","Third Row Seats"],"exterior":["LED Headlights","Roof Rails"],"entertainment":["Sony Audio","Navigation System"],"safety":["Blind Spot Monitoring","Lane Keep Assist"]}
                },
                {
                    "basic":{"year":2023,"make":"Hyundai","model":"Santa Fe","trim":"Calligraphy AWD","drive_type":"all-wheel","transmission":"8-speed automatic","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"276hp","Curb weight":"1,950kg","Max seating capacity":"5","Wheelbase":"2,830mm","Wheel size":"19\"","Front tires":"235/55R19","Rear tires":"235/55R19"},
                    "powertrain":{"Horsepower":"276hp","Torque":"310 lb.-ft.","Drive type":"all-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"185mm"},
                    "top_features":{"interior":["Heated Seats","Leatherette Trim"],"exterior":["Sunroof","LED Headlights"],"entertainment":["Bose Audio","Navigation System"],"safety":["Lane Keep Assist","Back-Up Camera"]}
                },
                {
                    "basic":{"year":2020,"make":"Toyota","model":"Highlander","trim":"XLE AWD","drive_type":"all-wheel","transmission":"8-speed automatic","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"295hp","Curb weight":"2,130kg","Max seating capacity":"7","Wheelbase":"2,850mm","Wheel size":"19\"","Front tires":"235/65R19","Rear tires":"235/65R19"},
                    "powertrain":{"Horsepower":"295hp","Torque":"263 lb.-ft.","Drive type":"all-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"200mm"},
                    "top_features":{"interior":["Leather Seats","Power Adjustable Front Seats"],"exterior":["LED Headlights","Panoramic Moonroof"],"entertainment":["JBL Audio","Navigation System"],"safety":["Adaptive Cruise Control","Back-Up Camera"]}
                },
                {
                    "basic":{"year":2021,"make":"Kia","model":"Sorento","trim":"SX AWD","drive_type":"all-wheel","transmission":"8-speed automatic","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"281hp","Curb weight":"2,060kg","Max seating capacity":"7","Wheelbase":"2,815mm","Wheel size":"19\"","Front tires":"235/55R19","Rear tires":"235/55R19"},
                    "powertrain":{"Horsepower":"281hp","Torque":"311 lb.-ft.","Drive type":"all-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"185mm"},
                    "top_features":{"interior":["Leather Seats","Heated Front Seats"],"exterior":["LED Headlights","Sunroof"],"entertainment":["Infinity Audio","Navigation System"],"safety":["Lane Departure Warning","Back-Up Camera"]}
                },
                {
                    "basic":{"year":2022,"make":"Honda","model":"Pilot","trim":"EX-L AWD","drive_type":"all-wheel","transmission":"9-speed automatic","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"280hp","Curb weight":"2,070kg","Max seating capacity":"8","Wheelbase":"2,820mm","Wheel size":"19\"","Front tires":"245/60R19","Rear tires":"245/60R19"},
                    "powertrain":{"Horsepower":"280hp","Torque":"262 lb.-ft.","Drive type":"all-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"200mm"},
                    "top_features":{"interior":["Leather Seats","Power Adjustable Front Seats"],"exterior":["Sunroof","LED Headlights"],"entertainment":["Bose Audio","Navigation System"],"safety":["Blind Spot Monitoring","Back-Up Camera"]}
                },
                {
                    "basic":{"year":2023,"make":"Nissan","model":"Murano","trim":"Platinum AWD","drive_type":"all-wheel","transmission":"CVT","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"261hp","Curb weight":"2,000kg","Max seating capacity":"5","Wheelbase":"2,830mm","Wheel size":"20\"","Front tires":"245/50R20","Rear tires":"245/50R20"},
                    "powertrain":{"Horsepower":"261hp","Torque":"273 lb.-ft.","Drive type":"all-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"180mm"},
                    "top_features":{"interior":["Heated Seats","Leatherette Trim"],"exterior":["Panoramic Sunroof","LED Headlights"],"entertainment":["Bose Audio","Navigation System"],"safety":["Lane Keep Assist","Back-Up Camera"]}
                },
                {
                    "basic":{"year":2023,"make":"Subaru","model":"BRZ","trim":"Limited","drive_type":"rear-wheel","transmission":"6-speed manual","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"228hp","Curb weight":"1,277kg","Max seating capacity":"4","Wheelbase":"2,575mm","Wheel size":"18\"","Front tires":"215/40R18","Rear tires":"215/40R18"},
                    "powertrain":{"Horsepower":"228hp","Torque":"184 lb.-ft.","Drive type":"rear-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"130mm"},
                    "top_features":{"interior":["Sport Seats","Heated Front Seats"],"exterior":["18\" Alloy Wheels","LED Headlights"],"entertainment":["Starlink Multimedia","Apple CarPlay"],"safety":["Blind Spot Detection","Rear Cross Traffic Alert"]}
                },
                {
                    "basic":{"year":2022,"make":"Honda","model":"Civic","trim":"Si","drive_type":"front-wheel","transmission":"6-speed manual","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"200hp","Curb weight":"1,339kg","Max seating capacity":"5","Wheelbase":"2,735mm","Wheel size":"18\"","Front tires":"235/40R18","Rear tires":"235/40R18"},
                    "powertrain":{"Horsepower":"200hp","Torque":"192 lb.-ft.","Drive type":"front-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"134mm"},
                    "top_features":{"interior":["Sport Pedals","Cloth Seats"],"exterior":["Gloss Black Spoiler","Matte Black Wheels"],"entertainment":["Bose Premium Sound","9\" Touchscreen"],"safety":["Honda Sensing","Multi-Angle Rearview Camera"]}
                },
                {
                    "basic":{"year":2021,"make":"Mazda","model":"MX-5 Miata","trim":"Grand Touring","drive_type":"rear-wheel","transmission":"6-speed manual","recommended_fuel":"Gasoline"},
                    "specs_and_dimension":{"Engine horsepower":"181hp","Curb weight":"1,066kg","Max seating capacity":"2","Wheelbase":"2,310mm","Wheel size":"17\"","Front tires":"205/45R17","Rear tires":"205/45R17"},
                    "powertrain":{"Horsepower":"181hp","Torque":"151 lb.-ft.","Drive type":"rear-wheel"},
                    "offroad_capability":{"Ground clearance (min)":"135mm"},
                    "top_features":{"interior":["Leather Seats","Heated Seats"],"exterior":["Convertible Top","Adaptive Front Lighting"],"entertainment":["Bose 9-Speaker Audio","Navigation"],"safety":["Traffic Sign Recognition","Lane Departure Warning"]}
                }
            ];

            // Filter logic
            const filtered = mockCars.filter(car => {
                const basic = car.basic;
                
                // Make
                if (filters.make && basic.make !== filters.make) return false;

                // Year
                if (filters.year && basic.year.toString() !== filters.year) return false;

                // Model (from search bar)
                if (filters.model) {
                    const lowerQuery = filters.model.toLowerCase();
                    const fullName = `${basic.make} ${basic.model}`.toLowerCase();
                    if (!fullName.includes(lowerQuery)) return false;
                }

                // Trim
                if (filters.trim) {
                    const lowerTrim = filters.trim.toLowerCase();
                    if (!basic.trim.toLowerCase().includes(lowerTrim)) return false;
                }

                return true;
            });

            // Check if any filter is active
            const isFiltering = 
                (filters.model && filters.model.trim() !== '') || 
                (filters.make && filters.make !== '') || 
                (filters.year && filters.year !== '') || 
                (filters.trim && filters.trim.trim() !== '');

            resolve(filtered);
        }, 500); // Simulate network delay
    });
}
