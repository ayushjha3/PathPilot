"use client";

import {
  Trophy,
  CheckCircle2,
  XCircle,
  BrainCircuit,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  if (!result) return null;

  return (
    <div className="mx-auto">

      {/* Header */}

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-background to-blue-500/10 p-8 mb-8">

        <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-500/10 blur-[100px]" />

        <div className="relative">

          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2">

            <Sparkles className="h-4 w-4 text-violet-400" />

            <span className="text-sm text-violet-300 font-medium">
              AI Performance Report
            </span>

          </div>

          <div className="mt-6 flex items-center gap-4">

            <div className="rounded-2xl bg-yellow-500/10 p-4">
              <Trophy className="h-10 w-10 text-yellow-500" />
            </div>

            <div>

              <h1 className="gradient-title text-4xl font-bold">
                Assessment Results
              </h1>

              <p className="mt-2 text-muted-foreground">
                Here's your detailed AI evaluation and performance analysis.
              </p>

            </div>

          </div>

        </div>

      </div>

      <CardContent className="space-y-8">

        {/* Score */}

        <div className="rounded-3xl border border-white/10 bg-background/60 p-8 text-center shadow-lg">

          <p className="text-sm uppercase tracking-widest text-muted-foreground">
            Overall Score
          </p>

          <h2 className="mt-3 text-6xl font-extrabold gradient-title">
            {result.quizScore.toFixed(1)}%
          </h2>

          <Progress
            value={result.quizScore}
            className="mt-6 h-3 rounded-full"
          />

        </div>

        {/* AI Tip */}

        {result.improvementTip && (

          <div className="rounded-3xl border border-violet-500/20 bg-violet-500/5 p-6">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-violet-500/10 p-3">

                <BrainCircuit className="h-6 w-6 text-violet-500" />

              </div>

              <div>

                <h3 className="font-semibold text-lg">
                  AI Improvement Insight
                </h3>

                <p className="text-muted-foreground mt-2 leading-7">
                  {result.improvementTip}
                </p>

              </div>

            </div>

          </div>

        )}

        {/* Review */}

        <div>

          <h2 className="mb-6 text-2xl font-bold">
            Question Review
          </h2>

          <div className="space-y-5">

            {result.questions.map((q, index) => (

              <div
                key={index}
                className="rounded-2xl border border-white/10 bg-background/60 p-6 shadow-sm transition-all duration-300 hover:border-violet-500/30"
              >

                <div className="flex items-start justify-between gap-4">

                  <h3 className="font-semibold leading-7">
                    {index + 1}. {q.question}
                  </h3>

                  {q.isCorrect ? (

                    <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-green-500">

                      <CheckCircle2 className="h-4 w-4" />

                      <span className="text-sm font-medium">
                        Correct
                      </span>

                    </div>

                  ) : (

                    <div className="flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-red-500">

                      <XCircle className="h-4 w-4" />

                      <span className="text-sm font-medium">
                        Incorrect
                      </span>

                    </div>

                  )}

                </div>

                <div className="mt-5 space-y-2 text-sm">

                  <p>

                    <span className="font-medium">
                      Your Answer:
                    </span>{" "}

                    {q.userAnswer}

                  </p>

                  {!q.isCorrect && (

                    <p>

                      <span className="font-medium text-green-500">
                        Correct Answer:
                      </span>{" "}

                      {q.answer}

                    </p>

                  )}

                </div>

                <div className="mt-5 rounded-xl bg-muted/60 p-4">

                  <p className="font-semibold mb-2">
                    Explanation
                  </p>

                  <p className="text-muted-foreground leading-7">
                    {q.explanation}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </CardContent>

      {!hideStartNew && (
        <div className="mt-16 flex justify-center">

          <div
            onClick={onStartNew}
            className="
        group
        w-full
        max-w-xl
        cursor-pointer
        rounded-3xl
        border
        border-violet-500/15
        bg-gradient-to-r
        from-violet-500/5
        via-indigo-500/5
        to-blue-500/5
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-violet-500/40
        hover:shadow-[0_20px_60px_rgba(124,58,237,0.15)]
      "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm font-medium text-violet-400">
                  Ready for another challenge?
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  Launch New Assessment
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Practice with a fresh AI-generated technical assessment and
                  continue improving your interview performance.
                </p>

              </div>

              <div
                className="
            ml-6
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-violet-500
            to-indigo-600
            shadow-lg
            transition-all
            duration-300
            group-hover:translate-x-1
            group-hover:scale-105
          "
              >
                <ArrowRight className="h-6 w-6 text-white" />
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}