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

const gallery = galleries.find(g => g.id === 'almost-black-and-white');
if (!gallery) {
  console.error("almost-black-and-white gallery not found in array!");
  process.exit(1);
}

// Map filenames to captions:
gallery.images.forEach(img => {
  const url = img.url;
  if (url.includes('כמעט שחור לבן3.JPG')) {
    img.caption = '120x100 ס"מ | טכניקה: פחם סינטטי';
  } else if (url.includes('כמעט שחור לבן5 (2).JPG')) {
    img.caption = '120x100 ס"מ | טכניקה: אקריליק וגירים';
  } else if (url.includes('כמעט שחור לבן6.JPG')) {
    img.caption = '140x100 ס"מ | טכניקה: אקריליק וגירים';
  } else if (url.includes('כמעט שחור לבן7.jpg')) {
    img.caption = '130x100 ס"מ | טכניקה: אקריליק ופחם';
  } else if (url.includes('כמעט שחור לבן8.jpg')) {
    img.caption = '130x100 ס"מ | טכניקה: צבע אקריליק ופחם';
  } else if (url.includes('כמעט שחור לבן10.JPG')) {
    img.caption = '150x100 ס"מ | טכניקה: אקריליק וגירים';
  } else if (url.includes('כמעט שחור לבן11.JPG')) {
    img.caption = '140x100 ס"מ | טכניקה: אקריליק וגירים';
  } else if (url.includes('כמעט שחור לבן12.JPG')) {
    img.caption = '130x100 ס"מ | טכניקה: אקריליק וגירים';
  } else if (url.includes('כמעט שחור לבן13.JPG')) {
    img.caption = '140x100 ס"מ | טכניקה: אקריליק וגירים';
  } else if (url.includes('כמעט שחור לבן14.JPG')) {
    img.caption = '140x100 ס"מ | טכניקה: אקריליק ופחם';
  } else if (url.includes('כמעט שחור לבן15.JPG')) {
    img.caption = '120x100 ס"מ | טכניקה: אקריליק ופחם';
  } else {
    console.warn("Unmatched image url:", url);
  }
});

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(galleries, null, 2) + ';\n';

fs.writeFileSync(targetPath, newContent, 'utf8');
console.log('Successfully updated almost-black-and-white captions in galleries.js.');
