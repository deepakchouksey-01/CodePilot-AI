import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-7xl font-bold">404</h1>

      <h2 className="mt-4 text-3xl font-semibold">
        Page Not Found
      </h2>

      <p className="mt-2 text-gray-600 text-center">
        Sorry, the page you are looking for doesn't exist.
      </p>

      <Link
        href="/dashboard"
        className="mt-8 rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
      >
        Back to Dashboard
      </Link>
    </main>
  );
}