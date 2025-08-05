import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";

const ChatbotWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

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

      console.log('No AnythingLLM widget found');

    } catch (error) {
      console.error('Error toggling chatbot:', error);
    }
  };

  return (
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
  );
};

export default ChatbotWidget;