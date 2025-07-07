/**
 * Mobile Fix Utility
 * Ensures content is visible on mobile devices with special handling for iOS
 */

export const initMobileFixes = () => {
  // Check if we're on a mobile device
  const isMobile = window.innerWidth <= 768;
  // Detect iOS devices
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  if (isMobile) {
    // Simple fix to ensure content is visible on mobile
    const ensureContentVisibility = () => {
      // Force root element to be visible
      const root = document.getElementById('root');
      if (root) {
        root.style.display = 'block';
        root.style.opacity = '1';
        root.style.visibility = 'visible';
        
        // iOS Safari sometimes needs explicit height
        if (isIOS && (root.style.height === '' || root.style.height === '0px')) {
          root.style.minHeight = '100vh';
        }
      }
      
      // Remove any AOS attributes that might hide content
      const aosElements = document.querySelectorAll('[data-aos]');
      aosElements.forEach(element => {
        // For iOS, completely remove AOS attributes
        if (isIOS) {
          element.removeAttribute('data-aos');
        }
        
        // Only fix if element is actually hidden or we're on iOS
        const computedStyle = window.getComputedStyle(element);
        if (isIOS || computedStyle.opacity === '0' || computedStyle.visibility === 'hidden') {
          element.style.opacity = '1';
          element.style.visibility = 'visible';
          element.style.transform = 'none';
        }
      });
      
      // For iOS, fix any elements with zero opacity or hidden visibility
      if (isIOS) {
        const allElements = document.querySelectorAll('body *');
        allElements.forEach(element => {
          const style = window.getComputedStyle(element);
          if (style.opacity === '0' || style.visibility === 'hidden') {
            // Skip elements that are intentionally hidden
            if (element.classList.contains('intentionally-hidden')) {
              return;
            }
            element.style.opacity = '1';
            element.style.visibility = 'visible';
          }
        });
      }
    };

    // Run fix after a short delay to ensure DOM is ready
    setTimeout(ensureContentVisibility, 100);
    
    // Run fix on page load
    window.addEventListener('load', ensureContentVisibility);
    
    // For iOS, apply fixes after a longer delay to catch late-loading content
    if (isIOS) {
      setTimeout(ensureContentVisibility, 500);
      setTimeout(ensureContentVisibility, 2000);
      
      // Apply on orientation change (common issue trigger on iOS)
      window.addEventListener('orientationchange', function() {
        setTimeout(ensureContentVisibility, 100);
      });
    }

    // Return cleanup function
    return () => {
      window.removeEventListener('load', ensureContentVisibility);
      if (isIOS) {
        window.removeEventListener('orientationchange', ensureContentVisibility);
      }
    };
  }

  return () => {}; // No cleanup needed for desktop
};

// Force visibility for specific elements
export const forceElementVisibility = (selector) => {
  const elements = document.querySelectorAll(selector);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  elements.forEach(element => {
    // Force display to be block or flex depending on original display
    const computedStyle = window.getComputedStyle(element);
    const originalDisplay = computedStyle.display;
    
    if (originalDisplay === 'none' || (isIOS && originalDisplay === '')) {
      // If it was none or empty on iOS, make it block
      element.style.display = 'block';
    }
    
    // Force visibility
    element.style.opacity = '1';
    element.style.visibility = 'visible';
    element.style.transform = 'none';
    element.style.transition = 'none';
    
    // For iOS, also ensure position and z-index are set correctly
    if (isIOS) {
      // Only set position if it's static
      if (computedStyle.position === 'static') {
        element.style.position = 'relative';
      }
      
      // Ensure z-index is positive
      if (computedStyle.zIndex === 'auto' || parseInt(computedStyle.zIndex) < 1) {
        element.style.zIndex = '1';
      }
    }
  });
};