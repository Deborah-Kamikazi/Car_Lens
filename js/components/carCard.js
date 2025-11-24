/**
 * Car Card Component
 * Generates the HTML structure for a car card.
 */

/**
 * Creates a DOM element representing a car card.
 * @param {Object} car - The car data object.
 * @returns {HTMLElement} - The car card element.
 */
export function createCarCard(car) {
    const card = document.createElement('div');
    card.classList.add('car-card');
    
    card.innerHTML = `
        <h3>${car.make} ${car.model}</h3>
        <p class="description">${car.year} • ${car.class}</p>
        
        <div class="tags">
            <span class="tag">${car.horsepower} HP</span>
            <span class="tag">${car.transmission === 'a' ? 'Automatic' : 'Manual'}</span>
            <span class="tag">${car.drive.toUpperCase()}</span>
        </div>

        <div class="footer">
            <span class="explore-text">Explore</span>
            <span class="arrow">→</span>
        </div>
    `;

    return card;
}
