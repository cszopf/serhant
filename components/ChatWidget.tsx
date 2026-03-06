
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BrandConfig } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatWidgetProps {
  brand: BrandConfig;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ brand }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to the SERHANT experience. I am your transaction assistant. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are a professional, high-end Real Estate Assistant at ${brand.legalName} in Miami, supporting the team of Candace and Veronica. 
          Your tone is confident, entrepreneurial, and clear. 
          You assist clients with their real estate closing process at the highest level of service. 
          Keep responses concise and authoritative. 
          If you don't know an answer, suggest they contact their Real Estate Agent team at ${brand.contactEmail}.`,
        },
      });

      const response = await chat.sendMessage({ message: input });
      const modelText = response.text || "I apologize, our secure channel is experiencing a momentary delay. Please try again or reach out directly.";
      
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Service temporarily unavailable. Please contact your Real Estate Agent for immediate assistance." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 md:bottom-10 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[90vw] md:w-[400px] h-[600px] rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] border-2 border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-500">
          <div 
            className="p-6 text-white flex justify-between items-center"
            style={{ backgroundColor: brand.primaryColor }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center font-black text-sm tracking-tighter">S.</div>
              <div>
                <p className="text-sm font-black uppercase tracking-widest">SERHANT Assistant</p>
                <p className="text-[10px] opacity-70 font-bold uppercase tracking-widest">Real Estate Support</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm font-medium leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-black text-white rounded-tr-none shadow-xl shadow-black/10' 
                      : 'bg-white border-2 border-slate-50 text-slate-700 rounded-tl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-slate-50 p-4 rounded-[1.5rem] rounded-tl-none shadow-sm flex gap-1.5">
                  <div className="w-2 h-2 bg-slate-200 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-200 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-slate-200 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-50 flex gap-4 items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask anything about your closing..."
              className="flex-1 text-sm bg-slate-50 border-2 border-slate-50 rounded-2xl px-6 py-4 focus:outline-none focus:border-black transition-all font-medium"
            />
            <button 
              onClick={handleSendMessage}
              className="w-12 h-12 rounded-2xl text-white transition-all active:scale-90 flex items-center justify-center shadow-xl shadow-black/10"
              style={{ backgroundColor: brand.primaryColor }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-[1.5rem] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.3)] flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 bg-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
