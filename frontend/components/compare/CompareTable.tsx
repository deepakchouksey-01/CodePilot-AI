"use client";

interface Review {
  repository: string;
  overallScore: string | null;
  securityScore: string | null;
  performanceScore: string | null;
  qualityScore: string | null;
  maintainabilityScore: string | null;
}

interface Props {
  left: Review;
  right: Review;
}

function score(value: string | null) {
  return Number(value?.replace("/100", "") || 0);
}

export default function CompareTable({
  left,
  right,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <table className="w-full">

        <thead className="bg-black text-white">

          <tr>
            <th className="p-4 text-left">Metric</th>
            <th className="p-4">{left.repository}</th>
            <th className="p-4">{right.repository}</th>
          </tr>

        </thead>

        <tbody>

          <Row
            title="Overall"
            left={left.overallScore}
            right={right.overallScore}
          />

          <Row
            title="Security"
            left={left.securityScore}
            right={right.securityScore}
          />

          <Row
            title="Performance"
            left={left.performanceScore}
            right={right.performanceScore}
          />

          <Row
            title="Quality"
            left={left.qualityScore}
            right={right.qualityScore}
          />

          <Row
            title="Maintainability"
            left={left.maintainabilityScore}
            right={right.maintainabilityScore}
          />

        </tbody>

      </table>

      <div className="border-t p-6">

        <h2 className="text-xl font-bold">
          🏆 Winner
        </h2>

        <p className="mt-2 text-lg">

          {score(left.overallScore) >= score(right.overallScore)
            ? left.repository
            : right.repository}

        </p>

      </div>

    </div>
  );
}

function Row({
  title,
  left,
  right,
}: {
  title: string;
  left: string | null;
  right: string | null;
}) {
  return (
    <tr className="border-b">

      <td className="p-4 font-semibold">
        {title}
      </td>

      <td className="p-4 text-center">
        {left}
      </td>

      <td className="p-4 text-center">
        {right}
      </td>

    </tr>
  );
}