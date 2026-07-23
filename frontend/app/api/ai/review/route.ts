import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/ai/gemini";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const 
    { code,
      owner,
      repository,
    }= await req.json();

    if (!code || code.trim().length === 0) {
      return NextResponse.json(
        {
          error: "No repository code received.",
        },
        {
          status: 400,
        }
      );
    }

const prompt = `
You are a Senior Staff Software Engineer at Google.

Review the following GitHub repository source code.

Generate a professional report using the following format.

# Executive Summary
Provide a short overview of the repository.

# Bugs
List possible bugs.

# Security Issues
Mention security vulnerabilities.

# Performance Improvements
Suggest performance optimizations.

# Code Quality
Mention readability and maintainability improvements.

# Best Practices
List missing best practices.

# Refactoring Suggestions
Explain what should be refactored.

# Overall Architecture Review
Evaluate the project architecture.

# Overall Score
Give a score out of 100 with a short reason.

IMPORTANT:

At the END of the report, output EXACTLY these five lines:

Overall Score: XX/100
Security Score: XX/100
Performance Score: XX/100
Code Quality Score: XX/100
Maintainability Score: XX/100

Replace XX with actual numeric scores.

Do NOT use markdown.
Do NOT use headings.
Do NOT use bold.
Return these five lines exactly.

Repository Source Code:

${code}
`;

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});

const review = response.text ?? "";

const getScore = (label: string) => {
  const regex = new RegExp(`${label}\\s*:\\s*(\\d+\\/100)`, "i");
  return review.match(regex)?.[1] ?? null;
};

console.log("Saving review to database...");

await prisma.review.create({
  data: {
    owner: "deepakchouksey-01",
    repository: "CodePilot-AI",

    overallScore: getScore("Overall Score"),
    securityScore: getScore("Security Score"),
    performanceScore: getScore("Performance Score"),
    qualityScore: getScore("Code Quality Score"),
    maintainabilityScore: getScore("Maintainability Score"),

    review,
  },
});

console.log("Review saved successfully!");

return NextResponse.json({
  review,
});
} catch (error: any) {
  console.error("========== GEMINI ERROR ==========");
  console.error(error);

  return NextResponse.json(
    {
      error: error?.message || String(error),
    },
    {
      status: 500,
    }
  );
}
}