import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetPath = path.resolve(__dirname, '..', 'src', 'data', 'galleries.js');

// Read existing galleries.js content
let content = fs.readFileSync(targetPath, 'utf8');

// Parse the galleries data
// Since it is exported as: export const galleries = [...];
// We can locate the gallery_7 block and modify the captions inside the string.

// We will find the gallery_7 block: "id": "gallery_7"
const gallery7Start = content.indexOf('"id": "gallery_7"');
if (gallery7Start === -1) {
  console.error("gallery_7 not found!");
  process.exit(1);
}

// Let's parse and write a clean update using JS parsing/evaluation or regular expressions
// Since galleries.js is ES module, we can read it, parse it as JSON by extracting the array.
// But to preserve formatting and comments (if any), let's parse the file in Node, update the array, and write it back.
// Since the file has format `export const galleries = [...];`, we can extract the JSON part.

const arrayStart = content.indexOf('export const galleries =');
if (arrayStart === -1) {
  console.error("export statement not found!");
  process.exit(1);
}

const jsonString = content.substring(arrayStart + 'export const galleries ='.length).trim().replace(/;$/, '');
const galleries = JSON.parse(jsonString);

const gallery7 = galleries.find(g => g.id === 'gallery_7');
if (!gallery7) {
  console.error("gallery_7 object not found in array!");
  process.exit(1);
}

// Map filenames to captions:
gallery7.images.forEach(img => {
  const url = img.url;
  if (url.includes('מקור.jpeg')) {
    img.caption = '55x75 ס"מ | טכניקה: אקוורל';
  } else if (url.includes('וריאציות על נושא4a.jpg')) {
    img.caption = '140x100 ס"מ | טכניקה: אקריליק ופחמים סינטטיים';
  } else if (url.includes('כמעט שחור לבן5.JPG')) {
    img.caption = '140x100 ס"מ | טכניקה: אקריליק וגירים';
  } else if (url.includes('וריאציות על נושא6a.jpg')) {
    img.caption = '150x100 ס"מ | טכניקה: אקריליק וגירים';
  } else if (url.includes('וריאציות על נושא7.JPG')) {
    img.caption = '150x100 ס"מ | טכניקה: אקריליק וגירים';
  } else if (url.includes('כמעט שחור לבן6.JPG')) {
    img.caption = '150x100 ס"מ | טכניקה: אקריליק וגירים'; // וריאציה על נושא 6
  } else if (url.includes('DSCN9023a.jpg')) {
    img.caption = '140x100 ס"מ | טכניקה: אקריליק וגרפית'; // וריאציות על נושא 2
  } else if (url.includes('‏‏a - עותק.jpg')) {
    img.caption = '150x100 ס"מ | טכניקה: אקריליק וגירים'; // וריאציה על נושא 3
  } else {
    console.warn("Unmatched image url:", url);
  }
});

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(galleries, null, 2) + ';\n';

fs.writeFileSync(targetPath, newContent, 'utf8');
console.log('Successfully updated gallery_7 captions in galleries.js.');
