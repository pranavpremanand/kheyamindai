import React, { useEffect } from "react";

const ChatbotWidget = () => {
  useEffect(() => {
    // Create and inject the AnythingLLM script
    const script = document.createElement('script');
    script.setAttribute('data-embed-id', 'b905d324-b48c-403f-bd1f-298de7708007');
    script.setAttribute('data-base-api-url', 'https://llm.kheyamind.ai/api/embed');
    script.src = 'https://llm.kheyamind.ai/embed/anythingllm-chat-widget.min.js';
    
    // Add the script to the document head
    document.head.appendChild(script);
    
    // Cleanup function to remove script when component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // This component doesn't render anything visible - the AnythingLLM script handles the UI
  return null;
};

export default ChatbotWidget;