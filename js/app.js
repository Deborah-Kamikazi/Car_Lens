import { fetchCars } from './api/carApi.js';
import { createCarCard } from './components/carCard.js';
import { initSearchBar } from './components/searchBar.js';
import { createElement, clearContainer } from './utils/domHelpers.js';

document.addEventListener('DOMContentLoaded', () => {
    const cardGrid = document.getElementById('card-grid');
    const filterMake = document.getElementById('filter-make');
    const filterYear = document.getElementById('filter-year');
    const filterTrim = document.getElementById('filter-trim');

   
    initSearchBar('search-input', 'search-btn', (model) => {
        handleSearch({ model });
    });

   
    const filters = [filterMake, filterYear, filterTrim];
    filters.forEach(filter => {
       
        const eventType = filter.tagName === 'INPUT' ? 'input' : 'change';
        filter.addEventListener(eventType, () => {
            handleSearch();
        });
    });

   
    handleSearch({});

    async function handleSearch(criteria = {}) {
        clearContainer(cardGrid);

        
        const activeFilters = {
            model: criteria.model || document.getElementById('search-input').value.trim(),
            make: filterMake.value,
            year: filterYear.value,
            trim: filterTrim.value.trim()
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
