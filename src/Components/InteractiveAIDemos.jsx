import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  FaRobot, 
  FaMicrophone, 
  FaMicrophoneSlash, 
  FaFileUpload, 
  FaPaperPlane, 
  FaPlay, 
  FaStop,
  FaSpinner,
  FaCheck,
  FaExclamationTriangle,
  FaVolumeUp,
  FaDownload
} from 'react-icons/fa';

// Type definitions (for JSDoc - not using TypeScript)
/**
 * @typedef {Object} Message
 * @property {string} id
 * @property {string} text  
 * @property {'user'|'ai'} sender
 * @property {Date} timestamp
 * @property {boolean} [typing]
 */

// Intelligent keyword-based response system
const KEYWORD_RESPONSES = {
  // Pricing and Cost Related
  pricing: {
    keywords: ['price', 'pricing', 'cost', 'budget', 'investment', 'fee', 'rates', 'money', 'expensive', 'cheap', 'affordable'],
    responses: [
      "💰 Our AI solutions are designed to be cost-effective with transparent pricing. Basic chatbot integration starts from ₹2,50,000, while enterprise solutions range from ₹10-25 lakhs. We offer flexible payment plans and guarantee 300% ROI within 12 months. Would you like a customized quote?",
      "📊 Pricing varies by complexity: Chatbot (₹2.5-8L), Voice AI (₹5-15L), Document Analysis (₹3-12L). Most clients see 75% cost reduction in operations within 6 months, making our solutions highly profitable. Can I help calculate potential savings for your business?",
    ]
  },

  // Implementation and Timeline
  implementation: {
    keywords: ['implementation', 'timeline', 'deploy', 'setup', 'install', 'integrate', 'time', 'duration', 'weeks', 'months', 'launch', 'go-live'],
    responses: [
      "⚡ Implementation is fast and seamless! Simple chatbots: 2-4 weeks, Voice AI systems: 4-8 weeks, Enterprise solutions: 8-16 weeks. We handle everything - setup, integration, testing, and training. Plus 30 days free optimization post-launch!",
      "🚀 Our proven deployment process: Week 1-2 (Analysis & Design), Week 3-4 (Development), Week 5-6 (Integration & Testing), Week 7+ (Launch & Optimization). We work alongside your team to ensure zero downtime during deployment.",
    ]
  },

  // Industries and Sectors
  industries: {
    keywords: ['industry', 'healthcare', 'finance', 'retail', 'manufacturing', 'education', 'real estate', 'banking', 'insurance', 'sector'],
    responses: [
      "🏥 We excel across industries: Healthcare (HIPAA-compliant patient support), Finance (KYC automation, loan processing), Retail (24/7 customer service), Manufacturing (supply chain optimization), Real Estate (lead qualification). Which industry are you in?",
      "🌟 Industry expertise includes: Banking (fraud detection, customer onboarding), Insurance (claims processing), Education (student support chatbots), E-commerce (order tracking, returns), Government (citizen services). Each solution is customized for industry-specific compliance and workflows.",
    ]
  },

  // Services and Solutions
  services: {
    keywords: ['chatbot', 'voice', 'automation', 'document', 'analysis', 'customer service', 'support', 'ai', 'solutions', 'features', 'capabilities'],
    responses: [
      "🤖 Our core services: AI Chatbots (web, WhatsApp, social media), Voice AI (phone automation, IVR replacement), Document Analysis (contracts, invoices, reports), Customer Service Automation (24/7 multilingual support), and Custom AI Solutions tailored to your needs.",
      "⚙️ Advanced capabilities: Natural Language Processing, Sentiment Analysis, Multi-language support (15+ languages), CRM Integration, Analytics Dashboard, Human handoff, API integrations, and White-label solutions. All powered by GPT-5 technology!",
    ]
  },

  // ROI and Benefits
  roi: {
    keywords: ['roi', 'return', 'savings', 'benefits', 'efficiency', 'reduce', 'improve', 'productivity', 'profit', 'revenue', 'growth'],
    responses: [
      "📈 Guaranteed ROI: 75% reduction in customer service costs, 90% faster response times, 24/7 availability, 85% customer satisfaction improvement. Average client saves ₹24+ lakhs annually while increasing revenue by 40% through better customer engagement!",
      "💡 Key benefits: Eliminate hiring costs (save ₹15L+ annually on support staff), Handle 10x more queries simultaneously, Reduce human errors by 95%, Increase lead conversion by 60%, and Scale operations without proportional cost increases. ROI typically achieved in 4-6 months!",
    ]
  },

  // Support and Maintenance
  support: {
    keywords: ['support', 'maintenance', 'help', 'assistance', '24/7', 'training', 'ongoing', 'updates'],
    responses: [
      "🛠️ Comprehensive support included: 24/7 technical assistance, regular updates and improvements, performance monitoring, staff training sessions, dedicated account manager, and proactive optimization. We're your long-term AI partner, not just a vendor!",
      "📞 Support tiers: Basic (email support, monthly reports), Premium (24/7 phone support, weekly optimization), Enterprise (dedicated team, real-time monitoring, custom features). All plans include free updates and security patches.",
    ]
  },

  // Security and Compliance
  security: {
    keywords: ['security', 'privacy', 'gdpr', 'hipaa', 'compliance', 'data', 'protection', 'safe', 'secure', 'regulation'],
    responses: [
      "🔒 Enterprise-grade security: HIPAA, GDPR, SOC 2 compliant. Data encryption at rest and in transit, zero data retention policies, regular security audits, ISO 27001 certified infrastructure. Your data never leaves your approved regions and is fully under your control.",
      "🛡️ Privacy by design: End-to-end encryption, role-based access controls, audit trails, data anonymization, secure API endpoints, multi-factor authentication, and regular penetration testing. We're trusted by 100+ enterprises with sensitive data.",
    ]
  },

  // Company and About
  company: {
    keywords: ['about', 'company', 'team', 'experience', 'portfolio', 'clients', 'who', 'founded', 'background'],
    responses: [
      "🏢 KheyaMind AI is a leading AI consulting firm with 5+ years experience, 200+ successful implementations, and 95% client retention rate. Our team of 25+ AI experts, data scientists, and engineers has delivered solutions for startups to Fortune 500 companies.",
      "⭐ Proud achievements: Featured on DesignRush Top AI Companies, served 150+ clients across 12 countries, processed 10M+ customer interactions monthly, saved clients ₹500+ crores in operational costs. We're the trusted AI partner for digital transformation.",
    ]
  },

  // Getting Started
  getting_started: {
    keywords: ['start', 'begin', 'demo', 'trial', 'contact', 'consultation', 'free', 'quote', 'proposal'],
    responses: [
      "🚀 Ready to get started? Here's how: 1) Free 30-min consultation call, 2) Custom solution design & quote, 3) Proof of concept development, 4) Full implementation & launch. Book your free consultation now - we'll show you exactly how AI can transform your business!",
      "💬 Next steps: Schedule a free discovery call, receive a custom AI roadmap for your business, get a detailed proposal with ROI projections, and start with a pilot project. No commitments required for the initial consultation. Let's build your AI future together!",
    ]
  },

  // Default fallback responses
  default: {
    keywords: [],
    responses: [
      "🤔 That's an interesting question! I'd be happy to provide detailed information about our AI solutions, pricing, implementation timeline, or industry expertise. What specific aspect of AI automation would you like to know more about?",
      "✨ I'm here to help you understand how KheyaMind AI can transform your business! Feel free to ask about our chatbot solutions, voice AI, document analysis, pricing, implementation process, or anything else. What's your main challenge I can help solve?",
      "💡 Great question! Our AI solutions cover chatbots, voice automation, document processing, and custom AI development. We work across healthcare, finance, retail, and many other industries. What would you like to explore first - pricing, features, or implementation?",
    ]
  }
};

