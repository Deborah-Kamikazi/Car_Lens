/**
 * Car API Module
 * Handles fetching car data from external APIs or mock data.
 */

const USE_MOCK_DATA = true; // Set to false to use real API
const RAPID_API_KEY = 'YOUR_RAPID_API_KEY_HERE'; // Placeholder for user key
const RAPID_API_HOST = 'cars-by-api-ninjas.p.rapidapi.com';
const RAPID_API_URL = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars';

/**
 * Fetches car data based on a search query (e.g., model name).
 * @param {string} query - The car model to search for.
 * @returns {Promise<Array>} - A promise that resolves to an array of car objects.
 */
export async function fetchCars(query) {
    if (USE_MOCK_DATA) {
        return fetchMockCars(query);
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
 * @param {string} query 
 * @returns {Promise<Array>}
 */
function fetchMockCars(query) {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Generate some random mock cars based on the query
            const mockCars = [
                {
                    make: 'Toyota',
                    model: 'Camry',
                    year: 2023,
                    horsepower: 203,
                    cylinders: 4,
                    displacement: 2.5,
                    drive: 'fwd',
                    transmission: 'a',
                    class: 'midsize car',
                    combination_mpg: 32,
                    price_range: '$26,000 - $36,000' // Mock field
                },
                {
                    make: 'Honda',
                    model: 'Civic',
                    year: 2023,
                    horsepower: 158,
                    cylinders: 4,
                    displacement: 2.0,
                    drive: 'fwd',
                    transmission: 'cvt',
                    class: 'compact car',
                    combination_mpg: 35,
                    price_range: '$24,000 - $31,000'
                },
                {
                    make: 'Ford',
                    model: 'Mustang',
                    year: 2023,
                    horsepower: 450,
                    cylinders: 8,
                    displacement: 5.0,
                    drive: 'rwd',
                    transmission: 'm',
                    class: 'sports car',
                    combination_mpg: 18,
                    price_range: '$28,000 - $56,000'
                },
                {
                    make: 'Tesla',
                    model: 'Model 3',
                    year: 2023,
                    horsepower: 283,
                    cylinders: 0,
                    displacement: 0,
                    drive: 'rwd',
                    transmission: 'a',
                    class: 'electric',
                    combination_mpg: 132,
                    price_range: '$40,000 - $55,000'
                },
                {
                    make: 'Chevrolet',
                    model: 'Corvette',
                    year: 2023,
                    horsepower: 490,
                    cylinders: 8,
                    displacement: 6.2,
                    drive: 'rwd',
                    transmission: 'a',
                    class: 'sports car',
                    combination_mpg: 19,
                    price_range: '$65,000 - $85,000'
                }
            ];

            // Filter roughly by query if provided
            if (query) {
                const lowerQuery = query.toLowerCase();
                const filtered = mockCars.filter(car => 
                    car.make.toLowerCase().includes(lowerQuery) || 
                    car.model.toLowerCase().includes(lowerQuery)
                );
                // If no matches, return all (just for demo fun) or empty
                resolve(filtered.length > 0 ? filtered : mockCars);
            } else {
                resolve(mockCars);
            }
        }, 800); // Simulate network delay
    });
}
