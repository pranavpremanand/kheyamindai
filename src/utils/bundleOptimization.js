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

// Preload critical route components
export const preloadCriticalRoutes = () => {
  // Preload home page components after initial load
  setTimeout(() => {
    import('../Pages/Home');
    import('../Pages/OurServices');
  }, 2000);
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

// Chunk loading optimization
export const optimizeChunkLoading = () => {
  // Prefetch chunks on hover/focus
  const prefetchOnInteraction = (selector, importFunc) => {
    document.addEventListener('mouseover', (e) => {
      if (e.target.matches(selector)) {
        importFunc();
      }
    }, { once: true });
    
    document.addEventListener('focus', (e) => {
      if (e.target.matches(selector)) {
        importFunc();
      }
    }, { once: true });
  };

  // Prefetch service pages when hovering over service links
  prefetchOnInteraction('a[href*="/services"]', () => import('../Pages/OurServices'));
  prefetchOnInteraction('a[href*="/about"]', () => import('../Pages/AboutUs'));
  prefetchOnInteraction('a[href*="/contact"]', () => import('../Pages/ContactUs'));
  prefetchOnInteraction('a[href*="/blogs"]', () => import('../Pages/Blogs'));
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

// Bundle size monitoring
export const monitorBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    // Log bundle sizes in development
    const logBundleInfo = () => {
      if (window.performance && window.performance.getEntriesByType) {
        const resources = window.performance.getEntriesByType('resource');
        const jsResources = resources.filter(r => r.name.includes('.js'));
        
        console.group('Bundle Size Analysis');
        jsResources.forEach(resource => {
          const sizeKB = (resource.transferSize / 1024).toFixed(2);
          console.log(`${resource.name.split('/').pop()}: ${sizeKB} KB`);
        });
        console.groupEnd();
      }
    };

    window.addEventListener('load', logBundleInfo);
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
  optimizeChunkLoading();
  monitorBundleSize();
  
  // Initialize third-party optimizations
  const { loadAOS } = optimizeThirdPartyLibs();
  
  // Load AOS after initial render
  setTimeout(loadAOS, 1000);
};