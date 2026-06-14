import fs from 'fs';
import path from 'path';

const srcDir = 'C:\\\\Users\\\\MY\\\\.gemini\\\\antigravity\\\\brain\\\\0d3b8c0b-51ee-4cb3-9aeb-a1cd8ab85cbe';
const destDir = path.resolve('scratch');
const targetDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';

const filename = 'media__1781439330955.jpg';
const destFilename = 'דיוקן קורונה11.jpg';

const srcPath = path.join(srcDir, filename);
const scratchPath = path.join(destDir, filename);
const destPath = path.join(targetDir, destFilename);

// 1. Copy to scratch
if (fs.existsSync(srcPath)) {
  fs.copyFileSync(srcPath, scratchPath);
  console.log(`Copied ${filename} to scratch`);
} else {
  console.error(`Source file not found in brain: ${srcPath}`);
}

// 2. Copy to target (replace)
if (fs.existsSync(scratchPath)) {
  fs.copyFileSync(scratchPath, destPath);
  console.log(`Successfully replaced ${destFilename} with ${filename}`);
} else {
  console.error(`File not found in scratch: ${scratchPath}`);
}
