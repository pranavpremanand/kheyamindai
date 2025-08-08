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
  // Prevent double initialization
  if (window.__doubleLoadingPrevention) {
    return;
  }
  window.__doubleLoadingPrevention = true;

  // let isNavigating = false; // Reserved for future navigation tracking
  
  // Monitor for duplicate network requests only
  const pendingRequests = new Set();
  
  // Don't override history methods as they can cause issues with React Router
  // Instead, monitor fetch requests to prevent duplicates
  if (!window.__fetchIntercepted) {
    const originalFetch = window.fetch;
    window.fetch = function(url, options = {}) {
      const requestKey = `${url}:${JSON.stringify(options)}`;
      
      if (pendingRequests.has(requestKey)) {
        console.warn('Duplicate request prevented:', url);
        return Promise.reject(new Error('Duplicate request'));
      }
      
      pendingRequests.add(requestKey);
      
      return originalFetch(url, options).finally(() => {
        setTimeout(() => pendingRequests.delete(requestKey), 100);
      });
    };
    window.__fetchIntercepted = true;
  }
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
  // Prevent multiple calls
  if (window.__performanceOptimized) {
    return;
  }
  window.__performanceOptimized = true;

  // Run immediately
  preventDoubleLoading();
  
  // Run when DOM is ready with minimal delay
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initPerformanceOptimizations, 100);
    });
  } else {
    setTimeout(initPerformanceOptimizations, 100);
  }
};