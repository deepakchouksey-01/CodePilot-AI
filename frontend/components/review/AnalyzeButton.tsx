"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";

interface AnalyzeButtonProps {
  code: string;
}

export default function AnalyzeButton({ code }: AnalyzeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");
  const [error, setError] = useState("");

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
        }),
      });

      const text = await res.text();

      console.log("========== AI RESPONSE ==========");
      console.log("Status:", res.status);
      console.log("Response:", text);

      const data = JSON.parse(text);

      if (!res.ok) {
        throw new Error(data.error || "AI Review Failed");
      }

      setReview(data.review);
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
        <div className="mt-6 rounded-2xl border bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">
            🤖 AI Code Review
          </h2>

          <div className="whitespace-pre-wrap text-sm leading-7">
            {review}
          </div>
        </div>
      )}
    </div>
  );
}