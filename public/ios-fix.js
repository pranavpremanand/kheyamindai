/**
 * iOS-specific fixes for rendering issues
 * This script detects iOS devices and applies specific fixes
 */

(function() {
  // Detect iOS devices
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  if (!isIOS) return; // Only run on iOS devices
  
  console.log('iOS device detected, applying fixes');
  
  // Load iOS-specific CSS
  const iosCSSLink = document.createElement('link');
  iosCSSLink.rel = 'stylesheet';
  iosCSSLink.href = '/ios-styles.css';
  iosCSSLink.id = 'ios-specific-styles';
  document.head.appendChild(iosCSSLink);
  
  // Add iOS class to html element for CSS targeting
  document.documentElement.classList.add('ios-device');
  
  // Function to ensure content visibility on iOS
  function ensureIOSVisibility() {
    // Force root element to be visible
    const root = document.getElementById('root');
    if (root) {
      root.style.display = 'block';
      root.style.opacity = '1';
      root.style.visibility = 'visible';
      
      // iOS Safari sometimes needs explicit height
      if (root.style.height === '' || root.style.height === '0px') {
        root.style.minHeight = '100vh';
      }
    }
    
    // Remove any AOS attributes that might hide content
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(element => {
      element.removeAttribute('data-aos');
      element.style.opacity = '1';
      element.style.visibility = 'visible';
      element.style.transform = 'none';
    });
    
    // Fix any elements with zero opacity or hidden visibility
    const allElements = document.querySelectorAll('body *');
    allElements.forEach(element => {
      const style = window.getComputedStyle(element);
      if (style.opacity === '0' || style.visibility === 'hidden') {
        // Skip elements that are intentionally hidden
        if (element.classList.contains('intentionally-hidden')) {
          return;
        }
        element.style.opacity = '1';
        element.style.visibility = 'visible';
      }
    });
  }
  
  // Apply fixes at different stages to ensure they work
  
  // 1. Apply immediately
  ensureIOSVisibility();
  
  // 2. Apply when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureIOSVisibility);
  }
  
  // 3. Apply after window load
  window.addEventListener('load', function() {
    ensureIOSVisibility();
    
    // Also apply after a short delay to catch any late-loading content
    setTimeout(ensureIOSVisibility, 500);
    setTimeout(ensureIOSVisibility, 2000);
  });
  
  // 4. Apply on orientation change (common issue trigger on iOS)
  window.addEventListener('orientationchange', function() {
    setTimeout(ensureIOSVisibility, 100);
  });
  
  // 5. Monitor for changes to the DOM and reapply fixes
  if ('MutationObserver' in window) {
    const observer = new MutationObserver(function(mutations) {
      ensureIOSVisibility();
    });
    
    // Start observing once the DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        observer.observe(document.body, { childList: true, subtree: true });
      });
    } else {
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }
  
  // 6. Disable service worker on iOS to prevent caching issues
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      for (let registration of registrations) {
        registration.unregister();
        console.log('Service Worker unregistered on iOS device');
      }
    });
  }
  
  // 7. Fix for iOS Safari scroll restoration issues
  window.history.scrollRestoration = 'manual';
  
  // 8. Fix for iOS Safari viewport height issues
  function fixIOSViewportHeight() {
    // First we get the viewport height and multiply it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  // Run the function on initial load
  fixIOSViewportHeight();
  
  // Rerun on resize and orientation change
  window.addEventListener('resize', fixIOSViewportHeight);
  window.addEventListener('orientationchange', fixIOSViewportHeight);
  
  // 9. Emergency fix for blank screens - force redraw after a delay
  setTimeout(function() {
    // Force redraw by toggling a class on the body
    document.body.classList.add('ios-force-redraw');
    setTimeout(function() {
      document.body.classList.remove('ios-force-redraw');
      
      // Force visibility of root element again
      const root = document.getElementById('root');
      if (root) {
        // Force display with !important via style attribute
        root.setAttribute('style', 'display: block !important; opacity: 1 !important; visibility: visible !important; min-height: 100vh !important; z-index: 1 !important;');
        
        // If root is still empty or has only the loading spinner, try to force React to render
        if (root.children.length <= 1) {
          // Create a dummy element to force a DOM update
          const dummyElement = document.createElement('div');
          dummyElement.style.display = 'none';
          dummyElement.className = 'ios-render-trigger';
          root.appendChild(dummyElement);
          
          // Remove it after a short delay
          setTimeout(function() {
            if (dummyElement.parentNode === root) {
              root.removeChild(dummyElement);
            }
          }, 100);
        }
      }
      
      // Force all React root-level components to be visible
      const reactRoots = document.querySelectorAll('[data-reactroot], #root > div');
      reactRoots.forEach(element => {
        element.setAttribute('style', 'display: block !important; opacity: 1 !important; visibility: visible !important;');
      });
    }, 50);
  }, 1000);
})();