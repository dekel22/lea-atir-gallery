import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const targetDir = 'public/galleries/קמניץ גרמניה עם אוסמר אוסטן';
const files = [
  'קמניץ7.jpg',
  'קמניץ16.jpg'
];

const psScriptPath = path.resolve('scratch', 'ascii_art.ps1');
let output = '';

files.forEach(f => {
  const fullPath = path.join(targetDir, f);
  if (!fs.existsSync(fullPath)) {
    console.error(`File does not exist: ${fullPath}`);
    return;
  }
  
  const size = fs.statSync(fullPath).size;
  output += `\n=============================================================\n`;
  output += `FILE: ${f} (Size: ${size} bytes)\n`;
  output += `=============================================================\n`;
  
  const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}" -ImagePath "${fullPath}"`;
  try {
    const stdout = execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    output += stdout + '\n';
  } catch (err) {
    output += `Error generating ASCII for ${f}: ${err.message}\n`;
  }
});

fs.writeFileSync('scratch/chemnitz_ascii_results.txt', output);
console.log('Saved ASCII art results to scratch/chemnitz_ascii_results.txt');
