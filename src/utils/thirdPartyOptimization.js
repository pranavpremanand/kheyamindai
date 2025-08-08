/**
 * Third-Party Script Optimization
 * Manages loading of external scripts to minimize main thread blocking
 */

// Third-party script configurations
const THIRD_PARTY_SCRIPTS = {
  googleTagManager: {
    id: 'GTM-TN86VLCT',
    priority: 'low',
    delay: 2000,
    condition: () => !window.gtag, // Only load if not already loaded
  },
  
  googleAnalytics: {
    id: 'G-XXXXXXXXXX', // Replace with actual GA4 ID
    priority: 'low',
    delay: 3000,
    condition: () => !window.gtag,
  },
  
  hotjar: {
    id: 'XXXXXXX', // Replace with actual Hotjar ID
    priority: 'low',
    delay: 5000,
    condition: () => !window.hj,
  },
  
  intercom: {
    id: 'XXXXXXX', // Replace with actual Intercom ID
    priority: 'low',
    delay: 10000,
    condition: () => !window.Intercom,
  }
};

// Script loading strategies - commented out as it's not currently used
// const LOADING_STRATEGIES = {
//   immediate: 0,
//   afterLoad: 1000,
//   onInteraction: 'interaction',
//   onIdle: 'idle',
//   onVisible: 'visible'
// };

// Queue for deferred scripts
let scriptQueue = [];
let isProcessingQueue = false;

// Load script with performance optimizations
const loadScript = (src, options = {}) => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = options.defer || false;
    
    // Add performance attributes
    if (options.importance) {
      script.setAttribute('importance', options.importance);
    }
    
    script.onload = () => {
      console.log(`Third-party script loaded: ${src}`);
      resolve();
    };
    
    script.onerror = () => {
      console.error(`Failed to load script: ${src}`);
      reject(new Error(`Script load failed: ${src}`));
    };

    // Add to document
    document.head.appendChild(script);
  });
};

// Load Google Tag Manager with optimization
export const loadGoogleTagManager = (gtmId, delay = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      
      // GTM script
      const gtmScript = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      
      const script = document.createElement('script');
      script.textContent = gtmScript;
      document.head.appendChild(script);
      
      resolve();
    }, delay);
  });
};

// Load Google Analytics with optimization
export const loadGoogleAnalytics = (gaId, delay = 3000) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      try {
        await loadScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, {
          importance: 'low'
        });
        
        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', gaId, {
          page_title: document.title,
          page_location: window.location.href
        });
        
        window.gtag = gtag;
        resolve();
      } catch (error) {
        console.error('Failed to load Google Analytics:', error);
        resolve(); // Don't block if GA fails
      }
    }, delay);
  });
};

// Load Hotjar with optimization
export const loadHotjar = (hjId, delay = 5000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const hjScript = `
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:${hjId},hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
      `;
      
      const script = document.createElement('script');
      script.textContent = hjScript;
      document.head.appendChild(script);
      
      resolve();
    }, delay);
  });
};

// Load scripts on user interaction
export const loadOnInteraction = (scriptLoader, events = ['click', 'scroll', 'keydown']) => {
  let loaded = false;
  
  const loadOnce = () => {
    if (loaded) return;
    loaded = true;
    
    // Remove event listeners
    events.forEach(event => {
      document.removeEventListener(event, loadOnce, { passive: true });
    });
    
    scriptLoader();
  };
  
  // Add event listeners
  events.forEach(event => {
    document.addEventListener(event, loadOnce, { passive: true });
  });
  
  // Fallback: load after 10 seconds anyway
  setTimeout(loadOnce, 10000);
};

// Load scripts when element becomes visible
export const loadOnVisible = (scriptLoader, selector) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scriptLoader();
        observer.disconnect();
      }
    });
  });
  
  const element = document.querySelector(selector);
  if (element) {
    observer.observe(element);
  } else {
    // Fallback: load after 5 seconds if element not found
    setTimeout(scriptLoader, 5000);
  }
};

// Load scripts when browser is idle
export const loadOnIdle = (scriptLoader) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      scriptLoader();
    }, { timeout: 5000 });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(scriptLoader, 3000);
  }
};

