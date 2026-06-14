import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Get signature of image file
function getImageProfile(filePath) {
  const psPath = filePath.replace(/\\/g, '\\\\');
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
    Write-Output ($sig -join ',');
  `;
  
  try {
    const cleanCmd = psCommand.replace(/\r?\n/g, ' ');
    const stdout = execSync(`powershell -NoProfile -Command "${cleanCmd}"`, { encoding: 'utf8' });
    const values = stdout.trim().split(',').map(Number);
    return values;
  } catch (err) {
    return null;
  }
}

const mediaFiles = [
  "media__1781423132955.jpg",
  "media__1781423132956.jpg",
  "media__1781423132957.jpg",
  "media__1781423132973.jpg",
  "media__1781424169454.jpg",
  "media__1781424169457.jpg",
  "media__1781424169668.jpg",
  "media__1781425832811.jpg",
  "media__1781425832814.jpg",
  "media__1781425832816.jpg"
];

const targetDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';

// We want to scan the original files. If there is a .bak file, we use the .bak file to represent the original content!
const originalFiles = fs.readdirSync(targetDir).filter(f => f.endsWith('.jpg') || f.endsWith('.JPG'));

const originalNames = originalFiles.map(f => {
  const bakFile = f + '.bak';
  if (fs.existsSync(path.join(targetDir, bakFile))) {
    return { name: f, scanFile: bakFile };
  }
  return { name: f, scanFile: f };
});

console.log('Calculating signatures for uploaded files...');
const mediaSigs = {};
mediaFiles.forEach(f => {
  const sig = getImageProfile(path.resolve('scratch', f));
  if (sig) {
    mediaSigs[f] = sig;
  }
});

console.log('Calculating signatures for original files...');
const originalSigs = {};
originalNames.forEach(o => {
  const sig = getImageProfile(path.resolve(targetDir, o.scanFile));
  if (sig) {
    originalSigs[o.name] = sig;
  }
});

console.log('\n--- MATCHING TABLE ---');
const mappings = {};
mediaFiles.forEach(m => {
  const mSig = mediaSigs[m];
  if (!mSig) return;
  
  let bestName = null;
  let minDistance = Infinity;
  
  Object.keys(originalSigs).forEach(oName => {
    const oSig = originalSigs[oName];
    if (mSig.length === oSig.length) {
      let sumSq = 0;
      for (let i = 0; i < mSig.length; i++) {
        const diff = mSig[i] - oSig[i];
        sumSq += diff * diff;
      }
      const dist = Math.sqrt(sumSq);
      if (dist < minDistance) {
        minDistance = dist;
        bestName = oName;
      }
    }
  });
  
  mappings[m] = { bestMatch: bestName, distance: minDistance };
  console.log(`${m} -> ${bestName} (Distance: ${minDistance.toFixed(2)})`);
});

fs.writeFileSync('scratch/all_mappings.json', JSON.stringify(mappings, null, 2), 'utf8');
console.log('Saved mappings to scratch/all_mappings.json');
