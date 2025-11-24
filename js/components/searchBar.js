/**
 * Search Bar Component
 * Handles search input interactions.
 */

/**
 * Initializes the search bar component.
 * @param {string} inputId - ID of the input element.
 * @param {string} btnId - ID of the button element.
 * @param {Function} onSearch - Callback function to execute on search.
 */
export function initSearchBar(inputId, btnId, onSearch) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);

    if (!input || !btn) {
        console.error('Search bar elements not found');
        return;
    }

    btn.addEventListener('click', () => {
        const query = input.value.trim();
        onSearch(query);
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = input.value.trim();
            onSearch(query);
        }
    });
}
