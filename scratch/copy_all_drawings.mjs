import fs from 'fs';
import path from 'path';

const srcDir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';
const destDir = 'scratch';

const files = fs.readdirSync(srcDir).filter(f => f.match(/^דיוקן קורונה\d+\.jpg$/i));

files.forEach(f => {
  const src = path.join(srcDir, f);
  const dest = path.join(destDir, 'orig_' + f);
  fs.copyFileSync(src, dest);
  console.log(`Copied ${f}`);
});
