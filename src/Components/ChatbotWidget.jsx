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
  // CHATBOT DISABLED - Only WhatsApp widget will be active
  return null;

  // Commented out for Phase 1 SEO implementation
  // const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
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
    script.setAttribute('data-button-color', '#667eea'); // Primary brand color
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
    
    // Additional whitelabeling attributes
    script.setAttribute('data-brand-name', 'KheyaMind AI');
    script.setAttribute('data-brand-logo', 'https://www.kheyamind.ai/logo.png');
    script.setAttribute('data-chat-icon', 'robot');
    script.setAttribute('data-title', 'KheyaMind AI Assistant');
    script.setAttribute('data-subtitle', 'Your Intelligent AI Companion');
    script.setAttribute('data-powered-by', 'false');
    script.setAttribute('data-show-brand', 'true');
    
    script.src = 'https://llm.kheyamind.ai/embed/anythingllm-chat-widget.min.js';
    script.addEventListener('load', handleWidgetLoad);
    
    // Add enhanced custom CSS for modern AI styling
    const customStyle = document.createElement('style');
    customStyle.textContent = `
      /* Enhanced AI-focused styling for AnythingLLM widget with maximum specificity */
      
      /* Widget container positioning */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] {
        z-index: 1000 !important;
      }
      
      /* Chat button container positioning - more specific selector */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] > div:first-child,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] > div {
        bottom: 160px !important;
        right: 20px !important;
        z-index: 999 !important;
        position: fixed !important;
      }
      
      /* Ultra-specific selectors for the chat button itself */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-button,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] div button,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] div .chat-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        border: none !important;
        border-radius: 50% !important;
        width: 64px !important;
        height: 64px !important;
        min-width: 64px !important;
        min-height: 64px !important;
        max-width: 64px !important;
        max-height: 64px !important;
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4) !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        position: relative !important;
        overflow: visible !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        color: white !important;
        font-size: 0 !important; /* Hide any text content */
        text-indent: -9999px !important; /* Hide any text content */
      }
      
      /* Ultra-aggressive content hiding - target all possible elements */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button *,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-button *,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button span,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-button span,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button div,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-button div {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        width: 0 !important;
        height: 0 !important;
        position: absolute !important;
        left: -9999px !important;
      }
      
      /* Hide SVG icons and all graphics */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] svg,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] img,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] icon,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .icon,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button svg,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button img {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
      }
      
      /* Force empty button content and add robot via multiple methods */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-button {
        text-align: center !important;
      }
      
      /* Method 1: ::before pseudo-element with robot */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button::before {
        content: '' !important;
        position: absolute !important;
        top: -2px !important;
        left: -2px !important;
        right: -2px !important;
        bottom: -2px !important;
        border-radius: 50% !important;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        opacity: 0.4 !important;
        animation: ai-pulse 3s ease-in-out infinite !important;
        z-index: -1 !important;
        pointer-events: none !important;
      }
      
      /* Method 2: ::after pseudo-element with robot icon */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button::after,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-button::after {
        content: '🤖' !important;
        position: absolute !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        font-size: 28px !important;
        z-index: 100 !important;
        pointer-events: none !important;
        filter: brightness(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.1)) !important;
        display: block !important;
        text-indent: 0 !important;
        line-height: 1 !important;
        font-weight: normal !important;
        font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif !important;
      }
      
      /* Hover effects with high specificity */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button:hover,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-button:hover {
        transform: translateY(-4px) scale(1.08) !important;
        box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6) !important;
        background: linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important;
      }
      
      /* Enhanced hover effect for the robot icon */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button:hover::after,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-button:hover::after {
        transform: translate(-50%, -50%) scale(1.1) !important;
        filter: brightness(1.3) drop-shadow(0 4px 8px rgba(0,0,0,0.2)) !important;
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
      
      /* Modern AI chat window styling with high specificity */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-window {
        border: 2px solid transparent !important;
        background: linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box !important;
        border-radius: 16px !important;
        box-shadow: 0 20px 60px rgba(102, 126, 234, 0.25) !important;
        backdrop-filter: blur(20px) !important;
        overflow: hidden !important;
        z-index: 1001 !important;
      }
      
      /* When chat window is open, hide WhatsApp button to prevent overlap */
      body:has(div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-window) .fixed.bottom-24.right-8,
      body:has(div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"][style*="block"]) .fixed.bottom-24.right-8 {
        opacity: 0 !important;
        pointer-events: none !important;
        transform: translateX(100px) !important;
        transition: all 0.3s ease !important;
      }
      
      /* Alternative approach: Move WhatsApp button when chat is open */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] ~ * .fixed.bottom-24.right-8 {
        transform: translateY(-100px) !important;
        transition: transform 0.3s ease !important;
      }
      
      /* AI-themed header with gradient */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        color: white !important;
        padding: 20px 16px !important;
        border-bottom: none !important;
        position: relative !important;
      }
      
      /* AI header effects */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-header::after {
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
        background: #ffffff !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 18px 18px 18px 4px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05) !important;
        position: relative !important;
        padding: 12px 16px !important;
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
      
      /* WHITELABELING AND BRANDING OVERRIDES */
      
      /* Hide AnythingLLM branding and replace with KheyaMind AI */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [class*="anythingllm"],
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [data-text*="anythingllm"],
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [alt*="anythingllm"],
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [title*="anythingllm"] {
        display: none !important;
        visibility: hidden !important;
      }
      
      /* Replace AnythingLLM text with KheyaMind AI */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [class*="brand"],
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [class*="title"],
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [class*="header"] h1,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [class*="header"] h2,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [class*="header"] h3 {
        font-family: inherit !important;
      }
      
      /* Custom logo styling */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [class*="logo"],
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [class*="brand-image"],
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] img[src*="logo"] {
        max-width: 120px !important;
        max-height: 40px !important;
        object-fit: contain !important;
      }
      
      /* Force button color override with higher specificity */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [role="button"],
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-toggle,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .open-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        background-color: #667eea !important;
        border: none !important;
      }
      
      /* Remove powered by text */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [class*="powered"],
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [class*="sponsor"],
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [class*="footer"] small,
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] [class*="attribution"] {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        overflow: hidden !important;
      }
      
      /* Ensure header shows KheyaMind branding */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-header [class*="brand-name"],
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-header [class*="title"] {
        color: white !important;
        font-weight: 600 !important;
      }
      
      /* Additional button styling reinforcement */
      div[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] > div:first-child button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
        background-color: #667eea !important;
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4) !important;
      }
    `;
    
    // Add the script to the document head
    document.head.appendChild(script);
    
    // Add custom styles immediately and with delay
    document.head.appendChild(customStyle);
    
    // Also apply styles after delay to override AnythingLLM defaults
    setTimeout(() => {
      // Re-inject styles to ensure they take precedence
      if (customStyle.parentNode) {
        customStyle.parentNode.removeChild(customStyle);
      }
      document.head.appendChild(customStyle);
      
      // Force a style recalculation
      const widgets = document.querySelectorAll('[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"]');
      widgets.forEach(widget => {
        widget.style.display = 'none';
        // eslint-disable-next-line no-unused-expressions
        widget.offsetHeight; // Trigger reflow
        widget.style.display = '';
      });
    }, 2000);
    
    // Use MutationObserver to apply styles when widget DOM is created
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const widget = node.querySelector && node.querySelector('[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"]');
            if (widget || (node.getAttribute && node.getAttribute('data-embed-id') === 'b905d324-b48c-403f-bd1f-298de7708007')) {
              // Widget detected, re-apply our styles
              setTimeout(() => {
                if (customStyle.parentNode) {
                  customStyle.parentNode.removeChild(customStyle);
                }
                document.head.appendChild(customStyle);
                
                // Handle WhatsApp button overlap
                handleWhatsAppButtonOverlap();
                
                // Force robot icon to show
                forceRobotIcon();
              }, 100);
            }
          }
        });
        
        // Check for chat window opening/closing
        const chatWindow = document.querySelector('[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-window');
        if (chatWindow) {
          handleWhatsAppButtonOverlap();
        }
      });
    });
    
    // Function to handle WhatsApp button overlap
    const handleWhatsAppButtonOverlap = () => {
      const chatWindow = document.querySelector('[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-window');
      const whatsappButton = document.querySelector('.fixed.bottom-24.right-8') || 
                           document.querySelector('[class*="bottom-24"][class*="right-8"]');
      
      if (whatsappButton) {
        if (chatWindow && chatWindow.style.display !== 'none') {
          // Chat is open - hide or move WhatsApp button
          whatsappButton.style.transform = 'translateX(100px)';
          whatsappButton.style.opacity = '0';
          whatsappButton.style.pointerEvents = 'none';
          whatsappButton.style.transition = 'all 0.3s ease';
        } else {
          // Chat is closed - restore WhatsApp button
          whatsappButton.style.transform = '';
          whatsappButton.style.opacity = '';
          whatsappButton.style.pointerEvents = '';
        }
      }
    };
    
    // Function to aggressively force robot icon to show
    const forceRobotIcon = () => {
      const chatButtons = document.querySelectorAll('[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button, [data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-button');
      
      chatButtons.forEach(button => {
        // Clear all inner content
        const children = button.querySelectorAll('*');
        children.forEach(child => {
          child.style.display = 'none';
          child.style.visibility = 'hidden';
          child.style.opacity = '0';
        });
        
        // Set button text content to empty and add data attribute
        button.innerHTML = '';
        button.textContent = '';
        button.setAttribute('data-custom-icon', 'robot');
        
        // Force styles
        button.style.fontSize = '0';
        button.style.textIndent = '-9999px';
        button.style.position = 'relative';
        
        // Add robot emoji directly via text content as fallback
        if (!button.querySelector('::after')) {
          button.setAttribute('aria-label', '🤖 AI Assistant');
          button.title = '🤖 AI Assistant';
        }
      });
    };
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Continuous monitoring to ensure our customizations stick
    const monitoringInterval = setInterval(() => {
      const chatButton = document.querySelector('[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button');
      if (chatButton && (chatButton.textContent.includes('+') || chatButton.innerHTML.includes('+'))) {
        forceRobotIcon();
        // Re-apply styles if needed
        if (customStyle.parentNode) {
          customStyle.parentNode.removeChild(customStyle);
        }
        document.head.appendChild(customStyle);
      }
      handleWhatsAppButtonOverlap();
    }, 1000); // Check every second
    
    // Add performance optimization and error handling
    script.onerror = () => {
      console.warn('KheyaMind AI Widget failed to load');
    };

    // Cleanup function to remove script when component unmounts
    return () => {
      observer.disconnect();
      clearInterval(monitoringInterval);
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