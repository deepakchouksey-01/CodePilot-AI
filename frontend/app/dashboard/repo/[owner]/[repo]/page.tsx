import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import AnalyzeButton from "@/components/review/AnalyzeButton";
import { getRepositoryCode } from "@/lib/github";

interface Props {
  params: Promise<{
    owner: string;
    repo: string;
  }>;
}

export default async function RepoPage({ params }: Props) {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const { owner, repo } = await params;

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

 const repository = response.ok ? await response.json() : null;

      const repositoryCode = repository
    ? await getRepositoryCode(
      owner,
      repo,
      session.accessToken
    )
  : "";
      console.log("Repository Code Length:", repositoryCode.length);
      console.log(repositoryCode.substring(0, 300));
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/dashboard"
          className="mb-6 inline-block text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>

        {!repository ? (
          <div className="rounded-xl bg-white p-8 shadow">
            Repository not found.
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-8 shadow">
            <h1 className="text-4xl font-bold">
              {repository.full_name}
            </h1>

            <p className="mt-2 text-gray-600">
              {repository.description || "No description available"}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-4">
              <div className="rounded-xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Language</p>
                <h2 className="text-xl font-bold">
                  {repository.language || "Unknown"}
                </h2>
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Stars</p>
                <h2 className="text-xl font-bold">
                  ⭐ {repository.stargazers_count}
                </h2>
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Forks</p>
                <h2 className="text-xl font-bold">
                  {repository.forks_count}
                </h2>
              </div>

              <div className="rounded-xl bg-gray-100 p-4">
                <p className="text-sm text-gray-500">Open Issues</p>
                <h2 className="text-xl font-bold">
                  {repository.open_issues_count}
                </h2>
              </div>
            </div>

            <div className="mt-8">
              <AnalyzeButton code={repositoryCode} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}