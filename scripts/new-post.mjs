#!/usr/bin/env node
import { createInterface } from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";
import { spawn } from "child_process";

const rl = createInterface({ input, output });

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function today() {
  return new Date().toISOString().split("T")[0];
}

const CATEGORIES = [
  { value: "training",   label: "Training" },
  { value: "kitchen",    label: "Kitchen" },
  { value: "tech",       label: "Tech" },
  { value: "watch-play", label: "Watch & Play" },
];

async function ask(prompt) {
  const answer = await rl.question(prompt);
  return answer.trim();
}

async function main() {
  console.log("\n  New Eric's Corner post\n");

  // Title
  const title = await ask("Title: ");
  if (!title) { console.error("Title is required."); process.exit(1); }

  const slug = slugify(title);
  console.log(`  slug → ${slug}\n`);

  // Category
  CATEGORIES.forEach((c, i) => console.log(`  ${i + 1}. ${c.label}`));
  const catRaw = await ask("\nCategory (1-4): ");
  const catIdx = parseInt(catRaw, 10) - 1;
  if (isNaN(catIdx) || catIdx < 0 || catIdx >= CATEGORIES.length) {
    console.error("Invalid category."); process.exit(1);
  }
  const category = CATEGORIES[catIdx].value;

  // Excerpt
  const excerpt = await ask("\nExcerpt (shown on listing card): ");
  if (!excerpt) { console.error("Excerpt is required."); process.exit(1); }

  // Images
  const imgRaw = await ask("\nCreate images folder? (y/N): ");
  const wantsImages = imgRaw.toLowerCase() === "y";

  rl.close();

  // Guard against duplicate slugs
  const mdxPath = join("content", "notes", `${slug}.mdx`);
  if (existsSync(mdxPath)) {
    console.error(`\nFile already exists: ${mdxPath}`);
    process.exit(1);
  }

  // Build frontmatter
  const imageComment = wantsImages
    ? `\n{/* Drop images in public/images/notes/${slug}/ and reference them as: */}\n{/* ![alt text](/images/notes/${slug}/your-image.jpg) */}\n`
    : "";

  const mdx = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${today()}"
category: "${category}"
excerpt: "${excerpt.replace(/"/g, '\\"')}"
---
${imageComment}
`;

  writeFileSync(mdxPath, mdx, "utf8");
  console.log(`\n  Created: ${mdxPath}`);

  if (wantsImages) {
    const imgDir = join("public", "images", "notes", slug);
    mkdirSync(imgDir, { recursive: true });
    console.log(`  Created: ${imgDir}/`);
  }

  // Open in VS Code
  console.log("");
  const vs = spawn("code", [mdxPath], { stdio: "ignore", shell: true, detached: true });
  vs.on("error", () => {
    console.log(`  Open manually: code ${mdxPath}`);
  });
  vs.unref();

  console.log("  Ready to write.\n");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
