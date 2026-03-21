# Progress Checkpoint
> Last updated: 2026-03-20 by context-checkpoint
> Context usage at time of checkpoint: ~75%

## Project Overview

Personal portfolio site for **Omar Flores** — AI automation expert. Single `index.html` at `c:\Users\admin\Projects\Omarflores_website\index.html`. Tailwind CSS CDN, vanilla JS, Alpine.js, dark mode. Brand accent: gold `#D4AF37`. Design reference: eriktaveras.com.

---

## What Has Been Accomplished

### From session 1 (previous checkpoint)
1. **Full site built** — `index.html` with all sections: Navbar → Hero → Stats Ticker → Philosophy → Capabilities → Case Studies → Community → Contact CTA → Footer
2. **Brand colors applied** — Tailwind `accent: '#D4AF37'` (gold), replaced all lime/green `#CCFF00` instances site-wide
3. **Fonts** — DM Sans (body), Instrument Serif (headings), JetBrains Mono (mono/labels). Never Inter/Roboto/Arial.
4. **Scroll reveal** — Bidirectional IntersectionObserver. `opacity 0` → `opacity 1`. NO `will-change` on `.reveal` elements (was root cause of blurriness). `.visible { opacity:1!important; transform:none!important; }`.
5. **Font smoothing** — `-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`, `text-rendering: optimizeLegibility` on body.
6. **Newsletter webhook** — Form POSTs JSON `{ email, source: 'omar-flores-website', timestamp }` to `https://hook.us2.make.com/o2dkg4r2t7hs7qnenxbkv8iyrept62ar`. Verified working.
7. **Screenshot workflow** — `screenshot.js` saves mobile (423px) + desktop (1440px) full-page + 7 section clips to `screenshots/`.
8. **Service card animation** — smooth `cubic-bezier(0.22,1,0.36,1)`, `backface-visibility:hidden`, unified 0.45s timing.
9. **Buttons** — Shimmer (`.shimmer-btn`) for navbar + hero; Rainbow (`.rainbow-btn`) for contact CTA. Liquid Metal dependency fully removed.
10. **Social URLs** — Instagram: `omarfloresx`, LinkedIn: `omarrflores` (double-r), Twitter: `omarflowers_`, GitHub: `OmarflorexAI`.

### From session 2 (this session)

11. **Nav bar tabs color** — Changed `.nav-link` selector to `a.nav-link` with `color: #6B7280 !important` and `hover: #ffffff !important` to beat Tailwind cascade. Work and About tabs are now gray → white on hover.

12. **Logo hover fixed** — Previously the entire logo group turned gold on hover. Fixed:
    - Removed CSS rule `.logo-group:hover .logo-name { color: #D4AF37 }`
    - Removed `logo-group` class from the `<a>` tag
    - "Omar Flores" text (`<span>`) no longer changes color — stays white always
    - Only the `OF` icon box turns gold (`group-hover:bg-accent`) on hover
    - "AI Automation" text changed to **"AI Systems"**

13. **Capabilities section cards — animation and shadow fixed**:
    - Removed conflicting Tailwind `transition-colors hover:bg-surface-h` classes from card HTML (was causing glitch by double-transitioning background)
    - Card now managed purely by `.service-grid > div` CSS
    - Default: `box-shadow: none; transform: translateZ(0)` — clean GPU baseline
    - Hover: `transform: translateY(-4px) translateZ(0)` — subtle lift
    - Shadow: `inset 0 0 60px rgba(212,175,55,0.03), inset 0 1px 0 rgba(255,255,255,0.06)` — subtle inner gold glow + top highlight ONLY. No external dark shadow (invisible on dark bg).
    - Gold top border: `border-top-color: rgba(212,175,55,0.6)`
    - Background shifts: `#0f0f0f` → `#161616`
    - Key lesson: dark `box-shadow` values like `rgba(0,0,0,0.7)` are INVISIBLE on a `#050505` near-black background. Don't use external dark shadows on this site.

14. **Case study cards — fully rebuilt**:
    - New CSS class `.case-card` (replaces inline border + flex styles)
    - Added numbered index `01`–`04` top-left of each card's image area
    - Gold accent line (`card-accent-line`) slides in from left on hover using `scaleX(0) → scaleX(1)` transform
    - Number `card-num` fades from `rgba(255,255,255,0.18)` → `rgba(212,175,55,0.6)` on hover
    - Separator `border-t` between description and tech pills
    - Image area: `background:#111`, subtle diagonal gold tint, gradient overlay
    - Hover: `translateY(-6px)` lift + layered dark shadow:
      ```
      0 2px 4px rgba(0,0,0,1),
      0 6px 12px rgba(0,0,0,0.95),
      0 16px 32px rgba(0,0,0,0.85),
      0 32px 64px rgba(0,0,0,0.6)
      ```
      (Layered near→far shadows create 3D depth/pressing effect)
    - Border on hover: `rgba(255,255,255,0.12)` (subtle white, not gold)
    - `group` class on `<article>` for Tailwind `group-hover:` utilities on children

15. **Footer "Romanalabs ↗" hover fixed** — Changed from opacity trick (`opacity-60 hover:opacity-100`) to clean color transition: `text-secondary hover:text-white transition-colors`. The opacity fade was appearing glitchy.

16. **Footer nav links fixed** — Added new CSS class `.footer-nav-link` with `color: #6B7280 !important; hover: #ffffff !important`. All four footer links (Work, Services, Community, Contact) now explicitly gray → white, beating the Tailwind cascade.

