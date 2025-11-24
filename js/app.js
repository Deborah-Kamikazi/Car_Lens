import { fetchCars } from './api/carApi.js';
import { createCarCard } from './components/carCard.js';
import { initSearchBar } from './components/searchBar.js';
import { createElement, clearContainer } from './utils/domHelpers.js';

document.addEventListener('DOMContentLoaded', () => {
    const cardGrid = document.getElementById('card-grid');

    // Initialize Search Bar
    initSearchBar('search-input', 'search-btn', handleSearch);

    // Initial Load
    handleSearch('');

    async function handleSearch(query) {
        clearContainer(cardGrid);

        const cars = await fetchCars(query);
        
        if (cars.length === 0) {
            const noResultCard = createElement('div', 'no-results', `<h3>No cars found</h3><p>Try searching for 'Toyota', 'Ford', etc.</p>`);
            cardGrid.appendChild(noResultCard);
            return;
        }

        cars.forEach((car) => {
            const card = createCarCard(car);
            cardGrid.appendChild(card);
        });
    }
});
