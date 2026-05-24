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

const gallery = galleries.find(g => g.id === 'nude-museum');
if (!gallery) {
  console.error("nude-museum gallery not found in array!");
  process.exit(1);
}

// Map filenames to captions:
gallery.images.forEach(img => {
  const url = img.url;
  if (url.includes('20200915_143827.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: גרפית | מצע: נייר';
  } else if (url.includes('20200915_143901.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: גרפית | מצע: נייר';
  } else if (url.includes('20200915_144616.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: אקריליק';
  } else if (url.includes('20200915_144641.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: אקריליק';
  } else if (url.includes('20200915_145012.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: אקריליק וגרפית';
  } else if (url.includes('20200915_145039.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: אקריליק';
  } else if (url.includes('20200915_145059.jpg')) {
    img.caption = '70x50 ס"מ | טכניקה: אקריליק וגרפית';
  } else if (url.includes('20200915_145211.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: אקריליק';
  } else if (url.includes('20200915_145454.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: אקריליק';
  } else if (url.includes('גבר עירום  על הגב בעיפרון.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: עיפרון גרפית';
  } else if (url.includes('גבר עירום עם רגל על השולחן.jpg')) {
    img.caption = '70x50 ס"מ | טכניקה: עיפרון גרפית';
  } else if (url.includes('מהגב על ניר חום.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: אקריליק וגיר לבן';
  } else if (url.includes('מהצד על ניר חום.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: גירים | מצע: נייר חום';
  } else if (url.includes('מוזיאון8.JPG')) {
    img.caption = '50x70 ס"מ | טכניקה: אקריליק';
  } else if (url.includes('מוזיאון9.JPG')) {
    img.caption = '70x50 ס"מ | טכניקה: אקריליק';
  } else if (url.includes('עירום יושב.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: עיפרון גרפית';
  } else if (url.includes('על הגב טורסו ורגליים בעיפרון.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: עיפרון גרפית';
  } else if (url.includes('על הצד בסגול.jpg')) {
    img.caption = '70x50 ס"מ | טכניקה: אקריליק';
  } else {
    console.warn("Unmatched image url:", url);
  }
});

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(galleries, null, 2) + ';\n';

fs.writeFileSync(targetPath, newContent, 'utf8');
console.log('Successfully updated nude-museum captions in galleries.js.');
