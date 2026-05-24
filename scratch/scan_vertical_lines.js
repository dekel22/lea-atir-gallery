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

// Let's scan columns x=15, x=100, x=240, x=1150, x=1215 at y=100, y=300, y=500, y=700, y=850
const psScript = `
  Add-Type -AssemblyName System.Drawing;
  $img = [System.Drawing.Image]::FromFile('${escapedPath}');
  $bmp = New-Object System.Drawing.Bitmap($img);
  
  $cols = @(15, 100, 240, 500, 1150, 1215);
  $rows = @(50, 200, 460, 700, 880);

  foreach ($x in $cols) {
      Write-Output "=== Column x=$x ===";
      foreach ($y in $rows) {
          $p = $bmp.GetPixel($x, $y);
          Write-Output "y=$y : R=$($p.R) G=$($p.G) B=$($p.B)";
      }
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
