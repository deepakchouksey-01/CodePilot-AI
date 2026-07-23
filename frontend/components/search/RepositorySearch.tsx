"use client";

import { useState } from "react";

interface Repo {
  id: number;
  name: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

interface Props {
  repos: Repo[];
}

export default function RepositorySearch({
  repos,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search repository..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="space-y-3">
        {filteredRepos.map((repo) => (
          <div
            key={repo.id}
            className="rounded-xl bg-white p-5 shadow"
          >
            <h2 className="text-xl font-bold">
              {repo.name}
            </h2>

            <p className="text-gray-500">
              {repo.language || "Unknown"}
            </p>

            <p className="mt-2">
              ⭐ {repo.stargazers_count}
            </p>

            <p>
              Updated:
              {" "}
              {new Date(repo.updated_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}