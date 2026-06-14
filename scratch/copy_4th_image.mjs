import fs from 'fs';
import path from 'path';

const src = 'C:\\Users\\MY\\.gemini\\antigravity\\brain\\0d3b8c0b-51ee-4cb3-9aeb-a1cd8ab85cbe\\.tempmediaStorage\\media_0d3b8c0b-51ee-4cb3-9aeb-a1cd8ab85cbe_1781427468982.jpg';
const dest = path.resolve('scratch', 'media__1781427468982.jpg');

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log(`Successfully copied ${src} to ${dest}`);
} else {
  console.error(`Source file does not exist: ${src}`);
}
