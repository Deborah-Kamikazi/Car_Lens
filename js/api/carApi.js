
const USE_MOCK_DATA = false; // Set to true to use mock data
const RAPID_API_KEY = '6704570a14mshfcc1ed9f1def59ep183c04jsn610b8aecb02e';
const RAPID_API_HOST = 'vehicle-database.p.rapidapi.com';
const RAPID_API_URL = 'https://vehicle-database.p.rapidapi.com/evehicleapi/get-data';

/**
 * Fetches car data based on filters.
 * @param {Object} filters - Filter criteria (make, year, model, trim).
 * @returns {Promise<Array>} - A promise that resolves to an array of car objects.
 */
export async function fetchCars(filters = {}) {
    if (!RAPID_API_KEY) {
        console.warn('No API Key provided.');
        return [];
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
                'x-rapidapi-key': RAPID_API_KEY,
                'x-rapidapi-host': RAPID_API_HOST
            }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Ensure we return an array. If the API returns a single object, wrap it.
        if (Array.isArray(data)) {
            return data;
        } else if (data && typeof data === 'object') {
            return [data];
        } else {
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch cars:', error);
        return [];
    }
}
