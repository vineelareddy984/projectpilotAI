import React, { useState, useEffect } from "react";
import {
  Cpu,
  Bookmark,
  Bell,
  Sparkles,
  Menu,
  X,
  Compass,
  LayoutGrid,
  FileText,
  Presentation,
  Award,
  ListChecks,
  ShieldAlert,
  Code2,
  Database,
  UserCheck,
  HelpCircle,
  TrendingUp,
  Award as IconAward,
  BookOpen
} from "lucide-react";

// Sub-components imports
import AIAssistantBanner from "./components/AIAssistantBanner";
import IdeaGenerator from "./components/IdeaGenerator";
import ReportGenerator from "./components/ReportGenerator";
import PPTGenerator from "./components/PPTGenerator";
import VivaPreparation from "./components/VivaPreparation";
import ProgressTracker from "./components/ProgressTracker";
import PlagiarismChecker from "./components/PlagiarismChecker";
import CodeGenerator from "./components/CodeGenerator";
import ResourceLibrary from "./components/ResourceLibrary";
import ResumeDocumentationHelper from "./components/ResumeDocumentationHelper";
import AboutContactFAQ from "./components/AboutContactFAQ";
import AIChatAssistant from "./components/AIChatAssistant";

import { TESTIMONIALS } from "./data";
import { PageId } from "./types";

