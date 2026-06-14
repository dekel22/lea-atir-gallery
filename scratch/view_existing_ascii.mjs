import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const targetDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';
const files = [
  'דיוקן קורונה21.jpg',
  'דיוקן קורונה22.jpg',
  'דיוקן קורונה31.jpg'
];

const psScriptPath = path.resolve('scratch', 'ascii_art.ps1');
let output = '';

files.forEach(f => {
  const fullPath = path.join(targetDir, f);
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

fs.writeFileSync('scratch/existing_ascii_results.txt', output);
console.log('Saved ASCII art results to scratch/existing_ascii_results.txt');
