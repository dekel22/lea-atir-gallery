import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Define helper to get image signature by invoking PowerShell inline
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
    
    // Also get dimensions
    const dimStdout = execSync(`powershell -NoProfile -Command "Add-Type -AssemblyName System.Drawing; $img = [System.Drawing.Image]::FromFile('${psPath}'); Write-Output \\"\\$($img.Width)x\\$($img.Height)\\"; $img.Dispose()"`, { encoding: 'utf8' });
    const [width, height] = dimStdout.trim().split('x').map(Number);
    
    return {
      width,
      height,
      signature: values
    };
  } catch (err) {
    console.error(`Error processing ${filePath}:`, err.message);
    return null;
  }
}

const uploadedFiles = [
  "media__1781423132955.jpg",
  "media__1781423132956.jpg",
  "media__1781423132957.jpg",
  "media__1781423132973.jpg"
];

const watercolorFiles = [
  "דיוקן קורונה23.jpg",
  "דיוקן קורונה25.jpg",
  "דיוקן קורונה26.jpg",
  "דיוקן קורונה28.jpg",
  "דיוקן קורונה29.jpg",
  "דיוקןקורונה19.jpg",
  "דיוקןקוררונה27.jpg",
  "קורונה באקוורל.jpg",
  "קורונה באקוורל2.jpg"
];

const targetDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';

console.log('Calculating signatures for uploaded files...');
const uploadedSigs = {};
for (const f of uploadedFiles) {
  const filePath = path.resolve('scratch', f);
  const profile = getImageProfile(filePath);
  if (profile) {
    uploadedSigs[f] = profile;
    console.log(`Uploaded: ${f} -> ${profile.width}x${profile.height}`);
  }
}

console.log('\nCalculating signatures for original watercolor files...');
const originalSigs = {};
for (const f of watercolorFiles) {
  const filePath = path.resolve(targetDir, f);
  const profile = getImageProfile(filePath);
  if (profile) {
    originalSigs[f] = profile;
    console.log(`Original: ${f} -> ${profile.width}x${profile.height}`);
  }
}

console.log('\n--- MATCHING RESULTS ---');
const matchPairs = {};
for (const upName of uploadedFiles) {
  const up = uploadedSigs[upName];
  if (!up) continue;
  
  console.log(`\nUploaded Image: ${upName} (${up.width}x${up.height})`);
  const results = [];
  for (const wcName of watercolorFiles) {
    const orig = originalSigs[wcName];
    if (!orig) continue;
    
    // Euclidean distance
    let sumSq = 0;
    for (let i = 0; i < up.signature.length; i++) {
      const diff = up.signature[i] - orig.signature[i];
      sumSq += diff * diff;
    }
    const dist = Math.sqrt(sumSq);
    results.push({ name: wcName, width: orig.width, height: orig.height, distance: dist });
  }
  
  results.sort((a, b) => a.distance - b.distance);
  results.slice(0, 5).forEach((r, idx) => {
    console.log(`  Match #${idx + 1}: ${r.name} (${r.width}x${r.height}) -> Distance: ${r.distance.toFixed(2)}`);
  });
  
  matchPairs[upName] = results[0].name;
}

console.log('\nBest Match Mapping:');
console.log(JSON.stringify(matchPairs, null, 2));
