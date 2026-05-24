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

// Let's write a PowerShell command to calculate the average R,G,B for each row and column,
// and output them so we can examine the profile.
const psScript = `
  Add-Type -AssemblyName System.Drawing;
  $img = [System.Drawing.Image]::FromFile('${escapedPath}');
  $bmp = New-Object System.Drawing.Bitmap($img);
  $w = $bmp.Width;
  $h = $bmp.Height;

  # Profile columns (average color per column)
  Write-Output "=== COLUMNS ===";
  for ($x = 0; $x -lt $w; $x += 10) {
      $rSum = 0; $gSum = 0; $bSum = 0;
      for ($y = 0; $y -lt $h; $y += 10) {
          $p = $bmp.GetPixel($x, $y);
          $rSum += $p.R; $gSum += $p.G; $bSum += $p.B;
      }
      $cnt = [math]::Floor($h / 10);
      $r = [math]::Floor($rSum / $cnt);
      $g = [math]::Floor($gSum / $cnt);
      $b = [math]::Floor($bSum / $cnt);
      Write-Output "col $x : R=$r G=$g B=$b";
  }

  # Profile rows (average color per row)
  Write-Output "=== ROWS ===";
  for ($y = 0; $y -lt $h; $y += 10) {
      $rSum = 0; $gSum = 0; $bSum = 0;
      for ($x = 0; $x -lt $w; $x += 10) {
          $p = $bmp.GetPixel($x, $y);
          $rSum += $p.R; $gSum += $p.G; $bSum += $p.B;
      }
      $cnt = [math]::Floor($w / 10);
      $r = [math]::Floor($rSum / $cnt);
      $g = [math]::Floor($gSum / $cnt);
      $b = [math]::Floor($bSum / $cnt);
      Write-Output "row $y : R=$r G=$g B=$b";
  }

  $img.Dispose();
  $bmp.Dispose();
`.replace(/\r?\n/g, ' ');

try {
  const output = execSync(`powershell -NoProfile -Command "${psScript}"`, { encoding: 'utf8' });
  fs.writeFileSync(path.resolve(__dirname, 'image_profile.txt'), output, 'utf8');
  console.log("Successfully wrote profile to image_profile.txt");
} catch (e) {
  console.error("PowerShell failed:", e.message);
}
