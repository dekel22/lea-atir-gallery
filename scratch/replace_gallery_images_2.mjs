import fs from 'fs';
import path from 'path';

const srcDir = 'scratch';
const destDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';

const replacements = [
  {
    src: 'media__1781424169454.jpg',
    dest: 'דיוקןקורונה19.jpg'
  },
  {
    src: 'media__1781424169457.jpg',
    dest: 'דיוקן קורונה26.jpg'
  },
  {
    src: 'media__1781424169668.jpg',
    dest: 'דיוקן קורונה28.jpg'
  }
];

replacements.forEach(r => {
  const srcPath = path.join(srcDir, r.src);
  const destPath = path.join(destDir, r.dest);
  
  if (fs.existsSync(srcPath)) {
    // Backup first
    const backupPath = destPath + '.bak';
    if (fs.existsSync(destPath)) {
      fs.copyFileSync(destPath, backupPath);
      console.log(`Backed up original ${r.dest} to ${r.dest}.bak`);
    }
    
    // Copy new file
    fs.copyFileSync(srcPath, destPath);
    console.log(`Replaced ${r.dest} with ${r.src}`);
  } else {
    console.error(`Source file not found: ${srcPath}`);
  }
});
