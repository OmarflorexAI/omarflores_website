const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const label = process.argv[2] || 'before';
const base = process.env.BASE || ('file://' + path.resolve(__dirname).split(path.sep).join('/') + '/');
const pages = ['index.html', 'privacy.html', 'terms.html', '404.html'];
const widths = [1440, 390];
fs.mkdirSync(label, { recursive: true });
(async () => {
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const page of pages) {
    for (const w of widths) {
      const p = await b.newPage();
      await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await p.setViewport({ width: w, height: 900, deviceScaleFactor: 1 });
      await p.goto(base + page, { waitUntil: 'networkidle0' });
      await p.evaluate(() => document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(e => e.classList.add('visible')));
      await new Promise(r => setTimeout(r, 900));
      const name = page.replace('.html', '');
      await p.screenshot({ path: `${label}/${name}-${w}.png`, fullPage: true });
      await p.close();
    }
  }
  await b.close();
  console.log(label, 'captured via', base);
})();
