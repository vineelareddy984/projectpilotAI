import React, { useState, useEffect } from "react";
import { ListChecks, Plus, CheckSquare, Calendar, Trash, AlertCircle, TrendingUp, Users, Info, Square } from "lucide-react";
import { TrackerTask, TrackerMilestone } from "../types";

// Default pre-seeded core milestones
const DEFAULT_MILESTONES: TrackerMilestone[] = [
  { id: "1", title: "Project Registration & Topic Approval", date: "2026-06-25", completed: true },
  { id: "2", title: "Literature Survey Collection & Submission", date: "2026-07-20", completed: false },
  { id: "3", title: "System Architecture Proposal Seminar", date: "2026-08-15", completed: false },
  { id: "4", title: "Core Software Module Alpha testing", date: "2026-10-10", completed: false },
  { id: "5", title: "Submission of Dissertation Draft & Final External Viva", date: "2026-11-20", completed: false }
];

// Default tasks
const DEFAULT_TASKS: TrackerTask[] = [
  {
    id: "t1",
    title: "Configure Database schemas and tables",
    description: "Write structural SQL layout tables or MongoDB schemas matching the core project requirements.",
    category: "Coding",
    status: "Completed",
    dueDate: "2026-06-30",
    teamMember: "Student Team Lead"
  },
  {
    id: "t2",
    title: "Draft system architecture schematic figures",
    description: "Formulate neat UML diagrams and data routing blocks perfect for Chapter 3 report layout.",
    category: "Research",
    status: "In Progress",
    dueDate: "2026-07-10",
    teamMember: "System Architect"
  },
  {
    id: "t3",
    title: "Proofread Abstract plagiarism levels",
    description: "Evaluate chapter lines inside plagiarism helper to ensure unoriginal parameters are rewritten.",
    category: "Documentation",
    status: "Pending",
    dueDate: "2026-07-15",
    teamMember: "Documentation Auditor"
  }
];

