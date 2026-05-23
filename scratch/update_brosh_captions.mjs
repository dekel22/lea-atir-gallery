import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { galleries } from '../src/data/galleries.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsPath = path.join(__dirname, '..', 'src', 'data', 'galleries.js');

const broshGallery = galleries.find(g => g.id === 'brosh');
if (broshGallery) {
  broshGallery.images.forEach(img => {
    const fullPath = path.resolve(__dirname, '..', 'public' + img.url);
    const escapedPath = fullPath.replace(/'/g, "''");
    
    const psScript = `
      Add-Type -AssemblyName System.Drawing;
      $img = [System.Drawing.Image]::FromFile('${escapedPath}');
      $bmp = New-Object System.Drawing.Bitmap($img);
      $sumSat = 0.0;
      $count = 0;
      $stepX = [math]::Max(1, [math]::Floor($bmp.Width / 20));
      $stepY = [math]::Max(1, [math]::Floor($bmp.Height / 20));
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
      const avgSat = parseFloat(output);
      
      if (avgSat < 0.12) {
        img.caption = 'גודל: 100x70 ס"מ | טכניקה: גרפית';
        console.log(`${img.id}: Grayscale (avgSat=${avgSat})`);
      } else {
        img.caption = 'גודל: 100x70 ס"מ | טכניקה: גרפית עם צבעי שמן';
        console.log(`${img.id}: Color (avgSat=${avgSat})`);
      }
    } catch (e) {
      console.error(`Error analyzing ${img.alt}:`, e.message);
    }
  });
}

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(galleries, null, 2) + ';\n';
fs.writeFileSync(jsPath, newContent, 'utf8');
console.log('Successfully updated captions in galleries.js.');