export default function App() {
  const [activeTab, setActiveTab] = useState<PageId>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Cross-tool dynamic project pre-seeding state
  const [selectedProject, setSelectedProject] = useState(() => {
    return localStorage.getItem("projectpilot_active_title") || "";
  });
  const [selectedProjectDomain, setSelectedProjectDomain] = useState(() => {
    return localStorage.getItem("projectpilot_active_domain") || "";
  });

  // Saved Drafts state list
  const [savedDrafts, setSavedDrafts] = useState<{ title: string; domain: string; abstract: string }[]>(() => {
    const saved = localStorage.getItem("projectpilot_saved_drafts");
    return saved ? JSON.parse(saved) : [];
  });

  // Local notifications system
  const [notifications, setNotifications] = useState<{ id: string; text: string; urgent: boolean }[]>([
    { id: "n1", text: "New Dataset indexes appended to the OER resource explorer.", urgent: false },
    { id: "n2", text: "2026 Academic guidelines updated. Try Viva Mock practices.", urgent: true }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Sync active project state
  const handleSelectProject = (title: string, domainName: string) => {
    setSelectedProject(title);
    setSelectedProjectDomain(domainName);
    localStorage.setItem("projectpilot_active_title", title);
    localStorage.setItem("projectpilot_active_domain", domainName);

    // Open notification banner confirming action
    const newNotif = {
      id: "select_" + Date.now(),
      text: `Focused project changed: "${title.slice(0, 30)}..."`,
      urgent: false
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Fast-travel user focus closer to report tools
    setActiveTab("tracker");
  };

  const handleBookmarkProject = (proj: { title: string; domain: string; abstract: string }) => {
    const exists = savedDrafts.some((d) => d.title === proj.title);
    let nextList;
    if (exists) {
      nextList = savedDrafts.filter((d) => d.title !== proj.title);
    } else {
      nextList = [...savedDrafts, proj];
    }
    setSavedDrafts(nextList);
    localStorage.setItem("projectpilot_saved_drafts", JSON.stringify(nextList));
  };

  const clearActiveProject = () => {
    setSelectedProject("");
    setSelectedProjectDomain("");
    localStorage.removeItem("projectpilot_active_title");
    localStorage.removeItem("projectpilot_active_domain");
  };

  const savedTitles = savedDrafts.map((d) => d.title);

  // Sidebar navigation mapping
  const NAVIGATION_BAR = [
    { id: "home", label: "Showcase & Hub", icon: Compass, badge: null },
    { id: "tools", label: "Tools Dashboard", icon: LayoutGrid, badge: "AI" },
    { id: "generator", label: "Idea Generator", icon: Sparkles, badge: null },
    { id: "tracker", label: "Progress Tracker", icon: ListChecks, badge: "Track" },
    { id: "report", label: "Thesis Report Maker", icon: FileText, badge: null },
    { id: "ppt", label: "Slides PPT Maker", icon: Presentation, badge: null },
    { id: "viva", label: "Viva Examination Prep", icon: Award, badge: "Practice" },
    { id: "plagiarism", label: "Plagiarism Audit", icon: ShieldAlert, badge: null },
    { id: "code", label: "Boilerplate Generator", icon: Code2, badge: null },
    { id: "resources", label: "Datasets & Papers", icon: Database, badge: null },
    { id: "resume", label: "Documentation & CV", icon: UserCheck, badge: null },
    { id: "about", label: "FAQ & Support Help", icon: HelpCircle, badge: null }
  ];

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-300 font-sans relative antialiased selection:bg-blue-600/35 selection:text-white pb-10">
      {/* Background radial effects */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-950/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* TOP COMPREHENSIVE HEADER HEADER */}
      <header className="sticky top-0 z-40 bg-[#070b13]/85 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-6 py-3.5 flex justify-between items-center transition-all">
        <div className="flex items-center gap-3">
          {/* Burger menu on Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-white transition cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[1.5px] shadow-lg shadow-blue-500/10">
              <div className="w-full h-full bg-[#070b13] rounded-[10px] flex items-center justify-center">
                <Cpu className="w-4.5 h-4.5 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-sm md:text-base font-black text-white font-sans tracking-tight block">
                ProjectPilot <strong className="text-blue-400 font-black">AI</strong>
              </span>
              <p className="text-[9px] text-slate-500 font-mono tracking-widest uppercase block -mt-0.5">ACADEMIC WORKSPACE</p>
            </div>
          </div>
        </div>

        {/* Commitment Warning center badge */}
        <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/95 border border-slate-800 text-xs text-slate-350">
          <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            🎓 <strong className="text-emerald-450 font-bold">100% Free</strong> for Undergraduates — No Paid subscriptions.
          </span>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-3">
          {/* Notifications toggles */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 hover:border-slate-705 text-slate-400 hover:text-white transition cursor-pointer relative"
            >
              <Bell className="w-4 h-4" />
              {notifications.some((n) => n.urgent) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping" />
              )}
            </button>

            {/* Notifications panel dropdown drawer */}
            {showNotifications && (
              <div className="absolute right-0 mt-2.5 w-72 bg-slate-950 border border-slate-800 rounded-xl p-3 shadow-2xl z-50 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wide border-b border-slate-800 pb-1.5 text-slate-500 font-bold">
                  <span>Advisory Feeds</span>
                  <button onClick={() => setNotifications([])} className="text-slate-600 hover:text-white hover:underline transition">Clear</button>
                </div>

                {notifications.length === 0 ? (
                  <p className="text-[11px] text-slate-600 italic text-center py-4">No active feeds yet</p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2 bg-slate-905 rounded border border-slate-850 text-[11px] leading-relaxed">
                        {n.urgent && <span className="text-red-400 font-bold mr-1 font-mono uppercase">[Alert]</span>}
                        {n.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bookmarks Folder overview */}
          <button
            onClick={() => setActiveTab("resources")}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800/80 hover:border-slate-705 text-slate-450 hover:text-white transition cursor-pointer flex items-center gap-1.5"
          >
            <Bookmark className="w-4 h-4" />
            {savedDrafts.length > 0 && (
              <span className="text-[10px] font-bold font-mono text-amber-400 bg-amber-500/15 px-1.5 rounded-full">
                {savedDrafts.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* WORKSPACE ENVIRONMENT */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* SIDEBAR NAVIGATION RAIL */}
        <aside className="md:col-span-3 hidden md:block space-y-4">
          {/* Active project focused state widget */}
          <div className="bg-gradient-to-tr from-[#0b0e17] to-[#121828] border border-blue-500/10 rounded-xl p-4.5 space-y-3 relative overflow-hidden">
            {/* Background glowing particles style */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />

            <span className="text-[9px] font-mono tracking-widest text-slate-550 uppercase font-black block">Active Focused Thesis</span>
            {selectedProject ? (
              <div className="space-y-2.5">
                <p className="text-[11.5px] font-sans font-bold text-white leading-snug line-clamp-2">
                  "{selectedProject}"
                </p>
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-2 text-[10px]">
                  <span className="text-blue-400 text-[9.5px] truncate max-w-[120px]">{selectedProjectDomain}</span>
                  <button
                    onClick={clearActiveProject}
                    className="text-red-400 hover:underline cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 py-1">
                <p className="text-[11px] text-slate-500 leading-relaxed italic">
                  No thesis active. Generate one in "Idea Generator" tab to link your slide and report generators.
                </p>
                <button
                  onClick={() => setActiveTab("generator")}
                  className="text-[10px] font-mono text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  Configure Idea now →
                </button>
              </div>
            )}
          </div>

          {/* Navigation chapters */}
          <nav className="bg-[#090d16] border border-slate-800 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase font-bold block px-2 mb-2">Chapters Navigation</span>
            {NAVIGATION_BAR.map((item) => {
              const Icon = item.icon;
              const matches = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold tracking-wide transition cursor-pointer relative ${
                    matches
                      ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[8.5px] font-bold font-mono tracking-wider px-1.5 py-0.5 rounded uppercase leading-none bg-indigo-500/10 text-indigo-400 shrink-0 border border-indigo-500/20">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          <p className="text-[10px] text-slate-600 font-mono text-center block pt-2">
            ProjectPilot AI Version 2026.06 • Apache 2.0
          </p>
        </aside>

        {/* RESPONSIVE MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-[#070b13]/95 flex flex-col p-6 space-y-5 animate-fade-in border-r border-slate-800">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <span className="text-sm font-black text-white tracking-widest uppercase">Select Workstation</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex bg-slate-900 p-3 rounded-lg border border-slate-800 flex-col gap-1.5 text-xs">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Current Project</span>
              {selectedProject ? (
                <p className="text-[11px] font-bold text-slate-200 line-clamp-1">"{selectedProject}"</p>
              ) : (
                <span className="text-[11px] text-slate-600 italic">No topic connected</span>
              )}
            </div>

            <nav className="flex-1 overflow-y-auto space-y-1">
              {NAVIGATION_BAR.map((item) => {
                const Icon = item.icon;
                const matches = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                      matches ? "bg-blue-600 text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            <p className="text-[10px] text-slate-600 text-center font-mono">100% Free Campus Companion Suite</p>
          </div>
        )}

        {/* MAIN VIEWS WORKSPACE PANELS */}
        <main className="md:col-span-9 bg-[#0b0f19]/35 border border-slate-800/60 rounded-2xl p-5 md:p-6 shadow-xl relative min-h-[500px]">
          {/* HOME AND SHOWCASE MAIN VIEWS */}
          {activeTab === "home" && (
            <div className="space-y-10">
              {/* HERO CAPTIVATING INTRO */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
                <div className="lg:col-span-7 space-y-4.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/20">
                    <Sparkles className="w-3 h-3 animate-bounce" />
                    <span>GENERATE YOUR FINAL YEAR PROJECT IN SECONDS</span>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight font-sans leading-tight">
                    Your Academic Project, <strong className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Perfected & Submitted.</strong>
                  </h1>

                  <p className="text-xs md:text-sm text-slate-350 leading-relaxed max-w-xl">
                    Struggling with literature citations or debugging hardware nodes? ProjectPilot AI provides a zero-fee scholarly workstation. Outline unique topics, draft IEEE-aligned research papers, generate presentations slides, and run mock Examiner Vivas instantly.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => setActiveTab("generator")}
                      className="bg-blue-600 hover:bg-blue-500 hover:scale-[1.02] text-white font-bold text-xs py-2.5 px-6 rounded-lg transition shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Synthesize Thesis Now</span>
                    </button>
                    <button
                      onClick={() => setActiveTab("tools")}
                      className="bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold text-xs py-2.5 px-6 rounded-lg transition cursor-pointer flex items-center justify-center"
                    >
                      Explore AI Dashboard
                    </button>
                  </div>
                </div>

                {/* Simulated Futuristic Illustration */}
                <div className="lg:col-span-5 relative flex items-center justify-center">
                  <div className="w-full h-64 bg-gradient-to-tr from-blue-900/10 via-purple-900/10 to-transparent border border-slate-800 rounded-2xl p-6 relative overflow-hidden backdrop-blur-sm self-center shadow-lg flex flex-col justify-between">
                    {/* Glowing circles background */}
                    <div className="absolute top-4 left-6 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-4 right-6 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="flex justify-between items-start border-b border-slate-800/80 pb-3">
                      <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">Compiler Core Active</span>
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                    </div>

                    <div className="py-6 text-center space-y-1.5 z-10">
                      <Cpu className="text-indigo-400 w-10 h-10 w-full mx-auto animate-pulse" />
                      <p className="text-xs font-mono text-slate-100 font-bold uppercase tracking-wider block">Neural Defense Synthesis</p>
                      <p className="text-[10px] text-slate-500 font-mono tracking-tight block">GEMINI ENGINE OK • TELEMETRY ACTIVE</p>
                    </div>

                    <div className="flex items-center justify-between text-[8px] font-mono text-slate-550 border-t border-slate-850/80 pt-2.5">
                      <span>CHANNELS MATCH: 20</span>
                      <span>SECURE LOCAL CACHE</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DYNAMIC ANNOUNCEMENT BANNER */}
              <AIAssistantBanner />

              {/* CORE Bento Feature Cards */}
              <div className="space-y-4">
                <div className="text-left">
                  <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono">Bespoke Suite Capabilities</h3>
                  <p className="text-xs text-slate-500">Every single module built to resolve a specific academic bottleneck checkpoint.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {NAVIGATION_BAR.filter((item) => item.id !== "home" && item.id !== "about").map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className="bg-slate-900/35 border border-slate-800 hover:border-blue-500/40 p-4.5 rounded-xl cursor-pointer transition-all hover:bg-slate-9ml/60 group relative overflow-hidden"
                      >
                        <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 mb-3 group-hover:scale-105 transition-transform">
                          <Icon className="w-4.5 h-4.5 text-blue-400" />
                        </div>
                        <h4 className="text-xs font-bold text-white group-hover:text-blue-400 tracking-tight font-sans block uppercase">
                          {item.label}
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1 lines-clamp-2 leading-relaxed">
                          Click to enter the dedicated suite and compile customized parameters with zero fee loops.
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* TESTIMONIALS SLIDER SECTION */}
              <div className="bg-slate-950 border border-slate-800/80 rounded-2xl p-6 space-y-6">
                <div className="text-center space-y-0.5">
                  <span className="text-[10px] font-mono tracking-widest text-[#6366f1] font-bold uppercase block">Academics Feedback</span>
                  <h3 className="text-base font-bold text-slate-200">Endorsed by Top-Tier Student Networks</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {TESTIMONIALS.map((t, idx) => (
                    <div key={idx} className="bg-slate-900/30 p-4 rounded-xl border border-slate-800/50 flex flex-col justify-between gap-4">
                      <p className="text-[11.5px] text-slate-400 italic leading-relaxed">
                        "{t.quote}"
                      </p>
                      <div className="text-[10.5px]">
                        <p className="text-slate-200 font-bold">{t.name}</p>
                        <p className="text--slate-500 font-sans text-[9px]">{t.college} • {t.domain}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STATS COUNTER BAR */}
              <div className="bg-gradient-to-r from-blue-950/20 via-slate-900 to-purple-950/20 rounded-xl p-5 border border-indigo-500/10 max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-center gap-6">
                <div>
                  <p className="text-xl font-mono font-black text-blue-400">100% Free</p>
                  <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">No Hidden boundaries</p>
                </div>
                <div>
                  <p className="text-xl font-mono font-black text-purple-400">Zero Latency</p>
                  <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Gemini 3.5 Powered</p>
                </div>
                <div>
                  <p className="text-xl font-mono font-black text-emerald-400">20 Domains</p>
                  <p className="text-[10px] text-slate-500 uppercase font-mono tracking-wider">Engineering to MBA</p>
                </div>
              </div>
            </div>
          )}

          {/* AI TOOLS HUB DASHBOARD */}
          {activeTab === "tools" && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-white font-sans tracking-tight">AI Tools Dashboard</h1>
                <p className="text-sm text-slate-400 mt-1">Select any specialized tool bellow to unlock academic configurations.</p>
              </div>

              {/* Grid of tools widgets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {NAVIGATION_BAR.filter((item) => !["home", "tools", "about"].includes(item.id)).map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className="bg-slate-900/40 border border-slate-800 hover:border-indigo-500/45 rounded-xl p-5 cursor-pointer hover:bg-[#0b0e17] transition-all flex flex-col justify-between h-44 shadow-lg group relative overflow-hidden"
                    >
                      <div className="space-y-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                          <Icon className="w-4 h-4 text-blue-400" />
                        </div>
                        <h4 className="text-xs font-black text-slate-200 uppercase tracking-wide block">{item.label}</h4>
                        <p className="text-[10px] text-slate-550 leading-relaxed font-sans line-clamp-2">
                          Provides direct access to compile dissertation details, manage team schedules, or query code templates.
                        </p>
                      </div>

                      <div className="border-t border-slate-850 pt-2 flex justify-between items-center text-[10px] font-mono font-bold text-blue-400 group-hover:text-blue-300">
                        <span>Activate Node</span>
                        <span>→</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ACTIVE ADAPTIVE SUB-VIEW ROUTINGS */}
          {activeTab === "generator" && (
            <IdeaGenerator
              onSelectProject={handleSelectProject}
              onBookmarkProject={handleBookmarkProject}
              bookmarkedTitles={savedTitles}
            />
          )}

          {activeTab === "report" && (
            <ReportGenerator
              selectedProjectTitle={selectedProject}
              selectedProjectDomain={selectedProjectDomain}
            />
          )}

          {activeTab === "ppt" && (
            <PPTGenerator
              selectedProjectTitle={selectedProject}
              selectedProjectDomain={selectedProjectDomain}
            />
          )}

          {activeTab === "viva" && (
            <VivaPreparation
              selectedProjectTitle={selectedProject}
              selectedProjectDomain={selectedProjectDomain}
            />
          )}

          {activeTab === "tracker" && <ProgressTracker />}

          {activeTab === "plagiarism" && <PlagiarismChecker />}

          {activeTab === "code" && <CodeGenerator />}

          {activeTab === "resources" && <ResourceLibrary />}

          {activeTab === "resume" && (
            <ResumeDocumentationHelper
              selectedProjectTitle={selectedProject}
              selectedProjectDomain={selectedProjectDomain}
            />
          )}

          {activeTab === "about" && <AboutContactFAQ />}
        </main>
      </div>

      {/* FLOAT PERSISTENT CHATBOT COMPANION */}
      <AIChatAssistant />
    </div>
  );
}
