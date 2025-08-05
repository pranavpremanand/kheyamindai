import React, { useEffect } from "react";

const ChatbotWidget = () => {
  useEffect(() => {
    // Create and inject the AnythingLLM script with complete white-label customization
    const script = document.createElement('script');
    script.setAttribute('data-embed-id', 'b905d324-b48c-403f-bd1f-298de7708007');
    script.setAttribute('data-base-api-url', 'https://llm.kheyamind.ai/api/embed');
    
    // Complete white-label branding with robot icon
    script.setAttribute('data-chat-icon', '🤖');
    script.setAttribute('data-button-color', '#FFB703'); // Primary color
    script.setAttribute('data-user-bg-color', '#FFB703'); // Primary color
    script.setAttribute('data-assistant-bg-color', '#ffffff');
    script.setAttribute('data-brand-image-url', 'https://www.kheyamind.ai/fav.png');
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
    
    // Add comprehensive custom CSS for complete white-labeling
    const customStyle = document.createElement('style');
    customStyle.textContent = `
      /* Custom styling for AnythingLLM widget - Complete White Label */
      [data-embed-id] {
        z-index: 998 !important;
      }
      
      /* UPDATED POSITIONING - Chat button above WhatsApp */
      [data-embed-id] > div:first-child,
      [data-embed-id] .chat-widget-container,
      #anythingllm-chat-button {
        bottom: 100px !important;
        right: 32px !important;
        z-index: 998 !important;
        position: fixed !important;
      }
      
      /* Chat button styling with robot icon - UPDATED POSITIONING */
      [data-embed-id] .chat-button,
      [data-embed-id] .open-chat-button,
      [data-embed-id] button[aria-label*="chat"],
      [data-embed-id] > button {
        background-color: #FFB703 !important;
        border: 2px solid #003049 !important;
        box-shadow: 0 6px 16px rgba(255, 183, 3, 0.4) !important;
        transition: all 0.3s ease !important;
        width: 60px !important;
        height: 60px !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        position: fixed !important;
        bottom: 100px !important;
        right: 32px !important;
        z-index: 998 !important;
      }
      
      /* Force robot emoji icon */
      [data-embed-id] .chat-button::before,
      [data-embed-id] .open-chat-button::before {
        content: '🤖' !important;
        font-size: 28px !important;
        display: block !important;
        width: 100% !important;
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      
      /* Hide any existing icon content */
      [data-embed-id] .chat-button > *:not(::before),
      [data-embed-id] .open-chat-button > *:not(::before) {
        display: none !important;
      }
      
      [data-embed-id] .chat-button:hover,
      [data-embed-id] .open-chat-button:hover {
        background-color: #003049 !important;
        transform: translateY(-2px) !important;
        box-shadow: 0 8px 20px rgba(0, 48, 73, 0.4) !important;
      }
      
      /* Enhanced chat window styling - UPDATED POSITIONING */
      [data-embed-id] .chat-window,
      [data-embed-id] iframe,
      [data-embed-id] .chat-container,
      #anythingllm-chat-window {
        border: 2px solid #FFB703 !important;
        border-radius: 16px !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        overflow: hidden !important;
        width: 400px !important;
        height: 600px !important;
        bottom: 170px !important;
        right: 32px !important;
        z-index: 998 !important;
        position: fixed !important;
      }
      
      /* Enhanced header styling with gradient and MUCH LARGER logo */
      [data-embed-id] .chat-header,
      [data-embed-id] .header {
        background: linear-gradient(135deg, #FFB703 0%, #003049 100%) !important;
        color: white !important;
        padding: 20px !important;
        font-weight: 600 !important;
        display: flex !important;
        align-items: center !important;
        gap: 12px !important;
      }
      
      /* MUCH LARGER brand logo in header */
      [data-embed-id] .brand-logo,
      [data-embed-id] img[src*="fav"],
      [data-embed-id] img[src*="logo"],
      [data-embed-id] .header img {
        width: 64px !important;
        height: 64px !important;
        border-radius: 8px !important;
        object-fit: contain !important;
        background: white !important;
        padding: 8px !important;
        border: 2px solid #003049 !important;
      }
      
      /* Assistant name styling */
      [data-embed-id] .assistant-name,
      [data-embed-id] .chat-title {
        font-size: 18px !important;
        font-weight: 700 !important;
        color: white !important;
      }
      
      /* WHITE BACKGROUND for AI assistant messages with enhanced shadow and proper styling */
      [data-embed-id] .assistant-message,
      [data-embed-id] .ai-message,
      [data-embed-id] .bot-message,
      [data-embed-id] [data-role="assistant"],
      [data-embed-id] .message.assistant,
      [data-embed-id] .message[data-sender="assistant"],
      [data-embed-id] .response-message,
      [data-embed-id] .message:not(.user):not([data-role="user"]) {
        background-color: #ffffff !important;
        color: #003049 !important;
        border: 2px solid #e5e7eb !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(255, 183, 3, 0.2) !important;
        border-radius: 12px !important;
        padding: 12px 16px !important;
        margin: 8px 0 !important;
        font-weight: 400 !important;
        line-height: 1.5 !important;
      }
      
      /* User messages styling */
      [data-embed-id] .user-message,
      [data-embed-id] [data-role="user"],
      [data-embed-id] .message.user,
      [data-embed-id] .message[data-role="user"] {
        background-color: #FFB703 !important;
        color: #003049 !important;
        border-radius: 12px !important;
        padding: 12px 16px !important;
        margin: 8px 0 !important;
        font-weight: 500 !important;
      }
      
      /* Enhanced input styling */
      [data-embed-id] .chat-input,
      [data-embed-id] input,
      [data-embed-id] textarea {
        border: 1px solid #FFB703 !important;
        border-radius: 12px !important;
        padding: 12px 16px !important;
        font-size: 14px !important;
        background-color: white !important;
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
      
      /* COMPLETELY HIDE ALL AnythingLLM branding - Complete White Label */
      [data-embed-id] .powered-by,
      [data-embed-id] .anythingllm-branding,
      [data-embed-id] .footer-branding,
      [data-embed-id] [class*="anythingllm"],
      [data-embed-id] [class*="powered"],
      [data-embed-id] a[href*="anythingllm"],
      [data-embed-id] *[class*="AnythingLLM"],
      [data-embed-id] *[title*="AnythingLLM"],
      [data-embed-id] *[alt*="AnythingLLM"],
      [data-embed-id] .branding,
      [data-embed-id] .sponsor,
      [data-embed-id] .attribution {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        height: 0 !important;
        width: 0 !important;
        overflow: hidden !important;
      }
      
      /* Replace ALL assistant avatars with KheyaMind favicon - LARGER SIZE */
      [data-embed-id] .assistant-avatar,
      [data-embed-id] .bot-avatar,
      [data-embed-id] .ai-avatar,
      [data-embed-id] .avatar.assistant,
      [data-embed-id] [data-role="assistant"] .avatar,
      [data-embed-id] .message-avatar,
      [data-embed-id] .avatar,
      [data-embed-id] img[src*="anythingllm"] {
        background-image: url('https://www.kheyamind.ai/fav.png') !important;
        background-size: contain !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        background-color: white !important;
        width: 40px !important;
        height: 40px !important;
        border-radius: 8px !important;
        border: 2px solid #FFB703 !important;
        padding: 4px !important;
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
      
      /* FORCE assistant name to be KheyaMind AI and hide any AnythingLLM text */
      [data-embed-id] .chat-title,
      [data-embed-id] .assistant-name,
      [data-embed-id] .sender-name,
      [data-embed-id] .message-sender {
        color: white !important;
        font-weight: 700 !important;
        font-size: 18px !important;
      }
      
      /* AGGRESSIVELY hide any AnythingLLM text and replace with KheyaMind AI */
      [data-embed-id] *:contains("AnythingLLM"),
      [data-embed-id] *:contains("Anything LLM"),
      [data-embed-id] *[title*="AnythingLLM"],
      [data-embed-id] *[alt*="AnythingLLM"] {
        visibility: hidden !important;
        display: none !important;
      }
      
      /* Ensure proper text contrast in AI messages */
      [data-embed-id] .assistant-message *,
      [data-embed-id] .ai-message *,
      [data-embed-id] .bot-message *,
      [data-embed-id] .response-message * {
        color: #003049 !important;
        font-weight: 400 !important;
      }
      
      /* UPDATED Mobile responsive adjustments */
      @media (max-width: 768px) {
        /* Adjust positioning for mobile */
        [data-embed-id] > div:first-child,
        [data-embed-id] .chat-widget-container,
        #anythingllm-chat-button {
          bottom: 90px !important;
          right: 20px !important;
        }
        
        /* Chat button positioning on mobile */
        [data-embed-id] .chat-button,
        [data-embed-id] .open-chat-button,
        [data-embed-id] button[aria-label*="chat"],
        [data-embed-id] > button {
          bottom: 90px !important;
          right: 20px !important;
          width: 56px !important;
          height: 56px !important;
        }
        
        /* Force robot emoji on mobile */
        [data-embed-id] .chat-button::before,
        [data-embed-id] .open-chat-button::before {
          font-size: 24px !important;
        }
        
        /* Smaller chat window on mobile */
        [data-embed-id] .chat-window,
        [data-embed-id] iframe,
        [data-embed-id] .chat-container,
        #anythingllm-chat-window {
          width: calc(100vw - 32px) !important;
          max-width: 340px !important;
          height: 480px !important;
          right: 16px !important;
          bottom: 160px !important;
        }
        
        /* Adjust header padding on mobile */
        [data-embed-id] .chat-header,
        [data-embed-id] .header {
          padding: 16px !important;
        }
        
        /* Adjust logo size on mobile */
        [data-embed-id] .brand-logo,
        [data-embed-id] img[src*="fav"],
        [data-embed-id] img[src*="logo"],
        [data-embed-id] .header img {
          width: 48px !important;
          height: 48px !important;
        }
        
        /* Adjust font sizes for mobile */
        [data-embed-id] .chat-title,
        [data-embed-id] .assistant-name {
          font-size: 16px !important;
        }
      }
      
      /* Tablet responsive adjustments */
      @media (min-width: 769px) and (max-width: 1024px) {
        [data-embed-id] .chat-window,
        [data-embed-id] iframe,
        [data-embed-id] .chat-container,
        #anythingllm-chat-window {
          width: 380px !important;
          height: 550px !important;
          bottom: 165px !important;
        }
      }
      
      /* Large screen adjustments */
      @media (min-width: 1025px) {
        [data-embed-id] .chat-window,
        [data-embed-id] iframe,
        [data-embed-id] .chat-container,
        #anythingllm-chat-window {
          width: 420px !important;
          height: 620px !important;
          bottom: 170px !important;
        }
      }
      
      /* FORCE OVERRIDE any remaining AnythingLLM icons with our favicon */
      [data-embed-id] img:not([src*="fav.png"]):not([src*="logo.png"]) {
        content: url('https://www.kheyamind.ai/fav.png') !important;
        width: 40px !important;
        height: 40px !important;
        background: white !important;
        border-radius: 8px !important;
        padding: 4px !important;
        border: 2px solid #FFB703 !important;
      }
      
      /* Hide any remaining branding elements */
      [data-embed-id] [class*="brand"]:not(.brand-logo),
      [data-embed-id] [id*="anythingllm"],
      [data-embed-id] [class*="llm"] {
        display: none !important;
        visibility: hidden !important;
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