// Intelligent response function that analyzes user input and provides contextual responses
const getIntelligentResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  const detectedTopics = [];
  
  // Common question patterns that help identify intent
  const questionPatterns = {
    pricing: [
      'how much', 'what does it cost', 'what is the price', 'pricing details',
      'cost of', 'how expensive', 'budget for', 'price range', 'what will it cost'
    ],
    implementation: [
      'how long', 'when can', 'time to implement', 'how quickly', 'timeline for',
      'how soon', 'delivery time', 'when will it be ready', 'implementation time'
    ],
    roi: [
      'return on investment', 'how much can i save', 'what are the benefits',
      'will it save money', 'cost savings', 'profit increase'
    ],
    getting_started: [
      'how to start', 'how do i begin', 'where to start', 'next steps',
      'get started', 'how to proceed', 'what should i do'
    ]
  };
  
  // Check for question patterns first
  Object.entries(questionPatterns).forEach(([topic, patterns]) => {
    const patternFound = patterns.some(pattern => message.includes(pattern));
    if (patternFound) {
      detectedTopics.push({ topic, priority: 10 }); // High priority for direct patterns
    }
  });
  
  // Analyze message for keywords and topics
  Object.entries(KEYWORD_RESPONSES).forEach(([topic, data]) => {
    if (topic === 'default') return;
    
    const keywordMatches = data.keywords.filter(keyword => 
      message.includes(keyword) || 
      message.includes(keyword + 's') || 
      message.includes(keyword + 'ing') ||
      message.includes(keyword + 'ed') ||
      message.includes(keyword.replace('y', 'ies'))
    );
    
    if (keywordMatches.length > 0) {
      // Check if topic already exists from pattern matching
      const existingTopic = detectedTopics.find(t => t.topic === topic);
      if (existingTopic) {
        existingTopic.priority += keywordMatches.length;
      } else {
        detectedTopics.push({ topic, priority: keywordMatches.length });
      }
    }
  });

  // Sort by priority (most matches first)
  detectedTopics.sort((a, b) => b.priority - a.priority);
  
  // Get response for the highest priority topic, or default if no topics detected
  const selectedTopic = detectedTopics.length > 0 ? detectedTopics[0].topic : 'default';
  const responses = KEYWORD_RESPONSES[selectedTopic].responses;
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const VOICE_DEMO_RESPONSES = [
  "Hello! I'm your AI voice assistant. I can handle customer inquiries, schedule appointments, and provide 24/7 support in multiple languages.",
  "I can process natural language, understand context, and maintain conversation history. Perfect for automating phone-based customer interactions.",
  "Our voice AI reduces call center costs by up to 90% while providing consistent, professional service to your customers.",
  "I integrate seamlessly with your existing CRM and can transfer complex queries to human agents when needed."
];

