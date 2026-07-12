import { Search, Brain, ShieldCheck, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Connect Repository",
    description:
      "Connect your GitHub repository securely with one click.",
  },
  {
    icon: Brain,
    title: "AI Reviews Your Code",
    description:
      "Our AI analyzes every pull request for bugs, code quality, and best practices.",
  },
  {
    icon: ShieldCheck,
    title: "Get Smart Suggestions",
    description:
      "Receive security fixes, performance improvements, and clean code recommendations.",
  },
  {
    icon: Rocket,
    title: "Ship With Confidence",
    description:
      "Merge faster with confidence after reviewing AI-generated insights.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            How CodePilot AI Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Review your code in four simple steps using AI-powered automation.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="rounded-2xl bg-white p-8 shadow-sm border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-black text-white">
                  <Icon size={28} />
                </div>

                <div className="mb-3 text-sm font-bold text-gray-400">
                  STEP {index + 1}
                </div>

                <h3 className="text-xl font-semibold">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}