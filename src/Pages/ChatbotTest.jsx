import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChatbotTest = () => {
  const [status, setStatus] = useState('loading');
  const [debugInfo, setDebugInfo] = useState(['Initializing...']);
  const [widgetFound, setWidgetFound] = useState(false);

  const addDebugInfo = (message) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    addDebugInfo('Page loaded, checking for chatbot script...');
    
    // Check if script is in DOM
    const scriptEl = document.querySelector('script[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"]');
    if (scriptEl) {
      addDebugInfo('✅ AnythingLLM script element found in DOM');
    } else {
      addDebugInfo('❌ AnythingLLM script element NOT found in DOM');
    }

    // Monitor for widget appearance
    let checkCount = 0;
    const maxChecks = 30; // Check for 30 seconds
    
    const checkForWidget = setInterval(() => {
      checkCount++;
      addDebugInfo(`Checking for widget... (${checkCount}/${maxChecks})`);
      
      // Look for various possible widget selectors
      const possibleSelectors = [
        '[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"]',
        '.anythingllm-chat-widget',
        '.anythingllm-widget',
        '[class*="anythingllm"]',
        '[id*="anythingllm"]'
      ];
      
      let found = false;
      
      for (const selector of possibleSelectors) {
        const widget = document.querySelector(selector);
        if (widget) {
          addDebugInfo(`✅ Widget found with selector: ${selector}`);
          setStatus('success');
          setWidgetFound(true);
          found = true;
          clearInterval(checkForWidget);
          break;
        }
      }
      
      if (!found && checkCount >= maxChecks) {
        addDebugInfo('❌ Widget not found after 30 seconds');
        setStatus('error');
        clearInterval(checkForWidget);
      }
    }, 1000);

    // Check for script load events
    const handleLoad = () => {
      addDebugInfo('Window load event fired');
      
      // Check for global variables that might be created by AnythingLLM
      setTimeout(() => {
        const globals = ['AnythingLLM', 'anythingllm', 'chatWidget'];
        globals.forEach(global => {
          if (window[global]) {
            addDebugInfo(`✅ Global variable found: ${global}`);
          }
        });
      }, 2000);
    };

    window.addEventListener('load', handleLoad);

    // Check network connectivity to the chatbot server
    fetch('https://llm.kheyamind.ai/api/embed')
      .then(response => {
        addDebugInfo(`✅ Server connectivity check: ${response.status}`);
      })
      .catch(error => {
        addDebugInfo(`❌ Server connectivity failed: ${error.message}`);
        setStatus('error');
      });

    return () => {
      clearInterval(checkForWidget);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const getStatusMessage = () => {
    switch (status) {
      case 'loading':
        return '🔄 Loading chatbot script...';
      case 'success':
        return '✅ Chatbot loaded successfully! Look for the chat widget on the page.';
      case 'error':
        return '❌ Chatbot failed to load. Check console for errors.';
      default:
        return 'Unknown status';
    }
  };

  const getStatusClass = () => {
    switch (status) {
      case 'loading':
        return 'bg-yellow-100 border-yellow-400 text-yellow-800';
      case 'success':
        return 'bg-green-100 border-green-400 text-green-800';
      case 'error':
        return 'bg-red-100 border-red-400 text-red-800';
      default:
        return 'bg-gray-100 border-gray-400 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            🤖 Chatbot Test Page
          </h1>
          <p className="text-xl mb-8">
            This page tests the AnythingLLM chatbot integration
          </p>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Test Instructions:</h2>
            <ol className="text-left max-w-2xl mx-auto space-y-2">
              <li>1. Wait for the chatbot script to load (status will update below)</li>
              <li>2. Look for the chatbot widget (usually appears as a floating button)</li>
              <li>3. Click on the chatbot widget to open the chat interface</li>
              <li>4. Test sending a message to verify it's working</li>
            </ol>
          </div>
          
          <div className={`border-2 rounded-lg p-4 mb-8 font-bold ${getStatusClass()}`}>
            {getStatusMessage()}
          </div>
          
          <div className="bg-black/30 rounded-lg p-6 mb-8 text-left">
            <strong className="block mb-4">Debug Information:</strong>
            <div className="font-mono text-sm space-y-1">
              {debugInfo.map((info, index) => (
                <div key={index}>{info}</div>
              ))}
            </div>
          </div>
          
          <Link 
            to="/" 
            className="inline-block bg-primary hover:bg-secondary text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:transform hover:-translate-y-1"
          >
            ← Back to Main Site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChatbotTest;