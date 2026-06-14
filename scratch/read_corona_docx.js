import { exec } from 'child_process';
import path from 'path';

const docxPath = path.resolve('public', 'galleries', 'דיוקן קןרונה ברישום ואקוורל', 'דיוקן קןרונה ברישום ואקוורל', 'דיוקן קורונה1 2020.docx');
const psScriptPath = path.resolve('scratch', 'read_docx.ps1');
const cmd = `powershell -NoProfile -ExecutionPolicy Bypass -File "${psScriptPath}" -DocxPath "${docxPath}"`;

exec(cmd, { maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
  if (error) {
    console.error("Execution error:", error);
  }
  if (stderr) {
    console.error("Stderr:", stderr);
  }
  console.log("=== DOCX CONTENT ===");
  console.log(stdout);
});
