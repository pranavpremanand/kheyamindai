import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

const ChatbotWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTestChat, setShowTestChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Always keep the chatbot button visible
      setIsVisible(true);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleChatbot = () => {
    // Check domain restriction
    const currentDomain = window.location.hostname;
    const allowedDomain = 'www.kheyamind.ai';
    const isDomainRestricted = currentDomain !== allowedDomain;

    // If domain is restricted, show test chat interface
    if (isDomainRestricted) {
      setShowTestChat(true);
      return;
    }

    try {
      // Method 1: Use official AnythingLLM API
      if (window.AnythingLLMEmbed && typeof window.AnythingLLMEmbed.open === 'function') {
        window.AnythingLLMEmbed.open();
        console.log('Opened chatbot using AnythingLLMEmbed.open()');
        return;
      }

      // Fallback: show test chat interface
      setShowTestChat(true);

    } catch (error) {
      console.error('Error toggling chatbot:', error);
      setShowTestChat(true);
    }
  };

  const closeTestChat = () => {
    setShowTestChat(false);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <div
        className="fixed z-[1000] bottom-20 right-8 md:right-8 group"
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
          title="Chat with our AI Assistant"
        >
          <FaRobot size={24} />
        </button>
      </div>

      {/* Test Chat Interface */}
      {showTestChat && (
        <div className="fixed inset-0 bg-black/30 z-[1001] flex items-end justify-end p-4">
          <div className="bg-white rounded-lg w-full max-w-sm h-[500px] flex flex-col shadow-2xl relative border border-gray-200 mb-16 mr-4">
            {/* Arrow pointing to chatbot icon */}
            <div className="absolute -bottom-3 right-12 w-6 h-6 bg-white transform rotate-45 border-r border-b border-gray-200"></div>
            
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b bg-primary text-white rounded-t-lg">
              <h3 className="font-bold">🤖 AI Assistant</h3>
              <button
                onClick={closeTestChat}
                className="text-white hover:text-gray-200 text-xl font-bold w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            
            {/* Preview notice */}
            <div className="p-3 bg-blue-50 border-b text-xs text-blue-700">
              <p>
                <strong>Preview Mode:</strong> Testing interface
              </p>
            </div>
            
            {/* Chat content */}
            <div className="flex-1 relative">
              {/* Loading state */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Loading AI Assistant...</p>
                  </div>
                </div>
              )}
              
              {/* Chat iframe */}
              <iframe
                src="https://llm.kheyamind.ai/api/embed/b905d324-b48c-403f-bd1f-298de7708007"
                className="w-full h-full border-0"
                title="AI Chat Assistant"
                onLoad={handleIframeLoad}
                allow="microphone; camera; geolocation"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;