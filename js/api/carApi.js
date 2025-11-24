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
 * @param {Object} filters - Filter criteria (make, year, drive, fuel, query).
 * @returns {Promise<Array>} - A promise that resolves to an array of car objects.
 */
export async function fetchCars(filters = {}) {
    if (USE_MOCK_DATA) {
        return fetchMockCars(filters);
    }

    if (!RAPID_API_KEY || RAPID_API_KEY === 'YOUR_RAPID_API_KEY_HERE') {
        console.warn('No API Key provided. Falling back to mock data.');
        return fetchMockCars(query);
    }

    try {
        const response = await fetch(`${RAPID_API_URL}?model=${query}`, {
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
                    "basic": {
                        "year": 2023,
                        "make": "Tesla",
                        "model": "Model Y",
                        "trim": "Performance 4Dr ALL Wheel Drive Sport Utility",
                        "drive_type": "all-wheel",
                        "transmission": "1 speed automatic",
                        "recommended_fuel": "Electric"
                    },
                    "specs_and_dimension": {
                        "Engine horsepower": "425hp @ RPM",
                        "Curb weight": "2,066kg (4,555lbs)",
                        "Max seating capacity": "7",
                        "Wheelbase": "2,891mm (113.8\")",
                        "Wheel size": "20\"",
                        "Front tires": "255/45WR19.0",
                        "Rear tires": "255/45WR19.0"
                    },
                    "powertrain": {
                        "Horsepower": "425hp @ RPM",
                        "Torque": "475 lb.-ft. @ RPM",
                        "Drive type": "all-wheel",
                        "Hybrid traction battery all electric range": "330 miles"
                    },
                    "offroad_capability": {
                        "Ground clearance (min)": "168mm (6.6\")"
                    },
                    "top_features": {
                        "interior": ["Heated Front Seats", "8-Way Power Seats"],
                        "exterior": ["20\" Uberturbine Wheels", "Sunroof"],
                        "entertainment": ["Premium Audio System", "Navigation System"],
                        "safety": ["Electronic Stability Control", "Back-Up Camera"]
                    }
                },
                {
                    "basic": {
                        "year": 2022,
                        "make": "BMW",
                        "model": "X5",
                        "trim": "xDrive40i Sport Utility",
                        "drive_type": "all-wheel",
                        "transmission": "8-speed automatic",
                        "recommended_fuel": "Gasoline"
                    },
                    "specs_and_dimension": {
                        "Engine horsepower": "335hp @ 5,500RPM",
                        "Curb weight": "2,250kg (4,960lbs)",
                        "Max seating capacity": "5",
                        "Wheelbase": "2,975mm (117.1\")",
                        "Wheel size": "19\"",
                        "Front tires": "275/40R19",
                        "Rear tires": "315/35R19"
                    },
                    "powertrain": {
                        "Horsepower": "335hp @ 5,500RPM",
                        "Torque": "330 lb.-ft. @ 1,500-5,200RPM",
                        "Drive type": "all-wheel"
                    },
                    "offroad_capability": {
                        "Ground clearance (min)": "203mm (8.0\")"
                    },
                    "top_features": {
                        "interior": ["Leather Seats", "Power Adjustable Front Seats"],
                        "exterior": ["LED Headlights", "Panoramic Moonroof"],
                        "entertainment": ["Harman Kardon Audio", "Navigation System"],
                        "safety": ["Lane Departure Warning", "Front and Rear Parking Sensors"]
                    }
                },
                {
                    "basic": {
                        "year": 2021,
                        "make": "Audi",
                        "model": "Q7",
                        "trim": "55 Premium Plus SUV",
                        "drive_type": "quattro all-wheel",
                        "transmission": "8-speed automatic",
                        "recommended_fuel": "Gasoline"
                    },
                    "specs_and_dimension": {
                        "Engine horsepower": "335hp @ 5,200RPM",
                        "Curb weight": "2,230kg (4,916lbs)",
                        "Max seating capacity": "7",
                        "Wheelbase": "2,994mm (117.9\")",
                        "Wheel size": "20\"",
                        "Front tires": "255/50R20",
                        "Rear tires": "285/45R20"
                    },
                    "powertrain": {
                        "Horsepower": "335hp @ 5,200RPM",
                        "Torque": "369 lb.-ft. @ 1,370-4,500RPM",
                        "Drive type": "quattro all-wheel"
                    },
                    "offroad_capability": {
                        "Ground clearance (min)": "200mm (7.9\")"
                    },
                    "top_features": {
                        "interior": ["Ventilated Seats", "Digital Cockpit"],
                        "exterior": ["LED Headlights", "Power Tailgate"],
                        "entertainment": ["Bang & Olufsen Audio", "Navigation System"],
                        "safety": ["Blind Spot Monitoring", "Adaptive Cruise Assist"]
                    }
                }
            ];

            // Filter logic
            const filtered = mockCars.filter(car => {
                const basic = car.basic;
                
                // Query (Search Text)
                if (filters.query) {
                    const lowerQuery = filters.query.toLowerCase();
                    const matchesQuery = basic.make.toLowerCase().includes(lowerQuery) || 
                                         basic.model.toLowerCase().includes(lowerQuery);
                    if (!matchesQuery) return false;
                }

                // Make
                if (filters.make && basic.make !== filters.make) return false;

                // Year
                if (filters.year && basic.year.toString() !== filters.year) return false;

                // Drive Type
                if (filters.drive && !basic.drive_type.includes(filters.drive)) return false;

                // Fuel Type
                if (filters.fuel && basic.recommended_fuel !== filters.fuel) return false;

                return true;
            });

            resolve(filtered);
        }, 500); // Simulate network delay
    });
}
