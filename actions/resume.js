"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  let prompt = "";

  switch (type) {
    case "summary":
      prompt = `
You are an expert resume writer.

Rewrite the following professional summary for a ${user.industry} professional.

Current Summary:
"${current}"

Requirements:
- Make it ATS-friendly.
- Keep it concise (80-120 words).
- Highlight strengths and technical expertise.
- Use a professional and confident tone.
- Include relevant industry keywords.
- Focus on value and career impact.

Return ONLY the improved summary.
`;
      break;

    case "skills":
      prompt = `
You are an expert resume writer.

Improve and organize the following skills for a ${user.industry} professional.

Current Skills:
"${current}"

Requirements:
- Remove duplicate skills.
- Organize skills logically.
- Include relevant industry keywords.
- Keep it ATS-friendly.
- Return as a comma-separated list.
- Do not add explanations.

Return ONLY the improved skills list.
`;
      break;

    default:
      prompt = `
You are an expert resume writer.

Improve the following ${type} description for a ${user.industry} professional.

Current Content:
"${current}"

Requirements:
- Use action verbs.
- Include measurable achievements where possible.
- Highlight technical skills.
- Keep it concise.
- Focus on achievements rather than responsibilities.
- Include ATS-friendly keywords.

Return ONLY the improved paragraph.
`;
  }

  try {
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}