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

// We'll divide the image into 60 columns and 30 rows, and print the brightness of each cell.
const cols = 80;
const rows = 40;

const psScript = `
  Add-Type -AssemblyName System.Drawing;
  $img = [System.Drawing.Image]::FromFile('${escapedPath}');
  $bmp = New-Object System.Drawing.Bitmap($img);
  $w = $bmp.Width;
  $h = $bmp.Height;

  $stepX = $w / ${cols};
  $stepY = $h / ${rows};

  for ($r = 0; $r -lt ${rows}; $r++) {
      $line = "";
      $y = [math]::Floor($r * $stepY);
      if ($y -ge $h) { $y = $h - 1; }
      for ($c = 0; $c -lt ${cols}; $c++) {
          $x = [math]::Floor($c * $stepX);
          if ($x -ge $w) { $x = $w - 1; }
          $p = $bmp.GetPixel($x, $y);
          # Calculate brightness (0 to 255)
          $brightness = ($p.R * 0.299 + $p.G * 0.587 + $p.B * 0.114);
          # Convert to ASCII character
          # Darker is '#', Lighter is ' '
          if ($brightness -lt 80) {
              $line += "#";
          } elseif ($brightness -lt 110) {
              $line += "x";
          } elseif ($brightness -lt 140) {
              $line += ".";
          } else {
              $line += " ";
          }
      }
      Write-Output $line;
  }
  $img.Dispose();
  $bmp.Dispose();
`.replace(/\r?\n/g, ' ');

try {
  const output = execSync(`powershell -NoProfile -Command "${psScript}"`, { encoding: 'utf8' });
  console.log("=== ASCII ART OF IMAGE ===");
  console.log(output);
} catch (e) {
  console.error("PowerShell failed:", e.message);
}