---

## Current State

- `index.html` — ~1600+ lines, fully functional. All sections intact.
- No build system. No external files. Everything inline.
- `.button-wrap` CSS (~260 lines) still present as dead code (no `.button-wrap` elements in HTML). Not breaking anything.

**CSS class inventory for key components:**
| Class | Purpose |
|---|---|
| `.nav-link` | Navbar desktop links (Work, About) — gray → white hover |
| `.footer-nav-link` | Footer nav links — gray → white hover |
| `.service-grid` | 4-col grid for Capabilities cards |
| `.service-grid > div` | Individual capability card — lift + gold top border on hover |
| `.case-card` | Case study card — lift + dark shadow on hover |
| `.case-card .card-accent-line` | Gold slide-in line on hover |
| `.case-card .card-num` | Project number (01–04) |
| `.shimmer-btn` | Navbar + Hero buttons |
| `.rainbow-btn` | Contact CTA "Email Me" button |

**Active button inventory:**
| Location | Style | Label | Link |
|---|---|---|---|
| Navbar desktop | `.shimmer-btn` | Work With Me | romanalabs.com |
| Hero CTA | `.shimmer-btn` | Watch on YouTube | youtube.com/@OmarFloresx |
| Contact CTA | `.rainbow-btn` | Email Me | mailto:omar@romanalabs.com |

---

## Known Issues / Minor Remaining Items

1. **`.button-wrap` dead CSS** — ~260 lines of glass button CSS (lines ~208–477) plus `@property --angle-1/2` are unused. Harmless but could be cleaned up.
2. **External dark shadows are invisible** — The site background is `#050505`. Any `box-shadow` using `rgba(0,0,0,x)` will be invisible. Use inset glows, border highlights, or the layered case-card approach (stacking multiple black shadows at different radii) to create depth.

---

## What Comes Next

_No active task queued. Wait for user instructions._

Potential follow-ups:
1. Any further section/design refinements
2. Clean up dead `.button-wrap` CSS if user wants leaner file
3. Deployment or further QA rounds

---

## Active Decisions & Context

- **Single `index.html` only** — no build system, no external files. Everything inline.
- **Brand palette**: `#D4AF37` (gold) for accents. Never lime `#CCFF00`.
- **No `will-change` on `.reveal` elements** — removing this fixed site-wide blurriness. Do NOT add it back.
- **`transform: none`** in `.visible` class (not `translateY(0)`) — matters for GPU compositing sharpness.
- **Dark shadows on dark bg** — `rgba(0,0,0,x)` shadows are invisible on `#050505`. For capability cards: use inset gold glow. For case study cards: stack multiple pure-black shadows at increasing radii (layered shadow technique).
- **Nav/footer link colors** — Tailwind cascade overrides plain `.nav-link` color. Must use `a.nav-link` selector + `!important` to guarantee gray color.
- **Logo hover** — Only the `OF` box changes color (gold). "Omar Flores" text stays white. "AI Systems" (not "AI Automation") is the subtitle.
- **Shimmer button bg**: `--s-bg:#050505` (NOT `#0A0D0B` — that has a green tint).
- **Screenshot QA rule** — run `node screenshot.js` after changes. CSS animations (shimmer, rainbow, dots drift) are NOT visible in static Puppeteer screenshots — expected.
- **Omar's email**: `omar@romanalabs.com`
- **Omar's YouTube**: `https://www.youtube.com/@OmarFloresx`
- **Omar's Twitter/X**: `@omarflowers_` (note: "flowers" not "flores")
- **Omar's Instagram**: `@omarfloresx`
- **Omar's GitHub**: `https://github.com/OmarflorexAI`
- **Omar's LinkedIn**: `https://linkedin.com/in/omarrflores` (double-r)
- **Romanalabs**: `https://romanalabs.com`
- **Webhook URL**: `https://hook.us2.make.com/o2dkg4r2t7hs7qnenxbkv8iyrept62ar`

---

## Key Files

| File | Description |
|---|---|
| `index.html` | Entire site — ~1600 lines. Tailwind CDN + `<style>` + `<script>` |
| `screenshot.js` | Puppeteer: mobile (423px) + desktop (1440px) full-page + 7 section clips → `screenshots/` |
| `screenshots/` | All PNG output from screenshot.js |
| `brand_assets/` | Logo and image assets |
| `CLAUDE.md` | Project rules, banned words, copy guidelines, architecture notes |
| `.claude/rules/` | Extended rules: screenshot-workflow.md, design-fidelity.md, puppeteer-screenshots.md, brand-identity.md, technical-defaults.md |
| `progress.md` | This file — handoff checkpoint |

---

## How to Resume

1. Read this file (`progress.md`) in full
2. Read `CLAUDE.md` for project rules and banned words
3. Read `index.html` (or relevant section) before making any edits
4. After every change run `node screenshot.js` and check `screenshots/`
5. Brand accent: gold `#D4AF37` — never lime, never green
6. Shimmer buttons: `--s-bg:#050505` (not `#0A0D0B`)
7. Do NOT add `will-change` to `.reveal` elements
8. External dark box-shadows are invisible on `#050505` bg — use inset glows or layered black shadow technique
9. Nav + footer link colors need `!important` to override Tailwind cascade
10. Logo: only `OF` box turns gold on hover; "Omar Flores" text is always white; subtitle is "AI Systems"
