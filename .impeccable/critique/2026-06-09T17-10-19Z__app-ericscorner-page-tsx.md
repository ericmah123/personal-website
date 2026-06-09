---
target: app/ericscorner/page.tsx
total_score: 31
p0_count: 0
p1_count: 0
timestamp: 2026-06-09T17-10-19Z
slug: app-ericscorner-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Active filter pill clear; card entrance on filter switch works correctly |
| 2 | Match System / Real World | 4 | Natural language, standard blog conventions throughout |
| 3 | User Control and Freedom | 3 | Filter resets to "All" after back-navigation; no post-to-post traversal |
| 4 | Consistency and Standards | 3 | Category colors use inline styles — outside the CSS design system |
| 5 | Error Prevention | 4 | notFound() handled, type-safe categories, static generation clean |
| 6 | Recognition Rather Than Recall | 3 | Filters always visible; no related posts or position cues on post page |
| 7 | Flexibility and Efficiency of Use | 2 | Filter buttons keyboard-accessible; no URL-preserving filter |
| 8 | Aesthetic and Minimalist Design | 3 | Blue + purple category pills are brand-foreign; otherwise clean |
| 9 | Error Recovery | 3 | N/A static portfolio |
| 10 | Help and Documentation | 3 | Simple surface; no help needed |
| **Total** | | **31/40** | **Good** |

## Anti-Patterns Verdict

**LLM assessment:** Passes the slop test. No gradient text, no hero metrics, no numbered eyebrows. Card grid is functional for a blog list. The section-label used as page identity is a semantic mismatch with its homepage role.

**Deterministic scan:** [] — zero findings.

## Overall Impression

Structurally solid. Two things break the pattern: blue/purple category pills are brand-foreign (site has only ever used red, amber, neutrals); list page has no h1 (section-label span is not a heading, card h2s have no parent h1). Both fixable quickly. Post page is clean.

## What's Working

1. Filter pill active state — solid red fill vs. glass ghost is unambiguous.
2. Post body prose — 680px max-width, 1.1rem, line-height 1.8 are correct reading parameters.
3. Filter change animation — useEffect([filtered]) reconnects IntersectionObserver on filter change. Correct behavior, no flash.

## Priority Issues

### [P2] List page has no h1 — heading hierarchy is broken
span.section-label "Eric's Corner" is a presentational span. Card titles are h2. Page has four h2s and no h1. Screen readers see flat h2 list with no page context.

**Fix:** Change the section-label span to an h1 element on the list page.

### [P2] Blue and purple category pills are brand-foreign
Site palette: ember red + hearth amber + neutrals. Eric's Corner introduces #60a5fa (blue-400) and #a78bfa (purple-400). Only cool-hued elements on the site.

**Fix:** Remap all four categories to established palette. Training → red, Kitchen → amber, Tech → neutral white chip, Watch & Play → faded amber or white.

### [P2] Category colors as inline styles — design system violation
style={{ background: CATEGORY_COLORS[post.category] }} in both CornerClient.tsx and [slug]/page.tsx. AGENTS.md forbids inline styles. CATEGORY_COLORS const is duplicated across two files.

**Fix:** Add corner-cat-[category] CSS classes to globals.css. Replace inline styles with className.

### [P3] Filter state resets on back-navigation
Active filter lives in React state only. Back-navigating from a post returns list to "All" filter.

**Fix:** Persist filter as URL query param. Read from useSearchParams() on mount; update URL on filter change.

### [P3] No post-to-post navigation
Only navigation from post page is back to list. No prev/next posts.

**Fix:** Pass adjacent post slugs from server component; render prev/next links at post body bottom.

## Persona Red Flags

**Jordan (Confused First-Timer):** Reads a post, returns to list, must re-filter. Small but real friction.

**Taylor (Fast-Scanning Recruiter):** Opens Tech category, finds 4-sentence post. Content is accurate but thin for a writing-quality signal.

**Casey (Distracted Mobile User):** Single-column at 640px correct. Filter pills flex-wrap correctly. Category pill touch targets are borderline tight (27px).

## Minor Observations

- CATEGORY_COLORS and CATEGORY_LABELS duplicated between CornerClient.tsx and [slug]/page.tsx.
- post-body missing styles for blockquote, table, img, hr — browser defaults when posts include these.
- All current posts are 1 min read; read-time signal gains meaning only past 200 words.
- corner-filter-pill and corner-filter-active share 5 identical declarations — duplication.
- No aria-live region for filter changes; screen readers not notified of list update.
- section-label "Eric's Corner" is the page's own name — self-referential vs. homepage subsection usage.
