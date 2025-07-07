// Service Worker Registration Script with iOS detection
(function() {
  // Detect iOS devices
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  // Skip service worker registration on iOS to prevent issues
  if (isIOS) {
    console.log('iOS device detected - skipping service worker registration');
    return;
  }
  
  if ('serviceWorker' in navigator) {
    // Wait for page to be fully loaded before registering service worker
    window.addEventListener('load', () => {
      // Add a small delay to ensure page is rendered first
      setTimeout(() => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
            
            // Check for updates every 60 minutes
            setInterval(() => {
              registration.update();
              console.log('Service Worker update check initiated');
            }, 60 * 60 * 1000);
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error);
          });
      }, 1000); // 1 second delay
    });

    // Listen for controller change events
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service Worker controller changed - page will reload');
      // Add a small delay before reloading to ensure UI is not interrupted
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    });

    // Handle service worker messages
    navigator.serviceWorker.addEventListener('message', event => {
      console.log('Message from Service Worker:', event.data);
    });
  }

  // Function to send message to service worker
  function sendMessageToSW(message) {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message);
    }
  }

  // Function to force update the service worker
  function updateServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.update();
          console.log('Service Worker update triggered manually');
        }
      });
    }
  }

  // Function to unregister service workers
  function unregisterServiceWorkers() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(registrations => {
        for (let registration of registrations) {
          registration.unregister();
          console.log('Service Worker unregistered');
        }
        // Reload the page after unregistering
        window.location.reload();
      });
    }
  }

  // Expose functions to window for debugging
  window.swFunctions = {
    update: updateServiceWorker,
    sendMessage: sendMessageToSW,
    unregister: unregisterServiceWorkers
  };
})();