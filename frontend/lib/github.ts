export async function getRepoContents(
  owner: string,
  repo: string,
  path = "",
  token?: string
) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

  console.log(
    "GitHub Contents:",
    owner,
    repo,
    path || "/",
    response.status
  );

  if (!response.ok) {
    console.log("❌ Failed Path:", path || "/");
    console.log(await response.text());
    return [];
  }

  return await response.json();
}

export async function getFileContent(
  owner: string,
  repo: string,
  path: string,
  token?: string
) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    }
  );

  console.log("Reading File:", path, response.status);

  if (!response.ok) {
    console.log("❌ Failed File:", path);
    return "";
  }

  const data = await response.json();

  if (!data.content) {
    return "";
  }

  return Buffer.from(data.content, "base64").toString("utf8");
}

const CODE_EXTENSIONS = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".py",
  ".java",
  ".cs",
  ".go",
  ".cpp",
  ".c",
  ".h",
  ".php",
  ".rb",
  ".rs",
  ".swift",
  ".kt",
  ".sql",
  ".md",
];

const IGNORE_FOLDERS = [
  ".git",
  ".github",
  ".next",
  "node_modules",
  "dist",
  "build",
  "coverage",
  "public",
  "test-next",
];

export async function getRepositoryCode(
  owner: string,
  repo: string,
  token?: string
) {
  let finalCode = "";

  async function traverse(path = "") {
    const items = await getRepoContents(owner, repo, path, token);

    if (!Array.isArray(items)) return;

    for (const item of items) {
      if (item.type === "dir") {
        if (
          IGNORE_FOLDERS.includes(item.name) ||
          item.name.startsWith(".")
        ) {
          console.log("⏭ Skipping Folder:", item.path);
          continue;
        }

        console.log("📁 Enter Folder:", item.path);

        await traverse(item.path);
      }

      if (item.type === "file") {
        const valid = CODE_EXTENSIONS.some((ext) =>
          item.name.endsWith(ext)
        );

        if (!valid) continue;

        const code = await getFileContent(
          owner,
          repo,
          item.path,
          token
        );

        finalCode += `

==========================
FILE: ${item.path}
==========================

${code}

`;
      }
    }
  }

  await traverse();

  console.log("================================");
  console.log("Repository Code Length:", finalCode.length);
  console.log(
    finalCode.substring(0, 500)
  );
  console.log("================================");

  return finalCode.slice(0, 80000);
}