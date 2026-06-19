import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('dist/assets');
const cssFile = files.find(f => f.endsWith('.css'));
if (cssFile) {
  const content = fs.readFileSync(path.join('dist/assets', cssFile), 'utf8');
  console.log('CSS File:', cssFile);
  
  // Find index of .artist-portrait-container
  let idx = 0;
  while (true) {
    idx = content.indexOf('artist-portrait-container', idx);
    if (idx === -1) break;
    
    // Print 100 characters before and 200 characters after
    const start = Math.max(0, idx - 150);
    const end = Math.min(content.length, idx + 250);
    console.log(`--- Match at index ${idx} ---`);
    console.log(content.slice(start, end));
    console.log('\n');
    
    idx += 'artist-portrait-container'.length;
  }
} else {
  console.log('No CSS file found');
}
