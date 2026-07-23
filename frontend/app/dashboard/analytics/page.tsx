import { prisma } from "@/lib/prisma";
import ScoreChart from "@/components/analytics/ScoreChart";
import HealthPieChart from "@/components/analytics/HealthPieChart";
import RepositoryRanking from "@/components/analytics/RepositoryRanking";
import ReviewTrendChart from "@/components/analytics/ReviewTrendChart";
import DashboardCard from "@/components/ui/DashboardCard";

import {
  FaDatabase,
  FaChartLine,
  FaTrophy,
  FaArrowDown,
  FaShieldAlt,
  FaCode,
} from "react-icons/fa";

function getAverage(scores: (string | null)[]) {
  const values = scores
    .filter((s): s is string => !!s)
    .map((s) => Number(s.replace("/100", "")));

  if (values.length === 0) return 0;

  return Math.round(
    values.reduce((a, b) => a + b, 0) / values.length
  );
}

export default async function AnalyticsPage() {
  const reviews = await prisma.review.findMany();

  const totalReviews = reviews.length;

  const avgOverall = getAverage(
    reviews.map((r) => r.overallScore)
  );

  const avgSecurity = getAverage(
    reviews.map((r) => r.securityScore)
  );

  const avgPerformance = getAverage(
    reviews.map((r) => r.performanceScore)
  );

  const avgQuality = getAverage(
    reviews.map((r) => r.qualityScore)
  );

  const avgMaintainability = getAverage(
    reviews.map((r) => r.maintainabilityScore)
  );

  const overallValues = reviews
    .map((r) => Number(r.overallScore?.replace("/100", "") || 0))
    .filter((v) => v > 0);

  const highest =
    overallValues.length > 0 ? Math.max(...overallValues) : 0;

  const lowest =
    overallValues.length > 0 ? Math.min(...overallValues) : 0;

  const repositories = new Set(
    reviews.map((r) => r.repository)
  ).size;

  const latestReview =
    reviews.length > 0
      ? [...reviews].sort(
          (a, b) =>
            b.createdAt.getTime() - a.createdAt.getTime()
        )[0]
      : null;

  // Overall Score Chart Data
  const chartData = reviews.map((review) => ({
    repository: review.repository,
    overall: Number(
      review.overallScore?.replace("/100", "") || 0
    ),
  }));

  // Pie Chart Data
  const good = chartData.filter(
    (r) => r.overall >= 80
  ).length;

  const average = chartData.filter(
    (r) => r.overall >= 60 && r.overall < 80
  ).length;

  const poor = chartData.filter(
    (r) => r.overall < 60
  ).length;

  // Review Trend Chart Data
  const trendData = [...reviews]
    .sort(
      (a, b) =>
        a.createdAt.getTime() - b.createdAt.getTime()
    )
    .map((review) => ({
      date: review.createdAt.toLocaleDateString(),
      overall: Number(
        review.overallScore?.replace("/100", "") || 0
      ),
    }));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-4xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="mb-8 text-gray-600">
          AI Review Insights & Statistics
        </p>

<div className="grid gap-6 md:grid-cols-3">

  <DashboardCard
    title="Total Reviews"
    value={totalReviews}
    icon={<FaDatabase />}
  />

  <DashboardCard
    title="Repositories"
    value={repositories}
    icon={<FaChartLine />}
  />

  <DashboardCard
    title="Highest Score"
    value={`${highest}/100`}
    icon={<FaTrophy />}
  />

  <DashboardCard
    title="Lowest Score"
    value={`${lowest}/100`}
    icon={<FaArrowDown />}
  />

  <DashboardCard
    title="Average Security"
    value={`${avgSecurity}/100`}
    icon={<FaShieldAlt />}
  />

  <DashboardCard
    title="Average Quality"
    value={`${avgQuality}/100`}
    icon={<FaCode />}
  />

  <DashboardCard
  title="Average Overall"
  value={`${avgOverall}/100`}
  icon={<FaChartLine />}
/>

<DashboardCard
  title="Average Performance"
  value={`${avgPerformance}/100`}
  icon={<FaChartLine />}
/>

<DashboardCard
  title="Average Maintainability"
  value={`${avgMaintainability}/100`}
  icon={<FaCode />}
/>

</div>

        {latestReview && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg border">
            <h2 className="mb-2 text-2xl font-bold">
              Latest Review
            </h2>

            <p>
              <strong>Repository:</strong>{" "}
              {latestReview.repository}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {latestReview.createdAt.toLocaleString()}
            </p>

<p className="mt-3">
  <span className="font-semibold">
    Overall Score:
  </span>

  <span className="ml-3 rounded-lg bg-green-100 px-3 py-1 font-bold text-green-700">
    {latestReview.overallScore}
  </span>
</p>
          </div>
        )}

        {/* Overall Score Bar Chart */}
        <ScoreChart data={chartData} />

        {/* Health Pie Chart */}
        <HealthPieChart
          good={good}
          average={average}
          poor={poor}
        />

        {/* Repository Ranking */}
        <RepositoryRanking reviews={reviews} />

        {/* Review Trend Chart */}
        <ReviewTrendChart data={trendData} />
      </div>
    </div>
  );
}
