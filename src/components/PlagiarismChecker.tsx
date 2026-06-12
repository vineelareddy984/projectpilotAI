import React, { useState } from "react";
import { Copy, ShieldAlert, Sparkles, Check, Info, FileText, RefreshCw, AlertTriangle } from "lucide-react";
import { PlagiarismFinding } from "../types";

export default function PlagiarismChecker() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState<number | null>(null);
  const [findings, setFindings] = useState<PlagiarismFinding[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [originalCopied, setOriginalCopied] = useState(false);

  const handleAudit = async () => {
    if (!text.trim()) {
      alert("Please paste some report text or thesis paragraphs to audit structure!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/check-plagiarism", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      setPercentage(data.plagiarismPercentage);
      if (data.findings) {
        setFindings(data.findings);
      } else {
        setFindings([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = (txt: string, idx: number) => {
    navigator.clipboard.writeText(txt);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const getPercentageColor = (pts: number) => {
    if (pts < 10) return "text-emerald-400";
    if (pts < 20) return "text-amber-400";
    return "text-red-400 font-extrabold animate-pulse";
  };

  return (
    <div className="space-y-6">
      {/* Header and Sub */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-sans tracking-tight">
            Academic Plagiarism Compliance Auditor
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Ensure your reports align within secure scientific limits prior to university board evaluations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Input box */}
        <div className="lg:col-span-7 bg-slate-900/65 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-slate-300 uppercase font-mono tracking-wider">Paste report paragraphs</span>
            <span className="text-[10px] text-slate-500 font-mono">Word Limit: ~600 words</span>
          </div>

          <textarea
            rows={10}
            placeholder="Paste your thesis Abstract, Introduction, or Methodology statements here to verify duplicate indices and unlock paraphrasing suggestions..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-slate-950 text-slate-300 placeholder-slate-700 p-4 border border-slate-800 rounded-lg focus:outline-none focus:border-red-500 text-xs leading-relaxed resize-none"
            disabled={loading}
          />

          <div className="flex justify-between items-center">
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  setText(
                    "Vaswani claims that deep neural layers are highly scalable and address the core bottlenecks of spatial telemetry models. However, standard hardware frameworks have traditional memory leaks and high pricing constraints that slow implementation on consumer microchips."
                  );
                }}
                className="text-[10.5px] text-slate-500 hover:text-slate-300 transition cursor-pointer"
              >
                [Load Sample Excerpt]
              </button>
            </div>

            <button
              onClick={handleAudit}
              disabled={loading}
              className="bg-red-700 hover:bg-red-600 text-white rounded-lg py-2 px-5 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-40 transition-all shadow-md"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Auditing Compliance...</span>
                </>
              ) : (
                <>
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Audit Plagiarism %</span>
                </>
              )}
            </button>
          </div>

          <div className="flex gap-2 p-3.5 bg-blue-500/10 border border-blue-500/25 text-blue-300 rounded-lg text-xs leading-relaxed">
            <Info className="w-4 h-4 shrink-0 text-blue-400 mt-0.5" />
            <span>
              <strong>100% Secure Audits:</strong> Data is evaluated temporarily on our server for metric predictions, preserving student confidentiality. No paragraphs are ever indexed in global databases.
            </span>
          </div>
        </div>

        {/* Results view */}
        <div className="lg:col-span-5 space-y-4">
          {percentage === null ? (
            <div className="border border-dashed border-slate-800 rounded-xl p-16 text-center bg-slate-950/20">
              <FileText className="w-10 h-10 text-slate-700 mx-auto stroke-[1.5]" />
              <h3 className="text-slate-300 font-semibold mt-3 text-sm">No Report Audit Performed Yet</h3>
              <p className="text-slate-500 text-xs max-w-xs mx-auto mt-1 leading-relaxed">
                Paste report blocks inside the auditor on the left pane and trigger the analysis to visualize similar source databases and neural paraphrases.
              </p>
            </div>
          ) : (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-5">
              <div className="border-b border-slate-800 pb-4 text-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold block">Compliance Percentage Report</span>
                <span className={`text-4xl font-black font-mono transition-all block mt-1.5 ${getPercentageColor(percentage)}`}>
                  {percentage}%
                </span>
                <span className="text-xs text-slate-400 font-sans block mt-1">
                  {percentage < 15 ? "✓ Excellent Academic Compliance Level" : "⚠ Plagiarism levels exceed recommended margins!"}
                </span>
              </div>

              {findings.length === 0 ? (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/25 rounded-lg text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Pristine syntax. No duplicate publications identified in major databases!</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>Unoriginal Detections & Rewriting Help</span>
                  </h4>

                  <div className="space-y-3.5 max-h-80 overflow-y-auto pr-1">
                    {findings.map((finding, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-800 rounded-lg p-3.5 space-y-3">
                        <div className="space-y-1">
                          <span className="text-[9px] text-red-400 font-mono font-bold uppercase tracking-wide">ORIGINAL TEXT EXCERPT:</span>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans font-medium">
                            "{finding.originalSentence}"
                          </p>
                          <span className="text-[9px] text-slate-500 font-mono block">Source matches: {finding.similarSource}</span>
                        </div>

                        <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80 space-y-1 relative">
                          <span className="text-[9px] text-emerald-400 font-mono font-bold uppercase tracking-wide flex items-center gap-1">
                            <Sparkles className="w-3 h-3 animate-pulse" />
                            <span>RECOMMENDED PARAPHRASE:</span>
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed font-sans italic pr-6">
                            "{finding.paraphraseSuggestion}"
                          </p>
                          <button
                            onClick={() => handleCopyText(finding.paraphraseSuggestion, idx)}
                            className="absolute top-2.5 right-2 text-slate-500 hover:text-white transition cursor-pointer"
                            title="Copy Paraphrase"
                          >
                            {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
