import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Sparkles, Send, X, Bot, User, Check, RefreshCw, Cpu } from "lucide-react";

const RECOMMENDED_PROMPTS = [
  { text: "Suggest IEEE report citation format", label: "IEEE Citations" },
  { text: "How do I fix 'undefined variable' in React?", label: "React bug" },
  { text: "Help me write thesis results table metrics?", label: "Results table" },
  { text: "What is future work for IoT Solar grids?", label: "IoT grid scope" }
];

export default function AIChatAssistant() {
  const [messages, setMessages] = useState<{ id: string; sender: "bot" | "user"; text: string }[]>([
    {
      id: "init",
      sender: "bot",
      text: "Welcome to ProjectPilot! I am your AI Academic Advisor. Ask me anything about thesis structures, code bugs, system blocks, or viva preps. How can I guide you today?"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const rawVal = textToSend || inputText;
    if (!rawVal.trim()) return;

    const userMsg = { id: "user_" + Date.now(), sender: "user" as const, text: rawVal.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: rawVal.trim()
        })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { id: "bot_" + Date.now(), sender: "bot", text: data.reply }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { id: "bot_" + Date.now(), sender: "bot", text: "Apologies, I encountered an advisory routing error. Please ensure your Gemini key or network nodes are operational." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 1. FLOATING CHAT BALLOON ACTION */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full p-4 shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-2 border border-white/20"
        >
          <Bot className="w-5 h-5 animate-pulse" />
          <span className="text-xs font-semibold pr-1">Ask Advisor AI</span>
        </button>
      )}

      {/* 2. CHAT DRAWER CONTENT WINDOW */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[500px] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-purple-950 px-4 py-3.5 border-b border-slate-800/80 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="text-blue-400 w-5 h-5" />
              <div>
                <h4 className="text-xs font-bold text-slate-100 font-sans tracking-tight">ProjectPilot Advisor AI</h4>
                <span className="text-[9px] text-emerald-400 font-mono block">● Online • 100% Free</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-500 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stage */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950">
            {messages.map((m) => {
              const isBot = m.sender === "bot";
              return (
                <div key={m.id} className={`flex items-start gap-2.5 ${!isBot ? "justify-end" : ""}`}>
                  {isBot && (
                    <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                  )}

                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed font-sans ${
                    isBot ? "bg-slate-900/80 text-slate-200 border border-slate-800/80 rounded-tl-none" : "bg-blue-600 text-white rounded-tr-none shadow-md"
                  }`}>
                    {/* Preserve line jumps in messages */}
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>

                  {!isBot && (
                    <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center shrink-0 text-white text-[10px] font-bold">
                      👤
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 font-sans pl-10 pr-4">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                <span>Advisor formulating reply...</span>
              </div>
            )}
          </div>

          {/* Core Footer inputs and shortcuts */}
          <div className="p-3 border-t border-slate-800 bg-slate-950 shrink-0 space-y-2.5">
            {/* Shortcuts */}
            {messages.length <= 1 && (
              <div className="space-y-1">
                <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider font-bold">Quick Academic Prompt:</span>
                <div className="flex flex-wrap gap-1.5">
                  {RECOMMENDED_PROMPTS.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(p.text)}
                      className="text-[9.5px] bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-350 hover:text-white px-2 py-1 rounded transition cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input row */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask advice (e.g. outline IoT Abstract)..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 bg-slate-950 text-slate-200 placeholder-slate-700 py-2 px-3 border border-slate-800 rounded-lg text-xs focus:outline-none focus:border-blue-500"
                disabled={loading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !inputText.trim()}
                className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-lg p-2 cursor-pointer transition flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
