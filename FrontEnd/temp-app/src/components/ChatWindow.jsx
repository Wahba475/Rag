import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';
import { useApi } from '../context/ApiContext';
import { Bot } from 'lucide-react';

export default function ChatWindow() {
  const { ask } = useApi();
  const [messages, setMessages] = useState([]); // [{ role, content }]
  const [loading, setLoading]   = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (text) => {
    if (!text.trim() || loading) return;

    // Add user message immediately
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setLoading(true);

    try {
      // POST /chat/ask → { question, answer }
      const res = await axios.post(ask, { question: text });
      setMessages(prev => [...prev, { role: 'bot', content: res.data.answer }]);
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'bot', content: '⚠️ Server error — please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full overflow-hidden bg-surface">

      {/* ── Header ─────────────────────────────── */}
      <header
        className="flex items-center gap-3 px-6 py-4 bg-surface"
        style={{ borderBottom: '3px solid #1C293C' }}
      >
        <div
          className="flex items-center justify-center w-9 h-9 bg-secondary"
          style={{ border: '2.5px solid #1C293C', boxShadow: '2px 2px 0 #1C293C' }}
        >
          <Bot size={18} strokeWidth={2.5} className="text-surface" />
        </div>
        <div>
          <h1 className="text-base font-black uppercase tracking-widest text-ink leading-none">
            AI Assistant
          </h1>
          <p className="text-xs font-medium text-ink/50 mt-0.5">
            Upload a document, then ask questions
          </p>
        </div>
      </header>

      {/* ── Messages ───────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
        {messages.length === 0 && !loading && (
          <div className="flex items-center justify-center h-full">
            <div
              className="nb-border nb-shadow text-center px-8 py-6 bg-white max-w-sm"
            >
              <p className="font-bold text-ink text-lg">No messages yet</p>
              <p className="text-sm text-ink/60 mt-1">
                Upload a PDF in the sidebar, then ask a question below.
              </p>
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex items-center gap-3">
            <div
              className="flex gap-1.5 px-4 py-3 bg-white"
              style={{ border: '2.5px solid #1C293C', boxShadow: '3px 3px 0 #1C293C' }}
            >
              {[0, 150, 300].map(delay => (
                <span
                  key={delay}
                  className="w-2 h-2 rounded-full bg-secondary animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-ink/50 uppercase tracking-wider">
              Thinking…
            </span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Input ──────────────────────────────── */}
      <div
        className="px-6 py-4 bg-surface"
        style={{ borderTop: '3px solid #1C293C' }}
      >
        <InputBox onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
