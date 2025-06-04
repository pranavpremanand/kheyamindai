/**
 * Utility functions for handling canonical URLs
 */

/**
 * Generates a canonical URL for any given path
 * @param {string} path - The current path (from React Router)
 * @returns {string} - The full canonical URL
 */
export const generateCanonicalUrl = (path) => {
    const BASE_URL = 'https://www.kheyamind.ai';

    // Remove trailing slashes except for homepage
    const normalizedPath = path === '/' ? path : path.replace(/\/$/, '');

    // Handle query parameters and hash
    const cleanPath = normalizedPath.split('?')[0].split('#')[0];

    return `${BASE_URL}${cleanPath}`;
};

/**
 * Validates if a URL is a valid canonical URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const isValidCanonicalUrl = (url) => {
    try {
        const urlObj = new URL(url);
        return urlObj.protocol === 'https:' &&
            urlObj.hostname === 'www.kheyamind.ai' &&
            !urlObj.search && // No query parameters
            !urlObj.hash;    // No hash
    } catch {
        return false;
    }
}; 