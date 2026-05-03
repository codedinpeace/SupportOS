import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Send,
  Ticket,
  Sparkles,
  User,
  RefreshCw,
  AlertCircle,
  ChevronDown,
  Building2,
  X,
} from 'lucide-react';
import { useChatSocket } from '../hook/customerHook';

const COMPANIES = [
  { id: '674f1a2b3c4d5e6f7a8b9c01', name: 'Zomato', category: 'Food Delivery', emoji: '🍕', color: '#FFEBE6', text: '#E23744' },
  { id: '674f1a2b3c4d5e6f7a8b9c02', name: 'Swiggy', category: 'Food Delivery', emoji: '🛵', color: '#FFF3E0', text: '#FC8019' },
  { id: '674f1a2b3c4d5e6f7a8b9c03', name: 'Ola', category: 'Ride Sharing', emoji: '🚕', color: '#FFF8E1', text: '#F7C120' },
  { id: '674f1a2b3c4d5e6f7a8b9c04', name: 'Uber', category: 'Ride Sharing', emoji: '🚗', color: '#E8F5E9', text: '#1A1A1A' },
  { id: '674f1a2b3c4d5e6f7a8b9c05', name: 'Flipkart', category: 'E-commerce', emoji: '🛒', color: '#E3F2FD', text: '#2874F0' },
  { id: '674f1a2b3c4d5e6f7a8b9c06', name: 'Amazon', category: 'E-commerce', emoji: '📦', color: '#FFF8E1', text: '#FF9900' },
  { id: '674f1a2b3c4d5e6f7a8b9c07', name: 'Paytm', category: 'Payments', emoji: '💳', color: '#E3F2FD', text: '#00B9F1' },
  { id: '674f1a2b3c4d5e6f7a8b9c08', name: 'CRED', category: 'Fintech', emoji: '💎', color: '#EDE9FE', text: '#534AB7' },
]

const ChatWithAI = () => {
  const { messages, sendMessage, clearMessages, isTyping, error } = useChatSocket();
  const [input, setInput] = useState('');
  const [ddOpen, setDdOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(() => {
    try {
      const saved = localStorage.getItem('selectedBusiness');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSelectCompany = (company) => {
    setSelectedCompany(company);
    localStorage.setItem('selectedBusiness', JSON.stringify(company));
    setDdOpen(false);
    clearMessages();
    setInput('');
    inputRef.current?.focus();
  };

  const handleClearCompany = () => {
    setSelectedCompany(null);
    localStorage.removeItem('selectedBusiness');
    setDdOpen(false);
    clearMessages();
    setInput('');
  };

  const handleSend = () => {
    const text = input.trim();
    if (!selectedCompany || !text || isTyping) return;

    sendMessage(text);
    setInput('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const companyTone = selectedCompany
    ? { background: selectedCompany.color, color: selectedCompany.text }
    : null;

  return (
    <div className="flex h-[calc(100vh-7rem)] max-h-215 flex-col gap-4">
      <div className="shrink-0 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#0F172A] shadow-sm backdrop-blur px-5 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/25">
              <Sparkles size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                AI Support Assistant
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pick a business, then ask questions in the chatbox.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setDdOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 transition-all hover:border-violet-400"
              >
                {selectedCompany ? (
                  <>
                    <span>{selectedCompany.emoji}</span>
                    <span>{selectedCompany.name}</span>
                  </>
                ) : (
                  <>
                    <Building2 size={13} />
                    <span>Select Business</span>
                  </>
                )}
                <ChevronDown size={12} className={`transition-transform ${ddOpen ? 'rotate-180' : ''}`} />
              </button>

              {ddOpen && (
                <div className="absolute right-0 top-11 z-50 w-64 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl">
                  {COMPANIES.map((company) => (
                    <button
                      key={company.id}
                      onClick={() => handleSelectCompany(company)}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 ${
                        selectedCompany?.id === company.id ? 'bg-violet-50 dark:bg-violet-400/10' : ''
                      }`}
                    >
                      <span className="text-base">{company.emoji}</span>
                      <div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{company.name}</p>
                        <p className="text-[10px] text-slate-400">{company.category}</p>
                      </div>
                      {selectedCompany?.id === company.id && <span className="ml-auto text-violet-500 text-xs">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            >
              <RefreshCw size={13} />
              New Chat
            </button>

            <Link
              to="/customer/create-ticket"
              className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-white"
            >
              <Ticket size={13} />
              Create Ticket
            </Link>
          </div>
        </div>

        {selectedCompany && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-3">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                style={companyTone}
              >
                {selectedCompany.emoji}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{selectedCompany.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedCompany.category}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClearCompany}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
            >
              <X size={13} />
              Clear Business
            </button>
          </div>
        )}
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-sm">
        {!selectedCompany ? (
          <div className="flex h-full items-center justify-center px-6 py-10 text-center">
            <div className="max-w-md space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-500/10 text-violet-600 dark:text-violet-400">
                <Bot size={28} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Select a business to start chatting</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Choose the company first so the assistant can answer in the right context.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 px-5 py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    Start the conversation. Ask about account issues, refunds, delivery, billing, or anything else related to {selectedCompany.name}.
                  </div>
                ) : (
                  messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`flex max-w-[85%] items-start gap-3 rounded-3xl px-4 py-3 text-sm shadow-sm sm:max-w-[75%] ${
                          message.role === 'user'
                            ? 'bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900'
                            : 'border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${message.role === 'user' ? 'bg-white/15' : 'bg-violet-500/10 text-violet-600 dark:text-violet-400'}`}>
                          {message.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                        </div>
                        <div className="min-w-0 whitespace-pre-wrap leading-6">
                          {message.role === 'assistant' && !message.content && isTyping ? 'Thinking...' : message.content}
                        </div>
                      </div>
                    </div>
                  ))
                )}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex max-w-[75%] items-center gap-3 rounded-3xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm text-slate-500 dark:text-slate-400 shadow-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400">
                        <Bot size={14} />
                      </div>
                      <span>Assistant is typing...</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="rounded-2xl border border-red-200 dark:border-red-400/20 bg-red-50 dark:bg-red-400/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
                    <div className="flex items-center gap-2">
                      <AlertCircle size={14} />
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0F172A]/95 px-4 py-4 sm:px-6">
              <div className="flex items-end gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder={`Ask ${selectedCompany.name} support...`}
                  disabled={!selectedCompany}
                  className="min-h-12 max-h-36 flex-1 resize-none bg-transparent px-1 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed dark:text-white"
                />

                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!selectedCompany || !input.trim() || isTyping}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-4 text-sm font-semibold text-white transition-all hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send size={14} />
                  Send
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWithAI;