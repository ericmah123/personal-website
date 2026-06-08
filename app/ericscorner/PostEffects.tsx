"use client"

import { useEffect } from "react"

export default function PostEffects() {
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
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    )
    document.querySelectorAll(".reveal").forEach(el => io.observe(el))

    const glassTiles = document.querySelectorAll<HTMLElement>(".glass")
    function onPointer(e: PointerEvent) {
      for (const el of glassTiles) {
        const r = el.getBoundingClientRect()
        if (
          e.clientX < r.left - 60 || e.clientX > r.right + 60 ||
          e.clientY < r.top - 60 || e.clientY > r.bottom + 60
        ) continue
        el.style.setProperty("--mx", ((e.clientX - r.left) / r.width * 100) + "%")
        el.style.setProperty("--my", ((e.clientY - r.top) / r.height * 100) + "%")
      }
    }
    window.addEventListener("pointermove", onPointer, { passive: true })

    const t = setTimeout(() => document.documentElement.classList.add("force-show"), 1500)
    return () => {
      io.disconnect()
      window.removeEventListener("pointermove", onPointer)
      clearTimeout(t)
    }
  }, [])

  return null
}
