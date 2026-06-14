import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const scratchDir = path.resolve('scratch');
const publicDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';

const mediaFiles = [
  'media__1781432287741.jpg',
  'media__1781432287751.jpg',
  'media__1781432287772.jpg',
  'media__1781432287825.jpg'
];

function getImageProfile(filePath) {
  const psPath = filePath.replace(/\\/g, '/');
  const psCommand = `
    Add-Type -AssemblyName System.Drawing;
    $img = [System.Drawing.Image]::FromFile('${psPath}');
    $bmp = New-Object System.Drawing.Bitmap($img);
    $width = $bmp.Width;
    $height = $bmp.Height;
    $gridSize = 5;
    $stepX = [math]::Floor($width / ($gridSize + 1));
    $stepY = [math]::Floor($height / ($gridSize + 1));
    $sig = @();
    for ($i = 1; $i -le $gridSize; $i++) {
        for ($j = 1; $j -le $gridSize; $j++) {
            $x = $i * $stepX;
            $y = $j * $stepY;
            if ($x -lt $width -and $y -lt $height) {
                $pixel = $bmp.GetPixel($x, $y);
                $sig += $pixel.R;
                $sig += $pixel.G;
                $sig += $pixel.B;
            }
        }
    };
    $img.Dispose();
    $bmp.Dispose();
    Write-Output ($sig -join ',');
  `;
  try {
    const cleanCmd = psCommand.replace(/\r?\n/g, ' ');
    const stdout = execSync(`powershell -NoProfile -Command "${cleanCmd}"`, { encoding: 'utf8' });
    return stdout.trim().split(',').map(Number);
  } catch (err) {
    return null;
  }
}

// Get signatures of public files
const publicFiles = fs.readdirSync(publicDir).filter(f => f.endsWith('.jpg') && !f.endsWith('.bak'));
console.log(`Calculating signatures for ${publicFiles.length} files in public gallery...`);

const publicSigs = {};
publicFiles.forEach(f => {
  publicSigs[f] = getImageProfile(path.join(publicDir, f));
});

console.log(`Calculating signatures for 4 uploaded files...`);
const mediaSigs = {};
mediaFiles.forEach(f => {
  mediaSigs[f] = getImageProfile(path.join(scratchDir, f));
});

mediaFiles.forEach(m => {
  const mSig = mediaSigs[m];
  if (!mSig) return;
  
  console.log(`\nUploaded File: ${m}`);
  const results = [];
  
  Object.keys(publicSigs).forEach(pName => {
    const pSig = publicSigs[pName];
    if (pSig && mSig.length === pSig.length) {
      let sumSq = 0;
      for (let i = 0; i < mSig.length; i++) {
        const diff = mSig[i] - pSig[i];
        sumSq += diff * diff;
      }
      const dist = Math.sqrt(sumSq);
      results.push({ name: pName, distance: dist });
    }
  });
  
  results.sort((a, b) => a.distance - b.distance);
  results.slice(0, 5).forEach((r, idx) => {
    console.log(`  Match #${idx + 1}: ${r.name} -> Distance: ${r.distance.toFixed(2)}`);
  });
});
