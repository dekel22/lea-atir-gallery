import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const publicDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';
const scratchDir = path.resolve('scratch');

const mediaFiles = [
  'media__1781432287741.jpg',
  'media__1781432287751.jpg',
  'media__1781432287772.jpg',
  'media__1781432287825.jpg'
];

function getImageInfo(filePath) {
  const psPath = filePath.replace(/\\/g, '/');
  const psCommand = `
    Add-Type -AssemblyName System.Drawing;
    $img = [System.Drawing.Image]::FromFile('${psPath}');
    $width = $img.Width;
    $height = $img.Height;
    $img.Dispose();
    Write-Output "$width,$height"
  `;
  try {
    const cleanCmd = psCommand.replace(/\r?\n/g, ' ');
    const stdout = execSync(`powershell -NoProfile -Command "${cleanCmd}"`, { encoding: 'utf8' });
    const parts = stdout.trim().split(',').map(Number);
    return { width: parts[0], height: parts[1] };
  } catch (err) {
    return null;
  }
}

console.log('=== UPLOADED MEDIA FILES ===');
mediaFiles.forEach(f => {
  const info = getImageInfo(path.join(scratchDir, f));
  const size = fs.statSync(path.join(scratchDir, f)).size;
  console.log(`${f.padEnd(30)} | Size: ${String(size).padEnd(8)} | Dimensions: ${info ? info.width + 'x' + info.height : 'N/A'}`);
});

console.log('\n=== PUBLIC GALLERY FILES ===');
const publicFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.jpg') && !f.endsWith('.bak'));
publicFiles.forEach(f => {
  const info = getImageInfo(path.join(publicDir, f));
  const size = fs.statSync(path.join(publicDir, f)).size;
  console.log(`${f.padEnd(25)} | Size: ${String(size).padEnd(8)} | Dimensions: ${info ? info.width + 'x' + info.height : 'N/A'}`);
});
