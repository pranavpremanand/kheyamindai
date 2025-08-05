import React, { useState, useEffect } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

const ChatbotWidget = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

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
    // The AnythingLLM widget should handle the chat opening/closing
    // We'll dispatch a custom event to trigger the widget
    const chatEvent = new CustomEvent('toggleAnythingLLMChat', {
      detail: { action: 'toggle' }
    });
    window.dispatchEvent(chatEvent);
  };

  return (
    <div
      className="fixed z-30 bottom-24 right-8 md:right-24 group"
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
      >
        <FaRobot size={24} />
      </button>
    </div>
  );
};

export default ChatbotWidget;