// Service Worker Registration Script
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
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
  });

  // Listen for controller change events
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Service Worker controller changed - page will reload');
    window.location.reload();
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

// Expose functions to window for debugging
window.swFunctions = {
  update: updateServiceWorker,
  sendMessage: sendMessageToSW
};