import { UserPlus, FileEdit, BrainCircuit, LineChart } from "lucide-react";

export const howItWorks = [
  {
    title: "Create Your Career Profile",
    description:
      "Share your industry, skills, and career goals to receive personalized AI recommendations.",
    icon: <UserPlus className="w-8 h-8 text-primary" />,
  },
  {
    title: "Build & Optimize",
    description:
      "Create ATS-friendly resumes, generate cover letters, and improve your profile with AI-powered suggestions.",
    icon: <FileEdit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Assess Your Skills",
    description:
      "Take AI-generated technical assessments and quizzes to evaluate your knowledge and identify areas for improvement.",
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
  },
  {
    title: "Track Your Progress",
    description:
      "Monitor your performance with detailed analytics and actionable insights to support your career growth.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
  },
];