import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";
import StatsCard from "@/components/dashboard/StatsCard";
import RepoCard from "@/components/dashboard/RepoCard";
import RecentActivity from "@/components/dashboard/RecentActivity";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const response = await fetch(
    "https://api.github.com/user/repos?sort=updated&per_page=100",
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

  const repos = response.ok ? await response.json() : [];

  const reviews = 0;
  const bugs = 0;
  const security = 0;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar
         user={{
        name: session.user?.name ?? null,
        email: session.user?.email ?? null,
        image: session.user?.image ?? null,
        }}
      />

        <main className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold">
              Welcome, {session.user?.name} 👋
            </h1>

            <p className="mt-2 text-gray-600">
              AI powered GitHub Code Review Platform
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <StatsCard title="Repositories" value={repos.length} />
            <StatsCard title="AI Reviews" value={reviews} />
            <StatsCard title="Bugs Found" value={bugs} />
            <StatsCard title="Security Issues" value={security} />
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Your Repositories
                </h2>

                <span className="text-sm text-gray-500">
                  {repos.length} repos
                </span>
              </div>

              <div className="space-y-4">
                {repos.length === 0 ? (
                  <p className="text-gray-500">
                    No repositories found.
                  </p>
                ) : (
                  repos.slice(0, 10).map((repo: any) => (
                  <RepoCard
                    key={repo.id}
                    repo={repo}
                    
                     />
                  ))
                )}
              </div>
            </div>

            <RecentActivity />
          </div>
        </main>
      </div>
    </div>
  );
}