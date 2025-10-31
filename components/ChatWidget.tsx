import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatIcon, CloseIcon, SendIcon } from './Icons';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'agent';
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Hello! How can I help you find your perfect property today?", sender: 'agent' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if(isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleToggle = () => setIsOpen(!isOpen);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '') return;

        const newUserMessage: Message = {
            id: Date.now(),
            text: inputValue,
            sender: 'user'
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');

        setTimeout(() => {
            const agentResponse: Message = {
                id: Date.now() + 1,
                text: "Thanks for your message! An agent will be with you shortly. In the meantime, have you checked our latest listings in the Gulshan area?",
                sender: 'agent'
            };
            setMessages(prev => [...prev, agentResponse]);
        }, 1500);
    };
    
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.5 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="w-80 h-[28rem] bg-white rounded-2xl shadow-2xl flex flex-col origin-bottom-right"
                    >
                        <header className="bg-black text-white p-4 rounded-t-2xl flex justify-between items-center">
                            <h3 className="font-semibold">Chat with an Agent</h3>
                            <button onClick={handleToggle} className="p-1 hover:bg-white/20 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                                <CloseIcon className="w-5 h-5" />
                            </button>
                        </header>
                        <div className="flex-1 p-4 overflow-y-auto">
                            <div className="space-y-4">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] p-3 rounded-xl ${msg.sender === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>
                        </div>
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                            />
                            <button type="submit" className="bg-black text-white p-2.5 rounded-lg hover:bg-gray-800 transition disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500" disabled={!inputValue.trim()}>
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <motion.button
                onClick={handleToggle}
                className="bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Toggle chat"
                style={{ display: isOpen ? 'none' : 'block' }}
            >
                <ChatIcon className="w-6 h-6" />
            </motion.button>
        </div>
    );
};

export default ChatWidget;