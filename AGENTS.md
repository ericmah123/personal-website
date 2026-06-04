<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project
Portfolio site for Eric Mah. CS grad, incoming Technical Business Analyst at CNRL.
Next.js 16 App Router, Tailwind CSS 4, TypeScript. Deployed on Vercel.

## Stack
- Next.js 16 App Router (React 19)
- Tailwind CSS 4 (uses `@theme` block and `@tailwindcss/postcss` — not Tailwind 3)
- TypeScript
- MDX via @next/mdx for blog/notes posts (not yet installed)

## File Structure
- Pages go in app/
- Components go in app/components/
- Blog/notes content goes in content/notes/ as .mdx files
- Static assets go in public/
- All global styles and custom CSS in app/globals.css
- Client-side JS effects (canvas, observers, parallax) in app/components/HomeEffects.tsx

## Design System

### Colors
- Background: `#0f0f0f`
- Text: `#f5f5f5`
- Muted: `#a3a3a3`
- Accent Red: `rgb(226, 56, 56)` — hover states, highlights, section labels
- Amber: `#e8a045` — secondary warm accent, ember particles
- Hairline borders: `rgba(245, 245, 245, 0.08)`
- Glass tokens (defined in globals.css): `--glass-tint`, `--glass-tint-hi`, `--glass-stroke`, `--glass-edge`, `--glass-blur: 22px`

### Typography
- Font: Inter, loaded via `next/font`
- Display/hero sizes use `clamp()` for fluid scaling — not fixed Tailwind text sizes
- Hero name: `clamp(56px, 8.5vw, 120px)`, weight 600, line-height 0.95
- Tagline: `clamp(19px, 1.9vw, 26px)`, weight 400, line-height 1.5
- Body/intro: `clamp(22px, 2.3vw, 32px)`, weight 300, line-height 1.5
- Labels: 12px, weight 500, uppercase, letter-spacing 0.18em
- `text-wrap: balance` on taglines/intro; `text-wrap: pretty` on body text

### Layout
- Shell container: `max-width: 1180px`, centered, `padding: 0 48px` → `0 22px` on mobile
- Hero padding: `132px 0 104px` → `92px 0 64px` mobile
- Section padding: `60px 0`
- Responsive via CSS `@media` queries at `980px` and `640px` — not Tailwind breakpoint prefixes

### Animation System
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` everywhere
- Entrance classes: `.anim-up` (hero, rAF-triggered), `.reveal` (scroll, IntersectionObserver threshold 0.18)
- Stagger delay classes: `.d-40`, `.d-80`, `.d-110`, `.d-180`, `.d-240`, `.d-250`, `.d-520`
- Background: 3 drifting radial gradient blobs with breathing opacity
- Particles: HTML5 Canvas embers in amber + red, `globalCompositeOperation: "lighter"`
- All animations must respect `prefers-reduced-motion: reduce`

### Styling Architecture
- Tailwind classes: structural/layout only (flex, grid, z-index, spacing, overflow)
- All visual styling, colors, animations: `globals.css` custom CSS
- Glassmorphism: use the `.glass` class (defined in globals.css) — do not recreate inline
- CSS class naming: BEM-influenced (`.hero`, `.hero-name`, `.nav-pill`, `.c-row`)
- State classes: `.is-in`, `.nav-open`, `.nav-scrolled`, `.force-show`

## Pages
- / → Home (name, one-line bio, nav links)
- /work → Professional experience (Keyera) + personal projects
- /notes → Blog/interests post list
- /notes/[slug] → Individual post
- /about → Short prose bio, interests

## Rules
- Never modify AGENTS.md or CLAUDE.md (except when the user explicitly requests it as a meta-task)
- Only touch files relevant to the current task
- No new dependencies without stating why in a comment
- No placeholder or lorem ipsum content
- No inline styles — Tailwind + globals.css only
- No animations unless explicitly asked
- Use existing components before creating new ones
- Always use TypeScript, never plain .js files
- Do not overhaul the existing design — extend and match it

## Do Not
- Use Bootstrap or any CSS framework other than Tailwind
- Add particle effects or typewriter animations to new pages (existing ones are intentional)
- Use progress bars for skills
- Add a separate "skills" section
- Use Tailwind breakpoint prefixes (`md:`, `lg:`) — use CSS `@media` queries instead
- Recreate glassmorphism styles inline — use the `.glass` class
- Use fixed `px` font sizes for hero/display text — use `clamp()`
