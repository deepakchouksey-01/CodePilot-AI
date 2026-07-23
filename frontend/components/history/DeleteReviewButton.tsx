"use client";

import { useRouter } from "next/navigation";

interface DeleteReviewButtonProps {
  id: string;
}

export default function DeleteReviewButton({
  id,
}: DeleteReviewButtonProps) {
  const router = useRouter();

  async function deleteReview() {
    const confirmDelete = confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      alert("Review deleted successfully.");

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete review.");
    }
  }

  return (
    <button
      onClick={deleteReview}
      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Delete
    </button>
  );
}