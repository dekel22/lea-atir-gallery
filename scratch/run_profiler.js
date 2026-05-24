import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
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
console.log("Found image path:", fullPath);

const psScriptPath = path.resolve(__dirname, 'profile_image.ps1');
const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}" -ImagePath "${fullPath}"`;

console.log("Running command:", cmd);
exec(cmd, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
  if (error) {
    console.error("Execution error:", error);
  }
  if (stderr) {
    console.error("Stderr:", stderr);
  }
  
  const outputPath = path.resolve(__dirname, 'profile_output.txt');
  fs.writeFileSync(outputPath, stdout, 'utf8');
  console.log("Wrote profile output to:", outputPath);
});
