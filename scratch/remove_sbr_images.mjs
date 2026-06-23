import fs from 'fs';

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

// Target block for שבר8
const sbr8Block = `      {
        "id": "gallery_3_13",
        "url": "/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/2026- ש.ב.ר רמות מנשה גלריה לאומנות/שבר8 שבר האומנות שלי.jpg",
        "alt": "שבר8 שבר האומנות שלי",
        "orientation": "portrait",
        "caption": "120x90 ס\\"מ | טכניקה: צבעי שמן",
        "captionEn": "120x90 cm | Technique: Oil paints"
      },`;

// Target block for שבר1
const sbr1Block = `      {
        "id": "gallery_3_1",
        "url": "/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/2026- ש.ב.ר רמות מנשה גלריה לאומנות/שבר1.jpg",
        "alt": "שבר1",
        "orientation": "portrait"
      },`;

let updated = false;

if (content.includes(sbr8Block)) {
  content = content.replace(sbr8Block, '');
  console.log('Removed שבר8 block successfully.');
  updated = true;
} else {
  console.warn('Could not find שבר8 block.');
}

if (content.includes(sbr1Block)) {
  content = content.replace(sbr1Block, '');
  console.log('Removed שבר1 block successfully.');
  updated = true;
} else {
  console.warn('Could not find שבר1 block.');
}

if (updated) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Saved updated galleries.js.');
} else {
  console.log('No updates made.');
}
