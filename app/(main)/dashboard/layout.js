import { BarLoader } from "react-spinners";
import { Suspense } from "react";
import { TrendingUp, Sparkles } from "lucide-react";

export default function Layout({ children }) {
  return (
    <div className="space-y-10 px-5">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-background to-blue-500/10 p-8 shadow-xl">

        {/* Background Glow */}
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}
          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2">

              <Sparkles className="h-4 w-4 text-violet-400" />

              <span className="text-sm font-medium text-violet-300">
                AI Market Intelligence
              </span>

            </div>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl gradient-title">
              Industry Pulse
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Stay ahead of the market with real-time hiring trends,
              in-demand skills, salary insights, and AI-powered industry
              analysis tailored to your professional profile.
            </p>

          </div>

          {/* Right Badge */}

          <div className="hidden lg:block">

            <div className="rounded-3xl border border-violet-500/20 bg-background/70 p-6 backdrop-blur-xl shadow-lg">

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-violet-500/10 p-4">

                  <TrendingUp className="h-8 w-8 text-violet-500" />

                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    Live Market Status
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    AI Tracking Active
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Content */}

      <Suspense
        fallback={
          <div className="space-y-4">
            <BarLoader width={"100%"} color="#8B5CF6" />
            <p className="text-center text-sm text-muted-foreground">
              Loading latest industry insights...
            </p>
          </div>
        }
      >
        {children}
      </Suspense>

    </div>
  );
}