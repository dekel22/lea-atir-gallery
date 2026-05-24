import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetPath = path.resolve(__dirname, '..', 'src', 'data', 'galleries.js');

// Read existing galleries.js content
let content = fs.readFileSync(targetPath, 'utf8');

const arrayStart = content.indexOf('export const galleries =');
if (arrayStart === -1) {
  console.error("export statement not found!");
  process.exit(1);
}

const jsonString = content.substring(arrayStart + 'export const galleries ='.length).trim().replace(/;$/, '');
const galleries = JSON.parse(jsonString);

const gallery = galleries.find(g => g.id === 'scenery-pieces');
if (!gallery) {
  console.error("scenery-pieces gallery not found in array!");
  process.exit(1);
}

// Map filenames to captions:
gallery.images.forEach(img => {
  const url = img.url;
  if (url.includes('פיסות נוף תמונת הסבר.PNG')) {
    img.caption = 'הזמנה לתערוכה';
  } else {
    img.caption = '100x70 ס"מ | טכניקה: צבע שמן ועיפרון גרפית';
  }
});

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(galleries, null, 2) + ';\n';

fs.writeFileSync(targetPath, newContent, 'utf8');
console.log('Successfully updated scenery-pieces captions in galleries.js.');
