import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

const ChatbotWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isChatbotLoaded, setIsChatbotLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Always keep the chatbot button visible
      setIsVisible(true);
    };

    // Check if AnythingLLM widget is loaded
    const checkChatbotLoaded = () => {
      // Look for the AnythingLLM widget in the DOM
      const widget = document.querySelector('[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"]');
      if (widget) {
        setIsChatbotLoaded(true);
      } else {
        // Retry after a short delay
        setTimeout(checkChatbotLoaded, 1000);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Check for chatbot widget
    checkChatbotLoaded();

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleChatbot = () => {
    try {
      // Method 1: Use official AnythingLLM API
      if (window.AnythingLLMEmbed && typeof window.AnythingLLMEmbed.open === 'function') {
        window.AnythingLLMEmbed.open();
        console.log('Opened chatbot using AnythingLLMEmbed.open()');
        return;
      }

      // Method 2: Look for iframe and make it visible
      const iframe = document.querySelector('iframe[src*="llm.kheyamind.ai"]');
      if (iframe) {
        iframe.style.display = 'block';
        iframe.style.position = 'fixed';
        iframe.style.bottom = '20px';
        iframe.style.right = '20px';
        iframe.style.width = '400px';
        iframe.style.height = '600px';
        iframe.style.zIndex = '9999';
        iframe.style.border = '2px solid #007bff';
        iframe.style.borderRadius = '10px';
        console.log('Made AnythingLLM iframe visible');
        return;
      }

      // Method 3: Try alternative global objects
      if (window.AnythingLLM && typeof window.AnythingLLM.open === 'function') {
        window.AnythingLLM.open();
        console.log('Opened chatbot using AnythingLLM.open()');
        return;
      }

      // Method 4: Create a direct iframe if none exists
      console.log('Creating direct iframe for chatbot...');
      const chatIframe = document.createElement('iframe');
      chatIframe.src = 'https://llm.kheyamind.ai/api/embed/b905d324-b48c-403f-bd1f-298de7708007';
      chatIframe.style.position = 'fixed';
      chatIframe.style.bottom = '20px';
      chatIframe.style.right = '20px';
      chatIframe.style.width = '400px';
      chatIframe.style.height = '600px';
      chatIframe.style.zIndex = '9999';
      chatIframe.style.border = '2px solid #007bff';
      chatIframe.style.borderRadius = '10px';
      chatIframe.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
      chatIframe.title = 'AI Chat Assistant';
      
      // Add close button
      const closeButton = document.createElement('button');
      closeButton.innerHTML = '×';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '5px';
      closeButton.style.right = '10px';
      closeButton.style.background = 'red';
      closeButton.style.color = 'white';
      closeButton.style.border = 'none';
      closeButton.style.borderRadius = '50%';
      closeButton.style.width = '25px';
      closeButton.style.height = '25px';
      closeButton.style.cursor = 'pointer';
      closeButton.style.zIndex = '10000';
      closeButton.onclick = () => {
        document.body.removeChild(chatIframe);
        document.body.removeChild(closeButton);
      };
      
      document.body.appendChild(chatIframe);
      document.body.appendChild(closeButton);
      
      console.log('Created direct iframe chatbot interface');

    } catch (error) {
      console.error('Error toggling chatbot:', error);
    }
  };

  return (
    <div
      className="fixed z-30 bottom-32 right-8 md:right-24 group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip - hidden on mobile */}
      <div
        className={`hidden md:block absolute bottom-full right-0 mb-2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap transition-all duration-200 ${
          showTooltip
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        Chat with our AI Assistant
        {/* Tooltip arrow */}
        <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
      </div>

      {/* Pulsing effect */}
      <div className="absolute inset-0 rounded-full bg-primary opacity-30 animate-ping"></div>

      {/* Main button */}
      <button
        onClick={toggleChatbot}
        className={`relative bg-primary hover:bg-secondary text-white p-3 rounded-full shadow-lg transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
        aria-label="Chat with AI Assistant"
        title={isChatbotLoaded ? "Chat with our AI Assistant" : "Loading AI Assistant..."}
      >
        <FaRobot size={24} />
      </button>

      {/* Debug info for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-full left-0 mt-2 text-xs bg-black text-white p-2 rounded opacity-75">
          Chatbot: {isChatbotLoaded ? 'Loaded' : 'Loading...'}
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;