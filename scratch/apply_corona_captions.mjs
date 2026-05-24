import fs from 'fs';
import path from 'path';

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf-8');

// Find the gallery_6 (דיוקן קורונה) block
const galleryStartIndex = content.indexOf('"id": "gallery_6"');
if (galleryStartIndex === -1) {
  console.error("Gallery gallery_6 not found!");
  process.exit(1);
}

const imagesStartIndex = content.indexOf('"images": [', galleryStartIndex);
const imagesEndIndex = content.indexOf(']', imagesStartIndex) + 1;

let imagesBlock = content.substring(imagesStartIndex, imagesEndIndex);
const parsed = JSON.parse('{' + imagesBlock + '}');

// List of files identified as Watercolor
const watercolorFiles = [
  "דיוקן קורונה23.jpg",
  "דיוקן קורונה25.jpg",
  "דיוקן קורונה26.jpg",
  "דיוקן קורונה28.jpg",
  "דיוקן קורונה29.jpg",
  "דיוקןקורונה19.jpg",
  "דיוקןקוררונה27.jpg",
  "קורונה באקוורל.jpg",
  "קורונה באקוורל2.jpg"
].map(f => f.toLowerCase());

parsed.images.forEach(img => {
  const filename = decodeURIComponent(path.basename(img.url)).toLowerCase();
  
  if (watercolorFiles.includes(filename)) {
    img.caption = "30x42 ס\"מ | טכניקה: אקוורל";
    console.log(`Watercolor: ${filename} -> ${img.caption}`);
  } else {
    img.caption = "30x42 ס\"מ | טכניקה: רישום פחם סינטטי";
    console.log(`Charcoal: ${filename} -> ${img.caption}`);
  }
});

// Re-serialize with proper formatting
const newImagesBlock = JSON.stringify(parsed.images, null, 8);
const indentedBlock = `"images": ` + newImagesBlock.trim().replace(/\n/g, '\n  ');

const newContent = content.substring(0, imagesStartIndex) + indentedBlock + content.substring(imagesEndIndex);
fs.writeFileSync(filePath, newContent, 'utf-8');

console.log("Updated galleries.js with Corona captions!");
