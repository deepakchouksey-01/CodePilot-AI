const faqs = [
  {
    question: "How does CodePilot AI review code?",
    answer:
      "It uses AI to analyze pull requests and provides suggestions for bugs, security, and performance improvements.",
  },
  {
    question: "Which Git providers are supported?",
    answer:
      "Initially GitHub. GitLab and Bitbucket support can be added later.",
  },
  {
    question: "Can I review private repositories?",
    answer:
      "Yes. After authentication, private repositories can be analyzed securely.",
  },
  {
    question: "Does it replace human code review?",
    answer:
      "No. It assists developers by providing intelligent suggestions before human review.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="mt-12 space-y-6">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">
                {faq.question}
              </h3>

              <p className="mt-3 text-gray-600">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}