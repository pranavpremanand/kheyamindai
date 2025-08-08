/**
 * Animation Configuration
 * Centralizes all animation settings and initialization
 */

import AOS from 'aos';
import 'aos/dist/aos.css';

// Default AOS configuration
const DEFAULT_AOS_CONFIG = {
    once: true,
    duration: 600,
    easing: 'ease-out-cubic',
    offset: 50,
    delay: 0,
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99
};

/**
 * Initialize AOS with custom configuration
 * @param {Object} customConfig - Optional custom configuration to override defaults
 */
export const initializeAnimations = (customConfig = {}) => {
    // Prevent double initialization globally
    if (window.__aosInitialized) {
        return () => {};
    }

    // Check if document is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initializeAnimations(customConfig));
        return () => {};
    }

    const config = {
        ...DEFAULT_AOS_CONFIG,
        ...customConfig
    };

    // Prevent double initialization with DOM check
    if (document.querySelector('.aos-init') || window.__aosInitialized) {
        return () => {};
    }

    // Mark as initialized immediately
    window.__aosInitialized = true;

    // Initialize AOS with small delay to ensure all elements are ready
    setTimeout(() => {
        try {
            AOS.init(config);
        } catch (error) {
            console.warn('AOS initialization error:', error);
        }
    }, 50);

    let resizeTimeout;
    const handleResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            AOS.refresh();
        }, 100);
    };

    // Add resize listener with debouncing
    window.addEventListener('resize', handleResize, { passive: true });

    // Observe DOM changes with throttling
    let mutationTimeout;
    const observer = new MutationObserver(() => {
        if (!mutationTimeout) {
            mutationTimeout = setTimeout(() => {
                AOS.refresh();
                mutationTimeout = null;
            }, 100);
        }
    });

    // Observe DOM changes only for specific containers
    const containers = document.querySelectorAll('main, [data-aos]');
    containers.forEach(container => {
        observer.observe(container, {
            childList: true,
            subtree: false
        });
    });

    return () => {
        observer.disconnect();
        window.removeEventListener('resize', handleResize);
        clearTimeout(resizeTimeout);
        clearTimeout(mutationTimeout);
    };
};

/**
 * Refresh animations
 * Use this when you need to manually refresh animations
 */
export const refreshAnimations = () => {
    AOS.refresh();
}; 