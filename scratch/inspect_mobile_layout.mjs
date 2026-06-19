import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
  });

  const page = await browser.newPage();
  
  // Set viewport to desktop layout
  await page.setViewport({
    width: 1280,
    height: 800,
    isMobile: false
  });

  console.log('Navigating to http://localhost:5173/');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });

  // Wait 3 seconds for React rendering and the 1.5s reveal-anim to finish
  await new Promise(r => setTimeout(r, 3000));

  const data = await page.evaluate(() => {
    function getDetails(element, name) {
      if (!element) {
        return { name, found: false };
      }
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        name,
        found: true,
        parentClassName: element.parentElement ? element.parentElement.className : null,
        parentStyleDisplay: element.parentElement ? window.getComputedStyle(element.parentElement).display : null,
        rect: {
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
        },
        styles: {
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
          clipPath: style.clipPath,
          width: style.width,
          height: style.height,
          maxWidth: style.maxWidth,
          position: style.position,
          overflow: style.overflow,
          animation: style.animation
        }
      };
    }

    const containers = Array.from(document.querySelectorAll('.artist-portrait-container'));
    return containers.map((el, i) => getDetails(el, `Container ${i + 1}`));
  });

  console.log('Desktop layout inspection complete.');
  fs.writeFileSync('scratch/layout_results.txt', JSON.stringify(data, null, 2));

  await browser.close();
}

run().catch(err => {
  console.error(err);
  fs.writeFileSync('scratch/layout_results.txt', err.toString());
});
