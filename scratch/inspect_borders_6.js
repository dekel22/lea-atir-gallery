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
console.log("Analyzing file:", fullPath);

const escapedPath = fullPath.replace(/'/g, "''");

const psScript = `
  Add-Type -AssemblyName System.Drawing;
  $img = [System.Drawing.Image]::FromFile('${escapedPath}');
  $bmp = New-Object System.Drawing.Bitmap($img);
  $midX = [math]::Floor($bmp.Width / 2);
  $midY = [math]::Floor($bmp.Height / 2);

  Write-Output "=== IMAGE SIZE ===";
  Write-Output "Width=$($bmp.Width) Height=$($bmp.Height)";

  Write-Output "=== TOP EDGE ===";
  for ($y = 0; $y -lt 150; $y += 5) {
      $p = $bmp.GetPixel($midX, $y);
      Write-Output "y=$y : R=$($p.R) G=$($p.G) B=$($p.B)";
  }

  Write-Output "=== BOTTOM EDGE ===";
  for ($y = $bmp.Height - 150; $y -lt $bmp.Height; $y += 5) {
      $p = $bmp.GetPixel($midX, $y);
      Write-Output "y=$y : R=$($p.R) G=$($p.G) B=$($p.B)";
  }

  Write-Output "=== LEFT EDGE ===";
  for ($x = 0; $x -lt 150; $x += 5) {
      $p = $bmp.GetPixel($x, $midY);
      Write-Output "x=$x : R=$($p.R) G=$($p.G) B=$($p.B)";
  }

  Write-Output "=== RIGHT EDGE ===";
  for ($x = $bmp.Width - 150; $x -lt $bmp.Width; $x += 5) {
      $p = $bmp.GetPixel($x, $midY);
      Write-Output "x=$x : R=$($p.R) G=$($p.G) B=$($p.B)";
  }

  $img.Dispose();
  $bmp.Dispose();
`.replace(/\r?\n/g, ' ');

try {
  const output = execSync(`powershell -NoProfile -Command "${psScript}"`, { encoding: 'utf8' });
  console.log(output);
} catch (e) {
  console.error("PowerShell script execution failed:", e.message);
}
