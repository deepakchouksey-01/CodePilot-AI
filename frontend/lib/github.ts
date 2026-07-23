const CODE_EXTENSIONS = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".md",
];

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

  if (!response.ok) {
    console.log("Failed:", path);
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

  if (!response.ok) {
    return "";
  }

  const data = await response.json();

  if (!data.content) {
    return "";
  }

  return Buffer.from(data.content, "base64").toString("utf8");
}

export async function getRepositoryCode(
  owner: string,
  repo: string,
  token?: string
) {
  let finalCode = "";

  const SKIP_FOLDERS = [
    ".git",
    ".next",
    "node_modules",
    "frontend/public",
    "frontend/test-next",
    "dist",
    "build",
  ];

  const SKIP_FILES = [
    "package-lock.json",
    "README.md",
    "AGENTS.md",
    "CLAUDE.md",
  ];

  async function traverse(path = "") {
    const items = await getRepoContents(
      owner,
      repo,
      path,
      token
    );

    if (!Array.isArray(items)) return;

    for (const item of items) {
      if (item.type === "dir") {
        if (
          SKIP_FOLDERS.some((folder) =>
            item.path.startsWith(folder)
          )
        ) {
          console.log("Skipping:", item.path);
          continue;
        }

        await traverse(item.path);
        continue;
      }

      if (SKIP_FILES.includes(item.name)) {
        continue;
      }

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

=========================
FILE: ${item.path}
=========================

${code}

`;
    }
  }

  await traverse();

  console.log("Repository Length:", finalCode.length);

  return finalCode.substring(0, 100000);
}