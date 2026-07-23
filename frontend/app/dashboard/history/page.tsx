import { prisma } from "@/lib/prisma";
import ReviewTable from "@/components/history/ReviewTable";

export default async function ReviewHistoryPage() {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Review History
          </h1>

          <p className="mt-2 text-gray-600">
            View all previous AI code reviews
          </p>
        </div>

        <ReviewTable reviews={reviews} />
      </div>
    </div>
  );
}