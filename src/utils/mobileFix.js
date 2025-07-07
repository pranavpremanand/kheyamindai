/**
 * Mobile Fix Utility
 * Ensures content is visible on mobile devices
 */

export const initMobileFixes = () => {
  // Check if we're on a mobile device
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Simple fix to ensure content is visible on mobile
    const ensureContentVisibility = () => {
      // Remove any AOS attributes that might hide content
      const aosElements = document.querySelectorAll('[data-aos]');
      aosElements.forEach(element => {
        // Only fix if element is actually hidden
        const computedStyle = window.getComputedStyle(element);
        if (computedStyle.opacity === '0' || computedStyle.visibility === 'hidden') {
          element.style.opacity = '1';
          element.style.visibility = 'visible';
          element.style.transform = 'none';
        }
      });
    };

    // Run fix after a short delay to ensure DOM is ready
    setTimeout(ensureContentVisibility, 100);
    
    // Run fix on page load
    window.addEventListener('load', ensureContentVisibility);

    // Return cleanup function
    return () => {
      window.removeEventListener('load', ensureContentVisibility);
    };
  }

  return () => {}; // No cleanup needed for desktop
};

// Force visibility for specific elements
export const forceElementVisibility = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    element.style.opacity = '1';
    element.style.visibility = 'visible';
    element.style.transform = 'none';
    element.style.transition = 'none';
  });
};