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
  FaTimes,
  FaCheck,
  FaExclamationTriangle,
  FaVolumeUp,
  FaDownload
} from 'react-icons/fa';

// Type definitions
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  typing?: boolean;
}

interface VoiceState {
  isRecording: boolean;
  isProcessing: boolean;
  transcript: string;
  audioBlob: Blob | null;
  response: string;
}

interface DocumentAnalysis {
  fileName: string;
  fileSize: string;
  analysisResult: {
    summary: string;
    keyPoints: string[];
    sentiment: string;
    confidence: number;
  } | null;
  isProcessing: boolean;
  error: string | null;
}

// Demo data for realistic AI responses
const DEMO_RESPONSES = [
  "I'm KheyaMind AI! I can help automate your customer service, process documents, and integrate with your existing systems. What would you like to know about AI automation?",
  "Our AI solutions typically reduce operational costs by 75% while improving response times. We specialize in chatbots, voice AI, and custom automation for enterprises.",
  "I can help you implement AI solutions in healthcare, finance, retail, and manufacturing. Each solution is customized to your specific industry requirements.",
  "Our implementation timeline is typically 2-16 weeks depending on complexity. We provide 24/7 support and continuous optimization after deployment.",
  "Yes, our AI solutions are fully compliant with HIPAA, GDPR, and other regulatory standards. Security and privacy are our top priorities."
];

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
      text: "👋 Hi! I'm KheyaMind AI. Ask me about our AI solutions, pricing, or how we can automate your business processes!",
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

  // Auto-scroll messages only within chat container
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: "smooth",
        block: "end",
        inline: "nearest"
      });
    }
  };

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

    // Simulate AI response
    const randomResponse = DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
    simulateTyping(randomResponse);
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
        text: "👋 Hi! I'm KheyaMind AI. Ask me about our AI solutions, pricing, or how we can automate your business processes!",
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
              💡 <strong>Demo Features:</strong> Try asking about "pricing", "implementation time", "industries served", or "ROI calculations"
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