export default function TrustedBy() {
  const companies = [
    "GitHub",
    "OpenAI",
    "Vercel",
    "Docker",
    "AWS",
    "Google",
  ];

  return (
    <section className="border-y bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-500">
          Trusted by developers worldwide
        </p>

        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {companies.map((company) => (
            <div
              key={company}
              className="flex h-16 items-center justify-center rounded-xl border bg-white font-semibold text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}