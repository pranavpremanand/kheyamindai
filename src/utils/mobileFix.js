/**
 * Mobile Fix Utility
 * Ensures content is visible on mobile devices
 */

export const initMobileFixes = () => {
  // Check if we're on a mobile device
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Force all AOS elements to be visible
    const forceAOSVisibility = () => {
      const aosElements = document.querySelectorAll('[data-aos]');
      aosElements.forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
        element.style.transition = 'none';
        element.style.visibility = 'visible';
      });
    };

    // Force all content to be visible
    const forceContentVisibility = () => {
      const contentElements = document.querySelectorAll('div, section, p, h1, h2, h3, h4, h5, h6');
      contentElements.forEach(element => {
        if (element.style.opacity === '0' || element.style.visibility === 'hidden') {
          element.style.opacity = '1';
          element.style.visibility = 'visible';
          element.style.transform = 'none';
        }
      });
    };

    // Run fixes immediately
    forceAOSVisibility();
    forceContentVisibility();

    // Run fixes after DOM changes
    const observer = new MutationObserver(() => {
      forceAOSVisibility();
      forceContentVisibility();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Run fixes on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        forceAOSVisibility();
        forceContentVisibility();
      }, 100);
    });

    // Run fixes on resize
    window.addEventListener('resize', () => {
      forceAOSVisibility();
      forceContentVisibility();
    });

    // Return cleanup function
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', forceAOSVisibility);
      window.removeEventListener('resize', forceAOSVisibility);
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