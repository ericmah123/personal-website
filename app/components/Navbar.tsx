import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-5 flex items-center justify-between max-w-3xl mx-auto">
      <Link href="/" className="text-foreground font-semibold tracking-tight">
        Eric Mah
      </Link>
      <ul className="flex items-center gap-6">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-muted hover:text-foreground transition-colors text-sm"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
