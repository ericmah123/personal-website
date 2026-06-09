---
name: Eric Mah — Personal Site
description: Portfolio and blog for Eric Mah, CS grad and incoming Technical Business Analyst at CNRL.
colors:
  void-black: "#0f0f0f"
  bone-white: "#f5f5f5"
  ash-grey: "#a3a3a3"
  ember-red: "#e23838"
  hearth-amber: "#e8a045"
typography:
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(56px, 8.5vw, 120px)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(28px, 4vw, 48px)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(17px, 1.6vw, 21px)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "clamp(22px, 2.3vw, 32px)"
    fontWeight: 300
    lineHeight: 1.5
    letterSpacing: "-0.015em"
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.18em"
rounded:
  pill: "999px"
  card-lg: "28px"
  card: "18px"
  card-sm: "16px"
  logo: "8px"
  code: "4px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "22px"
  lg: "48px"
  section: "60px"
components:
  glass-card:
    backgroundColor: "rgba(255, 255, 255, 0.045)"
    rounded: "{rounded.card}"
    padding: "22px 24px"
  glass-card-hover:
    backgroundColor: "rgba(255, 255, 255, 0.06)"
    rounded: "{rounded.card}"
    padding: "22px 24px"
  filter-pill-inactive:
    backgroundColor: "transparent"
    textColor: "{colors.ash-grey}"
    rounded: "{rounded.pill}"
    padding: "7px 18px"
  filter-pill-active:
    backgroundColor: "{colors.ember-red}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "7px 18px"
  section-label:
    textColor: "{colors.ember-red}"
    typography: "{typography.label}"
    padding: "0"
  inline-chip:
    backgroundColor: "rgba(255, 255, 255, 0.07)"
    textColor: "{colors.bone-white}"
    rounded: "{rounded.pill}"
    padding: "4px 13px 4px 9px"
---

# Design System: Eric Mah — Personal Site

## 1. Overview: "Dead Serious, Still Alive"

**Creative North Star: "Dead Serious, Still Alive"**

The site's terse structure is the dead serious part — the sparse hero, the dry one-liner, the timeline that states facts without commentary. The "still alive" is in the margins: ember particles that drift across the dark field, a navigation character that winks, an intro panel that admits "I also try to touch grass, but still working on it." The system never explains itself; it just lets those moments exist.

Depth is material, not metaphorical. Glass surfaces refract the drifting gradient field beneath them. A red hairline cuts through the hero at an angle, glowing faintly like heated metal. The embers are not decorative — they are the most literal expression of the system's warmth, given physical form. Components are liquid glass shells: the material itself is the surface. Animations are purposeful and tasteful; they respond to interaction without performing for attention.

The system rejects the template. No skills section. No hero metrics. No grid of rounded-icon features. One name, one honest sentence, and a set of carefully earned details that reward slower reading. Anything that could appear on a generic dev portfolio without modification does not belong here.

