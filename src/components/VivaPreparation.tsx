import React, { useState } from "react";
import { Award, BrainCircuit, Sparkles, AlertCircle, RefreshCw, Send, CheckCircle, Flame, Star } from "lucide-react";
import { VivaQuestion } from "../types";

interface Props {
  selectedProjectTitle: string;
  selectedProjectDomain: string;
}

export default function VivaPreparation({ selectedProjectTitle, selectedProjectDomain }: Props) {
  const [topic, setTopic] = useState(selectedProjectTitle || "");
  const [domain, setDomain] = useState(selectedProjectDomain || "");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<VivaQuestion[]>([]);
  const [activeTab, setActiveTab] = useState<"study" | "practice">("study");

  // Practice state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [suggested, setSuggested] = useState<string | null>(null);
  const [history, setHistory] = useState<{ q: string; ans: string; pts: number; critic: string }[]>([]);

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

  const handleGenerateViva = async () => {
    if (!topic.trim()) {
      alert("Please enter a thesis topic first!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/generate-viva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, domain })
      });
      const data = await res.json();
      if (data.questions) {
        setQuestions(data.questions);
        setCurrentIndex(0);
        setScore(null);
        setFeedback(null);
        setUserAnswer("");
        setSuggested(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGradeAnswer = async () => {
    if (!userAnswer.trim()) {
      alert("Please type your mock response before submitting!");
      return;
    }
    setSubmitting(true);
    const activeQ = questions[currentIndex];
    try {
      const res = await fetch("/api/viva-grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: activeQ.question,
          expectedAnswer: activeQ.expectedAnswer,
          userAnswer
        })
      });
      const data = await res.json();
      setScore(data.score);
      setFeedback(data.feedback);
      setSuggested(data.suggestedAnswer);

      // Add to history list
      setHistory((prev) => [
        {
          q: activeQ.question,
          ans: userAnswer,
          pts: data.score,
          critic: data.feedback
        },
        ...prev
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleNextQuestion = () => {
    setScore(null);
    setFeedback(null);
    setSuggested(null);
    setUserAnswer("");
    setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1));
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case "Beginner":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "Intermediate":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      default:
        return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
    }
  };

  // Compute stats based on exam history
  const averageScore = history.length > 0 ? Math.round(history.reduce((x, y) => x + y.pts, 0) / history.length) : 0;

  return (
    <div className="space-y-6">
      {/* Header and Sub */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white font-sans tracking-tight">
            Defense Viva Prep & Interactive Examiner
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Anticipate severe external examiner cross-examinations and test your theoretical parameters.
          </p>
        </div>

        {/* Local switcher Tab */}
        <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("study")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "study" ? "bg-blue-600 text-white shadow-md font-semibold" : "text-slate-400 hover:text-white"
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Study Guides</span>
          </button>
          <button
            onClick={() => setActiveTab("practice")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "practice" ? "bg-purple-600 text-white shadow-md font-semibold" : "text-slate-400 hover:text-white"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Mock Defense Exam</span>
          </button>
        </div>
      </div>

      {/* Controller Inputs bar */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-6 space-y-1">
          <label className="text-xs font-medium text-slate-400 uppercase font-mono tracking-wider">Project Thesis Subject</label>
          <input
            type="text"
            placeholder="No active topic. Choose or write one..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-4 space-y-1">
          <label className="text-xs font-medium text-slate-400 uppercase font-mono tracking-wider">Discipline</label>
          <input
            type="text"
            placeholder="e.g. Electrical Science (VHDL)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-600 rounded-lg py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div className="md:col-span-2 pt-5">
          <button
            onClick={handleGenerateViva}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg py-2 font-semibold text-xs shadow-lg flex items-center justify-center gap-1 transition-all cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Exam Pool</span>
              </>
            )}
          </button>
        </div>
      </div>

      {activeTab === "study" ? (
        /* STUDY CHEATSHEETS */
        <div className="space-y-4">
          {questions.length === 0 ? (
            <div className="border border-dashed border-slate-800 rounded-xl p-16 text-center bg-slate-950/20">
              <BrainCircuit className="w-12 h-12 text-slate-700 mx-auto stroke-[1.5]" />
              <h3 className="text-slate-300 font-semibold mt-3 text-sm font-sans">Viva Question Pool is Empty</h3>
              <p className="text-slate-500 text-xs max-w-sm mx-auto mt-1 leading-relaxed">
                Specify your thesis topic above and press "Load Exam Pool" to query Gemini for bespoke examiner queries.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <div className="p-3 bg-blue-500/10 border border-blue-500/25 rounded-xl text-blue-300 text-xs flex gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
                <span>
                  <strong>Study Pool Loaded:</strong> Toggle chapters below to read ideal scientific responses expected by jury examiners during standard university defense examinations.
                </span>
              </div>

              {questions.map((q, i) => (
                <div
                  key={i}
                  className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:border-slate-700/60 transition"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5 mb-3">
                    <span className="text-xs font-mono font-bold text-slate-500">QUESTION {i + 1}</span>
                    <span className={`text-[10px] px-2 py-0.5 font-mono rounded ${getDifficultyBadge(q.difficulty)}`}>
                      {q.difficulty}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-200 leading-snug">
                    {q.question}
                  </h3>

                  <div className="mt-3.5 bg-slate-950/80 border border-slate-800/80 p-3.5 rounded-lg">
                    <span className="text-[10px] text-emerald-400 font-mono tracking-wider font-semibold block mb-1">
                      EXPECTED SCHOLARLY KEY ANSWER:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans italic">
                      "{q.expectedAnswer}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* PRACTICE EXAM ENGINE */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {questions.length === 0 ? (
            <div className="lg:col-span-12 border border-dashed border-slate-800 rounded-xl p-16 text-center bg-slate-950/20">
              <Award className="w-12 h-12 text-slate-700 mx-auto stroke-[1.5]" />
              <h3 className="text-slate-300 font-semibold mt-3 text-sm font-sans">Active Exam Session Inactive</h3>
              <p className="text-slate-500 text-xs max-w-sm mx-auto mt-1 leading-relaxed">
                Please type your topic parameters above and click "Load Exam Pool" first to activate this simulation.
              </p>
            </div>
          ) : (
            <>
              {/* Question Stage Panel */}
              <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden shadow-lg space-y-4 p-5 backdrop-blur-sm">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Flame className="text-purple-400 w-4 h-4 animate-bounce" />
                    <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Jury Simulator Engine</span>
                  </div>
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded font-bold uppercase">
                    Stage {currentIndex + 1} of {questions.length}
                  </span>
                </div>

                <div className="py-2">
                  <span className={`text-[10px] px-2 py-0.5 font-mono rounded ${getDifficultyBadge(questions[currentIndex].difficulty)}`}>
                    {questions[currentIndex].difficulty}
                  </span>
                  <h2 className="text-base font-bold text-white mt-2 leading-relaxed">
                    {questions[currentIndex].question}
                  </h2>
                </div>

                {/* Answer box input */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs text-slate-400">Write your presentation response</label>
                    <span className="text-[10px] text-slate-500 font-mono">Include quantitative metrics & terms</span>
                  </div>
                  <textarea
                    rows={4}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your response here explaining your system components, methodologies, or architectural blocks..."
                    className="w-full bg-slate-950 text-slate-300 placeholder-slate-700 p-4 border border-slate-800 rounded-lg focus:outline-none focus:border-purple-500 text-xs leading-relaxed resize-none"
                    disabled={submitting || score !== null}
                  />
                </div>

                {/* Score display dashboard */}
                {score !== null && (
                  <div className="border border-purple-500/30 bg-purple-950/20 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-purple-400 text-xs font-bold font-mono">
                        <Star className="w-4 h-4 fill-purple-400" />
                        <span>EXAMINER SCORE & ASSESSMENT REPORT</span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-black font-mono text-purple-400">{score}</span>
                        <span className="text-xs text-slate-500">/100</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans italic bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                      "{feedback}"
                    </p>

                    {suggested && (
                      <div className="pt-1.5 space-y-1">
                        <span className="text-[10px] text-emerald-400 font-mono uppercase font-bold tracking-wider block">Advisor's Polished Formulation</span>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">{suggested}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions row */}
                <div className="flex justify-between items-center pt-2">
                  <div className="text-[10px] text-slate-500 font-mono">
                    {score !== null ? "Review feedback and proceed" : "Submit answer for evaluation"}
                  </div>

                  <div className="flex gap-2">
                    {score === null ? (
                      <button
                        onClick={handleGradeAnswer}
                        disabled={submitting}
                        className="bg-purple-600 hover:bg-purple-500 text-white rounded-lg py-1.5 px-4 font-bold text-xs flex items-center gap-1 cursor-pointer transition disabled:opacity-40"
                      >
                        {submitting ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Grading...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit for Score</span>
                          </>
                        )}
                      </button>
                    ) : (
                      currentIndex < questions.length - 1 ? (
                        <button
                          onClick={handleNextQuestion}
                          className="bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 py-1.5 px-4 rounded-lg text-xs font-bold transition cursor-pointer"
                        >
                          Next Question
                        </button>
                      ) : (
                        <div className="text-xs text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/25">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Simulation Complete!</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              {/* History Analytics Sheet */}
              <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4 shadow-lg min-h-[300px]">
                <h3 className="text-xs font-semibold text-slate-400 uppercase font-mono tracking-wider border-b border-slate-800 pb-2 flex justify-between items-center">
                  <span>Session History</span>
                  {history.length > 0 && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Avg: {averageScore}%
                    </span>
                  )}
                </h3>

                {history.length === 0 ? (
                  <div className="text-center py-12 text-slate-600 text-xs italic">
                    Answered questions logs will appear here. Correct metrics locally preserved.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {history.map((hist, idx) => (
                      <div key={idx} className="bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 space-y-1">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-[11px] text-slate-300 font-bold font-sans line-clamp-1">{hist.q}</p>
                          <span className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 px-1.5 rounded">{hist.pts}%</span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-mono italic">
                          Your reply: "{hist.ans.length > 50 ? `${hist.ans.slice(0, 50)}...` : hist.ans}"
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
