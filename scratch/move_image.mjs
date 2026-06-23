import fs from 'fs';
import path from 'path';

const galleriesPath = 'src/data/galleries.js';

const oldPath = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה36.jpg';
const newPath = 'public/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/2026- ש.ב.ר רמות מנשה גלריה לאומנות/NAL_2587_A_Small.jpg';

console.log('--- Step 1: Move file on disk ---');
if (fs.existsSync(oldPath)) {
  // Ensure destination directory exists
  const destDir = path.dirname(newPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  // Copy and delete
  fs.copyFileSync(oldPath, newPath);
  fs.unlinkSync(oldPath);
  console.log(`Moved file successfully from: ${oldPath} -> ${newPath}`);
} else {
  console.log(`Warning: Source file not found on disk at: ${oldPath}`);
  // If the file is already moved, we can proceed
}

console.log('\n--- Step 2: Update galleries.js configuration ---');
if (fs.existsSync(galleriesPath)) {
  let content = fs.readFileSync(galleriesPath, 'utf8');

  // Let's remove the block from Corona gallery
  const targetCoronaBlock = `      {
        "id": "gallery_6_32",
        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה36.jpg",
        "alt": "דיוקן קורונה36",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: אקוורל",
        "captionEn": "30x42 cm | Technique: Watercolor"
      }`;

  // We need to handle commas. Let's inspect if the block is followed by a comma, or preceded by a comma.
  // In the file, it is the last item:
  //   },
  //   {
  //     "id": "gallery_6_32",
  //     ...
  //   }
  // ]
  const targetWithCommaBefore = `,\n      {\n        "id": "gallery_6_32",\n        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה36.jpg",\n        "alt": "דיוקן קורונה36",\n        "orientation": "portrait",\n        "caption": "30x42 ס\\"מ | טכניקה: אקוורל",\n        "captionEn": "30x42 cm | Technique: Watercolor"\n      }`;

  if (content.includes(targetWithCommaBefore)) {
    content = content.replace(targetWithCommaBefore, '');
    console.log('Removed target Corona block (with preceding comma) successfully.');
  } else if (content.includes(targetCoronaBlock)) {
    content = content.replace(targetCoronaBlock, '');
    console.log('Removed target Corona block successfully.');
  } else {
    console.warn('Could not find target Corona block in galleries.js.');
  }

  // Now, let's insert it into the S.B.R gallery (gallery_3) images array.
  // The last item in S.B.R is currently:
  //       {
  //         "id": "gallery_3_1",
  //         "url": "/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/2026- ש.ב.ר רמות מנשה גלריה לאומנות/שבר1.jpg",
  //         "alt": "שבר1",
  //         "orientation": "portrait"
  //       }
  //     ]
  const sbrLastItem = `      {
        "id": "gallery_3_1",
        "url": "/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/2026- ש.ב.ר רמות מנשה גלריה לאומנות/שבר1.jpg",
        "alt": "שבר1",
        "orientation": "portrait"
      }`;

  const sbrLastItemWithNew = `      {
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
      }`;

  if (content.includes(sbrLastItem)) {
    content = content.replace(sbrLastItem, sbrLastItemWithNew);
    console.log('Added new entry to S.B.R gallery successfully.');
  } else {
    console.warn('Could not find S.B.R last item block in galleries.js.');
  }

  fs.writeFileSync(galleriesPath, content, 'utf8');
  console.log('Saved updated galleries.js.');
} else {
  console.error(`galleries.js file not found at: ${galleriesPath}`);
}
