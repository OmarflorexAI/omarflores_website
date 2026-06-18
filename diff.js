const fs = require('fs');
const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const pages = ['index', 'privacy', 'terms', '404'];
const widths = [1440, 390];
let totalDiff = 0;
fs.mkdirSync('diffout', { recursive: true });
for (const p of pages) {
  for (const w of widths) {
    const fa = `before/${p}-${w}.png`, fb = `after/${p}-${w}.png`;
    if (!fs.existsSync(fa) || !fs.existsSync(fb)) { console.log(`SKIP ${p}-${w} (missing)`); continue; }
    const a = PNG.sync.read(fs.readFileSync(fa));
    const b = PNG.sync.read(fs.readFileSync(fb));
    if (a.width !== b.width || a.height !== b.height) {
      console.log(`SIZE DIFF ${p}-${w}: ${a.width}x${a.height} vs ${b.width}x${b.height}`);
      totalDiff += 999999; continue;
    }
    const diff = new PNG({ width: a.width, height: a.height });
    const n = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
    fs.writeFileSync(`diffout/${p}-${w}.png`, PNG.sync.write(diff));
    const pct = (100 * n / (a.width * a.height)).toFixed(4);
    console.log(`${p}-${w}: ${n} px differ (${pct}%)`);
    totalDiff += n;
  }
}
console.log('TOTAL differing pixels:', totalDiff);
