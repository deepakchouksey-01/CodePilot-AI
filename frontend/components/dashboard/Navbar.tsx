"use client";

type NavbarProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

export default function Navbar({ user }: NavbarProps) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">
      <div>
        <h2 className="text-xl font-bold">
          AI Code Review Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Analyze your GitHub repositories with AI
        </p>
      </div>

      <div className="flex items-center gap-4">
        {user.image ? (
          <img
            src={user.image}
            alt="Profile"
            className="h-10 w-10 rounded-full"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
            {user.name?.charAt(0) || "U"}
          </div>
        )}

        <div>
          <p className="font-semibold">
            {user.name || "User"}
          </p>

          <p className="text-sm text-gray-500">
            {user.email || ""}
          </p>
        </div>
      </div>
    </header>
  );
}