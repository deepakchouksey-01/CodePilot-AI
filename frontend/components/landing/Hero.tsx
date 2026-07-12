export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <span className="rounded-full border px-4 py-2 text-sm">
        🚀 AI-Powered Code Review Platform
      </span>

      <h1 className="mt-8 text-6xl font-bold">
        Review Smarter.
        <br />
        Ship Faster.
      </h1>

      <p className="mt-6 max-w-3xl text-lg text-gray-600">
        Automatically review GitHub pull requests using AI.
        Detect bugs, security vulnerabilities, performance issues,
        and improve code quality in seconds.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="rounded-lg bg-black px-6 py-3 text-white">
          Get Started
        </button>

        <button className="rounded-lg border px-6 py-3">
          View Demo
        </button>
      </div>
    </section>
  );
}