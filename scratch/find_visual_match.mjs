import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

async function run() {
  if (!fs.existsSync(CHROME_PATH)) {
    console.error('Chrome not found at:', CHROME_PATH);
    return;
  }

  const targetPath = 'c:/Users/MY/Downloads/JPEG - Small-20260614T074109Z-3-001/JPEG - Small/NAL_2587_A_Small.jpg';
  if (!fs.existsSync(targetPath)) {
    console.error('Target image not found at:', targetPath);
    return;
  }

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true
  });

  const page = await browser.newPage();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <body>
      <canvas id="canvas" width="16" height="16"></canvas>
      <script>
        window.getHash = function(imgSrc) {
          return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.getElementById('canvas');
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, 16, 16);
              const imgData = ctx.getImageData(0, 0, 16, 16);
              const data = imgData.data;
              let gray = [];
              for (let i = 0; i < data.length; i += 4) {
                const g = Math.round(0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2]);
                gray.push(g);
              }
              let hash = '';
              for (let y = 0; y < 16; y++) {
                for (let x = 0; x < 15; x++) {
                  const left = gray[y * 16 + x];
                  const right = gray[y * 16 + x + 1];
                  hash += left < right ? '1' : '0';
                }
              }
              resolve({ hash, gray });
            };
            img.onerror = () => resolve(null);
            img.src = imgSrc;
          });
        };

        window.compareHashes = function(hash1, hash2) {
          let diff = 0;
          for (let i = 0; i < hash1.length; i++) {
            if (hash1[i] !== hash2[i]) diff++;
          }
          return diff;
        };
      </script>
    </body>
    </html>
  `;

  await page.setContent(htmlContent);

  async function getVisualHash(filePath) {
    const dataUri = `data:image/jpeg;base64,${fs.readFileSync(filePath).toString('base64')}`;
    const result = await page.evaluate(async (uri) => {
      return await window.getHash(uri);
    }, dataUri);
    return result;
  }

  async function getDiff(hash1, hash2) {
    return await page.evaluate((h1, h2) => {
      return window.compareHashes(h1, h2);
    }, hash1, hash2);
  }

  console.log(`Computing visual hash for target: ${targetPath}`);
  const targetHash = await getVisualHash(targetPath);
  if (!targetHash) {
    console.error('Failed to compute visual hash for target image');
    await browser.close();
    return;
  }

  const coronaDir = 'c:/Users/MY/OneDrive/Documents/GitHub/lea-atir-gallery/public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';
  const files = fs.readdirSync(coronaDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg'));

  console.log(`Comparing against ${files.length} images in the Corona gallery directory...`);

  let matches = [];
  for (const file of files) {
    const filePath = path.join(coronaDir, file);
    const hashInfo = await getVisualHash(filePath);
    if (!hashInfo) continue;

    const diff = await getDiff(targetHash.hash, hashInfo.hash);
    matches.push({ file, diff });
  }

  matches.sort((a, b) => a.diff - b.diff);

  console.log('\n--- TOP MATCHES ---');
  matches.slice(0, 10).forEach(m => {
    console.log(`File: ${m.file} | Diff score: ${m.diff} (lower is closer)`);
  });

  await browser.close();
}

run().catch(console.error);
