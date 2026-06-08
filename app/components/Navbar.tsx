"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import NavCharacter from "./NavCharacter"

type NavLink = {
  label: string
  href: string
  /** null = scroll to top, string = element id to scroll to, undefined = real route */
  scrollId?: string | null
}

const links: NavLink[] = [
  { label: "Home",          href: "/",       scrollId: null },
  { label: "Experience",    href: "/#experience", scrollId: "experience" },
  { label: "Projects",      href: "/#projects",   scrollId: "projects" },
  { label: "Eric's Corner", href: "/ericscorner" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onScroll() {
      setScrolled(window.scrollY > 72)
    }
    document.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  function handleClick(e: React.MouseEvent, link: NavLink) {
    e.stopPropagation()
    setOpen(false)

    // Only intercept scroll-target links when already on the home page
    if (pathname === "/" && "scrollId" in link) {
      e.preventDefault()
      if (link.scrollId === null) {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        document.getElementById(link.scrollId!)?.scrollIntoView({ behavior: "smooth" })
      }
    }
    // Otherwise let <Link> handle the navigation normally
  }

  return (
    <div className="sticky top-5 z-20 pt-5 flex justify-center">
      <nav
        ref={navRef}
        className={`nav-pill glass${open ? " nav-open" : ""}${scrolled ? " nav-scrolled" : ""}`}
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label="Site navigation"
      >
        {/* Face — left */}
        <NavCharacter />

        {/* Links — expand between face and dots */}
        <div className={`nav-items${open ? " nav-items-open" : ""}`} aria-hidden={!open}>
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-item nav-item-d${i}`}
              onClick={(e) => handleClick(e, link)}
            >
              {link.label}
            </Link>
          ))}
        </div>

      </nav>
    </div>
  )
}
