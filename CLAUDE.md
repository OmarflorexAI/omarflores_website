# CLAUDE.md

Personal portfolio site for Omar Taveras — AI automation expert. Single `index.html`, Tailwind CSS CDN, vanilla JS. Dark mode. Design reference: eriktaveras.com

## Workflow

When the user provides a reference image (screenshot) and optionally some CSS classes or style notes:

1. **Generate** a single `index.html` file using Tailwind CSS (via CDN). Include all content inline — no external files unless requested.
2. **Screenshot** the rendered page using Puppeteer (`npx puppeteer screenshot index.html --fullpage` or equivalent). If the page has distinct sections, capture those individually too.
3. **Compare** your screenshot against the reference image. Check for mismatches in:
   - Spacing and padding (measure in px)
   - Font sizes, weights, and line heights
   - Colors (exact hex values)
   - Alignment and positioning
   - Border radii, shadows, and effects
   - Responsive behavior
   - Image/icon sizing and placement
4. **Fix** every mismatch found. Edit the HTML/Tailwind code.
5. **Re-screenshot** and compare again.
6. **Repeat** steps 3–5 until the result is within ~2–3px of the reference everywhere.

Do NOT stop after one pass. Always do at least 2 comparison rounds. Only stop when the user says so or when no visible differences remain.

## Technical Defaults

- Use Tailwind CSS via CDN (`<script src="https://cdn.tailwindcss.com"></script>`)
- Use placeholder images from `https://placehold.co/` when source images aren't provided
- Mobile-first responsive design
- Single `index.html` file unless the user requests otherwise

## Rules

- Do not add features, sections, or content not present in the reference image
- Match the reference exactly — do not "improve" the design
- If the user provides CSS classes or style tokens, use them verbatim
- Keep code clean but don't over-abstract — inline Tailwind classes are fine
- When comparing screenshots, be specific about what's wrong (e.g., "heading is 32px but reference shows ~24px", "gap between cards is 16px but should be 24px")
- Ask me clarifying questions until you are 95% confident you can complete this task without making assumptions.

## Commands

```bash
node screenshot.js    # Puppeteer: mobile (423px) + desktop (1440px) full-page captures
npm install           # Puppeteer only
start index.html      # Open in browser (Windows)
```

## Architecture

- `index.html` — Entire site: Tailwind CDN + `<style>` + `<script>` at bottom
- `screenshot.js` — Puppeteer with `revealAll()` helper for static screenshots
- `brand_assets/` — Logo and images

For screenshot workflow details, see `.claude/rules/screenshot-workflow.md`
For Puppeteer internals (`revealAll()`, viewports, path encoding), see `.claude/rules/puppeteer-screenshots.md`

## Tailwind Tokens

```js
colors: { brand: {
  'obsidian': '#0A0D0B',     // Background
  'emerald': '#1B4332',      // Primary accent
  'soft-gold': '#D4AF37',    // Secondary accent (sparingly)
  'alabaster': '#F9F9F7',    // Text on dark
  'muted-slate': '#4A4A4A'   // Secondary text
}}
```

Cards: `bg-neutral-900` / borders: `border-neutral-800` / hover: `border-neutral-700`

For full design system and component patterns, see `.claude/rules/design-fidelity.md`
For font choices and brand voice, see `.claude/rules/brand-identity.md`

## Sections (in order)

Navbar → Hero (with status badge + stats) → Philosophy → Services (4 cards) → Projects (4 case studies) → Community → Contact CTA → Footer

For section content details, see `.claude/rules/brand-identity.md`

## Critical Rules

- **NEVER** use em dashes in copy. Commas, periods, or new sentences instead
- **NEVER** use semicolons in visible copy
- Contractions always. Vary sentence length. Incomplete sentences when they hit.
- Banned words: leverage, showcase, utilize, facilitate, streamline, optimize, delve, navigate, landscape, robust, seamless, comprehensive, cutting-edge, revolutionary, game-changer, transform, elevate, empower, foster, harness, spearhead, synergy, paradigm, holistic, innovative, dynamic, strategize, amplify, bolster
- Banned phrases: "in today's [anything]", "it's no secret that", "in the world of", "when it comes to", "at the end of the day", "needless to say"
- **NEVER** use Inter, Roboto, or Arial. Use Outfit/DM Sans/JetBrains Mono
- Placeholder images: `placehold.co` with brand colors
- Mobile-first always (423px → up)
- Chrome for testing. Brave has WebSocket conflicts
- This is Omar's PERSONAL site, not Romanalabs
- Screenshot QA: YOU MUST do 2+ comparison rounds per section

## Progressive Disclosure

Detailed rules loaded on demand from `.claude/rules/`:

| File | What it covers |
|---|---|
| `screenshot-workflow.md` | Generate → screenshot → compare → fix → repeat loop |
| `technical-defaults.md` | Tailwind CDN, single-file arch, spacing, grid, cards |
| `design-fidelity.md` | eriktaveras.com reference patterns, component HTML |
| `puppeteer-screenshots.md` | `revealAll()`, viewports, CSS animation classes, path encoding |
| `brand-identity.md` | Tokens, fonts, voice, external links, section content |
