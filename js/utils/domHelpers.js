/**
 * DOM Helpers
 * Utility functions for DOM manipulation.
 */

/**
 * Creates an element with a specific class and content.
 * @param {string} tag - HTML tag name.
 * @param {string} className - CSS class name.
 * @param {string} htmlContent - Inner HTML content.
 * @returns {HTMLElement}
 */
export function createElement(tag, className, htmlContent = '') {
    const el = document.createElement(tag);
    if (className) el.classList.add(className);
    el.innerHTML = htmlContent;
    return el;
}

/**
 * Clears all children from a container.
 * @param {HTMLElement} container 
 */
export function clearContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
