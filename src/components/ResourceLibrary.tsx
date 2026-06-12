import React, { useState } from "react";
import { Search, Database, FileText, Github, BookOpen, Youtube, Bookmark, Filter, Check, ExternalLink } from "lucide-react";
import { STATIC_RESOURCES } from "../data";
import { ResourceItem } from "../types";

export default function ResourceLibrary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem("projectpilot_bookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  const handleToggleBookmark = (title: string) => {
    let next: string[];
    if (bookmarks.includes(title)) {
      next = bookmarks.filter((b) => b !== title);
    } else {
      next = [...bookmarks, title];
    }
    setBookmarks(next);
    localStorage.setItem("projectpilot_bookmarks", JSON.stringify(next));
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "Datasets":
        return <Database className="w-4 h-4 text-emerald-400" />;
      case "Research":
        return <FileText className="w-4 h-4 text-blue-400" />;
      case "GitHub":
        return <Github className="w-4 h-4 text-slate-100" />;
      case "Tutorials":
        return <BookOpen className="w-4 h-4 text-amber-400" />;
      case "YouTube":
        return <Youtube className="w-4 h-4 text-red-500" />;
      default:
        return <Filter className="w-4 h-4 text-slate-400" />;
    }
  };

  // Filter logic
  const filtered = STATIC_RESOURCES.filter((res) => {
    const matchesCategory = selectedCategory === "All" || res.category === selectedCategory;
    const matchesQuery =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.techKeywords.some((key) => key.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header and Sub */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-sans tracking-tight">
            Academic Datasets & Resources Library
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Access free repository engines, research nodes, open datasets, and vetted tutorials.
          </p>
        </div>
      </div>

      {/* Filter and query controller block */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4.5 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Query inputs */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search datasets, research engines, or keywords (e.g. ML, IoT)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Quick preset buttons */}
          <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-1">
            {["All", "Datasets", "Research", "GitHub", "YouTube"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hot terms shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider font-bold">Refine queries:</span>
          {["ml", "ai", "ds", "cyber", "ece", "web"].map((keyword) => (
            <button
              key={keyword}
              onClick={() => setSearchQuery(keyword)}
              className="bg-slate-950 border border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-white px-2.5 py-1 rounded text-[10.5px] font-mono uppercase transition cursor-pointer"
            >
              #{keyword}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-[10px] text-red-400 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Grid of Materials items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full border border-dashed border-slate-800 rounded-xl p-16 text-center bg-slate-950/20">
            <Search className="w-10 h-10 text-slate-700 mx-auto stroke-[1.5]" />
            <h3 className="text-slate-300 font-semibold mt-3 text-sm">No Academic Materials Matches Found</h3>
            <p className="text-slate-500 text-xs max-w-xs mx-auto mt-1 leading-relaxed">
              Clear your input keyword query or adjust categories above to explore general curriculum assets.
            </p>
          </div>
        ) : (
          filtered.map((item, idx) => {
            const isBookmarked = bookmarks.includes(item.title);
            return (
              <div
                key={idx}
                className="bg-slate-900/35 border border-slate-800/85 hover:border-slate-700 p-4 rounded-xl flex flex-col justify-between gap-4 transition-all hover:bg-slate-900/60"
              >
                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-[10px] font-mono font-bold uppercase tracking-wide">
                      {getCategoryIcon(item.category)}
                      <span className="text-slate-300">{item.category}</span>
                    </span>

                    <button
                      onClick={() => handleToggleBookmark(item.title)}
                      className={`text-slate-500 hover:text-white transition cursor-pointer ${
                        isBookmarked ? "text-amber-400 hover:text-amber-300" : ""
                      }`}
                      title={isBookmarked ? "Remove Bookmark" : "Bookmark Link"}
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-amber-400 text-amber-400" : ""}`} />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-slate-200 font-sans tracking-tight leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed font-sans pr-1">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-slate-800/60 pt-3 flex items-center justify-between">
                  <div className="flex gap-1">
                    {item.techKeywords?.map((tag) => (
                      <span key={tag} className="text-[9.5px] font-mono text-slate-500">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="text-[10.5px] font-mono font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-all"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="w-3" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Persistent notifications advice */}
      <div className="bg-emerald-950/15 border border-emerald-900/25 rounded-xl p-4.5 text-emerald-300 text-xs max-w-4xl leading-relaxed flex gap-2">
        <Check className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
        <span>
          <strong>Open Access Integration:</strong> All indexed references represent high quality open educational resource platforms (OER). Students will never encounter paywalls, paymeters, or subscription fees using these connections.
        </span>
      </div>
    </div>
  );
}
