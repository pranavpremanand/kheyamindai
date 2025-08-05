import React, { useEffect } from "react";

const ChatbotWidget = () => {
  useEffect(() => {
    // Create and inject the AnythingLLM script with custom styling
    const script = document.createElement('script');
    script.setAttribute('data-embed-id', 'b905d324-b48c-403f-bd1f-298de7708007');
    script.setAttribute('data-base-api-url', 'https://llm.kheyamind.ai/api/embed');
    
    // Complete white-label branding
    script.setAttribute('data-chat-icon', 'support');
    script.setAttribute('data-button-color', '#FFB703'); // Primary color
    script.setAttribute('data-user-bg-color', '#FFB703'); // Primary color
    script.setAttribute('data-assistant-bg-color', '#ffffff');
    script.setAttribute('data-brand-image-url', 'https://www.kheyamind.ai/logo.png');
    script.setAttribute('data-greeting', 'Hello! I\'m your KheyaMind AI assistant. How can I help you with AI solutions today?');
    script.setAttribute('data-assistant-name', 'KheyaMind AI Assistant');
    script.setAttribute('data-position', 'bottom-right');
    script.setAttribute('data-window-height', '600px');
    script.setAttribute('data-window-width', '400px');
    script.setAttribute('data-text-size', '14');
    script.setAttribute('data-send-message-text', 'Ask KheyaMind AI...');
    script.setAttribute('data-reset-chat-text', 'Start New Conversation');
    script.setAttribute('data-support-email', 'hello@kheyamind.ai');
    script.setAttribute('data-no-sponsor', 'true');
    script.setAttribute('data-open-on-load', 'false');
    script.setAttribute('data-collect-user-data', 'false');
    
    script.src = 'https://llm.kheyamind.ai/embed/anythingllm-chat-widget.min.js';
    
    // Add custom CSS for additional styling
    const customStyle = document.createElement('style');
    customStyle.textContent = `
      /* Custom styling for AnythingLLM widget */
      [data-embed-id] {
        z-index: 998 !important;
      }
      
      /* Position the chat button above WhatsApp with proper spacing */
      [data-embed-id] > div:first-child {
        bottom: 90px !important;
        right: 20px !important;
        z-index: 998 !important;
      }
      
      /* Enhanced chat window styling */
      [data-embed-id] .chat-window,
      [data-embed-id] iframe {
        border: 2px solid #FFB703 !important;
        border-radius: 16px !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        overflow: hidden !important;
      }
      
      /* Enhanced header styling with gradient */
      [data-embed-id] .chat-header,
      [data-embed-id] .header {
        background: linear-gradient(135deg, #FFB703 0%, #003049 100%) !important;
        color: white !important;
        padding: 16px !important;
        font-weight: 600 !important;
      }
      
      /* Larger brand logo in header */
      [data-embed-id] .brand-logo,
      [data-embed-id] img[src*="logo"] {
        width: 32px !important;
        height: 32px !important;
        border-radius: 6px !important;
      }
      
      /* Enhanced input styling */
      [data-embed-id] .chat-input,
      [data-embed-id] input,
      [data-embed-id] textarea {
        border: 1px solid #FFB703 !important;
        border-radius: 12px !important;
        padding: 12px 16px !important;
        font-size: 14px !important;
      }
      
      /* Enhanced send button */
      [data-embed-id] .send-button,
      [data-embed-id] button[type="submit"] {
        background-color: #FFB703 !important;
        color: #003049 !important;
        border-radius: 12px !important;
        font-weight: 600 !important;
        padding: 12px 20px !important;
        border: none !important;
        transition: all 0.3s ease !important;
      }
      
      [data-embed-id] .send-button:hover,
      [data-embed-id] button[type="submit"]:hover {
        background-color: #003049 !important;
        color: white !important;
        transform: translateY(-1px) !important;
      }
      
      /* Enhanced scrollbar */
      [data-embed-id] .chat-messages::-webkit-scrollbar,
      [data-embed-id] .messages::-webkit-scrollbar {
        width: 6px !important;
      }
      
      [data-embed-id] .chat-messages::-webkit-scrollbar-thumb,
      [data-embed-id] .messages::-webkit-scrollbar-thumb {
        background-color: #FFB703 !important;
        border-radius: 6px !important;
      }
      
      /* White background for AI assistant messages with shadow */
      [data-embed-id] .assistant-message,
      [data-embed-id] .ai-message,
      [data-embed-id] .bot-message,
      [data-embed-id] [data-role="assistant"],
      [data-embed-id] .message.assistant {
        background-color: #ffffff !important;
        color: #003049 !important;
        border: 1px solid #e5e7eb !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
        border-radius: 12px !important;
        padding: 12px 16px !important;
        margin: 8px 0 !important;
      }
      
      /* User messages styling */
      [data-embed-id] .user-message,
      [data-embed-id] [data-role="user"],
      [data-embed-id] .message.user {
        background-color: #FFB703 !important;
        color: #003049 !important;
        border-radius: 12px !important;
        padding: 12px 16px !important;
        margin: 8px 0 !important;
      }
      
      /* Hide AnythingLLM branding completely */
      [data-embed-id] .powered-by,
      [data-embed-id] .anythingllm-branding,
      [data-embed-id] .footer-branding,
      [data-embed-id] [class*="anythingllm"],
      [data-embed-id] [class*="powered"],
      [data-embed-id] a[href*="anythingllm"] {
        display: none !important;
        visibility: hidden !important;
      }
      
      /* Replace assistant avatar with KheyaMind favicon */
      [data-embed-id] .assistant-avatar,
      [data-embed-id] .bot-avatar,
      [data-embed-id] .ai-avatar {
        background-image: url('https://www.kheyamind.ai/fav.png') !important;
        background-size: contain !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        width: 32px !important;
        height: 32px !important;
        border-radius: 6px !important;
      }
      
      /* Chat window background */
      [data-embed-id] .chat-container,
      [data-embed-id] .chat-window {
        background-color: #f8fafc !important;
      }
      
      /* Message container styling */
      [data-embed-id] .messages-container,
      [data-embed-id] .chat-messages {
        padding: 16px !important;
        background-color: #f8fafc !important;
      }
      
      /* Input container styling */
      [data-embed-id] .input-container,
      [data-embed-id] .chat-input-container {
        background-color: white !important;
        border-top: 1px solid #e5e7eb !important;
        padding: 16px !important;
      }
      
      /* Title and assistant name customization */
      [data-embed-id] .chat-title,
      [data-embed-id] .assistant-name {
        color: white !important;
        font-weight: 600 !important;
        font-size: 16px !important;
      }
      
      /* Ensure proper text contrast */
      [data-embed-id] .assistant-message *,
      [data-embed-id] .ai-message *,
      [data-embed-id] .bot-message * {
        color: #003049 !important;
      }
      
      /* Chat button styling */
      [data-embed-id] .chat-button,
      [data-embed-id] .open-chat-button {
        background-color: #FFB703 !important;
        border: 2px solid #003049 !important;
        box-shadow: 0 4px 12px rgba(255, 183, 3, 0.3) !important;
        transition: all 0.3s ease !important;
      }
      
      [data-embed-id] .chat-button:hover,
      [data-embed-id] .open-chat-button:hover {
        background-color: #003049 !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 16px rgba(0, 48, 73, 0.3) !important;
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