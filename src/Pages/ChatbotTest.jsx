import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ChatbotTest = () => {
  const [status, setStatus] = useState('loading');
  const [debugInfo, setDebugInfo] = useState(['Initializing...']);
  const [widgetFound, setWidgetFound] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  const addDebugInfo = (message) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const forceChatbotOpen = () => {
    addDebugInfo('🔧 Attempting to force open chatbot...');
    
    // Method 1: Look for the actual widget content inside the embed
    const selectors = [
      '[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] button',
      '[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] *[role="button"]',
      '[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] div[onclick]',
      '[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .chat-button',
      '[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"] .widget-button',
      '[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"]',
      '.anythingllm-chat-widget button',
      '.anythingllm-widget button',
      '[class*="anythingllm"] button',
      'iframe[src*="anythingllm"]'
    ];
    
    let found = false;
    for (const selector of selectors) {
      const element = document.querySelector(selector);
      if (element) {
        addDebugInfo(`✅ Found element with selector: ${selector}`);
        addDebugInfo(`   Element type: ${element.tagName}, clickable: ${element.onclick ? 'yes' : 'no'}`);
        addDebugInfo(`   Element content: ${element.innerHTML ? element.innerHTML.substring(0, 100) + '...' : 'empty'}`);
        
        if (element.tagName === 'BUTTON' || element.onclick) {
          element.click();
          addDebugInfo('🖱️ Clicked on widget element');
          found = true;
          break;
        } else if (element.getAttribute('data-embed-id')) {
          // This is the main embed container, try to trigger it
          addDebugInfo('📱 Found embed container, trying to activate...');
          
          // Try clicking on the container itself
          element.click();
          
          // Try to find any child elements that might be clickable
          const clickableChildren = element.querySelectorAll('*');
          clickableChildren.forEach((child, index) => {
            if (child.onclick || child.tagName === 'BUTTON' || child.getAttribute('role') === 'button') {
              addDebugInfo(`🖱️ Clicking child element ${index}: ${child.tagName}`);
              child.click();
            }
          });
        }
      }
    }
    

  const inspectWidget = () => {
    addDebugInfo('🔍 Detailed widget inspection...');
    
    const widget = document.querySelector('[data-embed-id="b905d324-b48c-403f-bd1f-298de7708007"]');
    if (widget) {
      addDebugInfo(`📊 Widget details:`);
      addDebugInfo(`   Tag: ${widget.tagName}`);
      addDebugInfo(`   Classes: ${widget.className || 'none'}`);
      addDebugInfo(`   ID: ${widget.id || 'none'}`);
      addDebugInfo(`   Style display: ${widget.style.display || 'default'}`);
      addDebugInfo(`   Style visibility: ${widget.style.visibility || 'default'}`);
      addDebugInfo(`   Style opacity: ${widget.style.opacity || 'default'}`);
      addDebugInfo(`   Computed display: ${getComputedStyle(widget).display}`);
      addDebugInfo(`   Computed visibility: ${getComputedStyle(widget).visibility}`);
      addDebugInfo(`   Computed opacity: ${getComputedStyle(widget).opacity}`);
      addDebugInfo(`   Position: ${widget.offsetLeft}x${widget.offsetTop}, Size: ${widget.offsetWidth}x${widget.offsetHeight}`);
      addDebugInfo(`   Children count: ${widget.children.length}`);
      
      // Try to make it visible
      widget.style.display = 'block';
      widget.style.visibility = 'visible';
      widget.style.opacity = '1';
      widget.style.position = 'fixed';
      widget.style.bottom = '20px';
      widget.style.right = '20px';
      widget.style.zIndex = '9999';
      widget.style.backgroundColor = 'red'; // Temporary to make it visible
      widget.style.width = '60px';
      widget.style.height = '60px';
      
      addDebugInfo('🎨 Applied visibility styles to widget');
      
      // Check children
      Array.from(widget.children).forEach((child, index) => {
        addDebugInfo(`   Child ${index}: ${child.tagName} - ${child.className || 'no class'}`);
      });
    } else {
      addDebugInfo('❌ Widget element not found for inspection');
    }
  };

  const openIframeChat = () => {
    addDebugInfo('📱 Opening iframe chat interface...');
    setShowIframe(true);
  };
    if (!found) {
      addDebugInfo('❌ No clickable widget found');
      
      // Method 2: Try global functions
      if (window.AnythingLLM) {
        addDebugInfo('🌐 Found AnythingLLM global object');
        if (typeof window.AnythingLLM.open === 'function') {
          window.AnythingLLM.open();
          addDebugInfo('📞 Called AnythingLLM.open()');
        } else if (typeof window.AnythingLLM.toggle === 'function') {
          window.AnythingLLM.toggle();
          addDebugInfo('📞 Called AnythingLLM.toggle()');
        }
      } else {
        addDebugInfo('❌ No AnythingLLM global object found');
      }
      
      // Method 3: Dispatch custom events
      const events = ['anythingllm-open', 'chatbot-open', 'widget-toggle'];
      events.forEach(eventName => {
        window.dispatchEvent(new CustomEvent(eventName));
        addDebugInfo(`📡 Dispatched event: ${eventName}`);
      });
    }
  };
  
  const findChatbotWidget = () => {
    addDebugInfo('🔍 Scanning page for chatbot elements...');
    
    // Get all elements on the page
    const allElements = document.querySelectorAll('*');
    const chatbotElements = [];
    
    allElements.forEach((element, index) => {
      const hasEmbedId = element.hasAttribute('data-embed-id');
      const hasAnythingLLM = element.className.toLowerCase().includes('anythingllm') || 
                            element.id.toLowerCase().includes('anythingllm');
      const isChatWidget = element.className.toLowerCase().includes('chat') && 
                          element.className.toLowerCase().includes('widget');
      
      if (hasEmbedId || hasAnythingLLM || isChatWidget) {
        chatbotElements.push({
          index,
          tagName: element.tagName,
          className: element.className,
          id: element.id,
          embedId: element.getAttribute('data-embed-id'),
          visible: element.offsetWidth > 0 && element.offsetHeight > 0,
          position: {
            top: element.offsetTop,
            left: element.offsetLeft,
            width: element.offsetWidth,
            height: element.offsetHeight
          }
        });
      }
    });
    
    if (chatbotElements.length > 0) {
      addDebugInfo(`✅ Found ${chatbotElements.length} potential chatbot elements:`);
      chatbotElements.forEach((el, i) => {
        addDebugInfo(`   ${i+1}. ${el.tagName} - ${el.visible ? 'VISIBLE' : 'HIDDEN'} - ${el.className || 'no class'}`);
      });
    } else {
      addDebugInfo('❌ No chatbot elements found on page');
    }
    
    // Also check for iframes
    const iframes = document.querySelectorAll('iframe');
    if (iframes.length > 0) {
      addDebugInfo(`📱 Found ${iframes.length} iframes on page:`);
      iframes.forEach((iframe, i) => {
        addDebugInfo(`   ${i+1}. ${iframe.src || 'no src'} - ${iframe.style.display !== 'none' ? 'VISIBLE' : 'HIDDEN'}`);
      });
    }
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
              <li>2. Look for the chatbot widget (usually appears as a floating button in bottom-right)</li>
              <li>3. If you can't see the widget, use the "Force Open Chatbot" button below</li>
              <li>4. Click on the chatbot widget to open the chat interface</li>
              <li>5. Test sending a message to verify it's working</li>
            </ol>
          </div>
          
          <div className={`border-2 rounded-lg p-4 mb-8 font-bold ${getStatusClass()}`}>
            {getStatusMessage()}
          </div>
          
          {/* Manual chatbot trigger */}
          <div className="mb-8">
            <button
              onClick={forceChatbotOpen}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:transform hover:-translate-y-1 mr-4 mb-4"
            >
              🤖 Force Open Chatbot
            </button>
            <button
              onClick={findChatbotWidget}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:transform hover:-translate-y-1 mr-4 mb-4"
            >
              🔍 Find Widget
            </button>
            <button
              onClick={inspectWidget}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:transform hover:-translate-y-1 mr-4 mb-4"
            >
              🔬 Inspect Widget
            </button>
            <button
              onClick={openIframeChat}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:transform hover:-translate-y-1 mb-4"
            >
              📱 Open Iframe Chat
            </button>
          </div>
          
          <div className="bg-black/30 rounded-lg p-6 mb-8 text-left">
            <strong className="block mb-4">Debug Information:</strong>
            <div className="font-mono text-sm space-y-1">
              {debugInfo.map((info, index) => (
                <div key={index}>{info}</div>
              ))}
            </div>
          </div>
          
          {/* Direct iframe chat interface */}
          {showIframe && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-md h-96 flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                  <h3 className="font-bold text-gray-800">Chat with AI Assistant</h3>
                  <button
                    onClick={() => setShowIframe(false)}
                    className="text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ×
                  </button>
                </div>
                <iframe
                  src="https://llm.kheyamind.ai/api/embed/b905d324-b48c-403f-bd1f-298de7708007"
                  className="flex-1 border-0"
                  title="AI Chat Assistant"
                />
              </div>
            </div>
          )}
          
          {/* Widget detection results */}
          {widgetFound && (
            <div className="bg-green-900/50 border border-green-400 rounded-lg p-4 mb-8">
              <h3 className="text-green-300 font-bold mb-2">✅ Widget Detection Results:</h3>
              <p className="text-green-100">
                The AnythingLLM widget has been detected on the page. Look for a floating chat button, 
                usually in the bottom-right corner. If you can't see it, try the "Force Open Chatbot" button above.
              </p>
            </div>
          )}
          
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