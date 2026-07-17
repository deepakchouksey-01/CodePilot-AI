import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session?.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const response = await fetch(
    "https://api.github.com/user/repos?sort=updated&per_page=100",
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "GitHub API Error" },
      { status: response.status }
    );
  }

  const repos = await response.json();

  return NextResponse.json(repos);
}