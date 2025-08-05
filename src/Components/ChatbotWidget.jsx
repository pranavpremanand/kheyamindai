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
      // Method 1: Try to find and click the AnythingLLM widget button
      const anythingLLMButton = document.querySelector('[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button');
      if (anythingLLMButton) {
        anythingLLMButton.click();
        return;
      }

      // Method 2: Try to find the widget by class name
      const widgetButton = document.querySelector('.anythingllm-chat-widget button');
      if (widgetButton) {
        widgetButton.click();
        return;
      }

      // Method 3: Dispatch a custom event that the widget might listen to
      const chatEvent = new CustomEvent('anythingllm-toggle', {
        detail: { action: 'toggle' }
      });
      window.dispatchEvent(chatEvent);

      // Method 4: Try global function if available
      if (window.AnythingLLM && typeof window.AnythingLLM.toggle === 'function') {
        window.AnythingLLM.toggle();
        return;
      }

      // If none of the above work, show a fallback message
      console.log('AnythingLLM widget not found. Checking if script loaded...');
      
      // Check if the script is loaded
      const script = document.querySelector('script[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"]');
      if (!script) {
        console.error('AnythingLLM script not found in DOM');
      } else {
        console.log('AnythingLLM script found, but widget not initialized yet');
      }

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