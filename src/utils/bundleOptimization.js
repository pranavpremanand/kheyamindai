/**
 * Bundle Optimization Utilities
 * Implements code splitting and lazy loading strategies
 */

import { lazy } from 'react';

// Lazy load heavy components with better error boundaries
export const createLazyComponent = (importFunc, fallback = null) => {
  const LazyComponent = lazy(() =>
    importFunc().catch(err => {
      console.error('Failed to load component:', err);
      // Return a minimal fallback component
      return { default: () => fallback || <div>Failed to load component</div> };
    })
  );

  return LazyComponent;
};

// Preload components based on user interaction
export const preloadComponent = (importFunc) => {
  const componentImport = importFunc();
  return componentImport;
};

// Preload critical routes
export const preloadCriticalRoutes = () => {
  const criticalRoutes = [
    () => import('../Pages/Home'),
    () => import('../Pages/AboutUs'),
    () => import('../Pages/OurServices')
  ];

  criticalRoutes.forEach(route => {
    const prefetchRoute = () => {
      route().catch(err => {
        console.error('Failed to preload route:', err);
      });
    };

    requestIdleCallback ?
      requestIdleCallback(prefetchRoute) :
      setTimeout(prefetchRoute, 1000);
  });
};

// Dynamic import with retry logic
export const dynamicImport = async (importFunc, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await importFunc();
    } catch (error) {
      if (i === retries - 1) throw error;
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};

// Optimize chunk loading
export const optimizeChunkLoading = () => {
  if ('connection' in navigator) {
    if (navigator.connection.saveData) {
      // Disable preloading if data-saver is enabled
      return;
    }

    if (['slow-2g', '2g'].includes(navigator.connection.effectiveType)) {
      // Reduce chunk size for slow connections
      return;
    }
  }

  // Enable preloading for fast connections
  // Note: This function now requires an href parameter to be useful
  // It will be called by other functions that need to preload specific scripts
};

// Remove unused dependencies
export const removeUnusedDependencies = () => {
  // Tree shake unused icons
  const usedIcons = new Set();

  // Track which icons are actually used
  const trackIconUsage = (iconName) => {
    usedIcons.add(iconName);
  };

  return { trackIconUsage, usedIcons };
};

// Optimize third-party libraries
export const optimizeThirdPartyLibs = () => {
  // Load AOS only when needed
  const loadAOS = async () => {
    if (window.innerWidth > 768) { // Only on desktop
      const AOS = await import('aos');
      await import('aos/dist/aos.css');
      AOS.init({
        once: true,
        duration: 500,
        easing: 'ease-in-out-quart',
        offset: -70,
      });
    }
  };

  // Load framer-motion components only when needed
  const loadFramerMotion = async () => {
    const { motion } = await import('framer-motion');
    return motion;
  };

  return { loadAOS, loadFramerMotion };
};

// Monitor bundle size
export const monitorBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    window.addEventListener('load', () => {
      const resources = performance.getEntriesByType('resource');
      const jsFiles = resources.filter(resource =>
        resource.name.endsWith('.js') ||
        resource.name.endsWith('.jsx')
      );

      const totalSize = jsFiles.reduce((acc, file) =>
        acc + file.encodedBodySize, 0
      );

      console.log(`Total JS bundle size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);

      // Log large chunks
      jsFiles
        .filter(file => file.encodedBodySize > 100 * 1024) // Larger than 100KB
        .forEach(file => {
          console.warn(
            `Large chunk detected: ${file.name} - ${(file.encodedBodySize / 1024).toFixed(2)}KB`
          );
        });
    });
  }
};

// Critical resource hints
export const addCriticalResourceHints = () => {
  const head = document.head;
  // Track which resources we've already preloaded to avoid duplicates
  const preloadedResources = new Set();

  // Preload critical CSS
  const preloadCSS = (href) => {
    // Skip if no href or already preloaded
    if (!href || preloadedResources.has(href)) {
      return;
    }
    
    // Check if this resource is already being loaded
    const existingLinks = document.querySelectorAll(`link[href="${href}"]`);
    if (existingLinks.length > 0) {
      // Resource is already being loaded, no need to preload
      return;
    }
    
    try {
      preloadedResources.add(href);
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      link.crossOrigin = 'anonymous'; // Add for cross-origin resources
      head.appendChild(link);
      
      // No need to change rel to stylesheet as these are already loaded
      // This was causing duplicate stylesheet loading
    } catch (error) {
      console.warn('Failed to preload CSS:', href, error);
    }
  };

  // Preload critical JS
  const preloadJS = (href) => {
    // Skip if no href or already preloaded
    if (!href || preloadedResources.has(href)) {
      return;
    }
    
    // Check if this resource is already being loaded
    const existingScripts = document.querySelectorAll(`script[src="${href}"]`);
    if (existingScripts.length > 0) {
      // Resource is already being loaded, no need to preload
      return;
    }
    
    try {
      preloadedResources.add(href);
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = href;
      link.crossOrigin = 'anonymous'; // Add for cross-origin resources
      head.appendChild(link);
    } catch (error) {
      console.warn('Failed to preload JS:', href, error);
    }
  };

  return { preloadCSS, preloadJS };
};

// Initialize all optimizations
export const initBundleOptimizations = () => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Preload critical routes for navigation
  preloadCriticalRoutes();
  
  // Skip resource preloading if document is already loaded
  // or if we're on a slow connection
  const shouldPreload = 
    document.readyState !== 'complete' && 
    !('connection' in navigator && 
      (navigator.connection.saveData || 
       ['slow-2g', '2g'].includes(navigator.connection.effectiveType)));
  
  if (shouldPreload) {
    try {
      // Initialize resource hints for critical assets
      const { preloadJS, preloadCSS } = addCriticalResourceHints();
      
      // Wait for DOM to be ready to find resources
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          preloadExistingResources(preloadCSS, preloadJS);
        });
      } else {
        preloadExistingResources(preloadCSS, preloadJS);
      }
    } catch (error) {
      console.warn('Failed to initialize resource preloading:', error);
    }
  }
  
  // Monitor bundle size in development
  monitorBundleSize();

  // Initialize third-party optimizations
  const { loadAOS } = optimizeThirdPartyLibs();

  // Load AOS after initial render
  setTimeout(loadAOS, 1000);
};

// Helper function to find and preload existing resources
function preloadExistingResources(preloadCSS, preloadJS) {
  // Don't preload if page is already loaded
  if (document.readyState === 'complete') return;
  
  // Find main CSS files (but not already preloaded ones)
  const cssLinks = document.querySelectorAll('link[rel="stylesheet"]:not([rel="preload"])');
  cssLinks.forEach(link => {
    if (link.href && 
        !link.href.includes('fonts.googleapis.com') && 
        !link.href.includes('preload')) {
      // Only preload our own CSS, not Google Fonts or already preloaded resources
      preloadCSS(link.href);
    }
  });
  
  // Find main JS files (but not already preloaded ones)
  const scriptTags = document.querySelectorAll('script[src]');
  scriptTags.forEach(script => {
    // Only preload main chunks, not third-party scripts
    const isMainChunk = script.src.includes('main') || 
                        script.src.includes('chunk') || 
                        script.src.includes('bundle');
    const isThirdParty = script.src.includes('googleapis.com') || 
                         script.src.includes('gtm') || 
                         script.src.includes('analytics');
    
    if (script.src && isMainChunk && !isThirdParty) {
      preloadJS(script.src);
    }
  });
}