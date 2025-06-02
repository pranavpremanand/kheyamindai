/**
 * Webpack Optimization Configuration
 * Runtime optimizations for bundle splitting and loading
 */

// Dynamic import with chunk naming
export const importWithChunkName = (importFunc, chunkName) => {
  return importFunc().then(module => {
    // Add chunk name for better debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`Loaded chunk: ${chunkName}`);
    }
    return module;
  });
};

// Preload critical chunks
export const preloadCriticalChunks = () => {
  const criticalChunks = [
    () => import('../Pages/Home'),
    () => import('../Components/Website/Header'),
    () => import('../Components/Website/Footer')
  ];

  // Preload after initial load
  window.addEventListener('load', () => {
    setTimeout(() => {
      criticalChunks.forEach(chunk => {
        chunk().catch(err => {
          console.warn('Failed to preload chunk:', err);
        });
      });
    }, 2000);
  });
};

// Optimize chunk loading based on route
export const optimizeRouteChunks = () => {
  const routeChunkMap = {
    '/': () => import('../Pages/Home'),
    '/about-us': () => import('../Pages/AboutUs'),
    '/services': () => import('../Pages/OurServices'),
    '/contact-us': () => import('../Pages/ContactUs'),
    '/blogs': () => import('../Pages/Blogs')
  };

  // Preload chunks based on current route and likely next routes
  const currentPath = window.location.pathname;
  const likelyNextRoutes = getLikelyNextRoutes(currentPath);

  likelyNextRoutes.forEach(route => {
    const chunkLoader = routeChunkMap[route];
    if (chunkLoader) {
      setTimeout(() => {
        chunkLoader().catch(err => {
          console.warn(`Failed to preload route chunk ${route}:`, err);
        });
      }, 3000);
    }
  });
};

// Get likely next routes based on current route
const getLikelyNextRoutes = (currentPath) => {
  const routeMap = {
    '/': ['/services', '/about-us'],
    '/services': ['/contact-us', '/'],
    '/about-us': ['/services', '/contact-us'],
    '/contact-us': ['/services', '/'],
    '/blogs': ['/services', '/']
  };

  return routeMap[currentPath] || ['/'];
};

// Monitor chunk loading performance
export const monitorChunkPerformance = () => {
  if (typeof window === 'undefined' || !window.performance) return;

  const chunkLoadTimes = new Map();

  // Override dynamic import to track loading times
  const originalImport = window.__webpack_require__;
  if (originalImport) {
    window.__webpack_require__ = function(...args) {
      const startTime = performance.now();
      const result = originalImport.apply(this, args);
      
      if (result && result.then) {
        result.then(() => {
          const loadTime = performance.now() - startTime;
          chunkLoadTimes.set(args[0], loadTime);
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`Chunk ${args[0]} loaded in ${loadTime.toFixed(2)}ms`);
          }
        });
      }
      
      return result;
    };
  }

  // Report chunk performance
  window.addEventListener('beforeunload', () => {
    if (process.env.NODE_ENV === 'development' && chunkLoadTimes.size > 0) {
      console.group('Chunk Loading Performance');
      chunkLoadTimes.forEach((time, chunk) => {
        console.log(`${chunk}: ${time.toFixed(2)}ms`);
      });
      console.groupEnd();
    }
  });
};

// Optimize vendor chunks
export const optimizeVendorChunks = () => {
  // Track vendor library usage
  const vendorUsage = {
    react: !!window.React,
    reactDom: !!window.ReactDOM,
    framerMotion: !!window.FramerMotion,
    reactIcons: false, // Will be set when icons are loaded
    aos: false // Will be set when AOS is loaded
  };

  // Update usage tracking
  window.addEventListener('load', () => {
    setTimeout(() => {
      vendorUsage.reactIcons = !!document.querySelector('[data-icon]');
      vendorUsage.aos = !!window.AOS;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Vendor library usage:', vendorUsage);
      }
    }, 5000);
  });
};

