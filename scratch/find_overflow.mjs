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

  const overflows = await page.evaluate(() => {
    const viewportWidth = 375;
    const elements = document.querySelectorAll('*');
    const results = [];
    
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      
      // We look for elements that have a layout width > 375
      if (rect.width > viewportWidth) {
        // Find if this is a leaf element or container
        results.push({
          tagName: el.tagName,
          id: el.id,
          className: el.className,
          width: rect.width,
          height: rect.height,
          x: rect.x,
          styles: {
            display: style.display,
            position: style.position,
            width: style.width,
            maxWidth: style.maxWidth,
            overflow: style.overflow
          },
          outerHTMLSnippet: el.outerHTML.slice(0, 150) + '...'
        });
      }
    });
    
    return results;
  });

  console.log(`Found ${overflows.length} elements wider than 375px.`);
  fs.writeFileSync('scratch/overflow_results.txt', JSON.stringify(overflows, null, 2));

  await browser.close();
}

run().catch(err => {
  console.error(err);
  fs.writeFileSync('scratch/overflow_results.txt', err.toString());
});
