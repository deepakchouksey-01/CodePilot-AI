import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          CodePilot AI
        </Link>

        {/* Navigation */}
        <nav className="hidden gap-8 md:flex">
          <Link href="#">Features</Link>
          <Link href="#">How it Works</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Docs</Link>
        </nav>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="rounded-lg border px-4 py-2">
            Login
          </button>

          <button className="rounded-lg bg-black px-4 py-2 text-white">
            Get Started
          </button>
        </div>

      </div>
    </header>
  );
}