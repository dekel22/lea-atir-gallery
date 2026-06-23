import fs from 'fs';

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');

const target = `      {
        "id": "gallery_3_1",
        "url": "/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/2026- ש.ב.ר רמות מנשה גלריה לאומנות/שבר1.jpg",
        "alt": "שבר1",
        "orientation": "portrait"
      }
    ]`;

const replacement = `      {
        "id": "gallery_3_1",
        "url": "/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/2026- ש.ב.ר רמות מנשה גלריה לאומנות/שבר1.jpg",
        "alt": "שבר1",
        "orientation": "portrait"
      },
      {
        "id": "gallery_3_15",
        "url": "/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/2026- ש.ב.ר רמות מנשה גלריה לאומנות/NAL_2587_A_Small.jpg",
        "alt": "NAL_2587_A_Small",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: אקוורל",
        "captionEn": "30x42 cm | Technique: Watercolor"
      }
    ]`;

if (content.includes(target)) {
  fs.writeFileSync(filePath, content.replace(target, replacement), 'utf8');
  console.log('Successfully updated galleries.js!');
} else {
  console.log('Error: target block not found in galleries.js');
}
