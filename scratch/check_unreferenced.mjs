import fs from 'fs';
import path from 'path';

const jsContent = fs.readFileSync('src/data/galleries.js', 'utf8');

// Use regex to find all "url": "..." matches
const regex = /"url":\s*"([^"]+)"/g;
let match;
const urls = [];
while ((match = regex.exec(jsContent)) !== null) {
  urls.push(match[1]);
}

const referencedBasenames = urls
  .filter(u => u.includes('דיוקן קןרונה ברישום ואקוורל'))
  .map(u => path.basename(u));

console.log("=== REFERENCED FILES IN JS ===");
console.log(referencedBasenames);

const diskDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';
const diskFiles = fs.readdirSync(diskDir).filter(f => f.toLowerCase().endsWith('.jpg') && !f.endsWith('.bak'));

console.log("\n=== DISK FILES ===");
console.log(diskFiles);

console.log("\n=== DISK FILES NOT IN JS ===");
const unreferenced = diskFiles.filter(d => !referencedBasenames.includes(d));
console.log(unreferenced);
