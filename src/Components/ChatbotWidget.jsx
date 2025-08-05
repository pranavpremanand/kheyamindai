import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

const ChatbotWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isChatbotLoaded, setIsChatbotLoaded] = useState(false);
  const [isDomainRestricted, setIsDomainRestricted] = useState(false);

  useEffect(() => {
    // Check domain restriction
    const currentDomain = window.location.hostname;
    const allowedDomain = 'www.kheyamind.ai';
    const isRestricted = currentDomain !== allowedDomain;
    setIsDomainRestricted(isRestricted);
    
    const handleScroll = () => {
      // Always keep the chatbot button visible
      setIsVisible(true);
    };

    // Check if AnythingLLM widget is loaded
    const checkChatbotLoaded = () => {
      // Check for AnythingLLM global object (proper way)
      if (window.AnythingLLMEmbed) {
        setIsChatbotLoaded(true);
        console.log('✅ AnythingLLM widget loaded successfully');
      } else if (document.querySelector('[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"]')) {
        // Script exists but may not be functional due to domain restriction
        setIsChatbotLoaded(isRestricted ? false : true);
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
  }, [isDomainRestricted]);

  const toggleChatbot = () => {
    // If domain is restricted, show a helpful message
    if (isDomainRestricted) {
      alert(`🤖 Chatbot Notice\n\nThe AI chatbot is configured for www.kheyamind.ai domain only.\n\nCurrent domain: ${window.location.hostname}\n\nThe chatbot will work properly when this site is deployed to the production domain.`);
      return;
    }
    
    try {
      // Method 1: Use official AnythingLLM API
      if (window.AnythingLLMEmbed && typeof window.AnythingLLMEmbed.open === 'function') {
        window.AnythingLLMEmbed.open();
        console.log('Opened chatbot using AnythingLLMEmbed.open()');
        return;
      }

      // If AnythingLLM API not available, show info message
      console.log('AnythingLLM API not available - this is expected due to domain restriction');
      alert('Chatbot will be available on the production domain (www.kheyamind.ai)');

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
        {isDomainRestricted ? 'Chatbot (Production Only)' : 'Chat with our AI Assistant'}
        {/* Tooltip arrow */}
        <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
      </div>

      {/* Pulsing effect */}
      <div className={`absolute inset-0 rounded-full ${isDomainRestricted ? 'bg-gray-400' : 'bg-primary'} opacity-30 animate-ping`}></div>

      {/* Main button */}
      <button
        onClick={toggleChatbot}
        className={`relative ${isDomainRestricted ? 'bg-gray-500 hover:bg-gray-600' : 'bg-primary hover:bg-secondary'} text-white p-3 rounded-full shadow-lg transition-all duration-300 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
        aria-label="Chat with AI Assistant"
        title={isDomainRestricted ? "Chatbot available on production domain only" : (isChatbotLoaded ? "Chat with our AI Assistant" : "Loading AI Assistant...")}
      >
        <FaRobot size={24} />
      </button>

      {/* Debug info for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-full left-0 mt-2 text-xs bg-black text-white p-2 rounded opacity-75">
          Chatbot: {isDomainRestricted ? 'Domain Restricted' : (isChatbotLoaded ? 'Loaded' : 'Loading...')}
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;