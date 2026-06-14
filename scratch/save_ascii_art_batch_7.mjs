import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const mediaFiles = [
  "media__1781429848400.jpg",
  "media__1781429848873.jpg",
  "media__1781429848886.jpg",
  "media__1781429848921.jpg"
];

const psScriptPath = path.resolve('scratch', 'ascii_art.ps1');
let output = '';

mediaFiles.forEach(f => {
  const fullPath = path.resolve('scratch', f);
  output += `\n=============================================================\n`;
  output += `FILE: ${f}\n`;
  output += `=============================================================\n`;
  const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}" -ImagePath "${fullPath}"`;
  try {
    const stdout = execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    output += stdout + '\n';
  } catch (err) {
    output += `Error generating ASCII for ${f}: ${err.message}\n`;
  }
});

fs.writeFileSync('scratch/ascii_art_batch_7_results.txt', output);
console.log('Saved ASCII art results to scratch/ascii_art_batch_7_results.txt');
