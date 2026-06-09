"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import type { Post } from "@/lib/posts"
import { CATEGORY_LABELS } from "@/lib/categories"

type Category = "all" | Post["category"]

const VALID_CATEGORIES: Category[] = ["all", "training", "kitchen", "tech", "watch-play"]

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "all", label: "All" },
  { value: "training", label: "Training" },
  { value: "kitchen", label: "Kitchen" },
  { value: "tech", label: "Tech" },
  { value: "watch-play", label: "Watch & Play" },
]

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
  const hasInteracted = useRef(false)
  const filtered = active === "all" ? posts : posts.filter(p => p.category === active)

  // Restore filter from URL on mount (supports back-navigation from a post)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const cat = params.get("category")
    if (cat && VALID_CATEGORIES.includes(cat as Category)) {
      setActive(cat as Category)
    }
  }, [])

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

  function handleFilterChange(cat: Category) {
    hasInteracted.current = true
    setActive(cat)
    const qs = cat === "all" ? "" : `?category=${cat}`
    window.history.replaceState(null, "", `/ericscorner${qs}`)
  }

  return (
    <>
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {hasInteracted.current && active !== "all"
          ? `Showing ${filtered.length} ${CATEGORY_LABELS[active as Post["category"]]} post${filtered.length !== 1 ? "s" : ""}`
          : ""}
      </p>

      <div className="corner-filters reveal d-80">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            className={active === cat.value ? "corner-filter-active" : "corner-filter-pill glass"}
            aria-pressed={active === cat.value}
            onClick={() => handleFilterChange(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="corner-empty">
          No {CATEGORY_LABELS[active as Post["category"]]} posts yet.
        </p>
      )}

      <div className="corner-grid" onPointerMove={handleGridPointer}>
        {filtered.map((post, i) => (
          <Link
            key={post.slug}
            href={`/ericscorner/${post.slug}`}
            className={`corner-card glass reveal${i === 0 ? " corner-card-featured" : ""}`}
            style={{ "--d": `${Math.min(i * 80, 320)}ms` } as React.CSSProperties}
          >
            <div className="corner-card-inner">
              <span className={`corner-cat-pill corner-cat-${post.category}`}>
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
