import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  Target,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="relative overflow-hidden py-20 md:py-28">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[140px]" />
        </div>

        <div className="container mx-auto max-w-7xl px-6">

          {/* Heading */}
          <div className="mx-auto mb-16 max-w-3xl text-center">

            <div className="mb-5 inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 backdrop-blur">
              <span className="text-sm font-medium text-violet-300">
                Everything You Need
              </span>
            </div>

            <h2 className="text-4xl font-bold md:text-5xl">
              Powerful Features for
              <span className="gradient-title block">
                Career Growth
              </span>
            </h2>

            <p className="mt-6 text-lg text-muted-foreground">
              From resume building to technical assessments, PathPilot AI
              equips you with intelligent tools to accelerate every stage
              of your career journey.
            </p>

          </div>

          {/* Cards */}
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">

            {features.map((feature, index) => (

              <Card
                key={index}
                className="
            group
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-background/70
            backdrop-blur-xl
            transition-all
            duration-300
            hover:-translate-y-2
            hover:border-violet-500/40
            hover:shadow-[0_20px_60px_rgba(124,58,237,0.18)]
          "
              >

                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-blue-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <CardContent className="relative flex flex-col items-center p-8 text-center">

                  {/* Icon */}
                  <div
                    className="
                mb-6
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-violet-500/10
                to-blue-500/10
                text-violet-500
                transition-all
                duration-300
                group-hover:scale-110
                group-hover:from-violet-500
                group-hover:to-blue-500
                group-hover:text-white
                group-hover:shadow-lg
                group-hover:shadow-violet-500/30
              "
                  >
                    {feature.icon}
                  </div>

                  <h3 className="mb-4 text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="leading-7 text-muted-foreground">
                    {feature.description}
                  </p>

                </CardContent>

              </Card>

            ))}

          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="relative overflow-hidden py-20 md:py-28">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[140px]" />
        </div>

        <div className="container mx-auto max-w-7xl px-6">

          {/* Heading */}
          <div className="mx-auto mb-16 max-w-3xl text-center">

            <div className="mb-5 inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 backdrop-blur">
              <span className="text-sm font-medium text-violet-300">
                PathPilot AI at a Glance
              </span>
            </div>

            <h2 className="text-4xl font-bold md:text-5xl">
              Built for Every
              <span className="gradient-title block">
                Career Journey
              </span>
            </h2>

            <p className="mt-6 text-lg text-muted-foreground">
              Everything you need to prepare, grow, and succeed—all powered by AI.
            </p>

          </div>

          {/* Stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {[
              {
                value: "50+",
                label: "Industries Covered",
              },
              {
                value: "1000+",
                label: "Interview Questions",
              },
              {
                value: "95%",
                label: "Success Rate",
              },
              {
                value: "24/7",
                label: "AI Support",
              },
            ].map((stat, index) => (

              <div
                key={index}
                className="
            group
            rounded-3xl
            border
            border-white/10
            bg-background/70
            p-8
            text-center
            backdrop-blur-xl
            transition-all
            duration-300
            hover:-translate-y-2
            hover:border-violet-500/40
            hover:shadow-[0_20px_60px_rgba(124,58,237,0.18)]
          "
              >

                <h3 className="bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 bg-clip-text text-5xl font-extrabold text-transparent">
                  {stat.value}
                </h3>

                <div className="mx-auto my-5 h-px w-16 bg-gradient-to-r from-transparent via-violet-500 to-transparent" />

                <p className="text-base font-medium text-muted-foreground">
                  {stat.label}
                </p>

              </div>

            ))}

          </div>

        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 overflow-hidden">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[140px]" />
        </div>

        <div className="container mx-auto max-w-7xl px-6">

          {/* Heading */}
          <div className="mx-auto mb-20 max-w-3xl text-center">

            <span className="inline-flex rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 text-sm font-medium text-violet-300">
              How It Works
            </span>

            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
              From Profile to
              <span className="gradient-title block">
                Career Success
              </span>
            </h2>

            <p className="mt-6 text-lg text-muted-foreground">
              Complete your profile once, and let PathPilot AI guide every step
              of your career journey.
            </p>

          </div>

          <div className="relative">

            {/* Connection Line */}
            <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-violet-500/20 via-violet-500 to-violet-500/20 lg:block" />

            <div className="grid gap-8 lg:grid-cols-4">

              {howItWorks.map((item, index) => (

                <div
                  key={index}
                  className="group relative"
                >

                  {/* Number */}
                  <div className="absolute left-1/2 top-0 z-20 hidden -translate-x-1/2 lg:block">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-blue-500 text-lg font-bold text-white shadow-lg shadow-violet-500/30">
                      {index + 1}
                    </div>

                  </div>

                  {/* Card */}
                  <Card
                    className="
                mt-16
                rounded-3xl
                border
                border-white/10
                bg-background/80
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-3
                hover:border-violet-500/40
                hover:shadow-[0_20px_60px_rgba(124,58,237,0.18)]
              "
                  >

                    <CardContent className="flex flex-col items-center p-8 text-center">

                      <div
                        className="
                    mb-6
                    flex
                    h-20
                    w-20
                    items-center
                    justify-center
                    rounded-2xl
                    bg-violet-500/10
                    text-violet-500
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:bg-violet-500
                    group-hover:text-white
                  "
                      >
                        {item.icon}
                      </div>

                      <h3 className="mb-4 text-xl font-bold">
                        {item.title}
                      </h3>

                      <p className="leading-7 text-muted-foreground">
                        {item.description}
                      </p>

                    </CardContent>

                  </Card>

                </div>

              ))}

            </div>

          </div>

        </div>

      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container mx-auto max-w-7xl px-6">

          {/* Heading */}
          <div className="mx-auto mb-16 max-w-2xl text-center">

            <span className="inline-flex rounded-full border bg-muted px-4 py-2 text-sm font-medium">
              Testimonials
            </span>

            <h2 className="mt-6 text-4xl font-bold md:text-5xl">
              Loved by Students &
              <span className="gradient-title block">
                Professionals
              </span>
            </h2>

            <p className="mt-5 text-lg text-muted-foreground">
              See how PathPilot AI is helping people prepare smarter and
              build successful careers.
            </p>

          </div>

          <div className="grid gap-8 lg:grid-cols-3">

            {testimonial.map((testimonial, index) => (

              <Card
                key={index}
                className="
            group
            rounded-3xl
            border
            bg-background
            transition-all
            duration-300
            hover:-translate-y-2
            hover:border-violet-300
            hover:shadow-xl
          "
              >

                <CardContent className="p-8">

                  {/* Stars */}
                  <div className="mb-5 flex text-yellow-400">
                    ★★★★★
                  </div>

                  {/* Quote */}

                  <p className="mb-8 leading-8 text-muted-foreground">
                    "{testimonial.quote}"
                  </p>

                  {/* User */}

                  <div className="flex items-center gap-4">

                    <Image
                      src={testimonial.image}
                      width={56}
                      height={56}
                      alt={testimonial.author}
                      className="rounded-full"
                    />

                    <div>

                      <h4 className="font-semibold">
                        {testimonial.author}
                      </h4>

                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>

                      <p className="text-sm font-medium text-violet-500">
                        {testimonial.company}
                      </p>

                    </div>

                  </div>

                </CardContent>

              </Card>

            ))}

          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative overflow-hidden py-20 md:py-28">

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[140px]" />
          <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <div className="container mx-auto max-w-6xl px-6">

          {/* Heading */}
          <div className="mx-auto mb-16 max-w-3xl text-center">

            <div className="mb-5 inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-5 py-2 backdrop-blur">
              <span className="text-sm font-medium text-violet-300">
                Frequently Asked Questions
              </span>
            </div>

            <h2 className="text-4xl font-bold md:text-5xl">
              Everything You Need
              <span className="gradient-title block">
                to Know
              </span>
            </h2>

            <p className="mt-6 text-lg text-muted-foreground">
              Learn more about PathPilot AI, our AI-powered career tools,
              and how we help students and professionals accelerate
              their careers.
            </p>

          </div>

          {/* FAQ */}
          <div className="mx-auto max-w-4xl">

            <Accordion
              type="single"
              collapsible
              className="space-y-5"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="
              overflow-hidden
              rounded-2xl
              border
              border-white/10
              bg-background/70
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-violet-500/40
              hover:shadow-[0_15px_45px_rgba(124,58,237,0.12)]
            "
                >
                  <AccordionTrigger
                    className="
                px-8
                py-6
                text-left
                text-lg
                font-semibold
                transition-colors
                hover:text-violet-500
              "
                  >
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent
                    className="
                px-8
                pb-6
                text-base
                leading-8
                text-muted-foreground
              "
                  >
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

          </div>

        </div>

      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden py-20">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[130px]" />
          <div className="absolute bottom-0 right-0 h-[280px] w-[280px] rounded-full bg-blue-500/20 blur-[120px]" />
        </div>

        <div className="container mx-auto max-w-6xl px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#1e1b4b] to-[#111827] px-8 py-14 shadow-[0_30px_80px_rgba(79,70,229,0.30)] lg:px-16">

            {/* Decorative Glow */}
            <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl text-center">

              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-5 py-2 backdrop-blur">
                <Sparkles className="h-4 w-4 text-violet-400" />
                <span className="text-sm font-medium text-violet-200">
                  Start Your Career Journey
                </span>
              </div>

              {/* Heading */}
              <h2 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                Your Next Opportunity
                <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-300 to-blue-400 bg-clip-text text-transparent">
                  Starts with PathPilot AI
                </span>
              </h2>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300">
                Build stronger resumes, prepare for interviews, complete
                role-based assessments, and make smarter career decisions—
                all powered by AI.
              </p>

              {/* CTA */}
              <div className="mt-10">
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
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
              </div>

              {/* Trust Line */}
              <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  Free to Get Started
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  AI-Powered Career Guidance
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  Personalized for Every Industry
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}