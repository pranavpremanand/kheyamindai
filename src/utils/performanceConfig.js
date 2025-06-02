/**
 * Performance Configuration
 * Central configuration for all performance optimizations
 */

// Core Web Vitals targets
export const PERFORMANCE_TARGETS = {
  LCP: 2500, // Largest Contentful Paint (ms)
  FID: 100,  // First Input Delay (ms)
  CLS: 0.1,  // Cumulative Layout Shift
  FCP: 1800, // First Contentful Paint (ms)
  TTFB: 800  // Time to First Byte (ms)
};

// Image optimization settings
export const IMAGE_CONFIG = {
  // Lazy loading threshold
  lazyLoadThreshold: 0.1,
  lazyLoadRootMargin: '50px',
  
  // Responsive breakpoints
  breakpoints: {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
    large: 1280,
    xlarge: 1920
  },
  
  // Image quality settings
  quality: {
    webp: 0.8,
    jpeg: 0.85,
    png: 0.9
  },
  
  // Critical images (above the fold)
  criticalImages: [
    '/static/media/about.webp',
    '/static/media/banner.mp4',
    '/assets/images/logo.png'
  ]
};

// Bundle optimization settings
export const BUNDLE_CONFIG = {
  // Maximum bundle sizes (KB)
  maxSizes: {
    js: 500,
    css: 100,
    vendor: 800
  },
  
  // Code splitting routes
  lazyRoutes: [
    '/about-us',
    '/services',
    '/blogs',
    '/contact-us'
  ],
  
  // Preload critical routes
  preloadRoutes: [
    '/',
    '/services'
  ]
};

// Caching configuration
export const CACHE_CONFIG = {
  // Service Worker cache strategies
  strategies: {
    images: 'CacheFirst',
    api: 'NetworkFirst',
    static: 'StaleWhileRevalidate',
    documents: 'NetworkFirst'
  },
  
  // Cache durations (seconds)
  durations: {
    images: 31536000,    // 1 year
    css: 2628000,        // 1 month
    js: 2628000,         // 1 month
    html: 3600,          // 1 hour
    api: 300             // 5 minutes
  }
};

// Resource hints configuration
export const RESOURCE_HINTS = {
  // DNS prefetch for external domains
  dnsPrefetch: [
    'https://fonts.googleapis.com',
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com'
  ],
  
  // Preconnect to critical origins
  preconnect: [
    'https://fonts.gstatic.com'
  ],
  
  // Preload critical resources
  preload: [
    { href: '/static/css/main.css', as: 'style' },
    { href: '/static/js/main.js', as: 'script' }
  ]
};

// Performance monitoring configuration
export const MONITORING_CONFIG = {
  // Sample rate for performance monitoring
  sampleRate: 0.1, // 10% of users
  
  // Metrics to track
  metrics: [
    'LCP',
    'FID', 
    'CLS',
    'FCP',
    'TTFB'
  ],
  
  // Custom events to track
  customEvents: [
    'image_load_time',
    'route_change_time',
    'api_response_time'
  ],
  
  // Performance budget alerts
  budgetAlerts: {
    enabled: true,
    thresholds: PERFORMANCE_TARGETS
  }
};

// Third-party script optimization
export const THIRD_PARTY_CONFIG = {
  // Scripts to load asynchronously
  asyncScripts: [
    'google-analytics',
    'hotjar',
    'intercom'
  ],
  
  // Scripts to defer
  deferScripts: [
    'social-widgets',
    'chat-widgets'
  ],
  
  // Critical third-party resources
  critical: [
    'google-fonts'
  ]
};

// Mobile optimization settings
export const MOBILE_CONFIG = {
  // Disable heavy animations on mobile
  disableAnimations: true,
  
  // Reduce image quality on slow connections
  adaptiveQuality: true,
  
  // Connection-aware loading
  connectionAware: {
    '2g': {
      imageQuality: 0.6,
      disableVideos: true,
      reducedAnimations: true
    },
    '3g': {
      imageQuality: 0.7,
      disableVideos: false,
      reducedAnimations: true
    },
    '4g': {
      imageQuality: 0.8,
      disableVideos: false,
      reducedAnimations: false
    }
  }
};

// Development vs Production settings
export const ENV_CONFIG = {
  development: {
    enablePerformanceLogging: true,
    enableBundleAnalyzer: true,
    enableSourceMaps: true
  },
  
  production: {
    enablePerformanceLogging: false,
    enableBundleAnalyzer: false,
    enableSourceMaps: false,
    enableCompression: true,
    enableMinification: true
  }
};

// Get configuration based on environment
export const getConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return {
    ...PERFORMANCE_TARGETS,
    image: IMAGE_CONFIG,
    bundle: BUNDLE_CONFIG,
    cache: CACHE_CONFIG,
    resourceHints: RESOURCE_HINTS,
    monitoring: MONITORING_CONFIG,
    thirdParty: THIRD_PARTY_CONFIG,
    mobile: MOBILE_CONFIG,
    env: ENV_CONFIG[env]
  };
};