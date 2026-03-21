# Puppeteer Screenshots

## How screenshot.js Works

Two viewports: mobile (423px × 900) and desktop (1440px × 900). Full-page captures.

### revealAll() Helper

IntersectionObserver doesn't fire in static full-page Puppeteer screenshots. The `revealAll()` function forces all animated elements visible before capture:

- Adds `.visible` class to all `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale` elements
- Forces `.process-group` elements to `opacity: 1` and `transform: translateY(0)`
- Sets `.count-up` elements to their final `data-target` values with prefix/suffix
- Waits 800ms after reveal for transitions to settle

### File Paths

Project path: `C:\Users\admin\Projects\omar-personal-site`
Puppeteer URL: `file:///c:/Users/admin/Projects/omar-personal-site/index.html`
Output: `screenshot-mobile.png` and `screenshot-desktop.png` in project root

If directory name has spaces, URL-encode them as `%20` in the `file:///` URL but use literal paths for screenshot output.

### CSS Animation Classes

```css
.reveal, .reveal-left, .reveal-right, .reveal-scale {
  opacity: 0; transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal { transform: translateY(30px); }
.reveal-left { transform: translateX(-30px); }
.reveal-right { transform: translateX(30px); }
.reveal-scale { transform: scale(0.95); }
.visible { opacity: 1; transform: translateY(0) translateX(0) scale(1); }
```
