import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '..', 'public', 'galleries', 'וריאציות על נושא');
const files = fs.readdirSync(targetDir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

files.forEach(file => {
  const filePath = path.join(targetDir, file);
  const buffer = fs.readFileSync(filePath);
  
  // Let's decode as UTF-8 and look for Hebrew characters (0x0590 to 0x05FF)
  const text = buffer.toString('utf8', 0, Math.min(buffer.length, 150000));
  
  // Match contiguous Hebrew words (including spaces and numbers)
  const hebrewRegex = /[\u0590-\u05FF\s0-9|x:,-]{4,}/g;
  const matches = [];
  let match;
  while ((match = hebrewRegex.exec(text)) !== null) {
    const clean = match[0].trim();
    if (clean.length > 3 && /[\u0590-\u05FF]/.test(clean)) {
      matches.push(clean);
    }
  }
  
  if (matches.length > 0) {
    console.log(`=== ${file} ===`);
    console.log(matches);
  }
});
