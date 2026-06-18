/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './privacy.html', './terms.html', './404.html'],
  theme: {
    extend: {
      colors: {
        dark:        '#050505',
        accent:      '#D4AF37',
        surface:     '#0f0f0f',
        'surface-h': '#161616',
        secondary:   '#B0B7C3',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        sans:  ['DM Sans', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.07)',
      },
    },
  },
};