**Key Characteristics:**
- Near-void dark field with three drifting gradient blobs (red, amber, deep red) shifting the ambient light
- Liquid glass surfaces that blur (22px) and saturate (165%) the layer below
- Ember Red (#e23838) as the sole primary accent — used for labels, highlights, active states, and structural motifs
- Hearth Amber (#e8a045) as a secondary warm accent restricted to ambient warmth only: ember particles and ongoing-state indicators
- Inter throughout — a precision instrument, not a design statement; contrast achieved through weight variation (300 to 600)
- Entrance animations: upward float on hero load, scroll-reveal on subsequent sections; never choreographed, never a performance
- Every animation respects `prefers-reduced-motion: reduce` — the site works at full fidelity without motion

## 2. Colors: The Ember Palette

Two temperatures in tension: a cool near-void field with bone-white type, and the ember warmth of red and amber that everything else points toward.

### Primary
- **Ember Red** (#e23838 / `rgb(226, 56, 56)`): The system's single active color. Section labels, hover states on links and nav items, the redline SVG motif, active filter pills, timeline spine and dots, project card hover borders. Also appears as a diffuse radial gradient in the background blob and project card spotlight. Its rarity is the point.
- **Ember Red Soft** (`rgba(226, 56, 56, 0.18)`): Background tint on hover states — nav items, chip hovers. Not a border color. Never standalone.

### Secondary
- **Hearth Amber** (#e8a045): The residual heat. Used exclusively for ember canvas particles, the ongoing timeline dot glow (sonar-ping animation), and background blob b2. Prohibited as text color, button accent, or functional state indicator.

### Neutral
- **Void Black** (#0f0f0f): The base surface. Fixed, full-screen, never changed.
- **Bone White** (#f5f5f5): Primary text and interactive element color at full strength. Forms the glass token base (`rgba(245, 245, 245, 0.08)`) for hairline borders.
- **Ash Grey** (#a3a3a3): Muted and secondary text — taglines, metadata, card descriptions, inactive filter pills, back-of-card text.

### Named Rules

**The One Accent Rule.** Ember Red appears on 15% or less of any given screen's visual area. Its rarity is what makes the redline motif, section labels, and active states register. Overuse cancels the system.

**The Amber Fence Rule.** Hearth Amber is ambient warmth only: ember particles and the ongoing-state sonar ping on the timeline dot. It never appears as text, as a button background, or as a label. The moment amber becomes functional it loses its warmth.

**The Glass Tint Rule.** Glass surface transparency (`rgba(255, 255, 255, 0.045)`) is intentionally near-invisible. The glass is the blur and saturation, not the white tint. Increasing the tint above 0.07 turns glass into a frosted block.

## 3. Typography: One Family, High Contrast

**Display / Body Font:** Inter (loaded via `next/font`)
**No second typeface.** Hierarchy is weight contrast (300 to 600), not family contrast.

**Character:** Inter is used here as a precision instrument. The display-weight name at 120px compressed to 0.95 line-height reads as intentional restraint; the weight-300 body at 32px creates airy, spacious prose. The pairing works because the contrast is extreme, not because the families differ.

Note: Inter appears on the reflex-reject list for new design decisions. It is the committed brand font of this site; identity-preservation overrides the list.

### Hierarchy
- **Display** (weight 600, `clamp(56px, 8.5vw, 120px)`, line-height 0.95, letter-spacing -0.035em): Hero name only. Compressed and massive; the largest element on any page.
- **Headline** (weight 600, `clamp(28px, 4vw, 48px)`, line-height 1.15, letter-spacing -0.03em): Post page titles. `text-wrap: balance` applied.
- **Title** (weight 600, `clamp(17px, 1.6vw, 21px)`, line-height 1.2, letter-spacing -0.02em): Project card names, section subheadings.
- **Body Large** (weight 300, `clamp(22px, 2.3vw, 32px)`, line-height 1.5, letter-spacing -0.015em): Intro panel prose. Maximum 46ch wide. `text-wrap: pretty` applied.
- **Body** (weight 400, 14px, line-height 1.6): Card descriptions, project problem/solution copy, post body paragraphs.
- **Label** (weight 500, 12px, uppercase, letter-spacing 0.18em): Section labels exclusively (with the red skewed-bar prefix). Prohibited in card bodies, tooltips, or descriptions.

### Named Rules

**The Weight-Contrast Rule.** Hierarchy comes from weight, not size alone. Weight 600 paired with weight 300 creates more contrast than mismatched families at smaller differences. Do not introduce a second typeface to solve a hierarchy problem weight can fix.

**The One Uppercase Rule.** The `.section-label` motif is the single place uppercase runs as a design element. One per section maximum. Cards, tooltips, and descriptions are never uppercase.

## 4. Elevation: Glass-First, Shadow-Atmospheric

The system is glass-first. Depth is expressed through backdrop-filter blur (22px, saturate 165%) rather than shadow height. Glass surfaces sit one visual level above the drifting gradient field, which moves beneath them and is visible through the material.

Shadows exist but are atmospheric — large-radius, diffuse, dark — not structural. They create depth without implying layers. Cards lift 2px on hover (`transform: translateY(-2px)`) and simultaneously gain a subtle red border glow. This is the only elevation motion in the system.

### Shadow Vocabulary
- **Glass ambient** (`inset 0 1px 0 rgba(255,255,255,0.22), inset 0 0 0 1px rgba(255,255,255,0.02), inset 0 -14px 30px rgba(0,0,0,0.22), 0 18px 40px rgba(0,0,0,0.45)`): Applied to all `.glass` surfaces. Simulates refracted light from above and depth below. This is part of the material, not a drop-shadow.
- **Card hover glow** (`0 0 18px rgba(226,56,56,0.18)`): Accent chip hover only. Atmospheric red bleed.
- **Timeline spine** (`box-shadow: 0 0 8px rgba(226,56,56,0.45)`): The 2px red vertical line. Low-diffusion focus point.
- **Ongoing dot** (`0 0 10px #e8a045, 0 0 22px rgba(232,160,69,0.45)` + sonar-ping animation): Amber pulse on the active timeline node only.

### Named Rules

**The Glass-Not-Shadow Rule.** When a new elevated surface needs depth, blur first — shadow second. A drop-shadow without a corresponding glass surface is an orphaned cue. The blur IS the elevation.

**The State-Response Rule.** Surfaces are visually flat at rest. Shadows, glows, and border highlights appear only in response to state (hover, active, ongoing). A resting card and a hovered card are materially distinct.

## 5. Components

### Glass Card

The primary container. Not a card with a border — a surface with material properties. Backdrop-filter blur (22px) and saturation (165%) make the drifting gradient field visible through the glass. A hairline border (`rgba(255,255,255,0.10)`) defines the edge; a top-edge highlight (`inset 0 1px 0 rgba(255,255,255,0.22)`) simulates refracted top-surface light. A cursor-tracked radial spotlight (optional) follows the pointer at ~13% white opacity.

- **Corner style:** 18px standard (`.proj-card`), 28px large (`.intro-panel`), 16px small (`.corner-card`) — curved, never sharp
- **Background:** `rgba(255,255,255,0.045)` — nearly transparent; the glass is the blur, not the tint
- **Hover:** `border-color` → `rgba(226,56,56,0.45)`, `transform: translateY(-2px)`, transition `0.35s cubic-bezier(0.16, 1, 0.3, 1)`
- **Internal padding:** 22px 24px (standard), 56px 64px (intro-panel), 14px 18px (small cards)
- **Use the `.glass` class.** Never recreate glassmorphism inline.

### Navigation Pill

A glass pill that expands horizontally on click to reveal nav links. The icon (three dots, Ember Red) rotates 30° and scales to 0.9 on open. Links blur-in from left with staggered 78ms delays per item. Scrolled state darkens the pill to `rgba(12,12,12,0.84)`.

- **Shape:** `border-radius: 999px`
- **Closed:** glass surface, dots icon only, no links visible
- **Open:** links blur-in with per-item stagger; pill stays the same height
- **Nav items:** 14px, weight 400, `#a3a3a3` default; hover → `#e23838` with `rgba(226,56,56,0.10)` background

### Inline Brand Chip

A glass pill for inline employer or brand references in prose (used in the hero tagline for CNRL). Sits mid-line via `transform: translateY(-2px)`. Contains a white logo container and bold company name text.

- **Shape:** `border-radius: 999px`
- **Background:** `rgba(255,255,255,0.07)` with `backdrop-filter: blur(14px) saturate(160%)`
- **Logo container:** 27px × 18px, `border-radius: 5px`, white background — keeps brand logos legible on the dark glass field
- **Hover:** border → `rgba(226,56,56,0.50)`, shadow gains Ember Red tint

### Section Label

The system's section-heading motif. The only place the label typography role and Ember Red appear together as a design element. A 26px × 2px red bar, skewed -24°, with a red glow — then the label text.

- **Color:** Ember Red (#e23838) on both bar and text
- **Bar:** width 26px, height 2px, `transform: skewX(-24deg)`, `box-shadow: 0 0 6px rgba(226,56,56,0.6)`
- **Usage:** One per section, at the section opening. Not one per card.

### Filter Chips (Eric's Corner)

Two-state pill buttons for category filtering. Inactive is a bordered ghost; active fills with Ember Red.

- **Inactive:** transparent background, `#a3a3a3` text, glass hairline border; hover shifts border toward red, text toward bone-white
- **Active:** `background: rgb(226,56,56)`, `color: #fff`, red border; hover fades to 0.88 opacity
- **Shape:** `border-radius: 999px`, padding 7px 18px, 13px font-size, weight 500
- **Transition:** `color 0.18s ease, border-color 0.18s ease`

### Flip Card (Timeline)

Timeline entries use CSS 3D flip cards — front face shows company logo (white container), role, and date; back face shows description at 13px, `#a3a3a3`. A cursor-tracked white spotlight overlay (radial gradient, ~13% opacity) follows the pointer.

- **Dimensions:** max-width 420px, height 200px (fixed), `border-radius: 18px`
- **Flip:** CSS perspective + `rotateY(180deg)` on hover, `0.6s cubic-bezier(0.16, 1, 0.3, 1)`
- **Logo container:** 44px × 44px (72px wide for landscape logos), white background, `border-radius: 8px`
- **Reduced motion:** flip is instant (no easing); spotlight disabled

## 6. Do's and Don'ts

### Do:
- **Do** use the `.glass` class for all elevated surfaces. The class carries backdrop-filter, border, inset shadows, and the top-edge highlight as a calibrated unit.
- **Do** use `cubic-bezier(0.16, 1, 0.3, 1)` for all transitions and animations. This is the system's single easing curve — do not introduce ease-in-out, linear, or spring easing.
- **Do** use `clamp()` for all display, headline, title, and body-large text sizes. Fixed pixel values are prohibited for fluid-scale roles.
- **Do** honor `prefers-reduced-motion: reduce`. Every animation must have a reduced-motion override: instant or crossfade. Follow the pattern in `globals.css`.
- **Do** limit Ember Red to 15% or less of any screen's visual surface. Use it for labels, highlights, active states, and the structural motif — not as a fill color for large surfaces.
- **Do** apply `text-wrap: balance` to all heading elements and `text-wrap: pretty` to multi-line body prose.
- **Do** animate `transform` and `opacity` only. `backdrop-filter` and `border-color` are permitted exceptions for glass state transitions.

### Don't:
- **Don't** ship the generic dev portfolio scaffold: avatar hero, skills-progress-bar grid, flat card timeline, three identical project tiles. The site has explicitly rejected this template as its primary anti-reference.
- **Don't** design toward an agency-polished, over-formal aesthetic. The site should feel like Eric built it.
- **Don't** use gradient text (`background-clip: text`). Emphasis is through weight or size, not color gradients.
- **Don't** use Hearth Amber (#e8a045) as a text color, button accent, or functional indicator. It is reserved for ember particles and the ongoing-state sonar ping.
- **Don't** put the `.section-label` motif on every card, tooltip, or inline content block. One per section, at the section opening.
- **Don't** add a skills section, progress bars for abilities, or hero metric statistics. These were explicitly ruled out in PRODUCT.md.
- **Don't** recreate glassmorphism inline. The `.glass` class values are calibrated together — a manually written `backdrop-filter` will diverge from the material system.
- **Don't** introduce a second typeface. The system is Inter-only; weight contrast is the hierarchy. A second family breaks the compression.
- **Don't** animate layout properties (width, height, padding). Transitions are `transform` and `opacity` only, with `backdrop-filter` and `border-color` as permitted glass exceptions.
- **Don't** place `position: absolute` dropdowns inside an `overflow: hidden` parent — they will be clipped. New overlays must use `position: fixed` or the popover API to escape the stacking context.
- **Don't** use Hearth Amber on interactive elements to signal urgency or importance — that is Ember Red's role. Amber has no interactive meaning in this system.
