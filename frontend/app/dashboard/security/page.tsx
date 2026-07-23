import { prisma } from "@/lib/prisma";

export default async function SecurityPage() {
  const reviews = await prisma.review.findMany();

  const totalReviews = reviews.length;

  const securityScores = reviews
    .map((r) => Number(r.securityScore?.replace("/100", "") || 0))
    .filter((n) => n > 0);

  const averageSecurity =
    securityScores.length > 0
      ? Math.round(
          securityScores.reduce((a, b) => a + b, 0) /
            securityScores.length
        )
      : 0;

  const critical = securityScores.filter((s) => s < 40).length;

  const high = securityScores.filter(
    (s) => s >= 40 && s < 60
  ).length;

  const medium = securityScores.filter(
    (s) => s >= 60 && s < 80
  ).length;

  const low = securityScores.filter((s) => s >= 80).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-7xl">

        <h1 className="text-4xl font-bold">
          🔒 Security Dashboard
        </h1>

        <p className="mt-2 mb-8 text-gray-600">
          AI Powered Repository Security Overview
        </p>

        <div className="grid gap-6 md:grid-cols-5">

          <Card
            title="Repositories"
            value={totalReviews}
            color="bg-blue-600"
          />

          <Card
            title="Average Security"
            value={`${averageSecurity}/100`}
            color="bg-green-600"
          />

          <Card
            title="Critical"
            value={critical}
            color="bg-red-600"
          />

          <Card
            title="High"
            value={high}
            color="bg-orange-500"
          />

          <Card
            title="Medium / Low"
            value={medium + low}
            color="bg-yellow-500"
          />

        </div>

        <div className="mt-8 rounded-xl bg-white p-6 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Repository Security Scores
          </h2>

          <table className="w-full">

            <thead className="border-b">

              <tr>
                <th className="p-3 text-left">
                  Repository
                </th>

                <th className="p-3 text-left">
                  Security Score
                </th>

                <th className="p-3 text-left">
                  Risk
                </th>

              </tr>

            </thead>

            <tbody>

              {reviews.map((review) => {
                const score = Number(
                  review.securityScore?.replace("/100", "") || 0
                );

                let risk = "🟢 Low";

                if (score < 40) risk = "🔴 Critical";
                else if (score < 60) risk = "🟠 High";
                else if (score < 80) risk = "🟡 Medium";

                return (
                  <tr
                    key={review.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3 font-semibold">
                      {review.repository}
                    </td>

                    <td className="p-3">
                      {review.securityScore}
                    </td>

                    <td className="p-3">
                      {risk}
                    </td>
                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className={`${color} rounded-xl p-6 text-white shadow`}>
      <p>{title}</p>

      <h2 className="mt-2 text-3xl font-bold">
        {value}
      </h2>
    </div>
  );
}