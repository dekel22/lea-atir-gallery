import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '..', 'public', 'galleries', 'וריאציות על נושא');
const files = fs.readdirSync(targetDir);
const file = files.find(f => f.includes('כמעט שחור לבן5'));

if (!file) {
  console.error("File not found!");
  process.exit(1);
}

const fullPath = path.join(targetDir, file);
console.log("Analyzing כמעט שחור לבן5 path:", fullPath);

const escapedPath = fullPath.replace(/'/g, "''");

const psScript = `
  Add-Type -AssemblyName System.Drawing;
  $img = [System.Drawing.Image]::FromFile('${escapedPath}');
  $bmp = New-Object System.Drawing.Bitmap($img);
  $w = $bmp.Width;
  $h = $bmp.Height;

  Write-Output "=== IMAGE SIZE ===";
  Write-Output "Width=$w Height=$h";

  $midX = [math]::Floor($w / 2);
  $midY = [math]::Floor($h / 2);

  Write-Output "=== LEFT HALF ===";
  for ($x = 0; $x -lt 200; $x += 10) {
      $p = $bmp.GetPixel($x, $midY);
      Write-Output "x=$x : R=$($p.R) G=$($p.G) B=$($p.B)";
  }

  Write-Output "=== TOP HALF ===";
  for ($y = 0; $y -lt 100; $y += 10) {
      $p = $bmp.GetPixel($midX, $y);
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
