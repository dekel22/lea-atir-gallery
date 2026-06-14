import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const srcDir = 'C:\\\\Users\\\\MY\\\\.gemini\\\\antigravity\\\\brain\\\\0d3b8c0b-51ee-4cb3-9aeb-a1cd8ab85cbe';
const destDir = path.resolve('scratch');

const filesToCopy = [
  'media__1781432941635.jpg',
  'media__1781432941640.jpg'
];

// 1. Copy files
filesToCopy.forEach(file => {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to scratch`);
  } else {
    console.error(`Source not found: ${src}`);
  }
});

// Image signature helper
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

// 2. Scan all directories under public/galleries recursively to find all .jpg images
function getFilesRecursively(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else if (file.endsWith('.jpg') && !file.endsWith('.bak')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const allPublicImages = getFilesRecursively('public/galleries');
console.log(`Found ${allPublicImages.length} images in public/galleries`);

console.log('Calculating signatures of public images...');
const publicSigs = {};
allPublicImages.forEach(f => {
  publicSigs[f] = getImageProfile(f);
});

console.log('Calculating signatures of uploaded images...');
const mediaSigs = {};
filesToCopy.forEach(f => {
  mediaSigs[f] = getImageProfile(path.join(destDir, f));
});

let outputText = '';

filesToCopy.forEach(m => {
  const mSig = mediaSigs[m];
  if (!mSig) return;
  
  const header = `\nUploaded File: ${m}\n`;
  console.log(header);
  outputText += header;
  
  const results = [];
  
  Object.keys(publicSigs).forEach(pPath => {
    const pSig = publicSigs[pPath];
    if (pSig && mSig.length === pSig.length) {
      let sumSq = 0;
      for (let i = 0; i < mSig.length; i++) {
        const diff = mSig[i] - pSig[i];
        sumSq += diff * diff;
      }
      const dist = Math.sqrt(sumSq);
      results.push({ path: pPath, distance: dist });
    }
  });
  
  results.sort((a, b) => a.distance - b.distance);
  results.slice(0, 10).forEach((r, idx) => {
    const line = `  Match #${idx + 1}: ${r.path} -> Distance: ${r.distance.toFixed(2)}\n`;
    console.log(line.trim());
    outputText += line;
  });
});

// Write ASCII Art
const psScriptPath = path.resolve('scratch', 'ascii_art.ps1');
outputText += `\n\n=============================================================\nASCII ART\n=============================================================\n`;
filesToCopy.forEach(f => {
  const fullPath = path.resolve('scratch', f);
  outputText += `\n=============================================================\n`;
  outputText += `FILE: ${f}\n`;
  outputText += `=============================================================\n`;
  const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}" -ImagePath "${fullPath}"`;
  try {
    const stdout = execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    outputText += stdout + '\n';
  } catch (err) {
    outputText += `Error generating ASCII for ${f}: ${err.message}\n`;
  }
});

fs.writeFileSync('scratch/ascii_art_batch_9_results.txt', outputText);
console.log('\nSaved ASCII art results to scratch/ascii_art_batch_9_results.txt');
