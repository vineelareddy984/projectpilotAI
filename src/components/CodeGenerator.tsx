import React, { useState } from "react";
import { Code, Sparkles, Copy, Check, Terminal, Play, Info, Coffee } from "lucide-react";

const CODE_TEMPLATES = [
  { label: "React Task Dashboard Tracker", tech: "React", task: "Interactive responsive Todo list card with LocalStorage autosave" },
  { label: "Python OpenCV Edge Spotter", tech: "Python", task: "Load image from local drive and highlight major contour outlines" },
  { label: "NodeJS SQLite Express Connection", tech: "Node.js", task: "Setup REST API with standard GET and POST parameter queries" },
  { label: "C++ A* Shortest Path Tracker", tech: "C++", task: "Graph node navigation solver finding lowest cost paths" }
];

export default function CodeGenerator() {
  const [tech, setTech] = useState("Python");
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ title: string; language: string; code: string; explanation: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateCode = async (selectedTech?: string, selectedTask?: string) => {
    const tVal = selectedTech || tech;
    const gVal = selectedTask || task;

    if (!gVal.trim()) {
      alert("Please enter a functional goal task first!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/code-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tech: tVal,
          task: gVal
        })
      });
      const data = await res.json();
      if (data) {
        setResult({
          title: data.title || `${tVal} Starter Code`,
          language: data.language || tVal,
          code: data.code || "",
          explanation: data.explanation || ""
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header and Sub */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-sans tracking-tight">
            AI Starter Code Generator
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Produce verified boilerplate scripts, database schemas, or routing nodes on-the-fly.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left pane: configuration options */}
        <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
            Boilerplate Configurations
          </h3>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">Target Coding Language</label>
            <select
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-lg py-2 px-3 text-xs focus:border-blue-500 focus:outline-none"
            >
              <option>Python</option>
              <option>React</option>
              <option>JavaScript</option>
              <option>Node.js</option>
              <option>Java</option>
              <option>C++</option>
              <option>SQL</option>
              <option>Solidity</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs text-slate-400">Describe What the Script Does</label>
            <textarea
              rows={4}
              placeholder="e.g. Read local soil sensor data over serial and post metrics to an API gateway..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full bg-slate-950 text-slate-300 placeholder-slate-700 p-3 border border-slate-800 rounded-lg focus:outline-none focus:border-blue-500 text-xs leading-relaxed resize-none"
              disabled={loading}
            />
          </div>

          <button
            onClick={() => handleGenerateCode()}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg py-2 h-9 font-semibold text-xs flex items-center justify-center gap-1 cursor-pointer transition disabled:opacity-40"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Assembling compilation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Spit Out Boilerplate</span>
              </>
            )}
          </button>

          {/* Quick presets list */}
          <div className="space-y-2 border-t border-slate-800/60 pt-4">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold">Academic Starter Examples</span>
            <div className="grid grid-cols-1 gap-2">
              {CODE_TEMPLATES.map((tpl, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setTech(tpl.tech);
                    setTask(tpl.task);
                    handleGenerateCode(tpl.tech, tpl.task);
                  }}
                  className="w-full text-left bg-slate-950 border border-slate-800/80 hover:border-slate-700 p-2.5 rounded-lg transition cursor-pointer text-[10.5px] leading-relaxed group"
                >
                  <span className="font-semibold text-blue-400 group-hover:text-blue-300 font-sans block">{tpl.label}</span>
                  <span className="text-slate-500 font-mono text-[9.5px]">Uses: {tpl.tech}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right pane: Code Terminal Output */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
          {/* Mock shell header */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Terminal className="text-emerald-400 w-4 h-4 animate-pulse" />
              <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                {result ? result.title : "Live Code Terminal Console"}
              </span>
            </div>

            {result && (
              <button
                onClick={handleCopyCode}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-slate-950 border border-slate-800 px-2.5 py-1 rounded transition cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy Raw"}</span>
              </button>
            )}
          </div>

          {result ? (
            <div className="flex flex-col h-full">
              {/* Code text container */}
              <pre className="p-5 font-mono text-[11px] leading-relaxed text-slate-300 bg-[#0d1117] max-h-96 overflow-auto border-b border-slate-800 selection:bg-blue-500/30">
                <code>{result.code}</code>
              </pre>

              {/* Explanatory notes */}
              <div className="p-4 bg-slate-900/60 font-sans text-xs flex gap-2.5 text-slate-300 leading-relaxed border-t border-slate-800">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Structural Guidance:</strong> {result.explanation}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-20 text-center text-slate-700 bg-[#0b0e14]">
              <Code className="w-12 h-12 text-slate-800 mx-auto stroke-[1.5]" />
              <h3 className="text-slate-500 font-semibold mt-3 text-sm font-sans">No Boilerplate Generated</h3>
              <p className="text-slate-600 text-xs max-w-xs mx-auto mt-1 leading-relaxed">
                Choose code specifications on the left panel or activate any preloaded examples to stream immediate repo results here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
