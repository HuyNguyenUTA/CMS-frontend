'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
  
    // Temporary loading message
    setMessages((prev) => [...prev, { role: 'bot', content: '...' }]);
  
    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
  
      const data = await res.json();
  
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'bot',
          content: data.reply,
        };
        return updated;
      });
    } catch (err) {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'bot',
          content: '⚠️ Error contacting AI server.',
        };
        return updated;
      });
    }
  };
  

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`px-4 py-3 max-w-sm rounded-2xl text-sm shadow-md leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-rose-500 text-white rounded-br-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'
              }`}
            >
              {msg.content}
            </motion.div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center gap-2">
        <input
            type="text"
            className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500
 text-sm"
            placeholder="Send a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />

          <button
            onClick={sendMessage}
            className="p-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white transition"
            aria-label="Send"
          >
            <span className="text-sm">➤</span>
          </button>
        </div>
      </div>
    </div>
  );
}
