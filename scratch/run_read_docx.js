import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '..', 'public', 'galleries', 'עירום מהמוזיאון');
const docxPath = path.join(targetDir, '1.docx');

const psScriptPath = path.resolve(__dirname, 'read_docx.ps1');
const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}" -DocxPath "${docxPath}"`;

exec(cmd, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
  if (error) {
    console.error("Execution error:", error);
  }
  if (stderr) {
    console.error("Stderr:", stderr);
  }
  console.log(stdout);
});
