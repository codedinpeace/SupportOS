import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  Send,
  Plus,
  Ticket,
  Sparkles,
  User,
  RefreshCw,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';
import {useChatSocket} from "../hook/customerHook"

// ─────────────────────────────────────────────────────────────────────────────
// AI SERVICE LAYER
// ─────────────────────────────────────────────────────────────────────────────
// TODO (Backend Integration): Replace this mock function with a real API call.
//
// Expected contract:
//   Input:  { message: string, history: Array<{ role: 'user'|'assistant', content: string }> }
//   Output: Promise<{ reply: string, suggestTicket: boolean }>
//
// Example real implementation:
//   async function fetchAIReply({ message, history }) {
//     const res = await fetch('/api/ai/chat', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ message, history }),
//     });
//     if (!res.ok) throw new Error('AI service unavailable');
//     return res.json(); // { reply: string, suggestTicket: boolean }
//   }
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────

const SUGGESTED_PROMPTS = [
  'I have a billing discrepancy on my invoice',
  "I can't log into my account",
  'My API integration keeps timing out',
  'The dashboard is loading very slowly',
];

function renderMessageContent(content) {
  // Simple markdown-lite: bold **text**, newlines → <br>
  const parts = content.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part.split('\n').map((line, j, arr) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < arr.length - 1 && <br />}
      </span>
    ));
  });
}

const TypingIndicator = () => (
  <div className="flex items-end gap-3 justify-start">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
      <Bot size={15} className="text-white" />
    </div>
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
      <div className="flex gap-1.5 items-center h-5">
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  </div>
);

const ChatWithAI = () => {
  const {messages,sendMessage,isTyping,error} = useChatSocket()

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // const sendMessage = async (text) => {
  //   const trimmed = (text ?? input).trim();
  //   if (!trimmed || isTyping) return;

  //   setError(null);
  //   const userMessage = { id: Date.now(), role: 'user', content: trimmed };
  //   setMessages((prev) => [...prev, userMessage]);
  //   setInput('');
  //   setIsTyping(true);

  //   try {
  //     const history = messages.map(({ role, content }) => ({ role, content }));
  //     const { reply, suggestTicket } = await fetchAIReply({
  //       message: trimmed,
  //       history,
  //     });

  //     setMessages((prev) => [
  //       ...prev,
  //       {
  //         id: Date.now() + 1,
  //         role: 'assistant',
  //         content: reply,
  //         suggestTicket,
  //       },
  //     ]);
  //   } catch (err) {
  //     setError('Something went wrong. Please try again.');
  //   } finally {
  //     setIsTyping(false);
  //     setTimeout(() => inputRef.current?.focus(), 50);
  //   }
  // };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend()
    }
  };

  const handleReset = () => {
    window.location.reload();
  };

  const showSuggestedPrompts = messages.length === 1;

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)] max-h-[860px]">
      {/* ── Header ── */}
      <div className="flex-shrink-0 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
              AI Support Assistant
            </h1>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Instant answers · Available 24/7
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            title="Start new conversation"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RefreshCw size={13} />
            New Chat
          </button>
          <Link
            to="/customer/create-ticket"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-900 dark:bg-slate-200 hover:bg-slate-700 dark:hover:bg-white text-white dark:text-slate-900 rounded-lg transition-colors"
          >
            <Ticket size={13} />
            Create Ticket
          </Link>
        </div>
      </div>

      {/* ── Chat Area ── */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div
                className={`flex items-end gap-3 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Avatar – AI */}
                {msg.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
                    <Bot size={15} className="text-white" />
                  </div>
                )}

                {/* Bubble */}
                <div
                  className={`max-w-[78%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white rounded-br-sm'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-bl-sm'
                  }`}
                >
                  {renderMessageContent(msg.content)}
                </div>

                {/* Avatar – User */}
                {msg.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <User size={15} className="text-slate-500 dark:text-slate-400" />
                  </div>
                )}
              </div>

              {/* Ticket Suggestion Card */}
              {msg.role === 'assistant' && msg.suggestTicket && (
                <div className="ml-11 mt-3">
                  <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-amber-50 dark:bg-amber-400/10 border border-amber-200 dark:border-amber-400/20 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                      <AlertCircle size={15} />
                      <span className="text-xs font-semibold">
                        Needs human expertise
                      </span>
                    </div>
                    <Link
                      to="/customer/create-ticket"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold transition-colors shrink-0"
                    >
                      <Ticket size={12} />
                      Raise a Ticket
                      <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator />}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts — shown only at start */}
        {showSuggestedPrompts && (
          <div className="flex-shrink-0 px-6 pb-4">
            <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">
              Common issues
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-400/10 transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error Banner */}
        {error && (
          <div className="flex-shrink-0 mx-6 mb-4 flex items-center gap-2 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-400/10 border border-red-200 dark:border-red-400/20 rounded-lg px-3 py-2">
            <AlertCircle size={13} />
            {error}
          </div>
        )}

        {/* ── Input Bar ── */}
        <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-700/50 px-4 py-3">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  // Auto-grow
                  e.target.style.height = 'auto';
                  e.target.style.height =
                    Math.min(e.target.scrollHeight, 120) + 'px';
                }}
                onKeyDown={handleKeyDown}
                placeholder="Describe your issue…"
                disabled={isTyping}
                className="w-full resize-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 transition-all disabled:opacity-50 leading-relaxed overflow-hidden"
                style={{ minHeight: '42px' }}
              />
            </div>
            <button
              onClick={() => {handleSend}}
              disabled={!input.trim() || isTyping}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-md shadow-violet-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <Send size={16} />u
            </button>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-2 text-center">
            AI responses may not always be accurate.{' '}
            <Link
              to="/customer/create-ticket"
              className="underline hover:text-violet-500 transition-colors"
            >
              Raise a ticket
            </Link>{' '}
            for complex or urgent issues.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAI;
