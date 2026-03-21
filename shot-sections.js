const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  const absPath = path.resolve('index.html').split('\').join('/');
  const url = 'file:///' + absPath;
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    document.querySelectorAll('.fade-up, .fade-in').forEach(el => el.classList.add('visible'));
    document.querySelectorAll('.count-up').forEach(el => {
      el.textContent = el.getAttribute('data-target') + (el.getAttribute('data-suffix') || '');
    });
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'shot-nav.png', clip: { x: 0, y: 0, width: 1440, height: 90 } });
  await page.screenshot({ path: 'shot-services.png', clip: { x: 0, y: 950, width: 1440, height: 650 } });
  await page.screenshot({ path: 'shot-projects.png', clip: { x: 0, y: 1550, width: 1440, height: 700 } });
  await page.screenshot({ path: 'shot-contact.png', clip: { x: 0, y: 2700, width: 1440, height: 600 } });
  await browser.close();
  console.log('done');
})();
