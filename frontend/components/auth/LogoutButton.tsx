"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="rounded-lg border px-3 py-2"
    >
      Logout
    </button>
  );
}