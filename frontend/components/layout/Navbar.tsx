import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "@/components/auth/LogoutButton";
import LoginButton from "@/components/auth/LoginButton";

export default async function Navbar() {
  const session = await auth();

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

        {/* Right Side */}
        {session?.user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-lg border px-4 py-2 hover:bg-gray-100"
            >
              Dashboard
            </Link>

            {session.user.image && (
              <img
                src={session.user.image}
                alt="Profile"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full"
              />
            )}

            <span className="font-medium">
              {session.user.name}
            </span>

            <LogoutButton />
          </div>
        ) : (
          <LoginButton />
        )}
      </div>
    </header>
  );
}