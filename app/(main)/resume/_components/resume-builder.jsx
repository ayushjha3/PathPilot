"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  Download,
  Edit,
  FileText,
  Loader2,
  Monitor,
  Save,
  Sparkles,
  Trash2
} from "lucide-react";
import { toast } from "sonner";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { saveResume, improveWithAI } from "@/actions/resume";
import { EntryForm } from "./entry-form";
import useFetch from "@/hooks/use-fetch";
import { useUser } from "@clerk/nextjs";
import { entriesToMarkdown } from "@/app/lib/helper";
import { resumeSchema } from "@/app/lib/schema";

export default function ResumeBuilder({ initialContent }) {
  const [activeTab, setActiveTab] = useState("edit");
  const [previewContent, setPreviewContent] = useState(initialContent);
  const { user } = useUser();
  const [resumeMode, setResumeMode] = useState("preview");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
      achievements: [],
      certifications: [],
      positionsOfResponsibility: [],
    },
  });

  const {
    loading: isSaving,
    fn: saveResumeFn,
    data: saveResult,
    error: saveError,
  } = useFetch(saveResume);

  const { loading: improvingSummary, fn: improveSummaryFn } =
    useFetch(improveWithAI);

  const { loading: improvingSkills, fn: improveSkillsFn } =
    useFetch(improveWithAI);

  const formValues = watch();

  useEffect(() => {
    if (initialContent) setActiveTab("preview");
  }, [initialContent]);

  useEffect(() => {
    if (activeTab === "edit") {
      const newContent = getCombinedContent();
      setPreviewContent(newContent ? newContent : initialContent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues, activeTab]);

  useEffect(() => {
    if (saveResult && !isSaving) {
      toast.success("Resume saved successfully!");
    }
    if (saveError) {
      toast.error(saveError.message || "Failed to save resume");
    }
  }, [saveResult, saveError, isSaving]);

  const getContactMarkdown = () => {
    const { contactInfo } = formValues;
    const parts = [];
    if (contactInfo.email) parts.push(`📧 ${contactInfo.email}`);
    if (contactInfo.mobile) parts.push(`📱 ${contactInfo.mobile}`);
    if (contactInfo.linkedin)
      parts.push(`💼 [LinkedIn](${contactInfo.linkedin})`);
    if (contactInfo.github) parts.push(`💻 [GitHub](${contactInfo.github})`);
    if (contactInfo.twitter) parts.push(`🐦 [Twitter](${contactInfo.twitter})`);

    return parts.length > 0
      ? `## <div align="center">${user?.fullName}</div>
        \n\n<div align="center">\n\n${parts.join(" | ")}\n\n</div>`
      : "";
  };

  const getCombinedContent = () => {
    const {
      summary,
      skills,
      experience,
      education,
      projects,
      achievements,
      certifications,
      positionsOfResponsibility,
    } = formValues;
    return [
      getContactMarkdown(),
      summary && `## Professional Summary\n\n${summary}`,
      skills && `## Skills\n\n${skills}`,
      entriesToMarkdown(experience, "Work Experience"),
      entriesToMarkdown(education, "Education"),
      entriesToMarkdown(projects, "Projects"),
      entriesToMarkdown(certifications, "Certifications"),
      entriesToMarkdown(achievements, "Achievements"),
      entriesToMarkdown(
        positionsOfResponsibility,
        "Positions of Responsibility"
      ),
    ]
      .filter(Boolean)
      .join("\n\n");
  };

  // FIX: html2pdf.js touches `window` at import time, which breaks Next.js
  // SSR/build if imported at the top of the file. Dynamically importing it
  // here means it only ever loads in the browser, on click.
  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const { default: jsPDF } = await import("jspdf");

      const element = document.getElementById("resume-pdf");
      if (!element) {
        toast.error("Could not find resume content to export.");
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      const pdf = new jsPDF({
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const usableWidth = pageWidth - margin * 2;
      const usableHeight = pageHeight - margin * 2;

      const imgWidth = usableWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      // First page
      pdf.addImage(imgData, "JPEG", margin, position, imgWidth, imgHeight);
      heightLeft -= usableHeight;

      // Additional pages if content overflows one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", margin, position, imgWidth, imgHeight);
        heightLeft -= usableHeight;
      }

      pdf.save(`${user?.fullName || "resume"}.pdf`);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const improveSummary = async () => {
    const summary = watch("summary");
    if (!summary) {
      toast.error("Please write a professional summary first.");
      return;
    }
    try {
      const improved = await improveSummaryFn({
        current: summary,
        type: "summary",
      });
      if (improved) {
        setValue("summary", improved);
        toast.success("Professional summary improved!");
      }
    } catch {
      toast.error("Failed to improve summary");
    }
  };

  const improveSkills = async () => {
    const skills = watch("skills");
    if (!skills) {
      toast.error("Please enter your skills first.");
      return;
    }
    try {
      const improved = await improveSkillsFn({
        current: skills,
        type: "skills",
      });
      if (improved) {
        setValue("skills", improved);
        toast.success("Skills improved!");
      }
    } catch {
      toast.error("Failed to improve skills");
    }
  };

  const onSubmit = async (data) => {
    try {
      const formattedContent = previewContent
        .replace(/\n/g, "\n")
        .replace(/\n\s*\n/g, "\n\n")
        .trim();

      await saveResumeFn(formattedContent);
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save resume");
    }
  };

  const handleClearResume = () => {
    const confirmed = window.confirm(
      "This will clear all sections of your resume. This cannot be undone. Continue?"
    );
    if (!confirmed) return;

    reset({
      contactInfo: {},
      summary: "",
      skills: "",
      experience: [],
      education: [],
      projects: [],
      achievements: [],
      certifications: [],
      positionsOfResponsibility: [],
    });
    setPreviewContent("");
    setActiveTab("edit");
    setResetKey((prev) => prev + 1); // forces MDEditor to fully remount
    toast.success("Resume cleared");
  };

  return (
    <div data-color-mode="light" className="space-y-8">
      {/* Hero Header — matches Industry Pulse styling */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-background to-blue-500/10 p-8 shadow-xl">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-violet-500/10 blur-[120px]" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2">
              <FileText className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-medium text-violet-300">
                AI Resume Builder
              </span>
            </div>
            <h1 className="mt-6 text-5xl font-extrabold leading-tight md:text-6xl gradient-title">
              Resume Builder
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Build a polished, ATS-friendly resume with AI-powered writing
              suggestions, then export it as a professional PDF in one click.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col">
            <Button
              type="button"
              variant="outline"
              onClick={handleClearResume}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Resume
            </Button>
            <Button
              variant="destructive"
              onClick={handleSubmit(onSubmit)}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
            <Button onClick={generatePDF} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="edit">Form</TabsTrigger>
          <TabsTrigger value="preview">Markdown</TabsTrigger>
        </TabsList>

        <TabsContent value="edit">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/50">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    {...register("contactInfo.email")}
                    type="email"
                    placeholder="your@email.com"
                    error={errors.contactInfo?.email}
                  />
                  {errors.contactInfo?.email && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Mobile Number</label>
                  <Input
                    {...register("contactInfo.mobile")}
                    type="tel"
                    placeholder="+1 234 567 8900"
                  />
                  {errors.contactInfo?.mobile && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.mobile.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">LinkedIn URL</label>
                  <Input
                    {...register("contactInfo.linkedin")}
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile"
                  />
                  {errors.contactInfo?.linkedin && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.linkedin.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">GitHub URL</label>
                  <Input
                    {...register("contactInfo.github")}
                    type="url"
                    placeholder="https://github.com/your-username"
                  />
                  {errors.contactInfo?.github && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.github.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Twitter/X Profile
                  </label>
                  <Input
                    {...register("contactInfo.twitter")}
                    type="url"
                    placeholder="https://twitter.com/your-handle"
                  />
                  {errors.contactInfo?.twitter && (
                    <p className="text-sm text-red-500">
                      {errors.contactInfo.twitter.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Professional Summary{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  (optional)
                </span>
              </h3>
              <Controller
                name="summary"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="Write a compelling professional summary..."
                    error={errors.summary}
                  />
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={improveSummary}
                disabled={improvingSummary}
              >
                {improvingSummary ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Improving...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Improve with AI
                  </>
                )}
              </Button>
              {errors.summary && (
                <p className="text-sm text-red-500">{errors.summary.message}</p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Skills</h3>
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    className="h-32"
                    placeholder="List your key skills..."
                    error={errors.skills}
                  />
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={improveSkills}
                disabled={improvingSkills}
              >
                {improvingSkills ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Improving...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Improve with AI
                  </>
                )}
              </Button>
              {errors.skills && (
                <p className="text-sm text-red-500">{errors.skills.message}</p>
              )}
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Work Experience</h3>
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Experience"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.experience && (
                <p className="text-sm text-red-500">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Education</h3>
              <Controller
                name="education"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Education"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.education && (
                <p className="text-sm text-red-500">
                  {errors.education.message}
                </p>
              )}
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Projects</h3>
              <Controller
                name="projects"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Project"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.projects && (
                <p className="text-sm text-red-500">
                  {errors.projects.message}
                </p>
              )}
            </div>

            {/* Certifications — optional, add only if relevant */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Certifications{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  (optional)
                </span>
              </h3>
              <Controller
                name="certifications"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Certification"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.certifications && (
                <p className="text-sm text-red-500">
                  {errors.certifications.message}
                </p>
              )}
            </div>

            {/* Achievements — optional, add only if relevant */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Achievements{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  (optional)
                </span>
              </h3>
              <Controller
                name="achievements"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Achievement"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.achievements && (
                <p className="text-sm text-red-500">
                  {errors.achievements.message}
                </p>
              )}
            </div>

            {/* Position of Responsibility — optional, add only if relevant */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Position of Responsibility{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  (optional)
                </span>
              </h3>
              <Controller
                name="positionsOfResponsibility"
                control={control}
                render={({ field }) => (
                  <EntryForm
                    type="Position of Responsibility"
                    entries={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.positionsOfResponsibility && (
                <p className="text-sm text-red-500">
                  {errors.positionsOfResponsibility.message}
                </p>
              )}
            </div>
          </form>
        </TabsContent>

        <TabsContent value="preview">
          {activeTab === "preview" && (
            <Button
              variant="link"
              type="button"
              className="mb-2"
              onClick={() =>
                setResumeMode(resumeMode === "preview" ? "edit" : "preview")
              }
            >
              {resumeMode === "preview" ? (
                <>
                  <Edit className="h-4 w-4" />
                  Edit Resume
                </>
              ) : (
                <>
                  <Monitor className="h-4 w-4" />
                  Show Preview
                </>
              )}
            </Button>
          )}

          {activeTab === "preview" && resumeMode !== "preview" && (
            <div className="flex p-3 gap-2 items-center border-2 border-yellow-600 text-yellow-600 rounded mb-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm">
                You will lose edited markdown if you update the form data.
              </span>
            </div>
          )}
          <div className="border rounded-lg">
            <MDEditor
              key={resetKey}
              value={previewContent}
              onChange={setPreviewContent}
              height={800}
              preview={resumeMode}
            />
          </div>

          {/* FIX: `display:none` (Tailwind's `hidden`) breaks html2canvas —
              it can't measure/render a non-laid-out element. Positioning it
              off-screen instead keeps it in the layout flow but invisible. */}
          <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
            <div id="resume-pdf" className="p-10 bg-white">
              <MDEditor.Markdown
                source={previewContent}
                style={{
                  background: "white",
                  color: "black",
                }}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
