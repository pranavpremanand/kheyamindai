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
    
    // Enhanced AI branding and styling with modern gradients
    script.setAttribute('data-chat-icon', 'robot');
    script.setAttribute('data-button-color', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'); // AI gradient
    script.setAttribute('data-user-bg-color', '#667eea'); // Modern blue
    script.setAttribute('data-assistant-bg-color', '#4c63d2'); // Deeper AI blue
    script.setAttribute('data-brand-image-url', 'https://www.kheyamind.ai/logo.png');
    script.setAttribute('data-greeting', '🤖 Welcome to KheyaMind AI! I\'m your intelligent assistant, ready to help with AI solutions, chatbots, voice AI, and automation. How can I assist you today?');
    script.setAttribute('data-assistant-name', 'KheyaMind AI Assistant');
    script.setAttribute('data-position', 'bottom-right');
    script.setAttribute('data-window-height', '650px');
    script.setAttribute('data-window-width', '420px');
    script.setAttribute('data-text-size', '15');
    script.setAttribute('data-send-message-text', '🚀 Ask our AI anything...');
    script.setAttribute('data-reset-chat-text', '🔄 Start Fresh Conversation');
    script.setAttribute('data-support-email', 'hello@kheyamind.ai');
    script.setAttribute('data-no-sponsor', 'true');
    
    script.src = 'https://llm.kheyamind.ai/embed/anythingllm-chat-widget.min.js';
    script.addEventListener('load', handleWidgetLoad);
    
    // Add enhanced custom CSS for modern AI styling
    const customStyle = document.createElement('style');
    customStyle.textContent = `
      /* Enhanced AI-focused styling for AnythingLLM widget */
      [data-embed-id] {
        z-index: 1000 !important;
      }
      
      /* Modern AI chat button styling with gradient and animations */
      [data-embed-id] > div:first-child {
        bottom: 160px !important;
        right: 20px !important;
        z-index: 999 !important;
        position: fixed !important;
      }
      
      /* AI Robot Button Enhanced Styling */
      [data-embed-id] .chat-button, 
      [data-embed-id] button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        border: none !important;
        border-radius: 50% !important;
        width: 64px !important;
        height: 64px !important;
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        position: relative !important;
        overflow: visible !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        color: white !important;
        font-size: 24px !important;
      }
      
      /* Replace any existing icon content with a robot emoji/icon */
      [data-embed-id] .chat-button:before, 
      [data-embed-id] button:before {
        content: '🤖' !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        font-size: 28px !important;
        z-index: 10 !important;
        pointer-events: none !important;
        filter: brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.1)) !important;
      }
      
      /* Hide any default icons that might be showing */
      [data-embed-id] .chat-button svg,
      [data-embed-id] button svg,
      [data-embed-id] .chat-button img,
      [data-embed-id] button img {
        display: none !important;
      }
      
      /* Hover effects for AI button */
      [data-embed-id] .chat-button:hover,
      [data-embed-id] button:hover {
        transform: translateY(-4px) scale(1.08) !important;
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6) !important;
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important;
      }
      
      /* Enhanced hover effect for the robot icon */
      [data-embed-id] .chat-button:hover:before,
      [data-embed-id] button:hover:before {
        transform: translate(-50%, -50%) scale(1.1) !important;
        filter: brightness(1.3) drop-shadow(0 4px 8px rgba(0,0,0,0.2)) !important;
      }
      
      /* AI pulse animation */
      [data-embed-id] .chat-button::after,
      [data-embed-id] button::after {
        content: '' !important;
        position: absolute !important;
        top: -2px !important;
        left: -2px !important;
        right: -2px !important;
        bottom: -2px !important;
        border-radius: 50% !important;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        opacity: 0.6 !important;
        animation: ai-pulse 3s ease-in-out infinite !important;
        z-index: -1 !important;
        pointer-events: none !important;
      }
      
      @keyframes ai-pulse {
        0% {
          transform: scale(1);
          opacity: 0.6;
        }
        50% {
          transform: scale(1.3);
          opacity: 0.2;
        }
        100% {
          transform: scale(1.6);
          opacity: 0;
        }
      }
      
      /* Modern AI chat window styling */
      [data-embed-id] .chat-window {
        border: 2px solid transparent !important;
        background: linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box !important;
        border-radius: 16px !important;
        box-shadow: 0 20px 60px rgba(102, 126, 234, 0.25) !important;
        backdrop-filter: blur(20px) !important;
        overflow: hidden !important;
      }
      
      /* AI-themed header with gradient */
      [data-embed-id] .chat-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        color: white !important;
        padding: 20px 16px !important;
        border-bottom: none !important;
        position: relative !important;
      }
      
      /* AI header effects */
      [data-embed-id] .chat-header::after {
        content: '🤖' !important;
        position: absolute !important;
        right: 16px !important;
        top: 50% !important;
        transform: translateY(-50%) !important;
        font-size: 22px !important;
        animation: ai-glow 4s ease-in-out infinite !important;
        filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2)) !important;
      }
      
      @keyframes ai-glow {
        0%, 100% { 
          filter: brightness(1) drop-shadow(0 0 5px rgba(255,255,255,0.5)); 
        }
        50% { 
          filter: brightness(1.3) drop-shadow(0 0 10px rgba(255,255,255,0.8)); 
        }
      }
      
      /* Enhanced input styling with AI focus */
      [data-embed-id] .chat-input {
        border: 2px solid transparent !important;
        background: linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box !important;
        border-radius: 12px !important;
        padding: 12px 16px !important;
        font-size: 15px !important;
        transition: all 0.3s ease !important;
      }
      
      [data-embed-id] .chat-input:focus {
        box-shadow: 0 0 20px rgba(102, 126, 234, 0.3) !important;
        transform: scale(1.02) !important;
      }
      
      /* AI send button with gradient */
      [data-embed-id] .send-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        color: white !important;
        border: none !important;
        border-radius: 10px !important;
        padding: 10px 16px !important;
        transition: all 0.3s ease !important;
        font-weight: 600 !important;
      }
      
      [data-embed-id] .send-button:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4) !important;
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important;
      }
      
      /* AI message bubbles styling */
      [data-embed-id] .assistant-message {
        background: linear-gradient(135deg, #f8f9ff 0%, #e8eaff 100%) !important;
        border: 1px solid #e0e4ff !important;
        border-radius: 18px 18px 18px 4px !important;
        position: relative !important;
      }
      
      [data-embed-id] .user-message {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        color: white !important;
        border-radius: 18px 18px 4px 18px !important;
      }
      
      /* Enhanced scrollbar with AI theme */
      [data-embed-id] .chat-messages::-webkit-scrollbar {
        width: 8px !important;
      }
      
      [data-embed-id] .chat-messages::-webkit-scrollbar-track {
        background: #f1f3ff !important;
        border-radius: 4px !important;
      }
      
      [data-embed-id] .chat-messages::-webkit-scrollbar-thumb {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        border-radius: 4px !important;
        transition: all 0.3s ease !important;
      }
      
      [data-embed-id] .chat-messages::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important;
      }
      
      /* AI typing indicator enhancement */
      [data-embed-id] .typing-indicator {
        background: linear-gradient(135deg, #f8f9ff 0%, #e8eaff 100%) !important;
        border: 1px solid #e0e4ff !important;
        border-radius: 18px !important;
        padding: 12px 16px !important;
      }
      
      [data-embed-id] .typing-dots {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      }
    `;
    
    // Add the script to the document head
    document.head.appendChild(customStyle);
    document.head.appendChild(script);
    
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