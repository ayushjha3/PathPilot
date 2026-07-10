import { getAssessments } from "@/actions/interview";
import {
  BrainCircuit,
  Sparkles,
  Trophy,
} from "lucide-react";

import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performance-chart";
import QuizList from "./_components/quiz-list";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <div className="space-y-8">

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-background to-blue-500/10 p-8 shadow-xl">

        {/* Background Glow */}
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2">

              <Sparkles className="h-4 w-4 text-violet-400" />

              <span className="text-sm font-medium text-violet-300">
                AI-Powered Technical Assessment
              </span>

            </div>

            <h1 className="gradient-title text-5xl font-extrabold md:text-6xl">
              Skill Assessment
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Track your assessment history, monitor your progress,
              analyze your performance, and continuously improve your
              technical skills with AI-powered evaluations.
            </p>

          </div>

          {/* Right Card */}

          <div className="hidden rounded-2xl border border-white/10 bg-background/70 p-6 backdrop-blur-xl lg:block">

            <div className="flex items-center gap-4">

              <div className="rounded-xl bg-violet-500/10 p-3">

                <BrainCircuit className="h-6 w-6 text-violet-500" />

              </div>

              <div>

                <p className="text-sm text-muted-foreground">
                  AI Analysis
                </p>

                <h3 className="font-semibold">
                  Personalized Insights
                </h3>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Stats */}

      <section className="space-y-6">

        <StatsCards assessments={assessments} />

      </section>

      {/* Performance */}

      <section className="rounded-3xl border border-white/10 bg-background/70 p-8 shadow-lg backdrop-blur-xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Performance Analytics
            </h2>

            <p className="mt-2 text-muted-foreground">
              Visualize your assessment scores and monitor your learning progress.
            </p>

          </div>

          <div className="hidden rounded-xl border border-white/10 bg-background px-4 py-3 md:flex items-center gap-2">

            <Trophy className="h-5 w-5 text-yellow-400" />

            <span className="text-sm text-muted-foreground">
              Keep improving with every assessment.
            </span>

          </div>

        </div>

        <PerformanceChart assessments={assessments} />

      </section>

      {/* History */}

      <section className="rounded-3xl border border-white/10 bg-background/70 p-8 shadow-lg backdrop-blur-xl">

        <div className="mb-8">

          <h2 className="text-2xl font-bold">
            Assessment History
          </h2>

          <p className="mt-2 text-muted-foreground">
            Review previous technical assessments and revisit your performance anytime.
          </p>

        </div>

        <QuizList assessments={assessments} />

      </section>

    </div>
  );
}