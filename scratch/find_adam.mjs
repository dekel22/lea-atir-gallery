import fs from 'fs';
const content = fs.readFileSync('src/data/galleries.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('אדם')) console.log(`${i+1}: ${l}`);
});
