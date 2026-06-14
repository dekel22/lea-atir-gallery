import fs from 'fs';
import path from 'path';

const targetDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';
const scratchDir = 'scratch';

const operations = [
  {
    src: 'media__1781424169454.jpg',
    dest: 'דיוקן קורונה25.jpg',
    backup: true
  },
  {
    src: 'media__1781425832811.jpg',
    dest: 'דיוקןקורונה19.jpg',
    backup: false // Already backed up in Batch 2 (as דיוקןקורונה19.jpg.bak)
  },
  {
    src: 'media__1781425832814.jpg',
    dest: 'דיוקן קורונה18.jpg',
    backup: true
  },
  {
    src: 'media__1781425832816.jpg',
    dest: 'דיוקן קורונה13.jpg',
    backup: true
  },
  {
    src: 'media__1781427468982.jpg',
    dest: 'דיוקן קורונה3.jpg',
    backup: true
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
  console.log(`Replaced: ${srcPath} -> ${destPath}`);
});
