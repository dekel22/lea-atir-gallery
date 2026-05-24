import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, '..', 'public', 'galleries', 'וריאציות על נושא');
const files = fs.readdirSync(targetDir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

files.forEach(f => {
  const fullPath = path.join(targetDir, f);
  const data = fs.readFileSync(fullPath);
  const hash = crypto.createHash('md5').update(data).digest('hex');
  console.log(`${f}: ${hash} (Size: ${data.length})`);
});
