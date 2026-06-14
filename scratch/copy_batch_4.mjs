import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\0d3b8c0b-51ee-4cb3-9aeb-a1cd8ab85cbe';
const destDir = path.resolve('scratch');

const filesToCopy = [
  'media__1781427871679.jpg',
  'media__1781427871736.jpg',
  'media__1781427871743.jpg',
  'media__1781427871761.jpg'
];

filesToCopy.forEach(file => {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to scratch`);
  } else {
    console.error(`Source not found: ${src}`);
  }
});
