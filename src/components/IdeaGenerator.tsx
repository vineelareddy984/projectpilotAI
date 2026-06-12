import React, { useState } from "react";
import { Sparkles, Bookmark, Copy, Check, Info, TrendingUp, Cpu } from "lucide-react";
import { DOMAINS, TRENDING_PROJECTS_2026 } from "../data";
import { ProjectIdea } from "../types";

interface Props {
  onSelectProject: (title: string, domain: string) => void;
  onBookmarkProject: (proj: { title: string; domain: string; abstract: string }) => void;
  bookmarkedTitles: string[];
}

export default function IdeaGenerator({ onSelectProject, onBookmarkProject, bookmarkedTitles }: Props) {
  const [selectedDomainIndex, setSelectedDomainIndex] = useState(0);
  const [selectedTech, setSelectedTech] = useState("");
  const [customTech, setCustomTech] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [projectType, setProjectType] = useState("Research & Development");
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"generate" | "trending">("generate");

  const currentDomain = DOMAINS[selectedDomainIndex];

  // Dynamic technologies sync
  React.useEffect(() => {
    if (currentDomain.techs.length > 0) {
      setSelectedTech(currentDomain.techs[0]);
    }
  }, [selectedDomainIndex]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const techVal = customTech.trim() || selectedTech;
      const res = await fetch("/api/generate-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domain: currentDomain.name,
          technology: techVal,
          difficulty,
          projectType
        })
      });
      const data = await res.json();
      if (data.ideas) {
        setIdeas(data.ideas);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (txt: string, idx: number) => {
    navigator.clipboard.writeText(txt);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header and Sub */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-sans tracking-tight">
            AI Project Idea Generator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Synthesize modern, high-impact final year concepts tailored for academic journals.
          </p>
        </div>

        {/* Local Tab Switcher */}
        <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("generate")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "generate" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Customized</span>
          </button>
          <button
            onClick={() => setActiveTab("trending")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "trending" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white"
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Trending 2026</span>
          </button>
        </div>
      </div>

      {activeTab === "generate" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls Side */}
          <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-4 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider font-mono">
              Configure parameters
            </h3>

            {/* Select Domain */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Target Academic Domain</label>
              <select
                value={selectedDomainIndex}
                onChange={(e) => setSelectedDomainIndex(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
              >
                {DOMAINS.map((domain, i) => (
                  <option key={domain.id} value={i}>
                    {domain.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tech Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Recommended Stacks</label>
              <select
                value={selectedTech}
                onChange={(e) => {
                  setSelectedTech(e.target.value);
                  setCustomTech("");
                }}
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
              >
                {currentDomain.techs.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Or Specify Custom */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400">Or write custom packages</label>
              <input
                type="text"
                placeholder="e.g. NextJS, PyTorch, ESP8266"
                value={customTech}
                onChange={(e) => setCustomTech(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-slate-300 placeholder-slate-600 rounded-lg py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Difficulty and Type */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400">Difficulty Level</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg py-2 px-1.5 text-xs focus:border-blue-500 focus:outline-none"
                >
                  <option>Beginner</option>
                  <option>Medium</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400">Project Type</label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg py-2 px-1.5 text-xs focus:border-blue-500 focus:outline-none"
                >
                  <option>Research & Development</option>
                  <option>Experimental Hardware</option>
                  <option>Web Platform</option>
                  <option>Mobile App</option>
                  <option>Data Analytics pipeline</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg py-2.5 font-semibold text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Configuring neurons...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Synthesize Thesis Ideas</span>
                </>
              )}
            </button>

            <div className="flex gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] leading-relaxed">
              <Info className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
              <span>
                <strong>100% Free:</strong> No tokens are charged. Feel free to generate as multiple times as needed until you discover the perfect thesis alignment.
              </span>
            </div>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-8 space-y-4">
            {ideas.length === 0 ? (
              <div className="border border-dashed border-slate-800 rounded-xl p-12 text-center bg-slate-950/20">
                <Cpu className="w-10 h-10 text-slate-700 mx-auto stroke-[1.5]" />
                <h3 className="text-slate-300 font-semibold mt-3 text-sm">No Customized Ideas Generated Yet</h3>
                <p className="text-slate-500 text-xs max-w-sm mx-auto mt-1 leading-relaxed">
                  Select your technical parameters on the left pane and press "Synthesize Thesis Ideas" to prompt Gemini.
                </p>
              </div>
            ) : (
              ideas.map((idea, idx) => {
                const bookmarked = bookmarkedTitles.includes(idea.title);
                return (
                  <div
                    key={idx}
                    className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 transition-all space-y-4 shadow-lg relative overflow-hidden"
                  >
                    {/* Corner accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-bl-full pointer-events-none" />

                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="inline-flex px-2 py-0.5 rounded bg-blue-500/20 text-[10px] font-mono text-blue-400 uppercase tracking-widest font-semibold">
                          Idea {idx + 1}
                        </span>
                        <h2 className="text-lg font-bold text-white mt-1 group-hover:text-blue-400">
                          {idea.title}
                        </h2>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-1.5 shrink-0">
                        <button
                          onClick={() => onBookmarkProject({ title: idea.title, domain: currentDomain.name, abstract: idea.abstract })}
                          className={`p-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                            bookmarked
                              ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                              : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                          }`}
                          title="Bookmark project"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleCopy(`${idea.title}\n\nAbstract:\n${idea.abstract}`, idx)}
                          className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 hover:text-white text-xs transition-all cursor-pointer"
                          title="Copy info"
                        >
                          {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 border border-slate-800/50 rounded-lg p-3">
                      {idea.abstract}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase font-mono tracking-wider">Key Modules</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {idea.features?.map((f, fi) => (
                            <span key={fi} className="text-[11px] bg-slate-950 border border-slate-800/80 px-2.5 py-0.5 rounded text-slate-300">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-slate-400 uppercase font-mono tracking-wider">Tools & Frameworks</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {idea.tools?.map((t, ti) => (
                            <span key={ti} className="text-[11px] bg-blue-950/30 border border-blue-900/50 px-2.5 py-0.5 rounded text-blue-300 font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="text-[11px] text-slate-400 leading-relaxed font-sans max-w-md">
                        <span className="font-semibold text-purple-400 uppercase font-mono text-[10px] block">Future Scope</span>
                        {idea.futureScope}
                      </div>

                      <button
                        onClick={() => onSelectProject(idea.title, currentDomain.name)}
                        className="text-xs bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-blue-400 hover:text-blue-300 font-medium py-1.5 px-3 rounded shadow transition-all cursor-pointer shrink-0"
                      >
                        Select & Create Artifacts
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* TRENDING PROJECTS 2026 */
        <div className="space-y-4">
          <div className="bg-purple-950/25 border border-purple-900/40 rounded-xl p-4 flex gap-3 text-purple-200 text-xs max-w-3xl leading-relaxed">
            <Info className="w-4 h-4 shrink-0 text-purple-400 mt-0.5" />
            <span>
              <strong>Hot Academic Topics for 2026:</strong> These projects represent high-growth vectors identified from recent international conferences. Select one to automatically unlock template reports, codebases, and pitch slides.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRENDING_PROJECTS_2026.map((proj, i) => {
              const bookmarked = bookmarkedTitles.includes(proj.title);
              return (
                <div
                  key={i}
                  className="bg-slate-900/40 border border-slate-800 hover:border-purple-500/40 rounded-xl p-5 flex flex-col justify-between gap-4 transition-all hover:bg-slate-900/70"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-[9px] font-mono tracking-widest text-purple-400 uppercase font-semibold bg-purple-500/15 border border-purple-500/25 px-2 py-0.5 rounded">
                        {proj.difficulty}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">{proj.reach}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-100 font-sans tracking-tight leading-snug">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-slate-400">
                      <strong>Domain match:</strong> {proj.domain}
                    </p>

                    <p className="text-xs text-slate-500 font-mono">
                      <strong>Techs configured:</strong> {proj.tech}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-800/60 pt-3">
                    <button
                      onClick={() => onBookmarkProject({ title: proj.title, domain: proj.domain, abstract: "Trending 2026 pre-curated high caliber academic framework." })}
                      className={`text-xs flex items-center gap-1 cursor-pointer transition-all ${
                        bookmarked ? "text-amber-400" : "text-slate-500 hover:text-white"
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{bookmarked ? "Saved" : "Save Draft"}</span>
                    </button>

                    <button
                      onClick={() => onSelectProject(proj.title, proj.domain)}
                      className="text-xs bg-slate-950 border border-slate-800 hover:border-purple-600 text-purple-300 py-1 px-3.5 rounded transition-all cursor-pointer"
                    >
                      Unlock Tool Kit
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
