import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <nav
        className="
                    sticky top-4 z-50
                    mx-auto flex h-20
                    w-[96%] max-w-7xl
                    items-center justify-between

                    rounded-2xl

                    border border-slate-800
                    bg-[#0B1120]/95

                    backdrop-blur-xl

                    px-8 lg:px-10

                    shadow-[0_10px_40px_rgba(0,0,0,0.45)]

                    transition-all duration-300
                  "
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex justify-center transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/logo.png"
            alt="PathPilot AI"
            width={900}
            height={260}
            priority
            className="h-52 md:h-60 lg:h-72 w-auto object-contain"
          />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <Show when="signed-in">
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="
    hidden
    md:flex
    h-11
    rounded-xl
    border-white/10
    bg-background
    px-5
    transition-all
    duration-300
    hover:border-violet-500/40
    hover:shadow-lg
    hover:shadow-violet-500/20
    hover:-translate-y-0.5
  "
              >
                <span className="mr-3 flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10">
                  <LayoutDashboard className="h-4 w-4 text-violet-500" />
                </span>

                <span className="font-medium">
                  Dashboard
                </span>
              </Button>

              <Button
                variant="ghost"
                className="md:hidden rounded-full"
              >
                <LayoutDashboard className="h-5 w-5" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="
                      group
                      relative
                      h-11
                      overflow-hidden
                      rounded-xl
                      border
                      border-violet-400/20
                      bg-gradient-to-r
                      from-[#5B3DF5]
                      via-[#6366F1]
                      to-[#3B82F6]
                      px-5
                      text-white
                      shadow-[0_12px_30px_rgba(79,70,229,0.28)]
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-[0_20px_40px_rgba(79,70,229,0.38)]
                  "
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative flex items-center">
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span className="hidden md:inline">Career Toolkit</span>
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </span>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="
                    w-64
                    rounded-2xl
                    border
                    border-white/10
                    bg-background/95
                    p-2
                    backdrop-blur-xl
                    shadow-2xl
                "
              >
                <DropdownMenuItem asChild>
                  <Link
                    href="/resume"
                    className="
                        rounded-xl
                        py-3
                        transition-all
                        duration-200
                        hover:bg-violet-500/10
                    "
                  >
                    <FileText className="h-4 w-4 text-violet-500" />
                    Resume Builder
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="
                          rounded-xl
                          py-3
                          transition-all
                          duration-200
                          hover:bg-violet-500/10
                      "
                  >
                    <PenBox className="h-4 w-4 text-violet-500" />
                    Cover Letter Generator
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/interview"
                    className="
                        rounded-xl
                        py-3
                        transition-all
                        duration-200
                        hover:bg-violet-500/10
                    "
                  >
                    <GraduationCap className="h-4 w-4 text-violet-500" />
                    Skill Assessment
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="
                  group
                  relative
                  h-11
                  overflow-hidden
                  rounded-xl
                  border-violet-500/40
                  px-6
                  font-medium
                  transition-all
                  duration-300
                  hover:border-violet-500
                  hover:text-white
                  hover:shadow-lg
                  hover:shadow-violet-500/30
                "
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500 transition-transform duration-500 group-hover:translate-x-0" />

                <span className="relative">
                  Sign In
                </span>
              </Button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-11 h-11 rounded-full border border-violet-500/30 shadow-lg transition hover:scale-105",
                  userButtonPopoverCard:
                    "rounded-2xl shadow-2xl border border-violet-500/20",
                  userPreviewMainIdentifier:
                    "font-semibold text-base",
                },
              }}
              afterSignOutUrl="/"
            />
          </Show>
        </div>
      </nav>
    </header>
  );
}