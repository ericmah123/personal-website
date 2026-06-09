import { notFound } from "next/navigation"
import Link from "next/link"
import { getAllPosts } from "@/lib/posts"
import { CATEGORY_LABELS } from "@/lib/categories"
import { MDXRemote } from "next-mdx-remote/rsc"
import PostEffects from "../PostEffects"

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
  const post = getAllPosts().find(p => p.slug === slug)
  if (!post) return {}
  return { title: `${post.title} | Eric Mah`, description: post.excerpt }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const allPosts = getAllPosts()
  const idx = allPosts.findIndex(p => p.slug === slug)
  if (idx === -1) notFound()
  const post = allPosts[idx]
  const prevPost = idx < allPosts.length - 1 ? allPosts[idx + 1] : null
  const nextPost = idx > 0 ? allPosts[idx - 1] : null

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
            <span className={`corner-cat-pill corner-cat-${post.category}`}>
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

          {(prevPost || nextPost) && (
            <nav className="post-nav reveal" aria-label="Post navigation">
              {prevPost && (
                <Link href={`/ericscorner/${prevPost.slug}`} className="post-nav-link post-nav-prev">
                  <span className="post-nav-dir">← older</span>
                  <span className="post-nav-title">{prevPost.title}</span>
                </Link>
              )}
              {nextPost && (
                <Link href={`/ericscorner/${nextPost.slug}`} className="post-nav-link post-nav-next">
                  <span className="post-nav-dir">newer →</span>
                  <span className="post-nav-title">{nextPost.title}</span>
                </Link>
              )}
            </nav>
          )}
        </section>
      </div>
    </>
  )
}
