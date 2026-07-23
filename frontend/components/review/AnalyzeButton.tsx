"use client";

import { useState, useEffect } from "react";
import { Loader2, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import jsPDF from "jspdf";
import { ownerVisuallyHidden } from "@base-ui/react/internals/constants";

interface AnalyzeButtonProps {
  code: string;
  owner: string;
  repository: string;
}
export default function AnalyzeButton({
  code,
  owner,
  repository,
}: AnalyzeButtonProps) {

  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");

  const [scores, setScores] = useState({
    overall: "-",
    security: "-",
    performance: "-",
    quality: "-",
    maintainability: "-",
  });
  useEffect(() => {
  console.log("SCORES UPDATED:", scores);
}, [scores]);

  async function copyReview() {
    if (!review) return;

    await navigator.clipboard.writeText(review);
    alert("Review copied successfully!");
  }

function downloadPDF() {
  if (!review) return;

  const pdf = new jsPDF("p", "mm", "a4");

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("CodePilot AI", 10, 15);

  pdf.setFontSize(13);
  pdf.text("AI Code Review Report", 10, 25);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  let y = 38;

  pdf.text(`Overall Score: ${scores.overall}`, 10, y);
  y += 8;

  pdf.text(`Security Score: ${scores.security}`, 10, y);
  y += 8;

  pdf.text(`Performance Score: ${scores.performance}`, 10, y);
  y += 8;

  pdf.text(`Code Quality Score: ${scores.quality}`, 10, y);
  y += 8;

  pdf.text(`Maintainability Score: ${scores.maintainability}`, 10, y);
  y += 12;

  const lines = pdf.splitTextToSize(review, 180);

  for (const line of lines) {
    if (y > 280) {
      pdf.addPage();
      y = 20;
    }

    pdf.text(line, 10, y);
    y += 6;
  }

  pdf.save("CodePilot-AI-Review.pdf");
}
  async function analyze() {
    try {
      setLoading(true);
      setReview("");
      setError("");

      const res = await fetch("/api/ai/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          owner, 
          repository,
        }),
      });

      const text = await res.text();
      const data = JSON.parse(text);

const reviewText = data.review;

console.log("========== REVIEW TEXT ==========");
console.log(reviewText);

const getScore = (label: string) => {
  const regex = new RegExp(`${label}\\s*:\\s*(\\d+\\/100)`, "i");

  const match = reviewText.match(regex);

  console.log(label, match);

  return match?.[1] ?? "-";
};

const newScores = {
  overall: getScore("Overall Score"),
  security: getScore("Security Score"),
  performance: getScore("Performance Score"),
  quality: getScore("Code Quality Score"),
  maintainability: getScore("Maintainability Score"),
};

console.log("NEW SCORES:", newScores);

setScores(newScores);
console.log("Current scores state:", scores);

setReview(reviewText);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <button
        onClick={analyze}
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-white hover:bg-gray-800 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Analyzing Repository...
          </>
        ) : (
          <>
            <Sparkles size={18} />
            Analyze with AI
          </>
        )}
      </button>

      {error && (
        <div className="mt-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
          <strong>Error:</strong>
          <br />
          {error}
        </div>
      )}

      {review && (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <div className="rounded-xl bg-blue-600 p-4 text-center text-white">
              <p className="text-sm">Overall</p>
              <h2 className="text-2xl font-bold">
                {scores.overall}
              </h2>
            </div>

            <div className="rounded-xl bg-red-600 p-4 text-center text-white">
              <p className="text-sm">Security</p>
              <h2 className="text-2xl font-bold">
                {scores.security}
              </h2>
            </div>

            <div className="rounded-xl bg-green-600 p-4 text-center text-white">
              <p className="text-sm">Performance</p>
              <h2 className="text-2xl font-bold">{scores.performance}</h2>
            </div>

            <div className="rounded-xl bg-purple-600 p-4 text-center text-white">
              <p className="text-sm">Quality</p>
              <h2 className="text-2xl font-bold">{scores.quality}</h2>
            </div>

            <div className="rounded-xl bg-orange-600 p-4 text-center text-white">
              <p className="text-sm">Maintainability</p>
              <h2 className="text-2xl font-bold">
                {scores.maintainability}
              </h2>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border bg-white p-6 shadow">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                🤖 AI Code Review
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={copyReview}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                  Copy Review
                </button>

                <button
                  onClick={downloadPDF}
                  className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                >
                  Download PDF
                </button>
              </div>
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {review}
              </ReactMarkdown>
            </div>
          </div>
        </>
      )}
    </div>
  );
}