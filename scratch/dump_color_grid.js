import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '..', 'public', 'galleries', 'וריאציות על נושא');
const files = fs.readdirSync(targetDir);
const file = files.find(f => f.includes('כמעט שחור לבן6'));

if (!file) {
  console.error("File not found!");
  process.exit(1);
}

const fullPath = path.join(targetDir, file);
const escapedPath = fullPath.replace(/'/g, "''");

const psScript = `
  Add-Type -AssemblyName System.Drawing;
  $img = [System.Drawing.Image]::FromFile('${escapedPath}');
  $bmp = New-Object System.Drawing.Bitmap($img);
  $w = $bmp.Width;
  $h = $bmp.Height;

  $gridW = 15;
  $gridH = 15;
  $stepX = $w / $gridW;
  $stepY = $h / $gridH;

  for ($r = 0; $r -lt $gridH; $r++) {
      $line = "";
      $y = [math]::Floor($r * $stepY);
      for ($c = 0; $c -lt $gridW; $c++) {
          $x = [math]::Floor($c * $stepX);
          $p = $bmp.GetPixel($x, $y);
          $line += " | " + "{0,3},{1,3},{2,3}" -f $p.R, $p.G, $p.B;
      }
      Write-Output $line;
  }

  $img.Dispose();
  $bmp.Dispose();
`.replace(/\r?\n/g, ' ');

try {
  const output = execSync(`powershell -NoProfile -Command "${psScript}"`, { encoding: 'utf8' });
  console.log(output);
} catch (e) {
  console.error("PowerShell failed:", e.message);
}
