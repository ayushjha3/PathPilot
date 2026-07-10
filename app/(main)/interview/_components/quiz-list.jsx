"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, ArrowRight } from "lucide-react";
import { FileQuestion } from "lucide-react";

import { deleteAssessment } from "@/actions/interview";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  MoreVertical,
  Trash2,
} from "lucide-react";

import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteAssessment(id);

      toast.success("Assessment deleted successfully.");

      router.refresh();
    } catch (error) {
      toast.error("Failed to delete assessment.");
    }
  };

  return (
    <>
      <Card className="rounded-3xl border border-white/10 bg-background/70 shadow-lg backdrop-blur-xl">
        <CardHeader>

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div>

              <CardTitle className="gradient-title text-3xl md:text-4xl">
                Recent Assessments
              </CardTitle>

              <CardDescription className="mt-2">
                Review your previous technical assessments and monitor your progress.
              </CardDescription>

            </div>

            <Button
              onClick={() => router.push("/interview/mock")}
              className="
    group
    h-14
    rounded-full
    border
    border-white/20
    bg-white/5
    backdrop-blur-2xl
    px-7
    text-white
    transition-all
    duration-300
    hover:bg-white/10
    hover:border-violet-500/40
    hover:shadow-[0_0_35px_rgba(124,58,237,0.3)]
"
            >

              <Sparkles className="mr-3 h-5 w-5 text-violet-400 transition-transform group-hover:rotate-12" />

              Start Assessment

              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />

            </Button>

          </div>

        </CardHeader>

        <CardContent>

          {assessments?.length === 0 ? (

            <div className="flex flex-col items-center justify-center py-20 text-center">

              {/* Icon */}
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-500/10">
                <FileQuestion className="h-10 w-10 text-violet-500" />
              </div>

              {/* Heading */}
              <h3 className="text-2xl font-bold">
                No assessments yet
              </h3>

              {/* Description */}
              <p className="mt-4 max-w-md text-muted-foreground leading-7">
                Complete your first AI-powered technical assessment to track your
                progress, receive personalized insights, and improve your interview
                performance.
              </p>

            </div>

          ) : (

            <div className="space-y-5">

              {assessments?.map((assessment, i) => (

                <Card
                  key={assessment.id}
                  className="
                  cursor-pointer
                  rounded-2xl
                  border
                  border-white/10
                  bg-background/60
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-violet-500/30
                  hover:shadow-lg
                  hover:shadow-violet-500/10
                "
                >

                  <CardHeader>

                    <div className="flex items-start justify-between">

                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => setSelectedQuiz(assessment)}>

                        <CardTitle className="gradient-title text-2xl">
                          Assessment {i + 1}
                        </CardTitle>

                        <CardDescription className="mt-3 flex flex-col gap-2 md:flex-row md:gap-8">

                          <span>
                            Score:{" "}
                            <span className="font-semibold text-foreground">
                              {assessment.quizScore.toFixed(1)}%
                            </span>
                          </span>

                          <span>
                            {format(
                              new Date(assessment.createdAt),
                              "MMMM dd, yyyy • HH:mm"
                            )}
                          </span>

                        </CardDescription>

                      </div>

                      <AlertDialog>

                        <DropdownMenu>

                          <DropdownMenuTrigger asChild>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => e.stopPropagation()}
                              className="rounded-full"
                            >
                              <MoreVertical className="h-5 w-5" />
                            </Button>

                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            align="end"
                            className="rounded-xl"
                          >

                            <AlertDialogTrigger asChild>

                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="cursor-pointer text-red-500 focus:text-red-500"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Assessment
                              </DropdownMenuItem>

                            </AlertDialogTrigger>

                          </DropdownMenuContent>

                        </DropdownMenu>

                        <AlertDialogContent>

                          <AlertDialogHeader>

                            <AlertDialogTitle>
                              Delete Assessment?
                            </AlertDialogTitle>

                            <AlertDialogDescription>
                              This assessment will be permanently deleted.
                              This action cannot be undone.
                            </AlertDialogDescription>

                          </AlertDialogHeader>

                          <AlertDialogFooter>

                            <AlertDialogCancel>
                              Cancel
                            </AlertDialogCancel>

                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() =>
                                handleDelete(assessment.id)
                              }
                            >
                              Delete
                            </AlertDialogAction>

                          </AlertDialogFooter>

                        </AlertDialogContent>

                      </AlertDialog>

                    </div>

                  </CardHeader>

                  {assessment.improvementTip && (

                    <CardContent>

                      <div className="rounded-xl border border-violet-500/10 bg-violet-500/5 p-4">

                        <p className="text-sm leading-7 text-muted-foreground">
                          {assessment.improvementTip}
                        </p>

                      </div>

                    </CardContent>

                  )}

                </Card>

              ))}

            </div>
          )}
        </CardContent>

      </Card>

      <Dialog
        open={!!selectedQuiz}
        onOpenChange={() => setSelectedQuiz(null)}
      >
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">

          <DialogHeader>

            <DialogTitle />

          </DialogHeader>

          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />

        </DialogContent>

      </Dialog>
    </>
  );
}