import fs from 'fs';
import path from 'path';

const srcDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';
const destDir = 'scratch';

const filesToCopy = [
  'דיוקן קורונה23.jpg',
  'קורונה באקוורל2.jpg',
  'דיוקן קורונה25.jpg',
  'דיוקןקורונה19.jpg',
  'דיוקןקוררונה27.jpg',
  'דיוקן קורונה29.jpg'
];

filesToCopy.forEach(f => {
  const src = path.join(srcDir, f);
  const dest = path.join(destDir, 'orig_' + f);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${f} to ${dest}`);
  } else {
    console.error(`File not found: ${src}`);
  }
});
