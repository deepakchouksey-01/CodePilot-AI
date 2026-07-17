import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();

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

Repository Source Code:

${code}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      review: response.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate AI review.",
      },
      {
        status: 500,
      }
    );
  }
}