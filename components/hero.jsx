"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, FileText, TrendingUp, } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      if (!imageElement) return;

      if (window.scrollY > 80) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 pb-20">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="absolute top-1/3 left-0 h-[250px] w-[250px] rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 backdrop-blur-md px-5 py-2 text-sm font-medium shadow-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            AI-Powered Career Development Platform
          </div>
        </div>

        {/* Hero Content */}
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl xl:text-8xl leading-tight">
            Navigate Your Career
            <span className="gradient-title animate-gradient block mt-3">
              with PathPilot AI
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">
            PathPilot AI empowers students and professionals with intelligent
            career tools to build ATS-friendly resumes, generate personalized
            cover letters, prepare for interviews, complete role-based
            assessments, and stay ahead with real-time Industry Pulse insights.
          </p>

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="
                  group
                  h-14
                  rounded-2xl
                  bg-gradient-to-r
                  from-indigo-500
                  via-violet-500
                  to-fuchsia-500
                  px-8
                  text-base
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-violet-500/30
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:scale-[1.02]
                  hover:shadow-2xl
                  hover:shadow-violet-500/40
                "
              >
                <span className="flex items-center">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Free to Get Started
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              AI-Powered Guidance
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Personalized for Every Industry
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-12 grid grid-cols-2 gap-6 rounded-2xl border bg-background/60 p-6 backdrop-blur-md shadow-sm md:grid-cols-4">
            <div>
              <h3 className="text-2xl font-bold">ATS</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Resume Builder
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">AI</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Cover Letters
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">24/7</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Interview Practice
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Live</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Industry Pulse
              </p>
            </div>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative mt-20 flex justify-center">
          {/* Background Glow */}
          <div className="absolute -top-16 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px]" />
          <div className="absolute bottom-0 right-20 h-60 w-60 rounded-full bg-sky-500/20 blur-[120px]" />

          <div
            ref={imageRef}
            className="
              hero-image
              relative
              w-full
              max-w-6xl
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-gradient-to-b
              from-white/10
              to-white/5
              p-[1px]
              shadow-[0_40px_120px_rgba(99,102,241,0.30)]
              transition-all
              duration-500
              hover:scale-[1.01]
            "
          >
            {/* Browser Frame */}
            <div className="overflow-hidden rounded-[28px] bg-background">
              <div className="flex items-center justify-between border-b bg-muted/40 px-5 py-3 backdrop-blur">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>

                <div className="rounded-md bg-background px-6 py-1 text-xs text-muted-foreground shadow-sm">
                  app.pathpilot.ai/dashboard
                </div>

                <div className="w-10" />
              </div>

              <Image
                src="/banner.png"
                alt="PathPilot AI Dashboard"
                width={1600}
                height={900}
                priority
                className="w-full object-cover"
              />
            </div>

            {/* Glass Reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />

            {/* Border Glow */}
            <div className="pointer-events-none absolute inset-0 rounded-[30px] ring-1 ring-white/10" />

            {/* Floating Card - Resume */}
            <div
              className="
              absolute
              left-6
              top-20
              hidden
              lg:flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-background/85
              px-4
              py-3
              backdrop-blur-xl
              shadow-2xl
            "
            >
              <div className="rounded-lg bg-violet-500/10 p-2">
                <FileText className="h-5 w-5 text-violet-500" />
              </div>

              <div>
                <p className="text-[11px] text-muted-foreground">
                  Resume Score
                </p>

                <p className="font-semibold text-violet-500">
                  92%
                </p>
              </div>
            </div>

            {/* Floating Card - Industry Pulse */}
            <div
              className="
              absolute
              right-6
              top-25
              hidden
              lg:flex
              items-center
              gap-3
              rounded-xl
              border
              border-white/10
              bg-background/85
              px-4
              py-3
              backdrop-blur-xl
              shadow-2xl
            "
            >
              <div className="rounded-lg bg-green-500/10 p-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>

              <div>
                <p className="text-[11px] text-muted-foreground">
                  Industry Pulse
                </p>

                <p className="font-semibold">
                  Live
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;