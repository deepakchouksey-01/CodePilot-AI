export default function Loading() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">

        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-gray-300 border-t-black" />

        <h2 className="mt-6 text-2xl font-bold">
          AI is reviewing your code...
        </h2>

        <p className="mt-2 text-gray-500">
          Please wait a few seconds.
        </p>

      </div>
    </main>
  );
}