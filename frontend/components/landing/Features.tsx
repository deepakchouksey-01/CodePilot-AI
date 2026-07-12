import {
  ShieldCheck,
  GitBranch,
  Zap,
  BarChart3,
  Bug,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: GitBranch,
    title: "GitHub Integration",
    description:
      "Connect your repositories in one click and review pull requests automatically.",
  },
  {
    icon: Sparkles,
    title: "AI Code Review",
    description:
      "Get intelligent suggestions for cleaner, more maintainable code in seconds.",
  },
  {
    icon: ShieldCheck,
    title: "Security Analysis",
    description:
      "Detect common vulnerabilities and insecure coding practices before deployment.",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Identify slow code paths and receive optimization recommendations.",
  },
  {
    icon: Bug,
    title: "Bug Detection",
    description:
      "Catch logical mistakes and potential runtime issues early in development.",
  },
  {
    icon: BarChart3,
    title: "Quality Dashboard",
    description:
      "Track code quality, review history, and team performance from one dashboard.",
  },
];

export default function Features() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Everything you need for smarter code reviews
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            CodePilot AI helps developers review code faster, improve quality,
            detect security issues, and ship confidently.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-black text-white">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}