---
target: app/ericscorner/page.tsx
total_score: 36
p0_count: 0
p1_count: 0
timestamp: 2026-06-09T17-57-15Z
slug: app-ericscorner-page-tsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Active filter and aria-live solid; empty grid on zero-match filter gives no feedback |
| 2 | Match System / Real World | 4 | Natural language throughout; older/newer post nav is clear |
| 3 | User Control and Freedom | 4 | URL-persisted filter, post-to-post nav, and back link all correct |
| 4 | Consistency and Standards | 4 | Category colors moved to CSS classes; design system fully compliant |
| 5 | Error Prevention | 4 | notFound(), type-safe categories, URL param validation on mount |
| 6 | Recognition Rather Than Recall | 4 | Featured card communicates recency; post nav reveals adjacency; filters persistent |
| 7 | Flexibility and Efficiency of Use | 3 | URL filter bookmarkable/shareable; no further power-user surface expected here |
| 8 | Aesthetic and Minimalist Design | 4 | Identical-card-grid anti-pattern broken; editorial subtitle; brand-coherent pills |
| 9 | Error Recovery | 3 | N/A static portfolio; notFound() handles it cleanly |
| 10 | Help and Documentation | 3 | Simple surface; no help needed |
| **Total** | | **36/40** | **Excellent** |

## Anti-Patterns Verdict

LLM assessment: Passes cleanly. No gradient text, no hero-metric template, no numbered eyebrows, no identical card grid. Typography pairing is editorial. Warm ember hover glow uses brand color language. Does not read as AI-made.

Deterministic scan: 0 findings. Clean.

## Overall Impression

Went from a functional-but-forgettable content feed to something with a clear editorial personality. All three P2s from the prior run resolved. What remains is one genuine gap (empty state) and one semantic oddity (h1 size inversion).

## What's Working

1. Featured card hierarchy. Full-width first post with larger title and expanded excerpt creates a "lead story" feeling without extra data modeling.
2. Category color system. Training red / Kitchen amber / Tech ghost neutral / Watch & Play ghost amber all on-palette, all pass WCAG contrast.
3. URL-persisted filter + post navigation. Filter to Training, read a post, press Back, land back on the filtered list. Flow is complete end-to-end.

## Priority Issues

### [P2] No empty state when a filtered category has zero posts

When filtering to a category with no matching posts, the grid renders as blank space. No message, no context, no next action.

Fix: Add empty-state element in CornerClient when filtered.length === 0. Render "No Training posts yet." with corner-empty class.

Suggested command: /impeccable onboard

### [P3] h1 visually smaller than its subtitle

h1.section-label renders at 12px. Subtitle below renders at clamp(1.15rem, 2vw, 1.55rem) weight 300. Screen readers encounter an h1 that is visually the smallest text on the page.

Fix: Make subtitle the h1 and demote section-label to aria-hidden decoration, or add size override to h1.

Suggested command: /impeccable typeset

## Persona Red Flags

Sam (Accessibility): aria-live filter region correct. Tab order clean. corner-card-featured border at rest could be confused with focus indicator.

Jordan (First-Timer): Empty category filter returns blank grid. Post navigation may not be discovered without scrolling past post body.

Riley (Stress Tester): Invalid URL param correctly defaults to All. Single-post edge case functional but slightly isolated.

## Minor Observations

- corner-cat-tech ghost chip near-invisible on low-brightness displays. Bump to rgba(245,245,245,0.11) bg and rgba(245,245,245,0.22) border.
- Stagger delay tops out at i*80ms with 10+ posts. Cap at Math.min(i*80, 320)ms.
- getAllPosts() called twice in [slug]/page.tsx. Single call with local find is cleaner.
