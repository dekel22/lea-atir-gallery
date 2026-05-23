import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { galleries } from '../src/data/galleries.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsPath = path.join(__dirname, '..', 'src', 'data', 'galleries.js');

const broshGallery = galleries.find(g => g.id === 'brosh');
if (broshGallery) {
  broshGallery.images.forEach(img => {
    img.caption = 'גודל: 100x70 ס"מ | טכניקה: גרפית עם צבעי שמן';
  });
}

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(galleries, null, 2) + ';\n';
fs.writeFileSync(jsPath, newContent, 'utf8');
console.log('Successfully added captions to brosh gallery in galleries.js.');
