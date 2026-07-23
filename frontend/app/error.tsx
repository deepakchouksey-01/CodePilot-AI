"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-5xl font-bold text-red-600">
        Something went wrong
      </h1>

      <p className="mt-4 text-gray-600 text-center">
        {error.message}
      </p>

      <button
        onClick={() => reset()}
        className="mt-8 rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
      >
        Try Again
      </button>
    </main>
  );
}