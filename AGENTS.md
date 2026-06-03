<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project
Portfolio site for Eric Mah. CS grad, incoming Technical Business Analyst at CNRL.
Next.js 14 App Router, Tailwind, TypeScript. Deployed on Vercel.

## Stack
- Next.js 14 App Router
- Tailwind CSS only (no inline styles, no CSS modules)
- TypeScript
- MDX via @next/mdx for blog/notes posts

## File Structure
- Pages go in app/
- Components go in app/components/
- Blog/notes content goes in content/notes/ as .mdx files
- Static assets go in public/

## Design Tokens
- Background: #0f0f0f
- Accent: #e8a045
- Text: #f5f5f5
- Muted: #a3a3a3
- Font: Inter (already loaded via next/font)

## Pages
- / → Home (name, one-line bio, nav links)
- /work → Professional experience (Keyera) + personal projects
- /notes → Blog/interests post list
- /notes/[slug] → Individual post
- /about → Short prose bio, interests

## Rules
- Never modify AGENTS.md or CLAUDE.md
- Only touch files relevant to the current task
- No new dependencies without stating why in a comment
- No placeholder or lorem ipsum content
- No inline styles — Tailwind classes only
- No animations unless explicitly asked
- Use existing components before creating new ones
- Always use TypeScript, never plain .js files

## Do Not
- Use Bootstrap or any CSS framework other than Tailwind
- Add particle effects or typewriter animations
- Use progress bars for skills
- Add a separate "skills" section