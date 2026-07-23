"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

interface Review {
  id: string;
  repository: string;
  overallScore: string | null;
  securityScore: string | null;
  performanceScore: string | null;
  qualityScore: string | null;
  maintainabilityScore: string | null;
  isFavorite: boolean;
  createdAt: Date;
}

interface Props {
  reviews: Review[];
}

export default function ReviewTable({ reviews }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  async function toggleFavorite(id: string) {
    await fetch("/api/review/favorite", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    window.location.reload();
  }

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const score = Number(
        review.overallScore?.replace("/100", "") || 0
      );

      const matchesSearch = review.repository
        .toLowerCase()
        .includes(search.toLowerCase());

      if (!matchesSearch) return false;

      if (filter === "high") return score >= 80;

      if (filter === "medium")
        return score >= 60 && score < 80;

      if (filter === "low") return score < 60;

      return true;
    });
  }, [reviews, search, filter]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search repository..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border p-3"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border p-3"
        >
          <option value="all">All Scores</option>
          <option value="high">80+ Score</option>
          <option value="medium">60-79 Score</option>
          <option value="low">Below 60</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <table className="w-full">
          <thead className="bg-black text-white">
            <tr>
              <th className="p-4 text-left">Repository</th>
              <th className="p-4">Overall</th>
              <th className="p-4">Security</th>
              <th className="p-4">Performance</th>
              <th className="p-4">Quality</th>
              <th className="p-4">Maintainability</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
              <th className="p-4">Favorite</th>
            </tr>
          </thead>

          <tbody>
            {filteredReviews.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="p-8 text-center text-gray-500"
                >
                  No Reviews Found
                </td>
              </tr>
            ) : (
              filteredReviews.map((review) => (
                <tr
                  key={review.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-semibold">
                    {review.repository}
                  </td>

                  <td className="p-4">
                    {review.overallScore}
                  </td>

                  <td className="p-4">
                    {review.securityScore}
                  </td>

                  <td className="p-4">
                    {review.performanceScore}
                  </td>

                  <td className="p-4">
                    {review.qualityScore}
                  </td>

                  <td className="p-4">
                    {review.maintainabilityScore}
                  </td>

                  <td className="p-4">
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/dashboard/history/${review.id}`}
                      className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
                    >
                      View
                    </Link>
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() =>
                        toggleFavorite(review.id)
                      }
                    >
                      <Star
                        size={20}
                        className={
                          review.isFavorite
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-400"
                        }
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}