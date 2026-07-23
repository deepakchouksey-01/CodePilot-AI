import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReviewDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!review) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-6xl">

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              {review.repository}
            </h1>

            <p className="mt-2 text-gray-600">
              AI Code Review Report
            </p>
          </div>

          <Link
            href="/dashboard/history"
            className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
          >
            ← Back
          </Link>

        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-5">

          <div className="rounded-xl bg-blue-600 p-5 text-center text-white">
            <p>Overall</p>
            <h2 className="text-3xl font-bold">
              {review.overallScore}
            </h2>
          </div>

          <div className="rounded-xl bg-red-600 p-5 text-center text-white">
            <p>Security</p>
            <h2 className="text-3xl font-bold">
              {review.securityScore}
            </h2>
          </div>

          <div className="rounded-xl bg-green-600 p-5 text-center text-white">
            <p>Performance</p>
            <h2 className="text-3xl font-bold">
              {review.performanceScore}
            </h2>
          </div>

          <div className="rounded-xl bg-purple-600 p-5 text-center text-white">
            <p>Quality</p>
            <h2 className="text-3xl font-bold">
              {review.qualityScore}
            </h2>
          </div>

          <div className="rounded-xl bg-orange-600 p-5 text-center text-white">
            <p>Maintainability</p>
            <h2 className="text-3xl font-bold">
              {review.maintainabilityScore}
            </h2>
          </div>

        </div>

        <div className="rounded-2xl bg-white p-8 shadow-lg">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-3xl font-bold">
              Full AI Review
            </h2>

            <span className="rounded-full bg-gray-100 px-4 py-2 text-sm">
              {review.createdAt.toLocaleDateString()}
            </span>

          </div>

          <pre className="whitespace-pre-wrap text-gray-800 leading-7">
            {review.review}
          </pre>

        </div>

      </div>

    </div>
  );
}