import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const destDir = path.resolve('scratch');

const filesToCopy = [
  'media__1781428546243.jpg',
  'media__1781428546250.jpg',
  'media__1781428546252.jpg',
  'media__1781428546466.jpg'
];

// Image signature helper (completely free of double quotes to prevent CMD escaping issues)
function getImageProfileAndSize(filePath) {
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
    $sigStr = $sig -join ',';
    Write-Output ($width.ToString() + ',' + $height.ToString() + ',Sig:' + $sigStr);
  `;
  try {
    const cleanCmd = psCommand.replace(/\r?\n/g, ' ');
    const stdout = execSync(`powershell -NoProfile -Command "${cleanCmd}"`, { encoding: 'utf8' });
    if (!stdout.includes(',Sig:')) {
      console.error(`Invalid stdout for ${filePath}:`, stdout);
      return null;
    }
    const parts = stdout.trim().split(',Sig:');
    const dims = parts[0].split(',').map(Number);
    const sig = parts[1].split(',').map(Number);
    return { width: dims[0], height: dims[1], sig };
  } catch (err) {
    console.error(`Error for ${filePath}:`, err.message, err.stderr ? err.stderr.toString() : '');
    return null;
  }
}

const scratchFiles = fs.readdirSync('scratch').filter(f => f.startsWith('orig_') && f.endsWith('.jpg'));

console.log(`Analyzing similarity against ${scratchFiles.length} original files...`);

const mediaProfiles = {};
filesToCopy.forEach(f => {
  mediaProfiles[f] = getImageProfileAndSize(path.join(destDir, f));
});

const origProfiles = {};
scratchFiles.forEach(f => {
  origProfiles[f] = getImageProfileAndSize(path.join(destDir, f));
});

filesToCopy.forEach(m => {
  const mProfile = mediaProfiles[m];
  if (!mProfile) {
    console.log(`Could not get profile for ${m}`);
    return;
  }
  
  console.log(`\nUploaded File: ${m} (${mProfile.width}x${mProfile.height})`);
  const results = [];
  
  Object.keys(origProfiles).forEach(oName => {
    const oProfile = origProfiles[oName];
    if (oProfile && mProfile.sig.length === oProfile.sig.length) {
      let sumSq = 0;
      for (let i = 0; i < mProfile.sig.length; i++) {
        const diff = mProfile.sig[i] - oProfile.sig[i];
        sumSq += diff * diff;
      }
      const dist = Math.sqrt(sumSq);
      results.push({ name: oName, distance: dist, ...oProfile });
    }
  });
  
  results.sort((a, b) => a.distance - b.distance);
  results.slice(0, 8).forEach((r, idx) => {
    console.log(`  Match #${idx + 1}: ${r.name} (${r.width}x${r.height}) -> Distance: ${r.distance.toFixed(2)}`);
  });
});
