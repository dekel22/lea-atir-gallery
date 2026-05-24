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
console.log("Found image path to crop:", fullPath);

const cropX = 278;
const cropY = 88;
const cropW = 874; // 1152 - 278
const cropH = 772; // 860 - 88

const escapedPath = fullPath.replace(/'/g, "''");
const tempPath = `${fullPath}.tmp.jpg`;
const escapedTempPath = tempPath.replace(/'/g, "''");

const psScript = `
  Add-Type -AssemblyName System.Drawing;
  $srcBmp = [System.Drawing.Bitmap]::FromFile('${escapedPath}');
  $rect = New-Object System.Drawing.Rectangle(${cropX}, ${cropY}, ${cropW}, ${cropH});
  $destBmp = $srcBmp.Clone($rect, $srcBmp.PixelFormat);
  $destBmp.Save('${escapedTempPath}', [System.Drawing.Imaging.ImageFormat]::Jpeg);
  $srcBmp.Dispose();
  $destBmp.Dispose();
`.replace(/\r?\n/g, ' ');

try {
  console.log("Running crop in PowerShell...");
  execSync(`powershell -NoProfile -Command "${psScript}"`);
  
  // Overwrite original
  fs.renameSync(tempPath, fullPath);
  console.log("Successfully cropped image and saved to:", fullPath);
  
  // Let's print new size using System.Drawing to confirm
  const checkScript = `
    Add-Type -AssemblyName System.Drawing;
    $img = [System.Drawing.Image]::FromFile('${escapedPath}');
    Write-Output "New Width=$($img.Width) Height=$($img.Height)";
    $img.Dispose();
  `.replace(/\r?\n/g, ' ');
  const checkOutput = execSync(`powershell -NoProfile -Command "${checkScript}"`, { encoding: 'utf8' }).trim();
  console.log(checkOutput);
  
} catch (e) {
  console.error("Failed to crop image:", e.message);
  if (fs.existsSync(tempPath)) {
    fs.unlinkSync(tempPath);
  }
}
