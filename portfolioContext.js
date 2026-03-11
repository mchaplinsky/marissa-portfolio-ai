import fs from "fs";
import path from "path";

const KNOWLEDGE_BASE_DIR = path.join(
  process.cwd(),
  "AIPortfolioKnowledgeBaseStructure"
);

function readMarkdownFilesRecursively(dir) {
  let results = [];

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(readMarkdownFilesRecursively(fullPath));
    } else if (item.endsWith(".md")) {
      const content = fs.readFileSync(fullPath, "utf8");
      results.push(`\n\n# FILE: ${item}\n${content}`);
    }
  }

  return results;
}

export function getPortfolioContext() {
  if (!fs.existsSync(KNOWLEDGE_BASE_DIR)) {
    throw new Error(
      `Knowledge base folder not found: ${KNOWLEDGE_BASE_DIR}`
    );
  }

  const allMarkdown = readMarkdownFilesRecursively(KNOWLEDGE_BASE_DIR);

  return allMarkdown.join("\n\n");
}
