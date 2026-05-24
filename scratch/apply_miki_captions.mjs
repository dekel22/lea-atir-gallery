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

const gallery = galleries.find(g => g.id === 'miki');
if (!gallery) {
  console.error("miki gallery not found in array!");
  process.exit(1);
}

// Map filenames to captions:
gallery.images.forEach(img => {
  const url = img.url;
  if (url.includes('מיקי2.jpg')) {
    img.caption = '100x80 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('מיקי4.jpg')) {
    img.caption = '50x70 ס"מ | טכניקה: אקוורל';
  } else if (url.includes('מיקי5.jpg')) {
    img.caption = '35x45 ס"מ | טכניקה: אקוורל';
  } else if (url.includes('מיקי7.jpg')) {
    img.caption = '90x70 ס"מ | טכניקה: אקוורל';
  } else if (url.includes('מיקי8.jpg')) {
    img.caption = "100x70 ס\"מ | טכניקה: אקריליק | מצע: ג'סו מרוח על נייר";
  } else if (url.includes('מיקי9.jpg')) {
    img.caption = "100x70 ס\"מ | טכניקה: פחמים | מצע: ג'סו על נייר";
  } else if (url.includes('מיקי10.jpg')) {
    img.caption = "100x70 ס\"מ | טכניקה: פחמים | מצע: ג'סו על נייר";
  } else if (url.includes('מיקי12.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: שמן וגרפית';
  } else if (url.includes('מיקי14.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: צבע שמן';
  } else if (url.includes('מיקי15.jpg')) {
    img.caption = '100x70 ס"מ | טכניקה: אקריליק וגרפית';
  } else if (url.includes('מיקי16.jpg')) {
    img.caption = '24x17 ס"מ | טכניקה: אקוורל';
  } else if (url.includes('מיקי17.jpg')) {
    img.caption = '35x45 ס"מ | טכניקה: אקוורל';
  } else if (url.includes('מיקי18.jpg')) {
    img.caption = '24x17 ס"מ | טכניקה: אקוורל';
  } else if (url.includes('מיקי20.jpg')) {
    img.caption = '17x24 ס"מ | טכניקה: אקוורל';
  } else if (url.includes('מיקי22.jpg')) {
    img.caption = '50x70 ס"מ | טכניקה: אקוורל';
  } else if (url.includes('מיקי23.jpg')) {
    img.caption = '50x70 ס"מ | טכניקה: אקוורל';
  } else if (url.includes('מיקי24.jpg')) {
    img.caption = '25x35 ס"מ | טכניקה: אקוורל';
  } else {
    console.warn("Unmatched image url:", url);
  }
});

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(galleries, null, 2) + ';\n';

fs.writeFileSync(targetPath, newContent, 'utf8');
console.log('Successfully updated miki captions in galleries.js.');
