import fs from "fs";
import path from "path";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: "training" | "kitchen" | "tech" | "watch-play";
  excerpt: string;
  readTime: number;
  content: string;
};

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

function parseFrontmatter(source: string): {
  data: Record<string, string>;
  content: string;
} {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: source };

  const yamlStr = match[1];
  const content = match[2].trim();
  const data: Record<string, string> = {};

  for (const line of yamlStr.split(/\r?\n/)) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }

  return { data, content };
}

function calcReadTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllPosts(): Post[] {
  const files = fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(NOTES_DIR, filename), "utf8");
      const { data, content } = parseFrontmatter(raw);

      return {
        slug,
        title: data.title ?? "",
        date: data.date ?? "",
        category: (data.category ?? "tech") as Post["category"],
        excerpt: data.excerpt ?? "",
        readTime: calcReadTime(content),
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
