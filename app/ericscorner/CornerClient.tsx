"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Post } from "@/lib/posts"

type Category = "all" | Post["category"]

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "training", label: "Training" },
  { value: "kitchen", label: "Kitchen" },
  { value: "tech", label: "Tech" },
  { value: "watch-play", label: "Watch & Play" },
]

const CATEGORY_COLORS: Record<Post["category"], string> = {
  training: "rgb(226,56,56)",
  kitchen: "#e8a045",
  tech: "#60a5fa",
  "watch-play": "#a78bfa",
}

const CATEGORY_LABELS: Record<Post["category"], string> = {
  training: "Training",
  kitchen: "Kitchen",
  tech: "Tech",
  "watch-play": "Watch & Play",
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function handleGridPointer(e: React.PointerEvent<HTMLDivElement>) {
  const el = (e.target as HTMLElement).closest<HTMLElement>(".glass")
  if (!el) return
  const r = el.getBoundingClientRect()
  el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%")
  el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%")
}

export default function CornerClient({ posts }: { posts: Post[] }) {
  const [active, setActive] = useState<Category>("all")
  const filtered = active === "all" ? posts : posts.filter(p => p.category === active)

  // Safety net for stuck reveals
  useEffect(() => {
    const t = setTimeout(() => document.documentElement.classList.add("force-show"), 1500)
    return () => clearTimeout(t)
  }, [])

  // Scroll reveal — re-runs when filtered list changes so new cards get observed
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in")
            io.unobserve(en.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -5% 0px" }
    )
    document.querySelectorAll<Element>(".reveal:not(.is-in)").forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [filtered])

  return (
    <>
      <div className="corner-filters reveal d-80">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            className={active === cat.value ? "corner-filter-active" : "corner-filter-pill glass"}
            onClick={() => setActive(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="corner-grid" onPointerMove={handleGridPointer}>
        {filtered.map((post, i) => (
          <Link
            key={post.slug}
            href={`/ericscorner/${post.slug}`}
            className="corner-card glass reveal"
            style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
          >
            <div className="corner-card-inner">
              <span
                className="corner-cat-pill"
                style={{ background: CATEGORY_COLORS[post.category] }}
              >
                {CATEGORY_LABELS[post.category]}
              </span>
              <h2 className="corner-card-title">{post.title}</h2>
              <p className="corner-card-excerpt">{post.excerpt}</p>
              <div className="corner-card-meta">
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
