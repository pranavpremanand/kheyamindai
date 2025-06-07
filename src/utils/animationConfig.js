/**
 * Animation Configuration
 * Centralizes all animation settings and initialization
 */

import AOS from 'aos';
import 'aos/dist/aos.css';

// Default AOS configuration
const DEFAULT_AOS_CONFIG = {
    once: true,
    duration: 800,
    easing: 'ease-in-out-quart',
    offset: -50,
    delay: 100,
    disable: false // Enable animations on all devices
};

/**
 * Initialize AOS with custom configuration
 * @param {Object} customConfig - Optional custom configuration to override defaults
 */
export const initializeAnimations = (customConfig = {}) => {
    const config = {
        ...DEFAULT_AOS_CONFIG,
        ...customConfig
    };

    // Initialize AOS
    AOS.init(config);

    // Refresh AOS on window resize
    window.addEventListener('resize', () => {
        AOS.refresh();
    });

    // Refresh AOS when new content is loaded
    const observer = new MutationObserver(() => {
        AOS.refresh();
    });

    // Observe DOM changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    return () => {
        observer.disconnect();
        window.removeEventListener('resize', AOS.refresh);
    };
};

/**
 * Refresh animations
 * Use this when you need to manually refresh animations
 */
export const refreshAnimations = () => {
    AOS.refresh();
}; 