import React, { useState, useEffect } from "react";
import { Mail, MessageSquare, ShieldAlert, CheckCircle, Info, Landmark, HelpCircle, HeartHandshake } from "lucide-react";
import { FAQS } from "../data";

interface FeedbackMessage {
  id: string;
  senderName: string;
  senderMail: string;
  senderMessage: string;
  submittedAt: string;
}

export default function AboutContactFAQ() {
  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(null);

  // Form states
  const [fName, setFName] = useState("");
  const [fMail, setFMail] = useState("");
  const [fMessage, setFMessage] = useState("");
  const [success, setSuccess] = useState(false);

  // Local feedback list tracker
  const [feedbackList, setFeedbackList] = useState<FeedbackMessage[]>(() => {
    const saved = localStorage.getItem("projectpilot_feedbacks");
    return saved ? JSON.parse(saved) : [];
  });

  const handleToggleFAQ = (idx: number) => {
    setActiveFAQIndex((prev) => (prev === idx ? null : idx));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fName.trim() || !fMail.trim() || !fMessage.trim()) return;

    const newItem: FeedbackMessage = {
      id: "fdbk_" + Date.now(),
      senderName: fName.trim(),
      senderMail: fMail.trim(),
      senderMessage: fMessage.trim(),
      submittedAt: new Date().toLocaleTimeString()
    };

    const nextList = [newItem, ...feedbackList];
    setFeedbackList(nextList);
    localStorage.setItem("projectpilot_feedbacks", JSON.stringify(nextList));

    setFName("");
    setFMail("");
    setFMessage("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  const handleClearFeedbacks = () => {
    setFeedbackList([]);
    localStorage.removeItem("projectpilot_feedbacks");
  };

  return (
    <div className="space-y-12">
      {/* 1. ABOUT US INTEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-slate-800 pb-10">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>OUR MISSION</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-white font-sans tracking-tight">
            Designed Strictly for Final-Year Students
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            Every academic season, final year students encounter tremendous pressure to configure stable, high-growth codebases, format complex LaTeX-compliant IEEE report summaries, draft defense slide structures, and memorize dynamic answers. Many fall prey to expensive private agencies charging huge premiums.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed font-sans">
            <strong>ProjectPilot AI</strong> changes this equation. By encapsulating Google's powerful Gemini models inside a zero-latency full-stack node, we provide students with elite thesis counseling tools completely free. 
            No paymeters. No token models. Just pure open-source support.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center">
            <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
              <p className="text-xl font-black text-blue-400 font-mono">100k+</p>
              <p className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">Students Guided</p>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
              <p className="text-xl font-black text-purple-400 font-mono">20</p>
              <p className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">Global Domains</p>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
              <p className="text-xl font-black text-emerald-400 font-mono">0$</p>
              <p className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">Subscription Fee</p>
            </div>
            <div className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800">
              <p className="text-xl font-black text-amber-400 font-mono">2026</p>
              <p className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">Graduation Focus</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-blue-950/40 via-slate-950 to-purple-950/40 p-6 rounded-2xl border border-blue-500/25 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
          <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wide mb-3 flex items-center gap-2">
            <Landmark className="w-4 h-4 text-blue-400" />
            <span>100% Free Manifesto</span>
          </h4>
          <ul className="space-y-3.5 text-xs text-slate-300 font-sans">
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">✓</span>
              <span><strong>No Credit Cards Required:</strong> Start prompting without setting up billing profiles.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">✓</span>
              <span><strong>No Ads Interference:</strong> Fully clean professional academic workspaces with zero commercial logs.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">✓</span>
              <span><strong>Open-Source Apache 2.0:</strong> All customized generated starter codes can be deployed for standard grading.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 2. FAQ INTERACTIVE ACCORDION */}
      <div className="space-y-6">
        <div className="text-center space-y-1 max-w-xl mx-auto">
          <HelpCircle className="w-8 h-8 text-purple-400 mx-auto" />
          <h2 className="text-xl md:text-2xl font-bold text-white">Frequently Solved Queries</h2>
          <p className="text-xs text-slate-400">Everything you need to know about Thesis generation limits and structural configurations.</p>
        </div>

        <div className="space-y-3 max-w-4xl mx-auto">
          {FAQS.map((faq, i) => {
            const isOpen = activeFAQIndex === i;
            return (
              <div
                key={i}
                className="bg-slate-900/30 border border-slate-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => handleToggleFAQ(i)}
                  className="w-full text-left px-5 py-4 flex justify-between items-center bg-slate-905 font-medium text-xs md:text-sm text-slate-200 hover:text-white cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-blue-400 ml-3 shrink-0">{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 font-sans text-xs text-slate-400 leading-relaxed border-t border-slate-800/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. CONTACT US FUNCTIONAL PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6 border-t border-slate-800">
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-lg font-black text-white">Need Customized Academic Support?</h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans pr-5">
            Having trouble organizing a specific hardware circuit telemetry or need guidance configuring your project database schemas? Write us a message. Our support advisors evaluate community logs systematically to enrich dataset resources.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>support@projectpilot.ai (Academic Help)</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <MessageSquare className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Response velocity: ~2 Hours during exams season</span>
            </div>
          </div>
        </div>

        {/* Feedback form */}
        <div className="lg:col-span-7 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-lg">
          <span className="text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider">Leave Advice Ticket</span>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">First Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-700 rounded-lg py-1.5 px-3 text-xs focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400 font-sans">Contact Email</label>
                <input
                  type="email"
                  placeholder="rahul@college.edu"
                  value={fMail}
                  onChange={(e) => setFMail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 placeholder-slate-700 rounded-lg py-1.5 px-3 text-xs focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Your Inquiry / Request Message</label>
              <textarea
                rows={3}
                placeholder="Write detail parameters of the domain or error debugging logs you want our support team to verify..."
                value={fMessage}
                onChange={(e) => setFMessage(e.target.value)}
                className="w-full bg-slate-950 text-slate-300 placeholder-slate-700 p-3 border border-slate-800 rounded-lg focus:outline-none focus:border-blue-500 text-xs leading-relaxed resize-none"
                required
              />
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="text-[10px] text-slate-500 font-mono">100% Confidential academic ticket routing</span>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-505 text-white text-xs font-bold py-1.5 px-4 rounded transition cursor-pointer"
              >
                Route Ticket
              </button>
            </div>
          </form>

          {success && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-lg text-emerald-400 text-xs flex gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
              <span>We successfully recorded your inquiry! Review your logs below. No server locks are configured.</span>
            </div>
          )}

          {/* Submitted inquiries display dashboard */}
          {feedbackList.length > 0 && (
            <div className="space-y-3 pt-3 border-t border-slate-800/60">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wide text-slate-500">
                <span>Active Support Tickets In Cache ({feedbackList.length})</span>
                <button
                  onClick={handleClearFeedbacks}
                  className="text-red-400 hover:underline cursor-pointer"
                >
                  Clear Cached Tickets
                </button>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {feedbackList.map((item) => (
                  <div key={item.id} className="bg-slate-950 border border-slate-850 p-2.5 rounded text-xs space-y-1">
                    <p className="text-[10px] font-bold text-slate-300 flex justify-between">
                      <span>{item.senderName} ({item.senderMail})</span>
                      <span className="text-slate-500 text-[9px]">{item.submittedAt}</span>
                    </p>
                    <p className="text-[11px] text-slate-400 italic">"{item.senderMessage}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
