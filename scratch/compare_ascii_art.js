import { execSync } from 'child_process';
import path from 'path';

const psScriptPath = path.resolve('scratch', 'ascii_art.ps1');

const files = [
  'scratch/orig_דיוקן קורונה4.jpg',
  'scratch/media__1781429848873.jpg'
];

files.forEach(f => {
  const fullPath = path.resolve(f);
  console.log(`\n=============================================================`);
  console.log(`FILE: ${f}`);
  console.log(`=============================================================`);
  const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}" -ImagePath "${fullPath}"`;
  try {
    const stdout = execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    console.log(stdout);
  } catch (err) {
    console.error(`Error:`, err.message);
  }
});
