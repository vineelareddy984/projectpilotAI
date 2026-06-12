export interface ProjectIdea {
  title: string;
  abstract: string;
  features: string[];
  tools: string[];
  futureScope: string;
}

export interface Slide {
  slideNumber: number;
  title: string;
  subtitle?: string;
  content: string[];
}

export interface VivaQuestion {
  id: number;
  question: string;
  expectedAnswer: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
}

export interface QuizState {
  questions: VivaQuestion[];
  currentIndex: number;
  userAnswer: string;
  submitting: boolean;
  score: number | null;
  feedback: string | null;
  suggestedAnswer: string | null;
  answersHistory: {
    question: string;
    userAnswer: string;
    score: number;
    feedback: string;
  }[];
}

export interface PlagiarismFinding {
  originalSentence: string;
  similarSource: string;
  paraphraseSuggestion: string;
}

export interface TrackerTask {
  id: string;
  title: string;
  description: string;
  category: "Coding" | "Documentation" | "Testing" | "Presentation" | "Research";
  status: "Pending" | "In Progress" | "Completed";
  dueDate: string;
  teamMember?: string;
}

export interface TrackerMilestone {
  id: string;
  title: string;
  date: string;
  completed: boolean;
}

export interface ResourceItem {
  title: string;
  category: "Datasets" | "Research" | "GitHub" | "Tutorials" | "YouTube";
  url: string;
  description: string;
  techKeywords: string[];
}

export type PageId =
  | "home"
  | "tools"
  | "generator"
  | "ppt"
  | "report"
  | "viva"
  | "tracker"
  | "resources"
  | "resume"
  | "about"
  | "contact"
  | "faq";
