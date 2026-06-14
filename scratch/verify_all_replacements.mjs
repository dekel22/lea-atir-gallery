import fs from 'fs';
import path from 'path';

const jsContent = fs.readFileSync('src/data/galleries.js', 'utf8');

// Parse URLs for gallery 6
const regex = /"url":\s*"([^"]+)"/g;
let match;
const urls = [];
while ((match = regex.exec(jsContent)) !== null) {
  if (match[1].includes('דיוקן קןרונה ברישום ואקוורל')) {
    urls.push(match[1]);
  }
}

console.log(`Found ${urls.length} images referenced in galleries.js for Corona exhibition.`);

const targetDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';

urls.forEach((url, index) => {
  const filename = path.basename(url);
  const filePath = path.join(targetDir, filename);
  const exists = fs.existsSync(filePath);
  
  if (!exists) {
    console.log(`[ERROR] Image #${index} does not exist on disk: ${filename}`);
    return;
  }
  
  const size = fs.statSync(filePath).size;
  const backupPath = filePath + '.bak';
  const backupExists = fs.existsSync(backupPath);
  const backupSize = backupExists ? fs.statSync(backupPath).size : null;
  
  let status = 'Original/New (No backup)';
  if (backupExists) {
    if (size === backupSize) {
      status = 'WARNING: Current size is identical to backup size! (Not replaced or replaced with identical file)';
    } else {
      status = `Replaced (Current: ${size} bytes, Backup: ${backupSize} bytes)`;
    }
  }
  
  console.log(`Image #${index}: ${filename.padEnd(25)} | Size: ${String(size).padEnd(8)} | Backup: ${(backupExists ? 'YES (' + backupSize + ' B)' : 'NO').padEnd(15)} | Status: ${status}`);
});
