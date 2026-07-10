import { Brain, Target, Trophy, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  const stats = [
    {
      title: "Average Score",
      value: `${getAverageScore()}%`,
      subtitle: "Across all assessments",
      icon: Trophy,
      color:
        "from-yellow-500/20 via-amber-500/10 to-transparent",
      iconColor: "text-yellow-400",
    },
    {
      title: "Questions Practiced",
      value: getTotalQuestions(),
      subtitle: "Technical questions solved",
      icon: Brain,
      color:
        "from-violet-500/20 via-indigo-500/10 to-transparent",
      iconColor: "text-violet-400",
    },
    {
      title: "Latest Score",
      value: `${getLatestAssessment()?.quizScore.toFixed(1) || 0}%`,
      subtitle: "Most recent assessment",
      icon: Target,
      color:
        "from-emerald-500/20 via-green-500/10 to-transparent",
      iconColor: "text-emerald-400",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">

      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-background/70
              backdrop-blur-xl
              p-6
              transition-all
              duration-300
              hover:-translate-y-2
              hover:border-violet-500/30
              hover:shadow-[0_20px_50px_rgba(124,58,237,0.12)]
            "
          >
            {/* Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-60`}
            />

            {/* Glow */}
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/5 blur-3xl" />

            <div className="relative">

              <div className="flex items-center justify-between">

                <div
                  className="
                    rounded-2xl
                    bg-white/5
                    p-3
                    transition-transform
                    duration-300
                    group-hover:rotate-6
                    group-hover:scale-105
                  "
                >
                  <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                </div>

                <ArrowUpRight
                  className="
                    h-5
                    w-5
                    text-muted-foreground
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                    group-hover:-translate-y-1
                  "
                />

              </div>

              <p className="mt-6 text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>

              <h2 className="mt-2 text-4xl font-extrabold tracking-tight">
                {stat.value}
              </h2>

              <p className="mt-3 text-sm text-muted-foreground">
                {stat.subtitle}
              </p>

            </div>

          </Card>
        );
      })}
    </div>
  );
}