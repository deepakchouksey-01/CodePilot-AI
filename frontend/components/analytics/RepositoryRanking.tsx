interface RepositoryRankingProps {
  reviews: {
    repository: string;
    overallScore: string | null;
    securityScore: string | null;
    performanceScore: string | null;
    qualityScore: string | null;
    maintainabilityScore: string | null;
  }[];
}

export default function RepositoryRanking({
  reviews,
}: RepositoryRankingProps) {
  const sorted = [...reviews].sort((a, b) => {
    const scoreA = Number(
      a.overallScore?.replace("/100", "") || 0
    );

    const scoreB = Number(
      b.overallScore?.replace("/100", "") || 0
    );

    return scoreB - scoreA;
  });

  return (
    <div className="mt-8 rounded-xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        🏆 Repository Ranking
      </h2>

      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="p-3 text-left">Rank</th>
            <th className="p-3 text-left">Repository</th>
            <th className="p-3 text-left">Overall</th>
            <th className="p-3 text-left">Security</th>
            <th className="p-3 text-left">Performance</th>
            <th className="p-3 text-left">Quality</th>
            <th className="p-3 text-left">Maintainability</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((review, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-3 font-bold">
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : index + 1}
              </td>

              <td className="p-3 font-semibold">
                {review.repository}
              </td>

              <td className="p-3">
                {review.overallScore}
              </td>

              <td className="p-3">
                {review.securityScore}
              </td>

              <td className="p-3">
                {review.performanceScore}
              </td>

              <td className="p-3">
                {review.qualityScore}
              </td>

              <td className="p-3">
                {review.maintainabilityScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}