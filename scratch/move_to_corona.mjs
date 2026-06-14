import fs from 'fs';
import path from 'path';

const chemnitzDir = 'public/galleries/קמניץ גרמניה עם אוסמר אוסטן';
const coronaDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';
const scratchDir = 'scratch';

// 1. Restore Chemnitz files from backup
const chemnitzFiles = ['קמניץ7.jpg', 'קמניץ16.jpg'];
chemnitzFiles.forEach(file => {
  const filePath = path.join(chemnitzDir, file);
  const backupPath = filePath + '.bak';
  
  if (fs.existsSync(backupPath)) {
    fs.copyFileSync(backupPath, filePath);
    fs.unlinkSync(backupPath);
    console.log(`Restored and cleaned up: ${filePath}`);
  } else {
    console.warn(`No backup found for: ${filePath}`);
  }
});

// 2. Copy the two new images to the Corona directory
const coronaOps = [
  {
    src: 'media__1781432941635.jpg',
    dest: 'דיוקן קורונה36.jpg'
  },
  {
    src: 'media__1781432941640.jpg',
    dest: 'דיוקן קורונה37.jpg'
  }
];

coronaOps.forEach(op => {
  const srcPath = path.resolve(scratchDir, op.src);
  const destPath = path.resolve(coronaDir, op.dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied new Corona image: ${srcPath} -> ${destPath}`);
  } else {
    console.error(`Source not found: ${srcPath}`);
  }
});

// 3. Update database config in src/data/galleries.js
const galleriesPath = 'src/data/galleries.js';
let jsContent = fs.readFileSync(galleriesPath, 'utf8');

const targetBlock = `      {
        "id": "gallery_6_36",
        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה35.jpg",
        "alt": "דיוקן קורונה35",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: רישום פחם סינטטי"
      }`;

const newEntriesBlock = `      {
        "id": "gallery_6_36",
        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה35.jpg",
        "alt": "דיוקן קורונה35",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: רישום פחם סינטטי"
      },
      {
        "id": "gallery_6_37",
        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה36.jpg",
        "alt": "דיוקן קורונה36",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: אקוורל"
      },
      {
        "id": "gallery_6_38",
        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה37.jpg",
        "alt": "דיוקן קורונה37",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: אקוורל"
      }`;

if (jsContent.includes(targetBlock)) {
  jsContent = jsContent.replace(targetBlock, newEntriesBlock);
  fs.writeFileSync(galleriesPath, jsContent, 'utf8');
  console.log("Successfully updated src/data/galleries.js with new Corona drawings (Batch 9).");
} else {
  console.error("Target block not found in src/data/galleries.js! Unable to update.");
}
