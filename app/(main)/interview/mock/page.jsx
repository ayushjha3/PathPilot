import Link from "next/link";
import {
  ArrowLeft,
  BrainCircuit,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Quiz from "../_components/quiz";

export default function MockInterviewPage() {
  return (
    <div className="space-y-8">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-background to-blue-500/10 p-8 shadow-xl">

        {/* Background Glow */}
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="relative">

          {/* Back Button */}
          <Link href="/interview">
            <Button
              variant="ghost"
              className="mb-8 rounded-xl px-0 text-muted-foreground hover:bg-transparent hover:text-violet-400"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Skill Assessment
            </Button>
          </Link>

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2">

            <Sparkles className="h-4 w-4 text-violet-400" />

            <span className="text-sm font-medium text-violet-300">
              AI-Powered Technical Assessment
            </span>

          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            {/* Left */}
            <div>

              <h1 className="gradient-title text-5xl font-extrabold md:text-6xl">
                AI Evaluation
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Challenge yourself with AI-generated, industry-specific
                technical questions designed to evaluate your knowledge,
                strengthen your problem-solving skills, and prepare you
                for real-world technical assessments.
              </p>

            </div>

            {/* Info Card */}
            <div className="hidden rounded-2xl border border-white/10 bg-background/70 p-5 backdrop-blur-xl lg:block">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-violet-500/10 p-3">

                  <BrainCircuit className="h-6 w-6 text-violet-500" />

                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    Assessment Mode
                  </p>

                  <h3 className="font-semibold">
                    AI Adaptive Quiz
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Quiz Section */}

      <section className="rounded-3xl border border-white/10 bg-background/70 p-8 shadow-lg backdrop-blur-xl">

        <div className="mb-8 flex items-center justify-between flex-wrap gap-6">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-violet-500/10 p-3">
              <Target className="h-6 w-6 text-violet-500" />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Technical Assessment
              </h2>

              <p className="text-muted-foreground">
                Answer each question carefully to evaluate your skills.
              </p>

            </div>

          </div>

          <div className="hidden md:flex items-center gap-3 rounded-2xl border border-white/10 bg-background px-4 py-3">

            <Trophy className="h-5 w-5 text-yellow-400" />

            <span className="text-sm text-muted-foreground">
              Complete the assessment to receive your performance analysis.
            </span>

          </div>

        </div>

        <Quiz />

      </section>

    </div>
  );
}