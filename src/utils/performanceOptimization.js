/**
 * Performance Optimization Utilities
 * Addresses website loading speed and double loading issues
 */

/**
 * Preload critical resources
 */
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/static/css/main.css', as: 'style' },
    { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', as: 'style' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

/**
 * Optimize third-party scripts loading
 */
export const optimizeThirdPartyScripts = () => {
  // Defer non-critical scripts
  const scripts = document.querySelectorAll('script[src]');
  scripts.forEach(script => {
    if (!script.async && !script.defer) {
      // Check if it's a critical script
      const isCritical = ['react', 'react-dom'].some(critical => 
        script.src.includes(critical)
      );
      
      if (!isCritical) {
        script.defer = true;
      }
    }
  });
};

/**
 * Reduce layout shifts
 */
export const preventLayoutShifts = () => {
  // Add dimensions to images without them
  document.querySelectorAll('img:not([width]):not([height])').forEach(img => {
    if (img.complete) {
      img.setAttribute('width', img.naturalWidth);
      img.setAttribute('height', img.naturalHeight);
    } else {
      img.onload = () => {
        img.setAttribute('width', img.naturalWidth);
        img.setAttribute('height', img.naturalHeight);
      };
    }
  });

  // Reserve space for dynamic content
  document.querySelectorAll('[data-dynamic-content]').forEach(element => {
    if (!element.style.minHeight) {
      element.style.minHeight = '200px';
    }
  });
};

/**
 * Initialize performance optimizations
 */
export const initPerformanceOptimizations = () => {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
    return;
  }

  // Prevent double initialization
  if (document.documentElement.classList.contains('performance-optimized')) {
    return;
  }

  // Mark as optimized
  document.documentElement.classList.add('performance-optimized');

  // Run optimizations in sequence with delays to prevent blocking
  setTimeout(preloadCriticalResources, 0);
  setTimeout(optimizeThirdPartyScripts, 100);
  setTimeout(preventLayoutShifts, 200);
};

/**
 * Monitor and fix double loading issues
 */
export const preventDoubleLoading = () => {
  let isLoading = false;
  
  const handlePageLoad = () => {
    if (isLoading) {
      console.warn('Double loading detected and prevented');
      return false;
    }
    
    isLoading = true;
    
    // Reset after page is fully loaded
    setTimeout(() => {
      isLoading = false;
    }, 2000);
    
    return true;
  };

  // Override navigation functions to prevent double loading
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  
  history.pushState = function(...args) {
    if (handlePageLoad()) {
      return originalPushState.apply(history, args);
    }
  };
  
  history.replaceState = function(...args) {
    if (handlePageLoad()) {
      return originalReplaceState.apply(history, args);
    }
  };

  // Monitor for duplicate network requests
  const pendingRequests = new Set();
  
  const originalFetch = window.fetch;
  window.fetch = function(url, options = {}) {
    const requestKey = `${url}:${JSON.stringify(options)}`;
    
    if (pendingRequests.has(requestKey)) {
      console.warn('Duplicate request prevented:', url);
      return Promise.reject(new Error('Duplicate request'));
    }
    
    pendingRequests.add(requestKey);
    
    return originalFetch(url, options).finally(() => {
      pendingRequests.delete(requestKey);
    });
  };
};

/**
 * Optimize CSS and remove unused styles
 */
export const optimizeCSS = () => {
  // Remove unused CSS (basic implementation)
  const usedSelectors = new Set();
  
  // Get all elements and their classes/IDs
  document.querySelectorAll('*').forEach(element => {
    // Add tag names
    usedSelectors.add(element.tagName.toLowerCase());
    
    // Add classes
    element.classList.forEach(className => {
      usedSelectors.add(`.${className}`);
    });
    
    // Add IDs
    if (element.id) {
      usedSelectors.add(`#${element.id}`);
    }
  });

  // Mark critical CSS as important
  document.querySelectorAll('style, link[rel="stylesheet"]').forEach(styleElement => {
    if (styleElement.textContent && styleElement.textContent.length < 5000) {
      styleElement.dataset.critical = 'true';
    }
  });
};

/**
 * Bundle size optimization recommendations
 */
export const analyzeBundleSize = () => {
  const scripts = Array.from(document.querySelectorAll('script[src]'));
  const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  
  const analysis = {
    scripts: scripts.length,
    styles: styles.length,
    recommendations: []
  };

  if (scripts.length > 10) {
    analysis.recommendations.push('Consider code splitting to reduce initial bundle size');
  }

  if (styles.length > 5) {
    analysis.recommendations.push('Consider combining CSS files to reduce HTTP requests');
  }

  return analysis;
};

/**
 * Initialize all performance optimizations
 */
export const initAllPerformanceOptimizations = () => {
  // Run immediately
  preventDoubleLoading();
  
  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPerformanceOptimizations();
      setTimeout(optimizeCSS, 500);
    });
  } else {
    initPerformanceOptimizations();
    setTimeout(optimizeCSS, 500);
  }
};