// Process script queue
const processScriptQueue = async () => {
  if (isProcessingQueue || scriptQueue.length === 0) return;
  
  isProcessingQueue = true;
  
  while (scriptQueue.length > 0) {
    const { loader, priority } = scriptQueue.shift();
    
    try {
      await loader();
      
      // Add delay between scripts to prevent blocking
      if (scriptQueue.length > 0) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Script loading error:', error);
    }
  }
  
  isProcessingQueue = false;
};

// Add script to queue
export const queueScript = (loader, priority = 'low') => {
  scriptQueue.push({ loader, priority });
  
  // Sort queue by priority
  scriptQueue.sort((a, b) => {
    const priorities = { high: 3, medium: 2, low: 1 };
    return priorities[b.priority] - priorities[a.priority];
  });
  
  // Process queue if not already processing
  if (!isProcessingQueue) {
    setTimeout(processScriptQueue, 100);
  }
};

// Monitor third-party script performance
export const monitorThirdPartyPerformance = () => {
  if (typeof window === 'undefined' || !window.performance) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfEntries = performance.getEntriesByType('resource');
      const thirdPartyEntries = perfEntries.filter(entry => 
        entry.name.includes('googletagmanager.com') ||
        entry.name.includes('google-analytics.com') ||
        entry.name.includes('hotjar.com') ||
        entry.name.includes('intercom.io')
      );

      // if (process.env.NODE_ENV === 'development') {
      //   console.group('Third-Party Script Performance');
      //   thirdPartyEntries.forEach(entry => {
      //     const duration = entry.duration.toFixed(2);
      //     const size = entry.transferSize ? `${(entry.transferSize / 1024).toFixed(2)} KB` : 'Unknown';
      //     console.log(`${entry.name}: ${duration}ms, ${size}`);
      //   });
      //   console.groupEnd();
      // }

      // Calculate total third-party blocking time
      const totalBlockingTime = thirdPartyEntries.reduce((total, entry) => {
        return total + (entry.duration || 0);
      }, 0);

      if (totalBlockingTime > 1000) {
        //console.warn(`Third-party scripts blocking main thread for ${totalBlockingTime.toFixed(2)}ms`);
      }
    }, 2000);
  });
};

// Initialize optimized third-party loading
export const initThirdPartyOptimizations = () => {
  // Monitor performance
  monitorThirdPartyPerformance();
  
  // Load GTM with delay
  const gtmId = THIRD_PARTY_SCRIPTS.googleTagManager.id;
  if (gtmId && gtmId !== 'GTM-TN86VLCT') { // Only if ID is configured
    queueScript(() => loadGoogleTagManager(gtmId, 2000), 'medium');
  }
  
  // Load other scripts on interaction
  loadOnInteraction(() => {
    // Load analytics
    const gaId = THIRD_PARTY_SCRIPTS.googleAnalytics.id;
    if (gaId && gaId !== 'G-XXXXXXXXXX') {
      queueScript(() => loadGoogleAnalytics(gaId), 'low');
    }
    
    // Load Hotjar
    const hjId = THIRD_PARTY_SCRIPTS.hotjar.id;
    if (hjId && hjId !== 'XXXXXXX') {
      queueScript(() => loadHotjar(hjId), 'low');
    }
  });
  
  // Load non-essential scripts when idle
  loadOnIdle(() => {
    console.log('Loading non-essential third-party scripts...');
  });
};

// Cleanup function for removing third-party scripts
export const cleanupThirdPartyScripts = () => {
  // Remove GTM scripts
  const gtmScripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
  gtmScripts.forEach(script => script.remove());
  
  // Remove GA scripts
  const gaScripts = document.querySelectorAll('script[src*="google-analytics.com"]');
  gaScripts.forEach(script => script.remove());
  
  // Clear dataLayer
  if (window.dataLayer) {
    window.dataLayer.length = 0;
  }
};

const thirdPartyUtils = {
  loadGoogleTagManager,
  loadGoogleAnalytics,
  loadHotjar,
  loadOnInteraction,
  loadOnVisible,
  loadOnIdle,
  queueScript,
  monitorThirdPartyPerformance,
  initThirdPartyOptimizations,
  cleanupThirdPartyScripts
};

export default thirdPartyUtils;