# Screenshot Workflow

The generate → screenshot → compare → fix → repeat loop. Always do 2+ comparison rounds.

## Loop

1. Make UI changes in `index.html`
2. Run `node screenshot.js` to capture mobile (423px) + desktop (1440px)
3. Review screenshots against design reference or previous version
4. Identify specific pixel-level mismatches and fix them
5. Repeat — minimum 2 rounds before a section is considered done

## Checklist

- Color tokens match design system (greens, golds, neutrals)
- Typography hierarchy: headings bold/large, body readable, monospace labels correct
- Spacing: generous whitespace between sections, cards not cramped
- Dark mode contrast: text readable on dark backgrounds, no muddy grays
- Mobile: single column, nothing overflowing, touch-friendly tap targets (min 44px)
- Animations: `revealAll()` properly forcing all elements visible
- Count-up values showing final numbers in screenshots
