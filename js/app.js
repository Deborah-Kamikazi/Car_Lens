import { fetchCars } from './api/carApi.js';
import { createCarCard } from './components/carCard.js';
import { initSearchBar } from './components/searchBar.js';
import { createElement, clearContainer } from './utils/domHelpers.js';

document.addEventListener('DOMContentLoaded', () => {
    const cardGrid = document.getElementById('card-grid');
    const filterMake = document.getElementById('filter-make');
    const filterYear = document.getElementById('filter-year');
    const filterDrive = document.getElementById('filter-drive');
    const filterFuel = document.getElementById('filter-fuel');

    // Initialize Search Bar
    initSearchBar('search-input', 'search-btn', (query) => {
        handleSearch({ query });
    });

    // Filter Event Listeners
    const filters = [filterMake, filterYear, filterDrive, filterFuel];
    filters.forEach(filter => {
        filter.addEventListener('change', () => {
            const currentQuery = document.getElementById('search-input').value.trim();
            handleSearch({ query: currentQuery });
        });
    });

    // Initial Load
    handleSearch({});

    async function handleSearch(criteria = {}) {
        clearContainer(cardGrid);

        // Gather all filter values
        const activeFilters = {
            query: criteria.query || '',
            make: filterMake.value,
            year: filterYear.value,
            drive: filterDrive.value,
            fuel: filterFuel.value
        };

        const cars = await fetchCars(activeFilters);
        
        if (cars.length === 0) {
            const noResultCard = createElement('div', 'no-results', `<h3>No cars found</h3><p>Try adjusting your filters.</p>`);
            cardGrid.appendChild(noResultCard);
            return;
        }

        cars.forEach((car) => {
            const card = createCarCard(car);
            cardGrid.appendChild(card);
        });
    }
});
