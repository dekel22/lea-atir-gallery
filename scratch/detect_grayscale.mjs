import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { galleries } from '../src/data/galleries.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getJpegComponents(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    if (buffer[0] === 0xFF && buffer[1] === 0xD8) { // JPEG
      let pos = 2;
      while (pos < buffer.length) {
        if (buffer[pos] !== 0xFF) return null;
        const marker = buffer[pos + 1];
        // SOF0 - SOF3, SOF5 - SOF7, SOF9 - SOF11, SOF13 - SOF15
        if ((marker >= 0xC0 && marker <= 0xC3) || (marker >= 0xC5 && marker <= 0xC7) || 
            (marker >= 0xC9 && marker <= 0xCB) || (marker >= 0xCD && marker <= 0xCF)) {
          return buffer[pos + 9]; // Number of components
        }
        pos += 2 + buffer.readUInt16BE(pos + 2);
      }
    }
  } catch (e) {
    console.error('Error reading file:', filePath, e.message);
  }
  return null;
}

const broshGallery = galleries.find(g => g.id === 'brosh');
if (broshGallery) {
  const results = [];
  broshGallery.images.forEach(img => {
    const fullPath = path.join(__dirname, '..', 'public', img.url);
    const components = getJpegComponents(fullPath);
    results.push({
      id: img.id,
      url: img.url,
      components: components
    });
  });
  console.log(JSON.stringify(results, null, 2));
}
