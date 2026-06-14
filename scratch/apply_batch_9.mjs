import fs from 'fs';
import path from 'path';

const targetDir = 'public/galleries/קמניץ גרמניה עם אוסמר אוסטן';
const scratchDir = 'scratch';

// 1. Image file operations
const operations = [
  {
    src: 'media__1781432941635.jpg', // tubes of paint
    dest: 'קמניץ16.jpg'
  },
  {
    src: 'media__1781432941640.jpg', // self-portrait with mirror/books
    dest: 'קמניץ7.jpg'
  }
];

operations.forEach(op => {
  const srcPath = path.resolve(scratchDir, op.src);
  const destPath = path.resolve(targetDir, op.dest);
  
  if (!fs.existsSync(srcPath)) {
    console.error(`Source file not found: ${srcPath}`);
    return;
  }
  
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
  
  fs.copyFileSync(srcPath, destPath);
  console.log(`Copied/Replaced: ${srcPath} -> ${destPath}`);
});
