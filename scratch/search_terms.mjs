import fs from 'fs';

const content = fs.readFileSync('src/data/galleries.js', 'utf8');
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.includes('שמן') || line.includes('גירים')) {
    console.log(`${i + 1}: ${line.trim()}`);
  }
});
