/**
 * Car Card Component
 * Generates the HTML structure for a car card.
 */

/**
 * Creates a DOM element representing a car card.
 * @param {Object} car - The car data object (new nested structure).
 * @returns {HTMLElement} - The car card element.
 */
export function createCarCard(car) {
    const card = document.createElement('div');
    card.classList.add('car-card');
    
    // Extract data from new structure
    const basic = car.basic || {};
    const specs = car.specs_and_dimension || {};
    const powertrain = car.powertrain || {};
    const features = car.top_features || {};

    // Helper to get a few features
    const featureList = [
        ...(features.interior || []).slice(0, 1),
        ...(features.entertainment || []).slice(0, 1)
    ].join(', ');

    card.innerHTML = `
        <h3>${basic.make} ${basic.model}</h3>
        <p class="description">${basic.year} • ${basic.trim}</p>
        
        <div class="tags">
            <span class="tag">${powertrain.Horsepower || 'N/A'}</span>
            <span class="tag">${basic.transmission}</span>
            <span class="tag">${basic.drive_type}</span>
            <span class="tag">${specs["Max seating capacity"]} Seats</span>
        </div>

        <div class="features-preview">
            <strong>Highlights:</strong> ${featureList}
        </div>
    `;

    return card;
}
