"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      onClick={() =>
        signIn("github", {
          callbackUrl: "/dashboard",
        })
      }
      className="rounded-md bg-black px-4 py-2 text-white"
    >
      Continue with GitHub
    </button>
  );
}