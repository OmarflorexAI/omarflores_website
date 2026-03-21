# Technical Defaults

- Single `index.html` file. No framework, no build step
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Tailwind config inline in a `<script>` block with brand color tokens
- Custom CSS in a single `<style>` block
- All JS in a single `<script>` block at the bottom of `<body>`
- Google Fonts via `<link>` tags in `<head>`
- Placeholder images: `placehold.co` with brand colors (e.g. `https://placehold.co/600x400/0A0D0B/1B4332?text=Label`)
- Mobile-first responsive design. Design for 423px, scale up
- Max content width: `max-w-7xl mx-auto px-6`
- Section padding: `py-24 md:py-32`
- Card styling: `bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 hover:border-brand-emerald/50 transition-colors duration-300`
- Grid pattern: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
- Only dependency: puppeteer (for screenshots). No other npm packages.
