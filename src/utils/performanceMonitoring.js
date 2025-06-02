import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

/**
 * Performance monitoring and Core Web Vitals tracking
 */

// Thresholds for Core Web Vitals (in milliseconds)
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  TTFB: { good: 800, poor: 1800 }
};

// Performance data storage
let performanceData = {
  LCP: null,
  FID: null,
  CLS: null,
  FCP: null,
  TTFB: null,
  timestamp: Date.now(),
  url: window.location.href,
  userAgent: navigator.userAgent,
  connection: navigator.connection?.effectiveType || 'unknown'
};

/**
 * Get performance rating based on thresholds
 */
const getPerformanceRating = (metric, value) => {
  const threshold = THRESHOLDS[metric];
  if (!threshold) return 'unknown';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

/**
 * Send performance data to analytics
 */
const sendToAnalytics = (metric, value, rating) => {
  // Google Analytics 4 event
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    // eslint-disable-next-line no-undef
    window.gtag('event', 'web_vitals', {
      metric_name: metric,
      metric_value: Math.round(value),
      metric_rating: rating,
      custom_parameter_1: performanceData.connection
    });
  }

  // Console logging for development
  if (process.env.NODE_ENV === 'development') {
    console.log(`🚀 ${metric}: ${Math.round(value)}ms (${rating})`);
  }

  // Store in performance data
  performanceData[metric] = {
    value: Math.round(value),
    rating,
    timestamp: Date.now()
  };
};

/**
 * Initialize Core Web Vitals monitoring
 */
export const initPerformanceMonitoring = () => {
  // Largest Contentful Paint
  onLCP((metric) => {
    const rating = getPerformanceRating('LCP', metric.value);
    sendToAnalytics('LCP', metric.value, rating);
  });

  // First Input Delay
  onFID((metric) => {
    const rating = getPerformanceRating('FID', metric.value);
    sendToAnalytics('FID', metric.value, rating);
  });

  // Cumulative Layout Shift
  onCLS((metric) => {
    const rating = getPerformanceRating('CLS', metric.value);
    sendToAnalytics('CLS', metric.value * 1000, rating); // Convert to ms for consistency
  });

  // First Contentful Paint
  onFCP((metric) => {
    const rating = getPerformanceRating('FCP', metric.value);
    sendToAnalytics('FCP', metric.value, rating);
  });

  // Time to First Byte
  onTTFB((metric) => {
    const rating = getPerformanceRating('TTFB', metric.value);
    sendToAnalytics('TTFB', metric.value, rating);
  });
};

/**
 * Performance observer for custom metrics
 */
export const observePerformance = () => {
  // Resource loading performance
  if ('PerformanceObserver' in window) {
    // Observe resource loading
    const resourceObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.initiatorType === 'img' && entry.duration > 1000) {
          console.warn(`Slow image loading: ${entry.name} took ${Math.round(entry.duration)}ms`);
        }
      });
    });
    
    resourceObserver.observe({ entryTypes: ['resource'] });

    // Observe long tasks
    const longTaskObserver = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.duration > 50) {
          console.warn(`Long task detected: ${Math.round(entry.duration)}ms`);
        }
      });
    });
    
    try {
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // longtask not supported in all browsers
    }
  }
};

/**
 * Get current performance data
 */
export const getPerformanceData = () => {
  return { ...performanceData };
};

/**
 * Performance budget checker
 */
export const checkPerformanceBudget = () => {
  const budget = {
    LCP: 2500,
    FID: 100,
    CLS: 0.1,
    totalJSSize: 500 * 1024, // 500KB
    totalCSSSize: 100 * 1024, // 100KB
    totalImageSize: 1000 * 1024 // 1MB
  };

  const violations = [];

  // Check Core Web Vitals
  Object.keys(budget).forEach(metric => {
    if (performanceData[metric] && performanceData[metric].value > budget[metric]) {
      violations.push({
        metric,
        actual: performanceData[metric].value,
        budget: budget[metric],
        severity: performanceData[metric].rating
      });
    }
  });

  return violations;
};

/**
 * Image performance optimization checker
 */
export const checkImageOptimization = () => {
  const images = document.querySelectorAll('img');
  const issues = [];

  images.forEach((img, index) => {
    // Check for missing alt text
    if (!img.alt) {
      issues.push({
        type: 'accessibility',
        element: `Image ${index + 1}`,
        issue: 'Missing alt text',
        src: img.src
      });
    }

    // Check for missing lazy loading
    if (!img.loading && !img.dataset.lazy) {
      issues.push({
        type: 'performance',
        element: `Image ${index + 1}`,
        issue: 'Missing lazy loading',
        src: img.src
      });
    }

    // Check image dimensions vs display size
    if (img.naturalWidth && img.offsetWidth) {
      const ratio = img.naturalWidth / img.offsetWidth;
      if (ratio > 2) {
        issues.push({
          type: 'performance',
          element: `Image ${index + 1}`,
          issue: `Oversized image (${ratio.toFixed(1)}x larger than display)`,
          src: img.src
        });
      }
    }
  });

  return issues;
};

/**
 * Bundle size analyzer
 */
export const analyzeBundleSize = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const resources = performance.getEntriesByType('resource');
    const jsResources = resources.filter(r => r.name.includes('.js'));
    const cssResources = resources.filter(r => r.name.includes('.css'));
    
    const totalJSSize = jsResources.reduce((total, resource) => {
      return total + (resource.transferSize || 0);
    }, 0);
    
    const totalCSSSize = cssResources.reduce((total, resource) => {
      return total + (resource.transferSize || 0);
    }, 0);

    return {
      totalJSSize: Math.round(totalJSSize / 1024), // KB
      totalCSSSize: Math.round(totalCSSSize / 1024), // KB
      jsFiles: jsResources.length,
      cssFiles: cssResources.length,
      recommendations: {
        jsOptimization: totalJSSize > 500 * 1024 ? 'Consider code splitting' : 'Good',
        cssOptimization: totalCSSSize > 100 * 1024 ? 'Consider CSS optimization' : 'Good'
      }
    };
  }
  
  return null;
};

/**
 * Real User Monitoring (RUM) data collection
 */
export const collectRUMData = () => {
  const rumData = {
    ...performanceData,
    viewport: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    deviceMemory: navigator.deviceMemory || 'unknown',
    hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
    connectionType: navigator.connection?.type || 'unknown',
    effectiveType: navigator.connection?.effectiveType || 'unknown',
    downlink: navigator.connection?.downlink || 'unknown'
  };

  return rumData;
};