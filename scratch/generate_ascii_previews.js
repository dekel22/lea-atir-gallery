import { execSync } from 'child_process';
import path from 'path';

const mediaFiles = [
  "media__1781427871679.jpg",
  "media__1781427871736.jpg",
  "media__1781427871743.jpg",
  "media__1781427871761.jpg"
];

const psScriptPath = path.resolve('scratch', 'ascii_art.ps1');

mediaFiles.forEach(f => {
  const fullPath = path.resolve('scratch', f);
  console.log(`\n=============================================================`);
  console.log(`FILE: ${f}`);
  console.log(`=============================================================`);
  const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}" -ImagePath "${fullPath}"`;
  try {
    const stdout = execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    console.log(stdout);
  } catch (err) {
    console.error(`Error generating ASCII for ${f}:`, err);
  }
});
