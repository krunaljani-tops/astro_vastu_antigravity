'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, BookOpen } from 'lucide-react';
import { BirthChartData } from '@/types/astrology';
import { AstroVastuFullDiagnosticReport } from '@/types/vastu';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citations?: { bookTitle: string; chapter?: string; citation: string; system: string }[];
  timestamp: string;
}

interface AstroVastuChatProps {
  chart: BirthChartData;
  report: AstroVastuFullDiagnosticReport;
  lang?: 'hi' | 'en';
}

export const AstroVastuChat: React.FC<AstroVastuChatProps> = ({ chart, report, lang = 'hi' }) => {
  const isHi = lang === 'hi';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: isHi
        ? `नमस्ते ${chart.user.fullName} जी! 🙏 मैं आपका व्यक्तिगत एस्ट्रो-वास्तु सलाहकार हूँ। 

आपकी कुंडली में वर्तमान में **${chart.vimshottari.currentMahadasha} महादशा** चल रही है। आप मुझसे अपने घर के किसी भी कमरे (रसोई, बेडरूम, मंदिर, मुख्य द्वार), रंगों, या किसी दिशा के वास्तु दोष व सरल उपायों के बारे में बिना किसी संकोच के पूछ सकते हैं।`
        : `Namaste ${chart.user.fullName}. I am your AstroVastu AI Intelligence Advisor, powered by Classical Vedic treatises (*Brihat Samhita*, *Vishwakarma Prakash*, *Mayamatam*, *BPHS*, *BNN*, and *Jaimini Sutras*).

You are currently running **${chart.vimshottari.currentMahadasha} Mahadasha** and your A4 Matri Pada is in **${chart.jaimini.a4SignName}**. Ask me anything regarding your home layout, directional remedies, kitchen/bedroom Vastu, or specific room defects.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (messageToSend?: string) => {
    const text = messageToSend || input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!messageToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          chartSummary: report.chartSummary,
          currentReport: report,
          lang,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMessage: Message = {
          id: `b-${Date.now()}`,
          sender: 'assistant',
          text: data.answer,
          citations: data.citations,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const err = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: 'assistant',
            text: isHi
              ? `क्षमा करें, उत्तर प्राप्त करने में समस्या आई: ${err.error || 'कृपया पुनः प्रयास करें।'}`
              : `I encountered an issue querying the Knowledge Base: ${err.error || 'Please try again.'}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: isHi ? `नेटवर्क समस्या: ${err.message}` : `Connection error: ${err.message}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPromptsHi = [
    'मेरी रसोई (किचन) के लिए क्या सरल वास्तु उपाय करें?',
    'बेडरूम में सोते समय सिर किस दिशा में रखना चाहिए?',
    'घर के मंदिर (उत्तर-पूर्व / ईशान) के लिए मुख्य नियम क्या हैं?',
    'मेरी वर्तमान महादशा का मेरे घर के वास्तु पर क्या प्रभाव है?',
  ];

  const quickPromptsEn = [
    'How should I orient my bed for optimal sleep based on my chart?',
    'What are the Vastu remedies for my kitchen in the South-East?',
    'How does my current Mahadasha affect the North-East zone of my home?',
    'What do the classical shastras recommend for decluttering my entrance?',
  ];

  const quickPrompts = isHi ? quickPromptsHi : quickPromptsEn;

  return (
    <div className="glass-panel rounded-2xl border border-slate-800 shadow-2xl flex flex-col h-[650px] overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 bg-cosmic-950/80 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
              <span>{isHi ? 'एस्ट्रो-वास्तु मित्र व AI सलाहकार' : 'Astro-Vastu AI Scholar Assistant'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </h3>
            <p className="text-[11px] text-slate-400">
              {isHi
                ? '8 प्राचीन प्रमाणिक ग्रंथों पर आधारित — सरल व स्पष्ट मार्गदर्शन'
                : 'Grounded in 8 Classical Reference Books with Live Source Citations'}
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-block text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
          {isHi ? 'सक्रिय ज्ञानकोश' : 'RAG Knowledge Ingested'}
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-cosmic-950'
                  : 'bg-cosmic-900 border border-slate-700 text-amber-400'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-slate-950 font-medium'
                  : 'glass-panel bg-cosmic-900/80 border border-slate-800 text-slate-200 shadow-md'
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed space-y-2">{msg.text}</div>

              {/* RAG Citations Pill */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] text-amber-400/90 font-medium flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{isHi ? 'प्रमाणिक संदर्भ:' : 'Citations:'}</span>
                  </span>
                  {msg.citations.map((c, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-cosmic-950 text-slate-300 border border-amber-500/20 font-mono"
                    >
                      {c.citation}
                    </span>
                  ))}
                </div>
              )}

              <div
                className={`text-[9px] mt-2 text-right ${
                  msg.sender === 'user' ? 'text-amber-950' : 'text-slate-500'
                }`}
              >
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cosmic-900 border border-slate-700 text-amber-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="glass-panel p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-400 flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span>
                {isHi
                  ? 'प्राचीन शास्त्रों से आपके लिए सरल उपाय तैयार किए जा रहे हैं...'
                  : 'Searching classical shastra passages and formulating diagnostic remedies...'}
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 bg-cosmic-950/60 border-t border-slate-800/80 overflow-x-auto flex space-x-2 no-scrollbar">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(prompt)}
            className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-lg bg-cosmic-900 border border-slate-800 text-slate-300 hover:text-amber-300 hover:border-amber-500/30 transition truncate max-w-xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3.5 sm:p-4 border-t border-slate-800 bg-cosmic-950 flex items-center space-x-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isHi
              ? 'अपने घर के कमरे, दिशा या किसी वास्तु समस्या के बारे में पूछें...'
              : 'Ask a specific question about your home, directions, or chart Vastu...'
          }
          className="flex-1 bg-cosmic-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-cosmic-950 hover:from-amber-400 hover:to-yellow-300 transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
