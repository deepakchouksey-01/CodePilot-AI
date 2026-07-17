import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { ai } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {


  const session = await auth();

console.log("SESSION:", session);

if (!session) {
  return NextResponse.json(
    { error: "No Session" },
    { status: 401 }
  );
}

if (!session.accessToken) {
  return NextResponse.json(
    {
      error: "No Access Token",
      session,
    },
    { status: 401 }
  );
}

  const { owner, repo, path } = await req.json();

  const githubResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github+json",
      },
    }
  );

  const file = await githubResponse.json();

  const code = Buffer.from(file.content, "base64").toString("utf8");

  const prompt = `
You are a Senior Software Engineer.

Review this code.

Return:

1. Overall Score (/100)
2. Bugs
3. Security Issues
4. Performance
5. Clean Code Suggestions

Code:

${code}
`;

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return NextResponse.json({
    review: result.text,
  });
}