import React, { useEffect, useState } from "react";

/**
 * Enhanced AI Chatbot Widget Component
 * 
 * Features:
 * - Modern AI robot icon with animated gradient button
 * - Blue/purple AI-themed color scheme with gradients
 * - Smooth hover effects and pulse animations
 * - Enhanced messaging with AI-focused copy
 * - Improved accessibility and user experience
 * - Custom styling for all chat elements (messages, input, scrollbar)
 * - Integration ready for AnythingLLM AI responses
 * 
 * @returns {null} Component renders via AnythingLLM script injection
 */
const ChatbotWidget = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Track widget loading for analytics
    const handleWidgetLoad = () => {
      setIsLoaded(true);
      // Optional: Track AI widget interaction analytics
      if (typeof gtag !== 'undefined') {
        gtag('event', 'ai_widget_loaded', {
          'event_category': 'AI_Interaction',
          'event_label': 'ChatWidget'
        });
      }
    };
    // Create and inject the AnythingLLM script with enhanced AI styling
    const script = document.createElement('script');
    script.setAttribute('data-embed-id', 'b905d324-b48c-403f-bd1f-298de7708007');
    script.setAttribute('data-base-api-url', 'https://llm.kheyamind.ai/api/embed');
    
    // Enhanced AI branding using proper AnythingLLM data attributes
    script.setAttribute('data-chat-icon', 'chatBubble'); // Use chat bubble instead of plus
    script.setAttribute('data-button-color', '#6366F1'); // KheyaMind purple
    script.setAttribute('data-position', 'bottom-left'); // Avoid WhatsApp overlap
    script.setAttribute('data-assistant-name', 'KheyaMind AI Assistant');
    script.setAttribute('data-greeting', 'Hello! I\'m your AI assistant. How can I help with AI automation?');
    script.setAttribute('data-user-bg-color', '#8B5CF6'); // Purple for user messages
    script.setAttribute('data-assistant-bg-color', '#1E40AF'); // Blue for assistant messages
    script.setAttribute('data-no-sponsor', 'true');
    script.setAttribute('data-brand-image-url', 'https://www.kheyamind.ai/logo.png');
    script.setAttribute('data-window-height', '650px');
    script.setAttribute('data-window-width', '420px');
    script.setAttribute('data-text-size', '15');
    script.setAttribute('data-send-message-text', '🚀 Ask our AI anything...');
    script.setAttribute('data-reset-chat-text', '🔄 Start Fresh Conversation');
    script.setAttribute('data-support-email', 'hello@kheyamind.ai');
    
    script.src = 'https://llm.kheyamind.ai/embed/anythingllm-chat-widget.min.js';
    script.addEventListener('load', handleWidgetLoad);
    
    // Add minimal custom CSS for enhanced styling only
    const customStyle = document.createElement('style');
    customStyle.textContent = `
      /* Enhanced chat window styling */
      [data-embed-id] .chat-window {
        border-radius: 16px !important;
        box-shadow: 0 20px 60px rgba(99, 102, 241, 0.25) !important;
        backdrop-filter: blur(20px) !important;
        overflow: hidden !important;
      }
      
      /* Enhanced input styling */
      [data-embed-id] .chat-input {
        border-radius: 12px !important;
        padding: 12px 16px !important;
        font-size: 15px !important;
        transition: all 0.3s ease !important;
      }
      
      [data-embed-id] .chat-input:focus {
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.3) !important;
        transform: scale(1.02) !important;
      }
      
      /* Enhanced send button */
      [data-embed-id] .send-button {
        border-radius: 10px !important;
        padding: 10px 16px !important;
        transition: all 0.3s ease !important;
        font-weight: 600 !important;
      }
      
      [data-embed-id] .send-button:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4) !important;
      }
      
      /* Enhanced message bubbles */
      [data-embed-id] .assistant-message {
        border-radius: 18px 18px 18px 4px !important;
      }
      
      [data-embed-id] .user-message {
        border-radius: 18px 18px 4px 18px !important;
      }
      
      /* Enhanced scrollbar */
      [data-embed-id] .chat-messages::-webkit-scrollbar {
        width: 8px !important;
      }
      
      [data-embed-id] .chat-messages::-webkit-scrollbar-track {
        background: #f1f3ff !important;
        border-radius: 4px !important;
      }
      
      [data-embed-id] .chat-messages::-webkit-scrollbar-thumb {
        background: #6366F1 !important;
        border-radius: 4px !important;
        transition: all 0.3s ease !important;
      }
    `;
    
    // Add the script and styles to document head  
    document.head.appendChild(script);
    document.head.appendChild(customStyle);
    
    // Add performance optimization and error handling
    script.onerror = () => {
      console.warn('KheyaMind AI Widget failed to load');
    };

    // Cleanup function to remove script when component unmounts
    return () => {
      if (customStyle.parentNode) {
        customStyle.parentNode.removeChild(customStyle);
      }
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      script.removeEventListener('load', handleWidgetLoad);
    };
  }, []);

  // Component renders null - AnythingLLM script handles the UI injection
  // The isLoaded state can be used for conditional rendering or analytics
  return null;
};

export default ChatbotWidget;