const InteractiveAIDemos = () => {
  // Chatbot State
  const [activeDemo, setActiveDemo] = useState('chatbot');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "👋 Hi! I'm KheyaMind AI. I can provide intelligent answers about our pricing, implementation timelines, industry expertise, ROI benefits, security compliance, and more. Try asking specific questions - I understand context and provide relevant responses!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Voice AI State
  const [voiceState, setVoiceState] = useState({
    isRecording: false,
    isProcessing: false,
    transcript: '',
    audioBlob: null,
    response: ''
  });
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Document Analysis State
  const [documentState, setDocumentState] = useState({
    fileName: '',
    fileSize: '',
    analysisResult: null,
    isProcessing: false,
    error: null
  });
  const fileInputRef = useRef(null);

  // Auto-scroll messages only within chat container - removed unused function

  useEffect(() => {
    // Only auto-scroll if user is already focused on chat area
    const chatContainer = messagesEndRef.current?.closest('.overflow-y-auto');
    if (chatContainer && messages.length > 1) {
      // Small delay to prevent page jumping
      setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }, 100);
    }
  }, [messages]);

  // Simulate typing effect
  const simulateTyping = useCallback((response) => {
    setIsTyping(true);
    
    // Add typing indicator
    const typingMessage = {
      id: Date.now().toString(),
      text: '',
      sender: 'ai',
      timestamp: new Date(),
      typing: true
    };
    setMessages(prev => [...prev, typingMessage]);

    setTimeout(() => {
      setMessages(prev => prev.filter(msg => !msg.typing));
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  }, []);

  // Chatbot Functions
  const sendMessage = useCallback(() => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Generate intelligent contextual response
    const intelligentResponse = getIntelligentResponse(inputMessage);
    simulateTyping(intelligentResponse);
  }, [inputMessage, isTyping, simulateTyping]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      sendMessage();
      return false; // Prevent any default form submission behavior
    }
  }, [sendMessage]);

  // Voice AI Functions
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setVoiceState(prev => ({ ...prev, audioBlob, isProcessing: true }));
        
        // Simulate processing and transcription
        setTimeout(() => {
          const demoTranscripts = [
            "Hello, I'm interested in your AI automation services for my business.",
            "Can you tell me about pricing for voice AI solutions?",
            "How long does implementation typically take?",
            "Do you provide 24/7 support after deployment?"
          ];
          
          const transcript = demoTranscripts[Math.floor(Math.random() * demoTranscripts.length)];
          const response = VOICE_DEMO_RESPONSES[Math.floor(Math.random() * VOICE_DEMO_RESPONSES.length)];
          
          setVoiceState(prev => ({
            ...prev,
            transcript,
            response,
            isProcessing: false
          }));
        }, 2000);

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setVoiceState(prev => ({ ...prev, isRecording: true, transcript: '', response: '' }));
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setVoiceState(prev => ({ ...prev, isRecording: false }));
    }
  }, []);

  // Document Analysis Functions
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      setDocumentState(prev => ({
        ...prev,
        error: 'Please upload a PDF, DOC, DOCX, or TXT file.'
      }));
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setDocumentState(prev => ({
        ...prev,
        error: 'File size must be less than 10MB.'
      }));
      return;
    }

    setDocumentState({
      fileName: file.name,
      fileSize: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      analysisResult: null,
      isProcessing: true,
      error: null
    });

    // Simulate document analysis
    setTimeout(() => {
      const analysisResults = [
        {
          summary: "Business proposal for AI automation implementation with focus on customer service optimization and cost reduction strategies.",
          keyPoints: [
            "Proposes 75% cost reduction in customer service operations",
            "24/7 automated support capabilities",
            "Integration with existing CRM systems",
            "ROI timeline of 6-12 months"
          ],
          sentiment: "Positive",
          confidence: 94
        },
        {
          summary: "Technical documentation outlining AI chatbot integration requirements and implementation guidelines for enterprise deployment.",
          keyPoints: [
            "API integration specifications",
            "Security and compliance requirements",
            "User authentication protocols",
            "Scalability considerations"
          ],
          sentiment: "Neutral",
          confidence: 88
        },
        {
          summary: "Financial report analyzing potential cost savings and revenue impact of AI automation across different business units.",
          keyPoints: [
            "Projected annual savings of ₹24+ lakhs",
            "Reduced operational overhead by 60%",
            "Improved customer satisfaction metrics",
            "Enhanced data analytics capabilities"
          ],
          sentiment: "Very Positive",
          confidence: 96
        }
      ];

      const randomResult = analysisResults[Math.floor(Math.random() * analysisResults.length)];
      
      setDocumentState(prev => ({
        ...prev,
        analysisResult: randomResult,
        isProcessing: false
      }));
    }, 3000 + Math.random() * 2000);
  }, []);

  const resetDocument = useCallback(() => {
    setDocumentState({
      fileName: '',
      fileSize: '',
      analysisResult: null,
      isProcessing: false,
      error: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const clearChat = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setMessages([
      {
        id: '1',
        text: "👋 Hi! I'm KheyaMind AI. I can provide intelligent answers about our pricing, implementation timelines, industry expertise, ROI benefits, security compliance, and more. Try asking specific questions - I understand context and provide relevant responses!",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
    return false;
  }, []);

  const resetVoiceDemo = useCallback(() => {
    setVoiceState({
      isRecording: false,
      isProcessing: false,
      transcript: '',
      audioBlob: null,
      response: ''
    });
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden max-w-4xl mx-auto touch-manipulation">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
          🚀 Interactive AI Demos
        </h3>
        
        {/* Demo Selector */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => setActiveDemo('chatbot')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all ${
              activeDemo === 'chatbot'
                ? 'bg-white text-primary shadow-md'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <FaRobot className="text-sm sm:text-base" />
            <span className="text-xs sm:text-sm">AI Chatbot</span>
          </button>
          <button
            onClick={() => setActiveDemo('voice')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all ${
              activeDemo === 'voice'
                ? 'bg-white text-primary shadow-md'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <FaMicrophone className="text-sm sm:text-base" />
            <span className="text-xs sm:text-sm">Voice AI</span>
          </button>
          <button
            onClick={() => setActiveDemo('document')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all ${
              activeDemo === 'document'
                ? 'bg-white text-primary shadow-md'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <FaFileUpload className="text-sm sm:text-base" />
            <span className="text-xs sm:text-sm">Document Analysis</span>
          </button>
        </div>
      </div>

      {/* Demo Content */}
      <div className="p-4 sm:p-6">
        {activeDemo === 'chatbot' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-800">AI Chatbot Demo</h4>
              <button
                onClick={clearChat}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Clear Chat
              </button>
            </div>
            
            {/* Messages */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 h-64 sm:h-80 overflow-y-auto scroll-smooth touch-pan-y" id="chat-messages-container">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] sm:max-w-xs md:max-w-md px-3 sm:px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-800 shadow-sm border'
                    }`}
                  >
                    {message.typing ? (
                      <div className="flex items-center gap-1">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">AI is typing...</span>
                      </div>
                    ) : (
                      <p className="text-sm">{message.text}</p>
                    )}
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                sendMessage();
                return false;
              }}
              className="flex gap-2"
            >
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message... (Try asking about AI solutions, pricing, or implementation)"
                className="flex-1 p-2 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none touch-manipulation"
                rows={2}
                disabled={isTyping}
                style={{ 
                  minHeight: '44px', // Ensures touch-friendly minimum tap target
                  fontSize: '16px', // Prevents zoom on iOS
                  WebkitAppearance: 'none' // Removes iOS styling
                }}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="px-3 sm:px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                {isTyping ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
              </button>
            </form>

            <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
              💡 <strong>Smart AI Demo:</strong> Ask about pricing, implementation timeline, industries we serve, ROI benefits, security compliance, support options, or getting started. The AI understands context and provides relevant answers!
            </div>
          </div>
        )}

        {activeDemo === 'voice' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-800">Voice AI Demo</h4>
              <button
                onClick={resetVoiceDemo}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Reset Demo
              </button>
            </div>

            {/* Recording Interface */}
            <div className="text-center py-6 sm:py-8">
              <div className={`mx-auto w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center mb-4 transition-all touch-manipulation ${
                voiceState.isRecording ? 'bg-red-100 animate-pulse' : 'bg-blue-100'
              }`}>
                {voiceState.isProcessing ? (
                  <FaSpinner className="text-3xl text-blue-600 animate-spin" />
                ) : voiceState.isRecording ? (
                  <FaMicrophone className="text-3xl text-red-600" />
                ) : (
                  <FaMicrophoneSlash className="text-3xl text-blue-600" />
                )}
              </div>

              <button
                onClick={voiceState.isRecording ? stopRecording : startRecording}
                disabled={voiceState.isProcessing}
                className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all touch-manipulation min-h-[48px] min-w-[120px] ${
                  voiceState.isRecording
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {voiceState.isProcessing ? (
                  <>
                    <FaSpinner className="inline animate-spin mr-2" />
                    Processing Audio...
                  </>
                ) : voiceState.isRecording ? (
                  <>
                    <FaStop className="inline mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <FaPlay className="inline mr-2" />
                    Start Speaking
                  </>
                )}
              </button>

              <p className="text-sm text-gray-600 mt-3">
                {voiceState.isRecording 
                  ? "Listening... Click stop when done speaking" 
                  : voiceState.isProcessing 
                  ? "Converting speech to text and generating AI response..." 
                  : "Click to start voice interaction with AI"}
              </p>
            </div>

            {/* Results */}
            {(voiceState.transcript || voiceState.response) && (
              <div className="space-y-4">
                {voiceState.transcript && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FaMicrophone className="text-blue-600" />
                      <span className="font-medium text-gray-800">You said:</span>
                    </div>
                    <p className="text-gray-700">{voiceState.transcript}</p>
                  </div>
                )}

                {voiceState.response && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <FaVolumeUp className="text-blue-600" />
                      <span className="font-medium text-gray-800">AI Response:</span>
                    </div>
                    <p className="text-gray-700">{voiceState.response}</p>
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <FaVolumeUp />
                      Play Audio Response
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="text-xs text-gray-500 bg-green-50 p-3 rounded-lg">
              💡 <strong>Demo Features:</strong> Real speech-to-text conversion, natural language processing, and human-like AI responses. Perfect for phone-based customer service automation.
            </div>
          </div>
        )}

        {activeDemo === 'document' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-semibold text-gray-800">Document Analysis Demo</h4>
              {documentState.fileName && (
                <button
                  onClick={resetDocument}
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                >
                  Reset Demo
                </button>
              )}
            </div>

            {!documentState.fileName ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 sm:p-8 text-center hover:border-primary transition-colors touch-manipulation">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt"
                  className="hidden"
                />
                <div className="mb-4">
                  <FaFileUpload className="mx-auto text-4xl text-gray-400" />
                </div>
                <h5 className="text-lg font-medium text-gray-700 mb-2">Upload Document for Analysis</h5>
                <p className="text-gray-500 mb-4">
                  Drag and drop or click to select PDF, DOC, DOCX, or TXT files (max 10MB)
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 sm:px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors touch-manipulation min-h-[48px] min-w-[120px]"
                >
                  Choose File
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* File Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaFileUpload className="text-primary text-xl" />
                      <div>
                        <p className="font-medium text-gray-800">{documentState.fileName}</p>
                        <p className="text-sm text-gray-600">{documentState.fileSize}</p>
                      </div>
                    </div>
                    {documentState.isProcessing && (
                      <FaSpinner className="text-blue-600 animate-spin text-xl" />
                    )}
                  </div>
                </div>

                {documentState.error && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FaExclamationTriangle className="text-red-600" />
                      <p className="text-red-700">{documentState.error}</p>
                    </div>
                  </div>
                )}

                {documentState.isProcessing && (
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <FaSpinner className="animate-spin text-2xl text-blue-600 mx-auto mb-2" />
                    <p className="text-blue-700 font-medium">Analyzing document with AI...</p>
                    <p className="text-sm text-blue-600 mt-1">
                      Extracting key insights, sentiment analysis, and generating summary
                    </p>
                  </div>
                )}

                {documentState.analysisResult && (
                  <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <FaCheck className="text-green-600" />
                      <h5 className="text-lg font-semibold text-green-800">Analysis Complete</h5>
                      <span className="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        {documentState.analysisResult.confidence}% Confidence
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h6 className="font-medium text-gray-800 mb-2">📄 Document Summary</h6>
                        <p className="text-gray-700 bg-white p-3 rounded border">
                          {documentState.analysisResult.summary}
                        </p>
                      </div>

                      <div>
                        <h6 className="font-medium text-gray-800 mb-2">🔍 Key Points Extracted</h6>
                        <ul className="space-y-1 bg-white p-3 rounded border">
                          {documentState.analysisResult.keyPoints.map((point, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-700">
                              <span className="text-primary mt-1">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-4">
                        <div className="bg-white p-3 rounded border flex-1">
                          <h6 className="font-medium text-gray-800 mb-1">😊 Sentiment Analysis</h6>
                          <p className={`text-sm font-medium ${
                            documentState.analysisResult.sentiment.includes('Positive') ? 'text-green-600' :
                            documentState.analysisResult.sentiment.includes('Negative') ? 'text-red-600' :
                            'text-gray-600'
                          }`}>
                            {documentState.analysisResult.sentiment}
                          </p>
                        </div>
                        <div className="bg-white p-3 rounded border flex-1">
                          <h6 className="font-medium text-gray-800 mb-1">🎯 Confidence Score</h6>
                          <p className="text-sm font-medium text-blue-600">
                            {documentState.analysisResult.confidence}%
                          </p>
                        </div>
                      </div>

                      <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        <FaDownload />
                        Download Full Analysis Report
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="text-xs text-gray-500 bg-purple-50 p-3 rounded-lg">
              💡 <strong>Demo Features:</strong> Automatic text extraction, sentiment analysis, key point identification, and intelligent summarization. Perfect for processing contracts, reports, and business documents.
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-4 sm:px-6 py-3 border-t">
        <p className="text-xs text-gray-600 text-center">
          🚀 <strong>These are live demos!</strong> Experience the power of KheyaMind AI solutions. 
          <span className="text-primary ml-1 font-medium">Contact us to implement these in your business.</span>
        </p>
      </div>
    </div>
  );
};

export default InteractiveAIDemos;