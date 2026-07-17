import { CheckCircle2, ShieldCheck, GitPullRequest } from "lucide-react";

const activities = [
  {
    title: "package.json",
    message: "AI review completed successfully",
    icon: <CheckCircle2 className="h-5 w-5 text-green-600" />,
  },
  {
    title: "auth.ts",
    message: "Security scan finished",
    icon: <ShieldCheck className="h-5 w-5 text-blue-600" />,
  },
  {
    title: "dashboard/page.tsx",
    message: "Repository analyzed",
    icon: <GitPullRequest className="h-5 w-5 text-purple-600" />,
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold">Recent Activity</h2>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-xl border border-gray-100 p-3 transition hover:bg-gray-50"
          >
            <div>{activity.icon}</div>

            <div>
              <p className="font-semibold">{activity.title}</p>

              <p className="text-sm text-gray-500">
                {activity.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}