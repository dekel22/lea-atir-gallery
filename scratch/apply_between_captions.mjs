import fs from 'fs';
import path from 'path';

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf-8');

// Find the between-between gallery block
const galleryStartIndex = content.indexOf('"id": "between-between"');
if (galleryStartIndex === -1) {
  console.error("Gallery between-between not found!");
  process.exit(1);
}

const imagesStartIndex = content.indexOf('"images": [', galleryStartIndex);
const imagesEndIndex = content.indexOf(']', imagesStartIndex) + 1;

let imagesBlock = content.substring(imagesStartIndex, imagesEndIndex);
const parsed = JSON.parse('{' + imagesBlock + '}');

// List of grayscale sketch files
const grayscaleFiles = [
  "בין לבין11.jpg",
  "בין לבין15.jpg",
  "בין לבין2.jpg",
  "בין לבין7.jpg",
  "ביןלבין25.jpg",
  "בין לבין32.jpg",
  "בין לבין27.jpg"
].map(f => f.toLowerCase());

parsed.images.forEach(img => {
  const filename = decodeURIComponent(path.basename(img.url)).toLowerCase();
  
  if (grayscaleFiles.includes(filename)) {
    img.caption = "30x40 ס\"מ | טכניקה: עיפרון רך";
    console.log(`Sketch (Grayscale): ${filename} -> ${img.caption}`);
  } else {
    img.caption = "100x70 ס\"מ | טכניקה: צבעי שמן עם גירים שמנים";
    console.log(`Color: ${filename} -> ${img.caption}`);
  }
});

// Re-serialize with proper formatting
const newImagesBlock = JSON.stringify(parsed.images, null, 8);
const indentedBlock = `"images": ` + newImagesBlock.trim().replace(/\n/g, '\n  ');

const newContent = content.substring(0, imagesStartIndex) + indentedBlock + content.substring(imagesEndIndex);
fs.writeFileSync(filePath, newContent, 'utf-8');

console.log("Updated galleries.js with between-between captions!");
