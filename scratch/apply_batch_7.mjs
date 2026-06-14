import fs from 'fs';
import path from 'path';

const targetDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';
const scratchDir = 'scratch';

// 1. Image file operations
const operations = [
  {
    src: 'media__1781429848873.jpg',
    dest: 'דיוקן קורונה4.jpg',
    backup: true
  },
  {
    src: 'media__1781429848886.jpg',
    dest: 'דיוקן קורונה5.jpg',
    backup: true
  },
  {
    src: 'media__1781429848921.jpg',
    dest: 'דיוקן קורונה18.jpg',
    backup: false // Already backed up in Batch 3 as דיוקן קורונה18.jpg.bak
  },
  {
    src: 'media__1781429848400.jpg',
    dest: 'דיוקן קורונה33.jpg',
    backup: false // new file
  },
  {
    src: 'media__1781425832814.jpg', // head wrap drawing relocated from Batch 3
    dest: 'דיוקן קורונה34.jpg',
    backup: false // new file
  }
];

operations.forEach(op => {
  const srcPath = path.resolve(scratchDir, op.src);
  const destPath = path.resolve(targetDir, op.dest);
  
  if (!fs.existsSync(srcPath)) {
    console.error(`Source file not found: ${srcPath}`);
    return;
  }
  
  if (op.backup) {
    const backupPath = destPath + '.bak';
    if (!fs.existsSync(backupPath)) {
      if (fs.existsSync(destPath)) {
        fs.copyFileSync(destPath, backupPath);
        console.log(`Backed up: ${destPath} -> ${backupPath}`);
      } else {
        console.warn(`Destination file for backup does not exist: ${destPath}`);
      }
    } else {
      console.log(`Backup already exists: ${backupPath}`);
    }
  }
  
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied/Replaced: ${srcPath} -> ${destPath}`);
});

// 2. JS galleries data updates
const galleriesPath = 'src/data/galleries.js';
let jsContent = fs.readFileSync(galleriesPath, 'utf8');

const targetBlock = `      {
        "id": "gallery_6_33",
        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה32.jpg",
        "alt": "דיוקן קורונה32",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: רישום פחם סינטטי"
      }`;

const newEntriesBlock = `      {
        "id": "gallery_6_33",
        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה32.jpg",
        "alt": "דיוקן קורונה32",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: רישום פחם סינטטי"
      },
      {
        "id": "gallery_6_34",
        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה33.jpg",
        "alt": "דיוקן קורונה33",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: רישום פחם סינטטי"
      },
      {
        "id": "gallery_6_35",
        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה34.jpg",
        "alt": "דיוקן קורונה34",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: רישום פחם סינטטי"
      }`;

if (jsContent.includes(targetBlock)) {
  jsContent = jsContent.replace(targetBlock, newEntriesBlock);
  fs.writeFileSync(galleriesPath, jsContent, 'utf8');
  console.log("Successfully updated src/data/galleries.js with new Batch 7 drawing entries.");
} else {
  console.error("Target block not found in src/data/galleries.js! Unable to update.");
}
