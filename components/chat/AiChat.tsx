import React, { useState, useRef, useEffect } from 'react';
import GlassCard from '../common/GlassCard';
import { type ChatMessage } from '../../types';
import { getAiResponse } from '../../services/geminiService';
import { SendIcon } from '../common/Icons';

const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: "Hello! I'm Aura, your friendly support companion. How are you feeling today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = [...messages];
      const aiResponseText = await getAiResponse(history, input);
      const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { sender: 'ai', text: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };


  return (
    <div>
      <h1 className="text-3xl font-bold text-text-heading mb-2">AI Chat Support</h1>
      <p className="text-text-muted mb-8">A safe space to talk, available 24/7.</p>
      
      <GlassCard className="h-[70vh] flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent mr-3 flex-shrink-0"></div>}
                <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-accent text-white rounded-br-none' : 'bg-white/80 text-text-body rounded-bl-none'}`}>
                  {msg.text}
                </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end mb-4 justify-start">
               <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-accent mr-3 flex-shrink-0"></div>
               <div className="max-w-xs lg:max-w-md p-3 rounded-2xl bg-white/80 text-text-body rounded-bl-none">
                  <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                  </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t border-white/30">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="w-full pl-4 pr-12 py-3 bg-white/80 text-text-heading placeholder-text-muted rounded-full focus:outline-none focus:ring-2 focus:ring-accent border border-transparent"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-accent text-white hover:bg-opacity-90 disabled:bg-gray-400 transition-colors"
              aria-label="Send message"
            >
              <SendIcon />
            </button>
          </div>
          <p className="text-xs text-red-500 text-center mt-2 px-2">
            ⚠️ I'm an AI and not a substitute for professional help. If you're in crisis, please reach out to a qualified mental health professional or helpline immediately.
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default AiChat;