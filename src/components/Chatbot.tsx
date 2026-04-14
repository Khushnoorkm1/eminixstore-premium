import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minus, Maximize2, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithGemini } from '../lib/gemini';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', parts: [{ text: "Welcome to Eminixstore. I am your personal concierge. How may I assist you with our curated collection today?" }] }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text: input }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, parts: m.parts }));
      const response = await chatWithGemini([...history, userMessage]);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: response || "I'm sorry, I couldn't process that. Please try again." }] }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', parts: [{ text: "Error connecting to AI service. Please check your API key." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-[60]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="bg-[#006D5B] text-[#D4AF37] p-4 rounded-full shadow-[0_10px_40px_rgba(0,109,91,0.3)] border border-[#D4AF37]/30 transition-all group relative"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 bg-[#D4AF37] rounded-full"
            />
            <Bot className="h-6 w-6 group-hover:scale-110 transition-transform relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col transition-all duration-300 ${
              isMinimized ? 'h-16 w-72' : 'h-[500px] w-[350px] sm:w-[400px]'
            }`}
          >
            {/* Header */}
            <div className="bg-teal-900 dark:bg-black text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-gold-500 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-teal-900" />
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight">Eminix Concierge</p>
                  <p className="text-[10px] text-gold-500 font-bold uppercase tracking-[0.2em]">AI Powered</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/10 rounded">
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        m.role === 'user' 
                          ? 'bg-teal-800 text-white rounded-tr-none' 
                          : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-800 shadow-sm rounded-tl-none'
                      }`}>
                        <div className="prose prose-sm max-w-none dark:prose-invert font-light">
                          <ReactMarkdown>{m.parts[0].text}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex space-x-1">
                        <div className="h-1.5 w-1.5 bg-gray-300 dark:bg-gray-700 rounded-full animate-bounce" />
                        <div className="h-1.5 w-1.5 bg-gray-300 dark:bg-gray-700 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="h-1.5 w-1.5 bg-gray-300 dark:bg-gray-700 rounded-full animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-full py-2 px-4 text-sm focus:ring-2 focus:ring-gold-500 dark:text-white outline-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="bg-teal-800 text-white p-2 rounded-full hover:bg-teal-900 disabled:opacity-50 transition-colors shadow-lg shadow-teal-800/20"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