// Tree shaking optimization
export const optimizeTreeShaking = () => {
  // Track unused exports in development
  if (process.env.NODE_ENV === 'development') {
    const usedExports = new Set();
    const allExports = new Set();

    // Override module exports to track usage
    const originalDefineProperty = Object.defineProperty;
    Object.defineProperty = function(obj, prop, descriptor) {
      if (descriptor && descriptor.get) {
        allExports.add(prop);
        
        const originalGet = descriptor.get;
        descriptor.get = function() {
          usedExports.add(prop);
          return originalGet.call(this);
        };
      }
      
      return originalDefineProperty.call(this, obj, prop, descriptor);
    };

    // Report unused exports
    window.addEventListener('beforeunload', () => {
      const unusedExports = Array.from(allExports).filter(exp => !usedExports.has(exp));
      if (unusedExports.length > 0) {
        console.warn('Potentially unused exports:', unusedExports);
      }
    });
  }
};

// Bundle size analysis
export const analyzeBundleSize = () => {
  if (typeof window === 'undefined' || !window.performance) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      const resources = performance.getEntriesByType('resource');
      const jsResources = resources.filter(r => r.name.includes('.js'));
      
      let totalSize = 0;
      const bundleInfo = [];

      jsResources.forEach(resource => {
        const size = resource.transferSize || 0;
        totalSize += size;
        
        bundleInfo.push({
          name: resource.name.split('/').pop(),
          size: (size / 1024).toFixed(2) + ' KB',
          loadTime: resource.duration.toFixed(2) + 'ms'
        });
      });

      if (process.env.NODE_ENV === 'development') {
        console.group('Bundle Analysis');
        console.log(`Total JS size: ${(totalSize / 1024).toFixed(2)} KB`);
        console.table(bundleInfo);
        console.groupEnd();
      }

      // Warn if bundle is too large
      if (totalSize > 500 * 1024) { // 500KB threshold
        console.warn(`Large bundle detected: ${(totalSize / 1024).toFixed(2)} KB`);
      }
    }, 3000);
  });
};

// Code splitting recommendations
export const getCodeSplittingRecommendations = () => {
  const recommendations = [];

  // Check for large components that should be split
  const largeComponents = [
    'framer-motion',
    'react-icons',
    'aos',
    'keen-slider'
  ];

  largeComponents.forEach(component => {
    if (window[component] || document.querySelector(`[data-${component}]`)) {
      recommendations.push(`Consider lazy loading ${component}`);
    }
  });

  // Check for unused routes
  const allRoutes = ['/about-us', '/services', '/contact-us', '/blogs'];
  const visitedRoutes = JSON.parse(localStorage.getItem('visitedRoutes') || '[]');
  const unvisitedRoutes = allRoutes.filter(route => !visitedRoutes.includes(route));

  if (unvisitedRoutes.length > 0) {
    recommendations.push(`Routes ${unvisitedRoutes.join(', ')} are not visited - ensure they're lazy loaded`);
  }

  return recommendations;
};

// Initialize webpack optimizations
export const initWebpackOptimizations = () => {
  preloadCriticalChunks();
  optimizeRouteChunks();
  monitorChunkPerformance();
  optimizeVendorChunks();
  optimizeTreeShaking();
  analyzeBundleSize();

  // Track route visits for optimization recommendations
  const currentRoute = window.location.pathname;
  const visitedRoutes = JSON.parse(localStorage.getItem('visitedRoutes') || '[]');
  if (!visitedRoutes.includes(currentRoute)) {
    visitedRoutes.push(currentRoute);
    localStorage.setItem('visitedRoutes', JSON.stringify(visitedRoutes));
  }

  // Log recommendations in development
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      const recommendations = getCodeSplittingRecommendations();
      if (recommendations.length > 0) {
        console.group('Code Splitting Recommendations');
        recommendations.forEach(rec => console.log(rec));
        console.groupEnd();
      }
    }, 10000);
  }
};

export default {
  importWithChunkName,
  preloadCriticalChunks,
  optimizeRouteChunks,
  monitorChunkPerformance,
  optimizeVendorChunks,
  optimizeTreeShaking,
  analyzeBundleSize,
  getCodeSplittingRecommendations,
  initWebpackOptimizations
};