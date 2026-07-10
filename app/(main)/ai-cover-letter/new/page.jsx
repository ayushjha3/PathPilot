import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterGenerator from "../_components/cover-letter-generator";

export default function NewCoverLetterPage() {
  return (
    <div className="space-y-8">

      {/* Header Card */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-background to-blue-500/10 p-8 shadow-xl">

        {/* Glow */}
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="relative">

          {/* Back Button */}

          <Link href="/ai-cover-letter">

            <Button
              variant="ghost"
              className="
                mb-8
                rounded-xl
                px-0
                text-muted-foreground
                hover:bg-transparent
                hover:text-violet-400
              "
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cover Letters
            </Button>

          </Link>

          {/* Badge */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2">

            <Sparkles className="h-4 w-4 text-violet-400" />

            <span className="text-sm font-small text-violet-300">
              AI-Powered Writing Assistant
            </span>

          </div>

          {/* Heading */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <h1 className="gradient-title text-5xl font-extrabold md:text-6xl">
                Create Cover Letter
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Generate a personalized, ATS-friendly cover letter
                tailored to your job description, skills, and experience
                in just a few seconds.
              </p>

            </div>

            {/* Feature Card */}

            <div className="hidden rounded-2xl border border-white/10 bg-background/70 p-5 backdrop-blur-xl lg:block">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-violet-500/10 p-3">

                  <Wand2 className="h-6 w-6 text-violet-500" />

                </div>

                <div>

                  <p className="text-sm text-muted-foreground">
                    AI Writing
                  </p>

                  <h3 className="font-semibold">
                    Personalized for Every Job
                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Generator */}

      <section className="rounded-3xl border border-white/10 bg-background/70 p-8 shadow-lg backdrop-blur-xl">

        <div className="mb-8 flex items-center gap-4">

          <div className="rounded-xl bg-violet-500/10 p-3">

            <FileText className="h-6 w-6 text-violet-500" />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Cover Letter Generator
            </h2>

            <p className="text-muted-foreground">
              Fill in your details and let AI create a professional
              cover letter that matches your target role.
            </p>

          </div>

        </div>

        <CoverLetterGenerator />

      </section>

    </div>
  );
}