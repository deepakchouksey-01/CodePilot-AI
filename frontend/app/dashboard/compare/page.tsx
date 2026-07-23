import { prisma } from "@/lib/prisma";
import CompareTable from "@/components/compare/CompareTable";

export default async function ComparePage() {
  const reviews = await prisma.review.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (reviews.length < 2) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          At least 2 reviews are required.
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-6xl">

        <h1 className="mb-2 text-4xl font-bold">
          Repository Comparison
        </h1>

        <p className="mb-8 text-gray-600">
          Compare your latest repositories
        </p>

        <CompareTable
          left={reviews[0]}
          right={reviews[1]}
        />

      </div>

    </div>
  );
}