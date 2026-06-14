import fs from 'fs';
import path from 'path';

const targetDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';
const scratchDir = 'scratch';

// 1. Image file operations
const operations = [
  {
    src: 'media__1781428546243.jpg',
    dest: 'דיוקן קורונה16.jpg',
    backup: true
  },
  {
    src: 'media__1781428546250.jpg',
    dest: 'דיוקן קורונה12.jpg',
    backup: true
  },
  {
    src: 'media__1781428546252.jpg',
    dest: 'דיוקן קורונה21.jpg',
    backup: true
  },
  {
    src: 'media__1781428546466.jpg',
    dest: 'דיוקן קורונה30.jpg',
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
        "id": "gallery_6_30",
        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה24.jpg",
        "alt": "דיוקן קורונה24",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: רישום פחם סינטטי"
      }`;

const newEntriesBlock = `      {
        "id": "gallery_6_30",
        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה24.jpg",
        "alt": "דיוקן קורונה24",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: רישום פחם סינטטי"
      },
      {
        "id": "gallery_6_31",
        "url": "/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל/דיוקן קורונה30.jpg",
        "alt": "דיוקן קורונה30",
        "orientation": "portrait",
        "caption": "30x42 ס\\"מ | טכניקה: רישום פחם סינטטי"
      }`;

if (jsContent.includes(targetBlock)) {
  jsContent = jsContent.replace(targetBlock, newEntriesBlock);
  fs.writeFileSync(galleriesPath, jsContent, 'utf8');
  console.log("Successfully updated src/data/galleries.js with new face mask entry.");
} else {
  console.error("Target block not found in src/data/galleries.js! Unable to update.");
}
