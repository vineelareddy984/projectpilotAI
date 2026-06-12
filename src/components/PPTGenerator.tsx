import React, { useState } from "react";
import { Presentation, Sparkles, Download, Play, ChevronLeft, ChevronRight, Check, ListChecks, Palette, Info } from "lucide-react";
import { Slide } from "../types";

interface Props {
  selectedProjectTitle: string;
  selectedProjectDomain: string;
}

export default function PPTGenerator({ selectedProjectTitle, selectedProjectDomain }: Props) {
  const [topic, setTopic] = useState(selectedProjectTitle || "");
  const [domain, setDomain] = useState(selectedProjectDomain || "");
  const [template, setTemplate] = useState("Dark Cyber");
  const [loading, setLoading] = useState(false);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (selectedProjectTitle) {
      setTopic(selectedProjectTitle);
    }
  }, [selectedProjectTitle]);

  React.useEffect(() => {
    if (selectedProjectDomain) {
      setDomain(selectedProjectDomain);
    }
  }, [selectedProjectDomain]);

  const handleGeneratePPT = async () => {
    if (!topic.trim()) {
      alert("Please specify a presentation topic first!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/generate-ppt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          domain
        })
      });
      const data = await res.json();
      if (data.slides) {
        setSlides(data.slides);
        setSlideIndex(0);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRawDeck = () => {
    let text = `PRESENTATION SLIDESHOW\nTOPIC: ${topic}\n`;
    text += `THEME DESIGN STYLE: ${template}\n${"=".repeat(40)}\n\n`;
    slides.forEach((sl) => {
      text += `SLIDE ${sl.slideNumber}: ${sl.title}\n`;
      if (sl.subtitle) text += `[${sl.subtitle}]\n`;
      sl.content.forEach((bul) => {
        text += `  * ${bul}\n`;
      });
      text += `\n${"-".repeat(30)}\n\n`;
    });
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const rawData = {
      presentationTopic: topic,
      presentationDomain: domain || "General Engineering",
      designTheme: template,
      totalSlides: slides.length,
      slides
    };
    const blob = new Blob([JSON.stringify(rawData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.toLowerCase().replace(/[^a-z0-9]/g, "_")}_slides_deck.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Helper styles based on chosen template theme
  const getSlideThemeStyles = () => {
    switch (template) {
      case "Dark Cyber":
        return {
          cardBg: "bg-[#0b0f19] border-2 border-cyan-500/30 text-white font-mono",
          titleText: "text-cyan-400 font-mono tracking-tight border-b border-cyan-950 pb-2",
          bulletIcon: "text-cyan-500 font-bold",
          subtitleText: "text-slate-400 font-mono text-[10px]"
        };
      case "Academic Clean":
        return {
          cardBg: "bg-white border border-slate-300 text-slate-900 font-serif shadow-lg",
          titleText: "text-indigo-950 font-serif font-bold border-b border-slate-100 pb-2",
          bulletIcon: "text-indigo-600",
          subtitleText: "text-indigo-800 font-sans text-[10px]"
        };
      case "Neo-Mint":
        return {
          cardBg: "bg-[#111827] border-2 border-emerald-500/20 text-slate-100 font-sans",
          titleText: "text-emerald-400 font-sans font-extrabold pb-2",
          bulletIcon: "text-emerald-400 font-bold",
          subtitleText: "text-emerald-300/60 font-mono text-[9px]"
        };
      case "Coral Sunset":
        return {
          cardBg: "bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 border border-pink-500/20 text-white font-sans shadow-xl",
          titleText: "text-pink-400 font-sans font-bold tracking-tight pb-2",
          bulletIcon: "text-pink-500",
          subtitleText: "text-pink-300 font-sans text-xs"
        };
      default:
        return {
          cardBg: "bg-slate-900 text-white font-sans",
          titleText: "text-blue-400",
          bulletIcon: "text-blue-500",
          subtitleText: "text-slate-400"
        };
    }
  };

  const activeTheme = getSlideThemeStyles();

  return (
    <div className="space-y-6">
      {/* Header and Sub */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-sans tracking-tight">
            AI-Powered PPT & Slides Creator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Instantly prepare complete university seminar slide structures for your thesis milestones.
          </p>
        </div>

        {/* Global Slide actions */}
        {slides.length > 0 && (
          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleCopyRawDeck}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Presentation className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied Slides" : "Copy Slide Draft"}</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-xs text-white transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Slides JSON</span>
            </button>
          </div>
        )}
      </div>

      {/* Input panel row */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-5 space-y-1">
            <label className="text-xs font-medium text-slate-400 uppercase font-mono tracking-wider">Project Defense Subject</label>
            <input
              type="text"
              placeholder="e.g. Adaptive Grid Computing node or active topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3 space-y-1">
            <label className="text-xs font-medium text-slate-400 uppercase font-mono tracking-wider">Academic Stream</label>
            <input
              type="text"
              placeholder="e.g. Electrical Science"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="md:col-span-2 space-y-1">
            <label className="text-xs font-medium text-slate-400 uppercase font-mono tracking-wider">Design Template</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg py-2 px-2.5 text-sm focus:border-blue-500 focus:outline-none"
            >
              <option>Dark Cyber</option>
              <option>Academic Clean</option>
              <option>Neo-Mint</option>
              <option>Coral Sunset</option>
            </select>
          </div>

          <div className="md:col-span-2 pt-5">
            <button
              onClick={handleGeneratePPT}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg py-2.5 font-semibold text-xs shadow-lg flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Configuring Slides...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Draft Slideshow</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex gap-2 p-3.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs leading-relaxed max-w-4xl">
          <Palette className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
          <span>
            <strong>Presentation Style Sheet:</strong> Dynamic styling modifies margins, backgrounds, border lights, and font groupings. Generate slides structure then browse using the slide deck viewer down below.
          </span>
        </div>
      </div>

      {/* Slide Deck Viewer */}
      {slides.length === 0 ? (
        <div className="border border-dashed border-slate-800 rounded-xl p-16 text-center bg-slate-950/20">
          <Presentation className="w-12 h-12 text-slate-700 mx-auto stroke-[1.5]" />
          <h3 className="text-slate-300 font-semibold mt-3 text-sm font-sans">No Presentation Deck Configured Yet</h3>
          <p className="text-slate-500 text-xs max-w-sm mx-auto mt-1 leading-relaxed">
            Write your project subject topic above and press "Draft Slideshow" to let Gemini formulate 7 structured high-impact slide arrays.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Interactive Academic Slider Player</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Slide <strong className="text-white">{slideIndex + 1}</strong> of {slides.length}
            </span>
          </div>

          {/* Slides Stage */}
          <div className="flex items-center justify-center">
            <div className={`w-full max-w-4xl min-h-[350px] rounded-2xl p-8 relative flex flex-col justify-between transition-all duration-300 ${activeTheme.cardBg}`}>
              {/* Slide numbering badge */}
              <div className="absolute top-6 right-6 font-mono text-[10px] tracking-widest px-2.5 py-1 rounded bg-black/40 border border-white/10">
                SLIDE {slides[slideIndex].slideNumber} / {slides.length}
              </div>

              {/* Slide Body */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className={activeTheme.subtitleText}>
                    {slides[slideIndex].subtitle || domain || "GRADUATION THESIS DEFENSE 2026"}
                  </span>
                  <h2 className={`text-xl md:text-2xl font-bold ${activeTheme.titleText}`}>
                    {slides[slideIndex].title}
                  </h2>
                </div>

                <ul className="space-y-3 pt-3">
                  {slides[slideIndex].content?.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-2.5 text-xs md:text-sm leading-relaxed">
                      <span className={`select-none text-base shrink-0 ${activeTheme.bulletIcon}`}>■</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Slide Footer */}
              <div className="pt-6 border-t border-white/5 flex justify-between items-center text-[9px] uppercase tracking-wider opacity-60">
                <span>PROJECTPILOT.AI — FREE DEFENSE SUITE</span>
                <span>CONFIDENTIAL & SECURE STUDY DRAFT</span>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="flex justify-between items-center max-w-4xl mx-auto pt-2">
            <button
              onClick={() => setSlideIndex((prev) => Math.max(0, prev - 1))}
              disabled={slideIndex === 0}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    slideIndex === idx ? "bg-blue-500 w-6" : "bg-slate-700 hover:bg-slate-600"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
              disabled={slideIndex === slides.length - 1}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Advancements footer */}
      <div className="bg-purple-950/20 border border-purple-900/30 rounded-xl p-4 flex gap-3 text-purple-300 text-xs max-w-4xl leading-relaxed">
        <Info className="w-4 h-4 shrink-0 text-purple-400 mt-0.5" />
        <span>
          <strong>Powerpoint Integration:</strong> Want to use Microsoft PowerPoint? Simply copy the structural text deck output or fetch raw JSON decks to translate instantly using standard copy-paste, LaTeX slides, or direct pandoc translation loops.
        </span>
      </div>
    </div>
  );
}
