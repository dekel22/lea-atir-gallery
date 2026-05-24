import fs from 'fs';
import path from 'path';

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf-8');

// The size map from the user's list
const sizeMap = {
  "אקוורל2": "80x75",
  "באקוורל2": "80x75",
  "אקוורל3": "70x50",
  "באקוורל3": "70x50",
  "אקוורל4": "70x50",
  "אקוורל5": "90x60",
  "באקוורל5": "90x60",
  "אקוורל6": "24x17",
  "באקוורל6": "24x17",
  "אקוורל7": "24x17",
  "באקוורל7": "24x17",
  "אקוורל8": "24x17",
  "אקווקרל8": "24x17",
  "אקוורל9": "50x70",
  "אקאוורל9": "50x70",
  "אקוורל10": "35x25",
  "אקוורל11": "35x25",
  "אקוורל12": "45x35",
  "אקוורל13": "50x70",
  "אקוורל14": "35x25",
  "אקוורל15": "50x70",
  "אקוורל16": "25x35",
  "אקוורל17": "35x25",
  "אקוורל18": "50x35",
  "אקוורל19": "50x70",
  "אקוורל20": "105x70",
  "אקוורל21": "105x70",
  "אקוורל22": "35x45",
  "אקוורל23": "35x45",
  "אקוורל24": "35x25",
  "אקוורל25": "35x25",
  "אקוורל26": "25x35",
  "אקוורל27": "50x70",
  "אקוורל28": "",
  "אקוורל30": "35x45",
  "באקוורל30": "35x45",
  "באקוורל32": "50x70",
  "באקוורל49": "50x70", // Mapping באקוורל32 (50x70) to באקוורל49.jpg
  "באקוורל35": "35x50",
  "באקוורל36": "35x25",
  "באקוורל37": "35x45",
  "באקוורל38": "45x35",
  "באקוורל39": "25x16",
  "אקוורל39": "25x16",
  "נוף באקוורל": "25x35",
  "נוף בכחול וסגול באקוורל": "25x35",
  "נוף כביש אדום": "25x35",
  "נוף מהמרפסת": "35x25",
  "נוף קטן באקוורל": "25x16",
  "סירות בקישון": "35x45"
};

// We will find the gallery_5 block in galleries.js
// Since it's standard JS, let's load it dynamically by evaluating it or parsing it.
// To make it very safe and keep all comments/formatting, we can parse the JSON or search using regex.
// The gallery_5 array starts with "id": "gallery_5" and contains "images": [ ... ]
// Let's locate the images array of gallery_5.

const galleryStartIndex = content.indexOf('"id": "gallery_5"');
if (galleryStartIndex === -1) {
  console.error("gallery_5 not found!");
  process.exit(1);
}

const imagesStartIndex = content.indexOf('"images": [', galleryStartIndex);
const imagesEndIndex = content.indexOf(']', imagesStartIndex) + 1;

let imagesBlock = content.substring(imagesStartIndex, imagesEndIndex);
// Parse the images array block
// To parse it safely, we can wrap it in an object: { "images": [ ... ] }
const parsed = JSON.parse('{' + imagesBlock + '}');

// Modify each image in the array
parsed.images.forEach(img => {
  // Extract filename without path and extension
  const filename = decodeURIComponent(path.basename(img.url, path.extname(img.url)));
  // Normalize filename for key matching (remove spaces, etc.)
  const key = filename.replace(/\s+/g, '');
  
  // Find match in sizeMap
  let size = null;
  // Try direct match, or try removing spaces from sizeMap keys
  for (const k of Object.keys(sizeMap)) {
    if (k.replace(/\s+/g, '') === key) {
      size = sizeMap[k];
      break;
    }
  }

  if (size !== null) {
    if (size === "") {
      img.caption = "טכניקה: אקוורל";
    } else {
      img.caption = `${size} ס"מ | טכניקה: אקוורל`;
    }
    console.log(`Matched: ${filename} -> ${img.caption}`);
  } else {
    // Fallback if not matched
    img.caption = "טכניקה: אקוורל";
    console.warn(`Warning: No size match for ${filename}`);
  }
});

// Re-serialize the images block with beautiful formatting
const newImagesBlock = JSON.stringify(parsed.images, null, 8);
// Indent properly to match the file's style
const indentedBlock = `"images": ` + newImagesBlock.trim().replace(/\n/g, '\n  ');

// Replace in the galleries.js content
const newContent = content.substring(0, imagesStartIndex) + indentedBlock + content.substring(imagesEndIndex);

fs.writeFileSync(filePath, newContent, 'utf-8');
console.log("Updated galleries.js successfully!");
