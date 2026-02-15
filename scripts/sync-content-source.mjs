import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const SYNC_MAP = [
  ["content-source/auto-checkpoint.md", "content/docs/(cli)/integrations/openclaw/auto-checkpoint.mdx"],
  ["content-source/compat.md", "content/docs/(cli)/commands/compat.mdx"],
  ["content-source/context-death-detection.md", "content/docs/(cli)/integrations/openclaw/context-death-detection.mdx"],
  ["content-source/context-death-recovery.md", "content/docs/(cli)/concepts/context-death-recovery.mdx"],
  ["content-source/context-profiles.md", "content/docs/(cli)/concepts/context-profiles.mdx"],
  ["content-source/context.md", "content/docs/(cli)/commands/context.mdx"],
  ["content-source/doctor.md", "content/docs/(cli)/commands/doctor.mdx"],
  ["content-source/graph.md", "content/docs/(cli)/commands/graph.mdx"],
  ["content-source/hook-setup.md", "content/docs/(cli)/integrations/openclaw/hook-setup.mdx"],
  ["content-source/installation.md", "content/docs/(cli)/getting-started/installation.mdx"],
  ["content-source/qmd-integration.md", "content/docs/(cli)/integrations/qmd-integration.mdx"],
  ["content-source/session-start-context.md", "content/docs/(cli)/integrations/openclaw/session-start-context.mdx"],
  ["content-source/wake-sleep.md", "content/docs/(cli)/commands/wake-sleep.mdx"],
];

function normalizeNewlines(content) {
  return content.replace(/\r\n/g, "\n");
}

function extractFrontmatter(content) {
  if (!content.startsWith("---\n")) return null;
  const end = content.indexOf("\n---\n", 4);
  if (end === -1) return null;

  const frontmatter = content.slice(4, end);
  const body = content.slice(end + 5);
  return { frontmatter, body };
}

function getTitle(frontmatter) {
  const titleLine = frontmatter
    .split("\n")
    .find((line) => line.trim().startsWith("title:"));

  if (!titleLine) return null;

  const raw = titleLine.replace(/^title:\s*/, "").trim();
  return raw.replace(/^["']|["']$/g, "").trim() || null;
}

function removeDuplicateTopHeading(content) {
  const parts = extractFrontmatter(content);
  if (!parts) return content;

  const title = getTitle(parts.frontmatter);
  if (!title) return content;

  const body = parts.body.replace(/^\n+/, "");
  const heading = `# ${title}`;

  if (body.startsWith(`${heading}\n`) || body === heading) {
    const withoutHeading = body.slice(heading.length).replace(/^\n+/, "");
    return `---\n${parts.frontmatter}\n---\n\n${withoutHeading}`.trimEnd() + "\n";
  }

  return content;
}

async function syncFile(sourceRelativePath, targetRelativePath) {
  const sourcePath = path.join(ROOT, sourceRelativePath);
  const targetPath = path.join(ROOT, targetRelativePath);

  const sourceRaw = await fs.readFile(sourcePath, "utf8");
  const transformed = removeDuplicateTopHeading(normalizeNewlines(sourceRaw));

  await fs.mkdir(path.dirname(targetPath), { recursive: true });
  await fs.writeFile(targetPath, transformed, "utf8");

  console.log(`synced ${sourceRelativePath} -> ${targetRelativePath}`);
}

async function main() {
  for (const [sourceRelativePath, targetRelativePath] of SYNC_MAP) {
    await syncFile(sourceRelativePath, targetRelativePath);
  }
}

main().catch((error) => {
  console.error("sync failed:", error);
  process.exit(1);
});
