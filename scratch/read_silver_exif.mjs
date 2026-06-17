import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '..', 'public', 'galleries', 'כסף');
const files = fs.readdirSync(targetDir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

files.forEach(file => {
  const filePath = path.join(targetDir, file);
  const buffer = fs.readFileSync(filePath);
  
  // Try UTF-8 first
  const textUtf8 = buffer.toString('utf8', 0, Math.min(buffer.length, 500000));
  
  // Match contiguous Hebrew words (including spaces, numbers, and symbols)
  const hebrewRegex = /[\u0590-\u05FF\s0-9|xX\*×:,-]{4,}/g;
  const matches = [];
  let match;
  while ((match = hebrewRegex.exec(textUtf8)) !== null) {
    const clean = match[0].trim();
    if (clean.length > 3 && /[\u0590-\u05FF]/.test(clean)) {
      matches.push(clean);
    }
  }
  
  // Try matching typical sizes in plain ASCII
  const sizeRegex = /\b\d{2,3}\s*[xX\*×]\s*\d{2,3}\b/g;
  const sizeMatches = textUtf8.match(sizeRegex) || [];
  
  if (matches.length > 0 || sizeMatches.length > 0) {
    console.log(`=== ${file} ===`);
    if (matches.length > 0) {
      console.log("Hebrew matches:", Array.from(new Set(matches)));
    }
    if (sizeMatches.length > 0) {
      console.log("Size matches:", Array.from(new Set(sizeMatches)));
    }
  }
});
