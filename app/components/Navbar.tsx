"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import NavCharacter from "./NavCharacter"

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

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
          {links.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={`nav-item nav-item-d${i}`}
              onClick={e => { e.stopPropagation(); setOpen(false) }}
            >
              {label}
            </Link>
          ))}
        </div>

      </nav>
    </div>
  )
}
