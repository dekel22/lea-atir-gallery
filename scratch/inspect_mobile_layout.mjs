import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 375, height: 812, isMobile: true });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  const data = await page.evaluate(() => {
    const el = document.querySelector('.lg\\:col-span-8 .artist-portrait-container');
    if (!el) {
      return { found: false };
    }

    const path = [];
    let current = el;
    while (current) {
      const style = window.getComputedStyle(current);
      const rect = current.getBoundingClientRect();
      path.push({
        tagName: current.tagName,
        className: current.className,
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        },
        styles: {
          display: style.display,
          width: style.width,
          height: style.height,
          position: style.position,
          overflow: style.overflow,
          margin: style.margin,
          padding: style.padding
        }
      });
      current = current.parentElement;
    }
    return { found: true, path };
  });

  fs.writeFileSync('scratch/layout_results.txt', JSON.stringify(data, null, 2));
  await browser.close();
}

run().catch(err => {
  fs.writeFileSync('scratch/layout_results.txt', err.toString());
});
