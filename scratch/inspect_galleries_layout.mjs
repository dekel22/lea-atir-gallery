import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating to http://localhost:5173/galleries');
  await page.goto('http://localhost:5173/galleries', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 3000));

  const data = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll('.gallery-card-image-container img'));
    return images.map((img, i) => {
      return {
        index: i + 1,
        src: img.src,
        complete: img.complete,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        offsetWidth: img.offsetWidth,
        offsetHeight: img.offsetHeight
      };
    });
  });

  console.log('Image load inspection complete.');
  fs.writeFileSync('scratch/layout_results.txt', JSON.stringify(data, null, 2));

  await browser.close();
}

run().catch(err => {
  console.error(err);
  fs.writeFileSync('scratch/layout_results.txt', err.toString());
});
