import { notFound } from "next/navigation"
import Link from "next/link"
import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { MDXRemote } from "next-mdx-remote/rsc"
import PostEffects from "../PostEffects"

const CATEGORY_COLORS: Record<string, string> = {
  training: "rgb(226,56,56)",
  kitchen: "#e8a045",
  tech: "#60a5fa",
  "watch-play": "#a78bfa",
}

const CATEGORY_LABELS: Record<string, string> = {
  training: "Training",
  kitchen: "Kitchen",
  tech: "Tech",
  "watch-play": "Watch & Play",
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return { title: `${post.title} | Eric Mah`, description: post.excerpt }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <PostEffects />
      <div className="shell">
        <section className="post-page">
          <div className="reveal">
            <Link href="/ericscorner" className="post-back">
              ← Eric&apos;s Corner
            </Link>
          </div>

          <div className="reveal d-80">
            <span
              className="corner-cat-pill"
              style={{ background: CATEGORY_COLORS[post.category] }}
            >
              {CATEGORY_LABELS[post.category]}
            </span>
            <h1 className="post-title">{post.title}</h1>
            <div className="post-meta">
              <span>{formatDate(post.date)}</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <div className="post-divider reveal d-110" />

          <div className="post-body reveal d-180">
            <MDXRemote source={post.content} />
          </div>
        </section>
      </div>
    </>
  )
}
