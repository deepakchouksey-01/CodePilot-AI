import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session?.accessToken) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const owner = req.nextUrl.searchParams.get("owner");
  const repo = req.nextUrl.searchParams.get("repo");
  const path = req.nextUrl.searchParams.get("path");

  if (!owner || !repo || !path) {
    return NextResponse.json(
      { error: "Missing parameters" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

  const data = await response.json();

  return NextResponse.json(data);
}