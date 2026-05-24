import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '..', 'public', 'galleries', 'וריאציות על נושא');

function findStrings(file) {
  const filePath = path.join(targetDir, file);
  const buffer = fs.readFileSync(filePath);
  // Scan for ASCII/UTF-8 strings of length >= 6
  let str = '';
  const strings = [];
  for (let i = 0; i < Math.min(buffer.length, 100000); i++) {
    const char = buffer[i];
    if (char >= 32 && char <= 126) {
      str += String.fromCharCode(char);
    } else {
      if (str.length >= 6) {
        strings.push({ pos: i - str.length, str });
      }
      str = '';
    }
  }
  // Print some interesting strings (containing Adobe, Photoshop, Title, Description, or Hebrew characters if encoded in some way)
  console.log(`=== ${file} ===`);
  const interesting = strings.filter(s => 
    s.str.includes('Adobe') || 
    s.str.includes('Photoshop') || 
    s.str.includes('Creator') || 
    s.str.includes('Title') || 
    s.str.includes('Description') ||
    s.str.toLowerCase().includes('canvas') ||
    s.str.toLowerCase().includes('paint')
  );
  console.log(interesting.slice(0, 15));
}

findStrings('DSCN9023a.jpg');
findStrings('‏‏a - עותק.jpg');
