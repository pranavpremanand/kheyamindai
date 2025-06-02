/**
 * Critical CSS Utilities
 * Extracts and inlines critical CSS for above-the-fold content
 */

// Critical CSS for above-the-fold content
export const CRITICAL_CSS = `
  /* Reset and base styles */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #fff;
  }

  /* Header styles */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2563eb;
  }

  /* Hero section styles */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero h1 {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .hero p {
    font-size: clamp(1rem, 2vw, 1.25rem);
    margin-bottom: 2rem;
    opacity: 0.9;
  }

  /* Button styles */
  .btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    background: #2563eb;
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
  }

  .btn:hover {
    background: #1d4ed8;
    transform: translateY(-2px);
  }

  .btn-primary {
    background: #2563eb;
  }

  .btn-secondary {
    background: transparent;
    border: 2px solid white;
  }

  /* Loading spinner */
  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f8fafc;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e2e8f0;
    border-top: 4px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Utility classes */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .text-center {
    text-align: center;
  }

  .mb-4 {
    margin-bottom: 1rem;
  }

  .mb-8 {
    margin-bottom: 2rem;
  }

  .hidden {
    display: none;
  }

  /* Responsive utilities */
  @media (max-width: 768px) {
    .nav-container {
      padding: 0 0.5rem;
    }
    
    .hero {
      padding: 1rem 0.5rem;
    }
    
    .container {
      padding: 0 0.5rem;
    }
  }
`;

// Inject critical CSS into document head
export const injectCriticalCSS = () => {
  if (typeof document === 'undefined') return;

  const existingStyle = document.getElementById('critical-css');
  if (existingStyle) return; // Already injected

  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = CRITICAL_CSS;
  
  // Insert before any existing stylesheets
  const firstLink = document.querySelector('link[rel="stylesheet"]');
  if (firstLink) {
    document.head.insertBefore(style, firstLink);
  } else {
    document.head.appendChild(style);
  }
};

// Remove critical CSS after main CSS loads
export const removeCriticalCSS = () => {
  if (typeof document === 'undefined') return;

  const criticalStyle = document.getElementById('critical-css');
  if (criticalStyle) {
    // Fade out and remove
    criticalStyle.style.opacity = '0';
    criticalStyle.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
      criticalStyle.remove();
    }, 300);
  }
};

// Load non-critical CSS asynchronously
export const loadNonCriticalCSS = (href) => {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  
  link.onload = () => {
    link.rel = 'stylesheet';
    // Remove critical CSS after main CSS loads
    setTimeout(removeCriticalCSS, 100);
  };
  
  document.head.appendChild(link);
  
  // Fallback for browsers that don't support preload
  const noscriptLink = document.createElement('noscript');
  noscriptLink.innerHTML = `<link rel="stylesheet" href="${href}">`;
  document.head.appendChild(noscriptLink);
};

// Extract critical CSS from existing stylesheets
export const extractCriticalCSS = async () => {
  if (typeof document === 'undefined') return '';

  const stylesheets = Array.from(document.styleSheets);
  let criticalRules = [];

  // Above-the-fold selectors
  const criticalSelectors = [
    'body',
    'html',
    '.header',
    '.nav',
    '.hero',
    '.loading',
    '.spinner',
    '.btn',
    '.container',
    '[class*="text-"]',
    '[class*="bg-"]',
    '[class*="p-"]',
    '[class*="m-"]',
    '[class*="flex"]',
    '[class*="grid"]'
  ];

  try {
    for (const stylesheet of stylesheets) {
      if (!stylesheet.href || stylesheet.href.includes('fonts.googleapis.com')) {
        continue;
      }

      try {
        const rules = Array.from(stylesheet.cssRules || []);
        
        for (const rule of rules) {
          if (rule.type === CSSRule.STYLE_RULE) {
            const selector = rule.selectorText;
            
            // Check if selector matches critical selectors
            const isCritical = criticalSelectors.some(criticalSelector => {
              return selector.includes(criticalSelector) || 
                     selector.match(new RegExp(criticalSelector.replace('*', '.*')));
            });

            if (isCritical) {
              criticalRules.push(rule.cssText);
            }
          }
        }
      } catch (e) {
        // Cross-origin stylesheet, skip
        console.warn('Cannot access stylesheet:', stylesheet.href);
      }
    }
  } catch (error) {
    console.error('Error extracting critical CSS:', error);
  }

  return criticalRules.join('\n');
};

// Performance monitoring for CSS loading
export const monitorCSSPerformance = () => {
  if (typeof window === 'undefined' || !window.performance) return;

  window.addEventListener('load', () => {
    const perfEntries = performance.getEntriesByType('resource');
    const cssEntries = perfEntries.filter(entry => 
      entry.name.includes('.css') || entry.name.includes('fonts')
    );

    if (process.env.NODE_ENV === 'development') {
      console.group('CSS Performance');
      cssEntries.forEach(entry => {
        console.log(`${entry.name}: ${entry.duration.toFixed(2)}ms`);
      });
      console.groupEnd();
    }

    // Track render-blocking resources
    const renderBlockingCSS = cssEntries.filter(entry => 
      entry.renderBlockingStatus === 'blocking'
    );

    if (renderBlockingCSS.length > 0) {
      console.warn('Render-blocking CSS detected:', renderBlockingCSS);
    }
  });
};

// Initialize critical CSS optimizations
export const initCriticalCSS = () => {
  // Inject critical CSS immediately
  injectCriticalCSS();
  
  // Monitor CSS performance
  monitorCSSPerformance();
  
  // Load main CSS asynchronously
  window.addEventListener('DOMContentLoaded', () => {
    const mainCSS = document.querySelector('link[href*="main"]');
    if (mainCSS) {
      loadNonCriticalCSS(mainCSS.href);
    }
  });
};

export default {
  injectCriticalCSS,
  removeCriticalCSS,
  loadNonCriticalCSS,
  extractCriticalCSS,
  monitorCSSPerformance,
  initCriticalCSS
};