import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    description: "Perfect for students and beginners.",
    features: [
      "5 AI Reviews / month",
      "Basic Security Scan",
      "GitHub Integration",
    ],
  },
  {
    name: "Pro",
    price: "₹499/mo",
    description: "Best for individual developers.",
    features: [
      "Unlimited AI Reviews",
      "Advanced Security Scan",
      "Performance Analysis",
      "Priority Support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and organizations.",
    features: [
      "Unlimited Repositories",
      "Team Dashboard",
      "Advanced Analytics",
      "Dedicated Support",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold">Simple Pricing</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Choose the plan that fits your development workflow.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border bg-white p-8 shadow-sm ${
                plan.popular ? "border-black shadow-xl" : ""
              }`}
            >
              {plan.popular && (
                <span className="rounded-full bg-black px-3 py-1 text-sm text-white">
                  Most Popular
                </span>
              )}

              <h3 className="mt-6 text-2xl font-bold">{plan.name}</h3>
              <p className="mt-2 text-4xl font-bold">{plan.price}</p>
              <p className="mt-3 text-gray-600">{plan.description}</p>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="text-green-600" size={18} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className="mt-8 w-full rounded-xl bg-black py-3 text-white transition hover:opacity-90">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}