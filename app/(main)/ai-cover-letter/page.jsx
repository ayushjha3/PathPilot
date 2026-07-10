import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div className="space-y-10">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-background to-blue-500/10 p-8 shadow-xl">

        {/* Background Glow */}
        <div className="absolute -top-20 right-0 h-64 w-64 rounded-full bg-violet-500/10 blur-[120px]" />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

          {/* Left */}
          <div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2">

              <Sparkles className="h-4 w-4 text-violet-400" />

              <span className="text-sm font-medium text-violet-300">
                AI Cover Letter Generator
              </span>

            </div>

            <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl gradient-title">
              My Cover Letters
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-muted-foreground leading-8">
              Create professional, personalized, and ATS-friendly cover
              letters powered by AI. Organize all your applications in
              one place and generate tailored letters in seconds.
            </p>

          </div>

          {/* Right */}

          <Link href="/ai-cover-letter/new">

            <Button
              size="lg"
              className="
                group
                relative
                h-14
                overflow-hidden
                rounded-2xl
                bg-gradient-to-r
                from-[#5B3DF5]
                via-[#6366F1]
                to-[#3B82F6]
                px-8
                text-base
                font-semibold
                text-white
                shadow-[0_10px_35px_rgba(79,70,229,0.28)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(79,70,229,0.38)]
              "
            >

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <span className="relative flex items-center">

                <Plus className="mr-2 h-5 w-5" />

                Create Cover Letter

              </span>

            </Button>

          </Link>

        </div>

      </div>

      {/* List */}

      <div className="rounded-3xl border border-white/10 bg-background/60 backdrop-blur-xl p-6 shadow-lg">

        <div className="mb-6 flex items-center gap-3">

          <div className="rounded-xl bg-violet-500/10 p-3">
            <FileText className="h-6 w-6 text-violet-500" />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Saved Cover Letters
            </h2>

            <p className="text-sm text-muted-foreground">
              Access, edit, and manage all your generated cover letters.
            </p>

          </div>

        </div>

        <CoverLetterList coverLetters={coverLetters} />

      </div>

    </div>
  );
}