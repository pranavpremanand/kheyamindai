/**
 * iOS-specific fixes for rendering issues
 * This script detects iOS devices and applies specific fixes
 */

(function() {
  // Detect iOS devices
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  if (!isIOS) return; // Only run on iOS devices
  
  console.log('iOS device detected, applying fixes');
  
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
    }
    
    // Remove any AOS attributes that might hide content
    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(element => {
      element.removeAttribute('data-aos');
      element.style.opacity = '1';
      element.style.visibility = 'visible';
      element.style.transform = 'none';
    });
  }
  
  // Fix for iOS Safari viewport height issues
  function fixIOSViewportHeight() {
    // First we get the viewport height and multiply it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  // Apply fixes at different stages to ensure they work
  
  // 1. Apply immediately
  ensureIOSVisibility();
  fixIOSViewportHeight();
  
  // 2. Apply when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      ensureIOSVisibility();
      fixIOSViewportHeight();
    });
  }
  
  // 3. Apply after window load
  window.addEventListener('load', function() {
    ensureIOSVisibility();
    fixIOSViewportHeight();
    
    // Also apply after a short delay to catch any late-loading content
    setTimeout(ensureIOSVisibility, 500);
  });
  
  // 4. Apply on orientation change (common issue trigger on iOS)
  window.addEventListener('orientationchange', function() {
    setTimeout(function() {
      ensureIOSVisibility();
      fixIOSViewportHeight();
    }, 100);
  });
  
  // 5. Apply on resize
  window.addEventListener('resize', fixIOSViewportHeight);
})();