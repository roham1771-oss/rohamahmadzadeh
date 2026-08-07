'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatWidgetProps {
  dict: any;
  locale: string;
}

export function ChatWidget({ dict, locale }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).slice(2));
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        role: 'assistant',
        content: locale === 'fa'
          ? 'سلام! من دستیار حقوقی هوش مصنوعی هستم. چگونه می‌توانم کمک کنم؟\n\n⚠️ توجه: پاسخ‌های من صرفاً جنبه اطلاع‌رسانی دارند و جایگزین مشاوره حقوقی تخصصی نیستند.'
          : 'Hello! I am the AI Legal Assistant. How can I help you?\n\n⚠️ Disclaimer: My responses are for informational purposes only and do not replace professional legal advice.',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, locale, messages.length]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          language: locale,
          sessionId,
        }),
      });

      const data = await res.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.data.message,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error);
      }
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: locale === 'fa'
          ? 'متأسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.'
          : 'An error occurred. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300',
          locale === 'fa' ? 'left-6' : 'right-6',
          isOpen
            ? 'bg-red-500 hover:bg-red-600 rotate-0'
            : 'bg-primary-900 dark:bg-gold-500 hover:bg-primary-800 dark:hover:bg-gold-400'
        )}
        aria-label="AI Assistant"
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      <div
        className={cn(
          'fixed z-50 transition-all duration-300 flex flex-col',
          locale === 'fa' ? 'left-6' : 'right-6',
          isOpen ? 'bottom-24 opacity-100 pointer-events-auto' : 'bottom-20 opacity-0 pointer-events-none',
          'w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-10rem)]'
        )}
      >
        <div className="flex flex-col h-full bg-white dark:bg-primary-950 rounded-2xl shadow-2xl border border-border overflow-hidden">
          <div className="p-4 bg-primary-900 dark:bg-primary-950 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-950" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{dict?.ai?.title || 'AI Legal Assistant'}</h3>
                <p className="text-xs text-white/60">{dict?.ai?.subtitle || 'Ask legal questions'}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                <div
                  className={cn(
                    'max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'bg-primary-900 dark:bg-gold-500 text-white dark:text-primary-950 rounded-br-md'
                      : 'bg-muted text-foreground rounded-bl-md'
                  )}
                >
                  {msg.content.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < msg.content.split('\n').length - 1 && <br />}</span>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={dict?.ai?.placeholder || 'Type your question...'}
                className="flex-1 px-4 py-2.5 bg-muted rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 bg-primary-900 dark:bg-gold-500 text-white dark:text-primary-950 rounded-xl flex items-center justify-center hover:bg-primary-800 dark:hover:bg-gold-400 transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
