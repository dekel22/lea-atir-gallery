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

// Let's sample the corners in detail:
// Top-Left (0..50, 0..50)
// Bottom-Left (0..50, Height-50..Height)
// Top-Right (Width-50..Width, 0..50)
// Bottom-Right (Width-50..Width, Height-50..Height)

const psScript = `
  Add-Type -AssemblyName System.Drawing;
  $img = [System.Drawing.Image]::FromFile('${escapedPath}');
  $bmp = New-Object System.Drawing.Bitmap($img);
  $w = $bmp.Width;
  $h = $bmp.Height;

  Write-Output "=== Corners ===";
  Write-Output "Top-Left (x=0, y=0..15):";
  for ($y = 0; $y -lt 15; $y++) {
      $p = $bmp.GetPixel(0, $y);
      Write-Output "y=$y : R=$($p.R) G=$($p.G) B=$($p.B)";
  }

  Write-Output "Top-Left (x=0..15, y=0):";
  for ($x = 0; $x -lt 15; $x++) {
      $p = $bmp.GetPixel($x, 0);
      Write-Output "x=$x : R=$($p.R) G=$($p.G) B=$($p.B)";
  }

  Write-Output "Bottom-Left (x=0, y=$($h-15)..$($h-1)):";
  for ($y = $h - 15; $y -lt $h; $y++) {
      $p = $bmp.GetPixel(0, $y);
      Write-Output "y=$y : R=$($p.R) G=$($p.G) B=$($p.B)";
  }

  Write-Output "Bottom-Left (x=0..15, y=$($h-1)):";
  for ($x = 0; $x -lt 15; $x++) {
      $p = $bmp.GetPixel($x, $h - 1);
      Write-Output "x=$x : R=$($p.R) G=$($p.G) B=$($p.B)";
  }

  Write-Output "Top-Right (x=$($w-1), y=0..15):";
  for ($y = 0; $y -lt 15; $y++) {
      $p = $bmp.GetPixel($w - 1, $y);
      Write-Output "y=$y : R=$($p.R) G=$($p.G) B=$($p.B)";
  }

  Write-Output "Top-Right (x=$($w-15)..$($w-1), y=0):";
  for ($x = $w - 15; $x -lt $w; $x++) {
      $p = $bmp.GetPixel($x, 0);
      Write-Output "x=$x : R=$($p.R) G=$($p.G) B=$($p.B)";
  }

  Write-Output "Bottom-Right (x=$($w-1), y=$($h-15)..$($h-1)):";
  for ($y = $h - 15; $y -lt $h; $y++) {
      $p = $bmp.GetPixel($w - 1, $y);
      Write-Output "y=$y : R=$($p.R) G=$($p.G) B=$($p.B)";
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
