import Link from "next/link";
import { FolderGit2, Star, GitFork, Clock3 } from "lucide-react";

type Repo = {
  id: number;
  name: string;
  description?: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count?: number;
  updated_at?: string;
  owner: {
    login: string;
  };
};

interface Props {
  repo: Repo;
}

export default function RepoCard({ repo }: Props) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <FolderGit2 className="mt-1 text-blue-600" size={24} />

          <div>
            <h2 className="text-lg font-bold">{repo.name}</h2>

            <p className="mt-1 text-sm text-gray-500">
              {repo.description || "No description available"}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span className="rounded-full bg-gray-100 px-3 py-1">
                {repo.language ?? "Unknown"}
              </span>

              <span className="flex items-center gap-1">
                <Star size={16} />
                {repo.stargazers_count}
              </span>

              <span className="flex items-center gap-1">
                <GitFork size={16} />
                {repo.forks_count ?? 0}
              </span>

              <span className="flex items-center gap-1">
                <Clock3 size={16} />
                {repo.updated_at
                  ? new Date(repo.updated_at).toLocaleDateString()
                  : "Unknown"}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/dashboard/repo/${repo.owner.login}/${repo.name}`}
          className="rounded-xl bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Analyze
        </Link>
      </div>
    </div>
  );
}