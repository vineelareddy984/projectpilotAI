import React, { useState, useEffect } from "react";
import { Sparkles, Terminal, BookOpen, Quote } from "lucide-react";
import { motion } from "motion/react";

const ADVICE_LIST = [
  "Choose a problem that has direct social utility (e.g. Healthcare, Agriculture tech).",
  "Write clean, atomic git commits so your supervisor can track actual code updates easily.",
  "Your IEEE methodology diagram must fit comfortably on a single standard page.",
  "Keep your plagiarism percentage under 15% to satisfy global university compliance policies.",
  "Practice explaining your core technical objectives first before jumping into lines of code.",
  "A solid future scope section is highly effective at deflecting difficult questions from external jurists."
];

export default function AIAssistantBanner() {
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % ADVICE_LIST.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-blue-950 via-slate-900 to-purple-950 p-6 md:p-8 border border-blue-500/30 shadow-2xl">
      {/* Background ambient light */}
      <div className="absolute -top-24 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-semibold mb-3 border border-blue-500/30">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>AI FLIGHT PLANNER</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white font-sans tracking-tight">
            Need dynamic guidance for your thesis defense?
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
            ProjectPilot AI helps you manage everything from zero to submission. Use the tools below to compile structured documents, practice mockup defense vivas, and format code packages without paying a single dollar.
          </p>

          {/* Advice Ticker */}
          <div className="mt-5 flex items-start gap-2.5 bg-slate-950/60 border border-slate-800 rounded-lg p-3 max-w-xl">
            <Quote className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-mono text-purple-300 uppercase tracking-wider font-semibold">ADVISOR ADVICE FOR YOUR DEFENSE</p>
              <motion.p
                key={tickerIndex}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                className="text-xs text-slate-300 mt-1 font-sans italic"
              >
                "{ADVICE_LIST[tickerIndex]}"
              </motion.p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="text-[10px] text-slate-500 font-mono">WORKSPACE STATE</p>
              <p className="font-mono text-emerald-400 font-semibold uppercase">100% Free Access</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-4">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <div>
              <p className="text-[10px] text-slate-500 font-mono">SUPPORTED DOMAINS</p>
              <p className="font-mono text-blue-400 font-semibold uppercase">20 Global Branches</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
