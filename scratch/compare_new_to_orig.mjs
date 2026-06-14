import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

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
    return stdout.trim().split(',').map(Number);
  } catch (err) {
    return null;
  }
}

const mediaFiles = [
  "media__1781427871679.jpg",
  "media__1781427871736.jpg",
  "media__1781427871743.jpg",
  "media__1781427871761.jpg"
];

const scratchFiles = fs.readdirSync('scratch').filter(f => f.startsWith('orig_') && f.endsWith('.jpg'));

console.log(`Analyzing ${mediaFiles.length} media files against ${scratchFiles.length} original files...`);

const mediaSigs = {};
mediaFiles.forEach(f => {
  mediaSigs[f] = getImageProfile(path.resolve('scratch', f));
});

const origSigs = {};
scratchFiles.forEach(f => {
  origSigs[f] = getImageProfile(path.resolve('scratch', f));
});

mediaFiles.forEach(m => {
  const mSig = mediaSigs[m];
  if (!mSig) {
    console.log(`Could not get signature for ${m}`);
    return;
  }
  
  console.log(`\nUploaded File: ${m}`);
  const results = [];
  
  Object.keys(origSigs).forEach(oName => {
    const oSig = origSigs[oName];
    if (mSig.length === oSig.length) {
      let sumSq = 0;
      for (let i = 0; i < mSig.length; i++) {
        const diff = mSig[i] - oSig[i];
        sumSq += diff * diff;
      }
      const dist = Math.sqrt(sumSq);
      results.push({ name: oName, distance: dist });
    }
  });
  
  results.sort((a, b) => a.distance - b.distance);
  results.slice(0, 10).forEach((r, idx) => {
    console.log(`  Match #${idx + 1}: ${r.name} -> Distance: ${r.distance.toFixed(2)}`);
  });
});
