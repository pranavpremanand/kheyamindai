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

  // Preload critical CSS
  const preloadCSS = (href) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    link.onload = () => {
      link.rel = 'stylesheet';
    };
    head.appendChild(link);
  };

  // Preload critical JS
  const preloadJS = (href) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = href;
    head.appendChild(link);
  };

  return { preloadCSS, preloadJS };
};

// Initialize all optimizations
export const initBundleOptimizations = () => {
  preloadCriticalRoutes();
  
  // Use connection-aware preloading
  if ('connection' in navigator && 
      !navigator.connection.saveData && 
      !['slow-2g', '2g'].includes(navigator.connection.effectiveType)) {
    
    // Initialize resource hints for critical assets
    const { preloadJS, preloadCSS } = addCriticalResourceHints();
    
    // Preload main bundle and critical CSS
    // Use actual paths to your main JS and CSS files
    preloadJS('/static/js/main.chunk.js');
    preloadCSS('/static/css/main.chunk.css');
  }
  
  monitorBundleSize();

  // Initialize third-party optimizations
  const { loadAOS } = optimizeThirdPartyLibs();

  // Load AOS after initial render
  setTimeout(loadAOS, 1000);
};