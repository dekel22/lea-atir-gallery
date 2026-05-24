import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '..', 'public', 'galleries', 'וריאציות על נושא');
const files = fs.readdirSync(targetDir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

// Minimal JPEG/PNG size parser
function getImageSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer[0] === 0xFF && buffer[1] === 0xD8) { // JPEG
    let pos = 2;
    while (pos < buffer.length) {
      if (buffer[pos] !== 0xFF) return null;
      const marker = buffer[pos + 1];
      if (marker >= 0xC0 && marker <= 0xC3) {
        return {
          height: buffer.readUInt16BE(pos + 5),
          width: buffer.readUInt16BE(pos + 7),
          components: buffer[pos + 9]
        };
      }
      pos += 2 + buffer.readUInt16BE(pos + 2);
    }
  }
  return null;
}

const info = files.map(f => {
  const fullPath = path.join(targetDir, f);
  const size = getImageSize(fullPath);
  
  // Let's run a simple PowerShell check for saturation if needed
  let avgSat = null;
  const escapedPath = fullPath.replace(/'/g, "''");
  const psScript = `
    Add-Type -AssemblyName System.Drawing;
    $img = [System.Drawing.Image]::FromFile('${escapedPath}');
    $bmp = New-Object System.Drawing.Bitmap($img);
    $sumSat = 0.0;
    $count = 0;
    $stepX = [math]::Max(1, [math]::Floor($bmp.Width / 15));
    $stepY = [math]::Max(1, [math]::Floor($bmp.Height / 15));
    for ($x = 1; $x -lt $bmp.Width; $x += $stepX) {
        for ($y = 1; $y -lt $bmp.Height; $y += $stepY) {
            $pixel = $bmp.GetPixel($x, $y);
            $r = $pixel.R;
            $g = $pixel.G;
            $b = $pixel.B;
            $max = [math]::Max($r, [math]::Max($g, $b));
            $min = [math]::Min($r, [math]::Min($g, $b));
            if ($max -gt 0) {
                $sat = ($max - $min) / $max;
                $sumSat += $sat;
                $count++;
            }
        }
    }
    $img.Dispose();
    $avgSat = $sumSat / $count;
    Write-Output $avgSat;
  `.replace(/\r?\n/g, ' ');

  try {
    const output = execSync(`powershell -NoProfile -Command "${psScript}"`, { encoding: 'utf8' }).trim();
    avgSat = parseFloat(output);
  } catch (e) {
    // Ignore error
  }

  return {
    file: f,
    ...size,
    avgSat
  };
});

console.log(JSON.stringify(info, null, 2));
