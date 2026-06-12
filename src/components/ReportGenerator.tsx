import React, { useState } from "react";
import { BookOpen, Sparkles, Download, Printer, Check, Info, AlertCircle, Edit3 } from "lucide-react";

interface Props {
  selectedProjectTitle: string;
  selectedProjectDomain: string;
}

const REPORT_SECTIONS = [
  "Abstract",
  "Introduction",
  "Literature Survey",
  "Methodology",
  "Results",
  "Conclusion",
  "References"
];

export default function ReportGenerator({ selectedProjectTitle, selectedProjectDomain }: Props) {
  const [topic, setTopic] = useState(selectedProjectTitle || "");
  const [domain, setDomain] = useState(selectedProjectDomain || "");
  const [theme, setTheme] = useState("Academic (IEEE Serif)");
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState("Abstract");
  const [copied, setCopied] = useState(false);

  // Store editable state of each section report here
  const [sectionsData, setSectionsData] = useState<Record<string, string>>({
    Abstract: `Click "Generate from AI" below to outline a scientific draft for Abstract...`,
    Introduction: `Click "Generate from AI" below to outline a scientific draft for Introduction...`,
    "Literature Survey": `Click "Generate from AI" below to outline a scientific draft for Literature Survey...`,
    Methodology: `Click "Generate from AI" below to outline a scientific draft for Methodology...`,
    Results: `Click "Generate from AI" below to outline a scientific draft for Results...`,
    Conclusion: `Click "Generate from AI" below to outline a scientific draft for Conclusion...`,
    References: `Click "Generate from AI" below to outline a scientific draft for References...`
  });

  const [editingText, setEditingText] = useState(sectionsData[currentSection]);

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

  // Keep editor state synced when section changes
  React.useEffect(() => {
    setEditingText(sectionsData[currentSection]);
  }, [currentSection, sectionsData]);

  const handleGenerateSection = async (sec: string) => {
    if (!topic.trim()) {
      alert("Please outline or select a project topic first!");
      return;
    }
    setLoadingSection(sec);
    try {
      const res = await fetch("/api/generate-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          domain,
          section: sec
        })
      });
      const data = await res.json();
      if (data.content) {
        setSectionsData((prev) => ({
          ...prev,
          [sec]: data.content
        }));
        if (currentSection === sec) {
          setEditingText(data.content);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSection(null);
    }
  };

  const saveCurrentText = () => {
    setSectionsData((prev) => ({
      ...prev,
      [currentSection]: editingText
    }));
  };

  const handleCopyAll = () => {
    let fullDoc = `TITLE: ${topic.toUpperCase()}\nDOMAIN: ${domain}\n${"=".repeat(50)}\n\n`;
    REPORT_SECTIONS.forEach((sec) => {
      fullDoc += `--- ${sec.toUpperCase()} ---\n${sectionsData[sec]}\n\n`;
    });
    navigator.clipboard.writeText(fullDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadDOCX = () => {
    // Generate a quick downloadable .doc formatted file (which Word and other editors parse immediately!)
    let fullDoc = `<html><head><meta charset='utf-8'></head><body>`;
    fullDoc += `<h1 style='text-align: center;'>${topic}</h1>`;
    fullDoc += `<h3 style='text-align: center; color: #555555;'>Academic Thesis Layout Proposal</h3>`;
    fullDoc += `<p style='text-align: center;'>Domain Match: ${domain}</p><hr/>`;

    REPORT_SECTIONS.forEach((sec) => {
      fullDoc += `<h2 style='color: rgb(30, 58, 138); font-family: serif;'>${sec}</h2>`;
      fullDoc += `<p style='line-height: 1.6; font-family: serif; white-space: pre-wrap;'>${sectionsData[sec].replace(/\n/g, "<br/>")}</p><br/>`;
    });
    fullDoc += `</body></html>`;

    const blob = new Blob([fullDoc], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${topic.toLowerCase().replace(/[^a-z0-9]/g, "_")}_ieee_report.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  // Get active layout class list matching user selected template theme
  const getThemeFontClass = () => {
    if (theme.includes("Serif")) return "font-serif tracking-normal leading-relaxed text-slate-100";
    if (theme.includes("Mono")) return "font-mono text-xs tracking-tight text-slate-200";
    return "font-sans tracking-wide leading-relaxed text-slate-200";
  };

  return (
    <div className="space-y-6">
      {/* Header and Sub */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-sans tracking-tight">
            IEEE Thesis & Report Template Generator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Build clean, scholarly paragraphs to structure your final year research publications.
          </p>
        </div>

        {/* Global actions */}
        <div className="flex flex-wrap gap-2 shrink-0">
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <BookOpen className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied Thesis" : "Copy Paper Raw"}</span>
          </button>

          <button
            onClick={handleDownloadDOCX}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-xs text-white transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOCX Document</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Layout</span>
          </button>
        </div>
      </div>

      {/* Input row */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-6 space-y-1">
          <label className="text-xs font-medium text-slate-400 uppercase font-mono tracking-wider">Project Topic</label>
          <input
            type="text"
            placeholder="No project active. Select or write one..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-3 space-y-1">
          <label className="text-xs font-medium text-slate-400 uppercase font-mono tracking-wider">Research Domain</label>
          <input
            type="text"
            placeholder="e.g. Cognitive Systems"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-3 space-y-1">
          <label className="text-xs font-medium text-slate-400 uppercase font-mono tracking-wider">IEEE Paper Layout</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg py-2 px-2.5 text-sm focus:border-blue-500 focus:outline-none"
          >
            <option>Academic (IEEE Serif)</option>
            <option>Tech Scientific (Modern Sans)</option>
            <option>Minimalist Terminal (System Mono)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Sections Selector */}
        <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4 space-y-2">
          <h3 className="text-xs font-semibold text-slate-400 uppercase font-mono tracking-wider px-2">Report Chapters</h3>
          <div className="space-y-1">
            {REPORT_SECTIONS.map((sec) => (
              <button
                key={sec}
                onClick={() => {
                  saveCurrentText();
                  setCurrentSection(sec);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                  currentSection === sec
                    ? "bg-blue-600/25 text-blue-400 border border-blue-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50 border border-transparent"
                }`}
              >
                <span>{sec}</span>
                {sectionsData[sec].includes("Click") ? (
                  <span className="text-[10px] text-slate-600 italic">Empty</span>
                ) : (
                  <span className="text-[10px] text-emerald-500 font-mono">Completed</span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <button
              onClick={() => handleGenerateSection(currentSection)}
              disabled={loadingSection !== null}
              className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-blue-400 hover:text-blue-300 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
            >
              {loadingSection === currentSection ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
                  <span>Prompting Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate {currentSection}</span>
                </>
              )}
            </button>

            <button
              onClick={async () => {
                for (const sec of REPORT_SECTIONS) {
                  await handleGenerateSection(sec);
                }
              }}
              disabled={loadingSection !== null}
              className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 animate-bounce" />
              <span>Bulk Compile All Chapters</span>
            </button>
          </div>
        </div>

        {/* Right Side: Chapter Editor Panel */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
          {/* Editor Header info */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Edit3 className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">{currentSection} Chapter Editor</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">Syncs inside auto-save cache</div>
          </div>

          <div className="p-4 space-y-4">
            <textarea
              className="w-full h-80 bg-slate-950 text-slate-300 placeholder-slate-600 p-4 border border-slate-800 rounded-lg focus:outline-none focus:border-blue-500 text-xs font-sans leading-relaxed resize-y"
              value={editingText}
              onChange={(e) => setEditingText(e.target.value)}
              placeholder="Thesis text configuration..."
            />

            <div className="flex justify-between items-center">
              <button
                onClick={saveCurrentText}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded text-xs font-semibold transition cursor-pointer"
              >
                Apply & Save Draft
              </button>
              <p className="text-[10.5px] text-slate-500">
                You can write manually or customize generated templates anytime.
              </p>
            </div>
          </div>

          {/* Styled Document Mock View */}
          <div className="bg-slate-900/20 p-6 border-t border-slate-800 max-h-96 overflow-y-auto space-y-4">
            <h4 className="text-[10px] font-mono text-slate-600 uppercase tracking-widest font-bold">Scientific Display Mockup Output (Printed Style)</h4>
            <div className="bg-slate-950/80 border border-slate-800/80 p-8 rounded-lg shadow-inner">
              <div className="text-center space-y-1.5 mb-6">
                <h1 className="text-base font-bold text-slate-100 uppercase tracking-tight">{topic || "PROJECT THESIS TITLE NOT SPECIFIED"}</h1>
                <p className="text-[11px] text-slate-400 uppercase font-mono">Domain matching: {domain || "General Elective"}</p>
                <div className="w-16 h-0.5 bg-blue-500/50 mx-auto" />
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-blue-400 capitalize underline font-mono tracking-wide">{currentSection}</h3>
                <div className={`${getThemeFontClass()} whitespace-pre-wrap text-[11.5px]`}>
                  {editingText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-950/20 border border-amber-900/30 rounded-xl p-4 flex gap-3 text-amber-300 text-xs max-w-3xl leading-relaxed">
        <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
        <span>
          <strong>Format Compliance:</strong> Standard output follows typical academic structures. However, please evaluate the final layouts against your specific university guidelines (IEEE, Harvard, or ACM formats) prior to printing.
        </span>
      </div>
    </div>
  );
}
