import React, { useEffect } from "react";

const ChatbotWidget = () => {
  useEffect(() => {
    // Create and inject the AnythingLLM script with custom styling
    const script = document.createElement('script');
    script.setAttribute('data-embed-id', 'b905d324-b48c-403f-bd1f-298de7708007');
    script.setAttribute('data-base-api-url', 'https://llm.kheyamind.ai/api/embed');
    
    // Custom branding and styling
    script.setAttribute('data-chat-icon', 'robot');
    script.setAttribute('data-button-color', '#FFB703'); // Primary color
    script.setAttribute('data-user-bg-color', '#FFB703'); // Primary color
    script.setAttribute('data-assistant-bg-color', '#003049'); // Secondary color
    script.setAttribute('data-brand-image-url', 'https://www.kheyamind.ai/logo.png');
    script.setAttribute('data-greeting', 'Hello! I\'m your KheyaMind AI assistant. How can I help you today?');
    script.setAttribute('data-assistant-name', 'KheyaMind AI Assistant');
    script.setAttribute('data-position', 'bottom-right');
    script.setAttribute('data-window-height', '600px');
    script.setAttribute('data-window-width', '400px');
    script.setAttribute('data-text-size', '14');
    script.setAttribute('data-send-message-text', 'Ask KheyaMind AI...');
    script.setAttribute('data-reset-chat-text', 'Start New Conversation');
    script.setAttribute('data-support-email', 'hello@kheyamind.ai');
    script.setAttribute('data-no-sponsor', 'true');
    
    script.src = 'https://llm.kheyamind.ai/embed/anythingllm-chat-widget.min.js';
    
    // Add custom CSS for additional styling
    const customStyle = document.createElement('style');
    customStyle.textContent = `
      /* Custom styling for AnythingLLM widget */
      [data-embed-id] {
        z-index: 999 !important;
      }
      
      /* Position the chat button above WhatsApp */
      [data-embed-id] > div:first-child {
        bottom: 80px !important;
        right: 20px !important;
        z-index: 999 !important;
      }
      
      /* Custom chat window styling */
      [data-embed-id] .chat-window {
        border: 2px solid #FFB703 !important;
        border-radius: 12px !important;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2) !important;
      }
      
      /* Custom header styling */
      [data-embed-id] .chat-header {
        background: linear-gradient(135deg, #FFB703 0%, #003049 100%) !important;
        color: white !important;
      }
      
      /* Custom input styling */
      [data-embed-id] .chat-input {
        border: 1px solid #FFB703 !important;
        border-radius: 8px !important;
      }
      
      /* Custom send button */
      [data-embed-id] .send-button {
        background-color: #FFB703 !important;
        color: #003049 !important;
      }
      
      /* Custom scrollbar */
      [data-embed-id] .chat-messages::-webkit-scrollbar {
        width: 6px !important;
      }
      
      [data-embed-id] .chat-messages::-webkit-scrollbar-thumb {
        background-color: #FFB703 !important;
        border-radius: 3px !important;
      }
    `;
    
    // Add the script to the document head
    document.head.appendChild(customStyle);
    document.head.appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      if (customStyle.parentNode) {
        customStyle.parentNode.removeChild(customStyle);
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // This component doesn't render anything visible - the AnythingLLM script handles the UI
  return null;
};

export default ChatbotWidget;