const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const URL = 'file:///c:/Users/admin/Projects/Omarflores_website/index.html';
const SHOTS_DIR = path.join(__dirname, 'screenshots');

// Ensure screenshots/ folder exists
if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR);

async function revealAll(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.reveal, .reveal-fade, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .fade-up, .fade-in').forEach(el => {
      el.classList.add('visible');
    });
    document.querySelectorAll('.process-group').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
    document.querySelectorAll('.count-up').forEach(el => {
      const target = el.getAttribute('data-target');
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      if (target) el.textContent = prefix + target + suffix;
    });
  });
  await new Promise(r => setTimeout(r, 800));
}

async function screenshot() {
  const browser = await puppeteer.launch({ headless: 'new' });

  const viewports = [
    { name: 'mobile',  width: 423,  height: 900 },
    { name: 'desktop', width: 1440, height: 900 },
  ];

  for (const vp of viewports) {
    const page = await browser.newPage();
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto(URL, { waitUntil: 'networkidle0' });
    await revealAll(page);

    const outPath = path.join(SHOTS_DIR, `screenshot-${vp.name}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`✓ ${vp.name} → ${outPath}`);

    // Section clips (desktop only)
    if (vp.name === 'desktop') {
      const clips = [
        { name: 'nav',       y: 0,    h: 90  },
        { name: 'hero',      y: 0,    h: 900 },
        { name: 'services',  y: 950,  h: 650 },
        { name: 'projects',  y: 1600, h: 750 },
        { name: 'community', y: 3400, h: 700 },
        { name: 'contact',   y: 4200, h: 600 },
        { name: 'footer',    y: 4750, h: 400 },
      ];
      for (const c of clips) {
        const p = path.join(SHOTS_DIR, `shot-${c.name}.png`);
        await page.screenshot({ path: p, clip: { x: 0, y: c.y, width: vp.width, height: c.h } });
        console.log(`  ✓ screenshots/shot-${c.name}.png`);
      }
    }

    await page.close();
  }

  await browser.close();
  console.log('Done.');
}

screenshot().catch(err => {
  console.error(err);
  process.exit(1);
});