export default function ProgressTracker() {
  const [tasks, setTasks] = useState<TrackerTask[]>(() => {
    const saved = localStorage.getItem("projectpilot_tasks");
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  const [milestones, setMilestones] = useState<TrackerMilestone[]>(() => {
    const saved = localStorage.getItem("projectpilot_milestones");
    return saved ? JSON.parse(saved) : DEFAULT_MILESTONES;
  });

  // Task creators state
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newCategory, setNewCategory] = useState<"Coding" | "Documentation" | "Testing" | "Presentation" | "Research">("Coding");
  const [newDueDate, setNewDueDate] = useState("");
  const [newMember, setNewMember] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("All");

  // Milestone creators
  const [mTitle, setMTitle] = useState("");
  const [mDate, setMDate] = useState("");

  useEffect(() => {
    localStorage.setItem("projectpilot_tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("projectpilot_milestones", JSON.stringify(milestones));
  }, [milestones]);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const task: TrackerTask = {
      id: "task_" + Date.now(),
      title: newTitle.trim(),
      description: newDesc.trim() || "No detailed parameters supplied.",
      category: newCategory,
      status: "Pending",
      dueDate: newDueDate || new Date().toISOString().split("T")[0],
      teamMember: newMember.trim() || "Unspecified Operator"
    };

    setTasks((prev) => [task, ...prev]);
    setNewTitle("");
    setNewDesc("");
    setNewMember("");
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStatusCycle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextStatusMap: Record<string, "Pending" | "In Progress" | "Completed"> = {
            Pending: "In Progress",
            "In Progress": "Completed",
            Completed: "Pending"
          };
          return { ...t, status: nextStatusMap[t.status] };
        }
        return t;
      })
    );
  };

  const toggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completed: !m.completed } : m))
    );
  };

  const handleCreateMilestone = () => {
    if (!mTitle.trim() || !mDate) return;
    const mile: TrackerMilestone = {
      id: "mile_" + Date.now(),
      title: mTitle.trim(),
      date: mDate,
      completed: false
    };
    setMilestones((prev) => [...prev, mile].sort((x, y) => x.date.localeCompare(y.date)));
    setMTitle("");
    setMDate("");
  };

  const handleDeleteMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
  };

  // Stats
  const completedTasksCount = tasks.filter((t) => t.status === "Completed").length;
  const progressPercent = tasks.length > 0 ? Math.round((completedTasksCount / tasks.length) * 100) : 0;

  const filteredTasks = filterCategory === "All" ? tasks : tasks.filter((t) => t.category === filterCategory);

  return (
    <div className="space-y-6">
      {/* Header and Sub */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-sans tracking-tight">
            Thesis Tasks & Milestone Tracker
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Maintain high team collaboration velocities and control thesis submission checkpoints.
          </p>
        </div>

        {/* Global Progress Indicators */}
        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 rounded-xl p-3 shrink-0">
          <div className="text-left">
            <p className="text-[10px] text-slate-500 font-mono">THESIS LEVEL Completed</p>
            <p className="text-lg font-black text-blue-400 font-mono">{progressPercent}%</p>
          </div>
          <div className="w-24 h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left column: Add tasks Form & Milestones Timeline */}
        <div className="lg:col-span-4 space-y-6">
          {/* Form */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Register New Assignment
            </h3>

            <form onSubmit={handleAddTask} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">Assignment Title</label>
                <input
                  type="text"
                  placeholder="e.g. Code database interface"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-700 rounded-lg py-1.5 px-3 text-xs focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">Task Parameters Description</label>
                <textarea
                  rows={2}
                  placeholder="Details and implementation requirements..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-950 text-slate-300 placeholder-slate-700 py-1.5 px-3 border border-slate-800 rounded-lg focus:outline-none focus:border-blue-500 text-xs resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-medium">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg py-1.5 px-2 text-xs focus:border-blue-500 focus:outline-none"
                  >
                    <option>Coding</option>
                    <option>Documentation</option>
                    <option>Testing</option>
                    <option>Presentation</option>
                    <option>Research</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-medium">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-lg py-1 px-2 text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400 font-medium">Assign Owner</label>
                <input
                  type="text"
                  placeholder="e.g. Lead Programmer"
                  value={newMember}
                  onChange={(e) => setNewMember(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-700 rounded-lg py-1.5 px-3 text-xs focus:border-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 text-blue-400 hover:text-blue-300 py-2 rounded-lg text-xs font-semibold cursor-pointer transition flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Append Task</span>
              </button>
            </form>
          </div>

          {/* Milestones timeline check */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Submission Milestones
            </h3>

            <div className="space-y-3">
              {milestones.map((m) => (
                <div key={m.id} className="flex gap-3 items-start border-l border-slate-800 pl-3.5 pb-2 relative">
                  {/* Timeline point indicator */}
                  <button
                    onClick={() => toggleMilestone(m.id)}
                    className={`absolute -left-1.5 top-0.5 rounded-full w-3.5 h-3.5 flex items-center justify-center border cursor-pointer ${
                      m.completed ? "bg-blue-500 border-blue-400" : "bg-slate-950 border-slate-700"
                    }`}
                  >
                    {m.completed && <CheckSquare className="w-2.5 h-2.5 text-white stroke-[3.5]" />}
                  </button>

                  <div className="flex-1 space-y-0.5">
                    <p
                      onClick={() => toggleMilestone(m.id)}
                      className={`text-xs font-bold leading-tight cursor-pointer ${
                        m.completed ? "line-through text-slate-500" : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {m.title}
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {m.date}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteMilestone(m.id)}
                    className="text-slate-600 hover:text-red-400 transition cursor-pointer"
                  >
                    <Trash className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick append milestone */}
            <div className="pt-3 border-t border-slate-800/60 grid grid-cols-1 gap-2">
              <input
                type="text"
                placeholder="New Milestone Title..."
                value={mTitle}
                onChange={(e) => setMTitle(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-slate-300 placeholder-slate-700 rounded p-1.5 text-[11px] focus:outline-none"
              />
              <div className="flex gap-1">
                <input
                  type="date"
                  value={mDate}
                  onChange={(e) => setMDate(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-slate-400 rounded p-1 text-[11px] flex-1 focus:outline-none"
                />
                <button
                  onClick={handleCreateMilestone}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-1 rounded text-[11px] font-bold cursor-pointer transition"
                >
                  Append
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Active Tasks dashboard */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-center bg-slate-900/40 p-3 rounded-xl border border-slate-800/80">
            {/* Category Filter switcher */}
            <div className="flex flex-wrap gap-1">
              {["All", "Coding", "Documentation", "Testing", "Presentation", "Research"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded text-[11px] font-medium transition cursor-pointer ${
                    filterCategory === cat ? "bg-blue-600/30 text-blue-400 border border-blue-500/40" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-[10px] text-slate-500 font-mono">
              Total list: {filteredTasks.length}
            </div>
          </div>

          {/* Tasks Grid */}
          {filteredTasks.length === 0 ? (
            <div className="border border-dashed border-slate-800 rounded-xl p-16 text-center bg-slate-950/20">
              <ListChecks className="w-10 h-10 text-slate-700 mx-auto stroke-[1.5]" />
              <h3 className="text-slate-300 font-semibold mt-3 text-sm">No assignments active in this query</h3>
              <p className="text-slate-500 text-xs max-w-xs mx-auto mt-1 leading-relaxed">
                Add target milestones on the left pane or switch categories to evaluate your active logs.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredTasks.map((t) => (
                <div
                  key={t.id}
                  className="bg-slate-900/30 border border-slate-800 rounded-xl p-4.5 hover:border-slate-700/60 transition flex md:items-center justify-between gap-4 flex-col md:flex-row relative overflow-hidden"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                        {t.category}
                      </span>
                      <span className="text-[9px] font-mono text-slate-500 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {t.teamMember}
                      </span>
                    </div>

                    <h3 className="text-xs md:text-sm font-bold text-white tracking-tight leading-snug">
                      {t.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed font-sans pr-4">
                      {t.description}
                    </p>

                    <p className="text-[10px] text-slate-500 font-mono">
                      Target Submission date: <span className="text-slate-300">{t.dueDate}</span>
                    </p>
                  </div>

                  {/* Actions right */}
                  <div className="flex md:flex-col items-center md:items-end justify-between shrink-0 gap-3">
                    {/* Status badge - click cycles status */}
                    <button
                      onClick={() => handleStatusCycle(t.id)}
                      className={`px-3 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                        t.status === "Completed"
                          ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-400"
                          : t.status === "In Progress"
                          ? "bg-amber-500/15 border-amber-500/25 text-amber-400"
                          : "bg-slate-950 border-slate-800 text-slate-400"
                      }`}
                      title="Click to cycle status"
                    >
                      {t.status}
                    </button>

                    <button
                      onClick={() => handleDeleteTask(t.id)}
                      className="text-slate-600 hover:text-red-400 p-1.5 hover:bg-slate-900 rounded transition cursor-pointer"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
