import { getAllPosts } from "@/lib/posts"
import CornerClient from "./CornerClient"

export const metadata = {
  title: "Eric's Corner | Eric Mah",
  description: "Training logs, kitchen experiments, tech notes, and other things.",
}

export default function EricsCornerPage() {
  const posts = getAllPosts()
  return (
    <>
      <div className="shell">
        <section className="corner-page">
          <div className="reveal">
            <h1 className="sr-only">Eric&apos;s Corner</h1>
            <p className="section-label" aria-hidden="true">Eric&apos;s Corner</p>
            <p className="corner-subtitle">
              Training logs, kitchen experiments, tech notes, and other things.
            </p>
          </div>
          <CornerClient posts={posts} />
        </section>
      </div>
    </>
  )
}
