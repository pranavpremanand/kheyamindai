import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

const ChatbotWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showTestChat, setShowTestChat] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll);

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

      // Method 2: Try to find and click the existing widget
      const existingWidget = document.querySelector('[data-embed-id]');
      if (existingWidget) {
        existingWidget.click();
        console.log('Clicked existing AnythingLLM widget');
        return;
      }

      // Fallback: show test chat interface
      console.log('No AnythingLLM widget found, showing test interface');
      setShowTestChat(true);

    } catch (error) {
      console.error('Error toggling chatbot:', error);
      setShowTestChat(true);
    }
  };

  const closeTestChat = () => {
    setShowTestChat(false);
  };

  return (
    <>
      <div
        className="fixed z-[1000] bottom-24 right-8 group"
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
          <div className="bg-white rounded-lg w-full max-w-sm h-[500px] flex flex-col shadow-2xl relative border border-gray-200 mb-20 mr-4">
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
                <strong>Debug Mode:</strong> Testing AnythingLLM integration
              </p>
            </div>
            
            {/* Debug info */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3 text-sm">
                <div>
                  <strong>AnythingLLM Status:</strong>
                  <p className="text-gray-600">
                    {window.AnythingLLMEmbed ? '✅ Loaded' : '❌ Not loaded'}
                  </p>
                </div>
                
                <div>
                  <strong>Widget Element:</strong>
                  <p className="text-gray-600">
                    {document.querySelector('[data-embed-id]') ? '✅ Found' : '❌ Not found'}
                  </p>
                </div>
                
                <div>
                  <strong>Current Domain:</strong>
                  <p className="text-gray-600">{window.location.hostname}</p>
                </div>
                
                <div>
                  <strong>Script Source:</strong>
                  <p className="text-gray-600 break-all">
                    {document.querySelector('script[data-embed-id]')?.src || 'Not found'}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    console.log('Window.AnythingLLMEmbed:', window.AnythingLLMEmbed);
                    console.log('Available methods:', Object.keys(window.AnythingLLMEmbed || {}));
                  }}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                >
                  Log Debug Info
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;