import React, { useState, useRef, useEffect } from 'react';
import { hackathonService } from '../services/hackathonService';
import { articleService } from '../services/articleService';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Orbiton, your TechOrbit assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const generateResponse = async (input) => {
    const lowerInput = input.toLowerCase();

    try {
      if (lowerInput.includes('hackathon') || lowerInput.includes('event')) {
        const hackathons = await hackathonService.getAllHackathons();
        if (!hackathons || hackathons.length === 0) {
          return "There are currently no upcoming hackathons scheduled. Please check back later!";
        }

        const upcoming = hackathons.slice(0, 3).map((h, i) =>
          `${i + 1}. ${h.hackathon_name} (Starts: ${h.start_date})`
        ).join('\n');

        return `Here are some upcoming hackathons on TechOrbit:\n${upcoming}\n\nWould you like to register for any of these?`;
      }

      if (lowerInput.includes('news') || lowerInput.includes('update')) {
        const articles = await articleService.getAllArticles();
        if (!articles || articles.length === 0) {
          return "There are currently no news articles available.";
        }

        const latest = articles.slice(0, 5).map((a, i) =>
          `${i + 1}. ${a.title}`
        ).join('\n');

        return `Here are the top 5 latest tech news headlines:\n${latest}`;
      }

      if (lowerInput.includes('founder') || lowerInput.includes('creator') || lowerInput.includes('cofounder')) {
        return "TechOrbit was founded by **Sai Harshith** and **Siddharth**, visionaries dedicated to building communities and fostering technological growth among students.";
      }

      if (lowerInput.includes('time') || lowerInput.includes('date')) {
        return `The current date and time is: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST).`;
      }

      if (lowerInput.includes('techorbit') || lowerInput.includes('what is')) {
        return "TechOrbit is a comprehensive platform that bridges the gap between students and colleges. We streamline hackathon management and foster innovation.";
      }

      if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        return "Hello! I'm Orbiton. How can I help you today?";
      }

      return "I'm here to help with TechOrbit, hackathons, and tech news. Could you please clarify your question?";
    } catch (error) {
      console.error("Chatbot Error:", error);
      return "I'm having trouble connecting to the server right now. Please try again later.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay (0.4s as requested)
    setTimeout(async () => {
      const responseText = await generateResponse(currentInput);
      const botResponse = {
        text: responseText,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div
          className="bg-white rounded-2xl shadow-2xl w-[350px] mb-4 overflow-hidden border border-blue-200 flex flex-col h-[450px] animate-in fade-in zoom-in duration-300"
          style={{
            position: 'fixed',
            bottom: '7.5rem',
            right: '1.5rem'
          }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-900 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-lg">Orbiton</h3>
                <p className="text-xs text-blue-100">Your Tech Guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-blue-100 focus:outline-none transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 mr-2 flex-shrink-0 mt-1">
                    <span className="text-lg">🤖</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-2 rounded-xl text-sm shadow-sm whitespace-pre-wrap ${msg.sender === 'user'
                      ? 'bg-blue-500 text-white ml-auto'
                      : 'bg-gray-200 text-gray-700 mr-auto'
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="mb-3 flex justify-start animate-in slide-in-from-bottom-2 fade-in duration-200">
                <div className="w-6 h-6 mr-2 flex-shrink-0 mt-1">
                  <span className="text-lg">🤖</span>
                </div>
                <div className="bg-gray-200 text-gray-500 rounded-xl p-2 text-sm shadow-sm italic flex items-center space-x-1">
                  <span>Orbiton is typing</span>
                  <span className="flex space-x-1">
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1 h-1 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-sm transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-2 rounded-full text-white transition-all ${inputText.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button with Orbit Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-[50px] h-[50px] bg-gradient-to-r from-blue-500 to-blue-900 text-white rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-110 focus:outline-none flex items-center justify-center group animate-pulse relative"
          style={{
            animation: 'float 3s ease-in-out infinite, pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        >
          {/* Tooltip */}
          <span className="absolute right-full mr-3 bg-gray-800 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Chat with Orbiton 🤖
          </span>

          {/* Orbit SVG Icon */}
          <svg
            className="w-7 h-7"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer orbit ring */}
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.6"
            />
            {/* Inner orbit ring */}
            <circle
              cx="12"
              cy="12"
              r="6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.4"
            />
            {/* Center planet/core */}
            <circle
              cx="12"
              cy="12"
              r="2.5"
              fill="currentColor"
            />
            {/* Orbiting dots */}
            <circle
              cx="12"
              cy="3"
              r="1.5"
              fill="currentColor"
            />
            <circle
              cx="21"
              cy="12"
              r="1.5"
              fill="currentColor"
            />
            <circle
              cx="12"
              cy="21"
              r="1.5"
              fill="currentColor"
            />
          </svg>
        </button>
      )}

      {/* Keyframe animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes slide-in-from-bottom-2 {
          from {
            transform: translateY(0.5rem);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-in {
          animation-fill-mode: both;
        }
        
        .slide-in-from-bottom-2 {
          animation: slide-in-from-bottom-2 0.3s ease-out;
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .zoom-in {
          animation: zoomIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes zoomIn {
          from {
            transform: scale(0.95);
          }
          to {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
