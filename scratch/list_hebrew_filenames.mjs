import fs from 'fs';
import path from 'path';

const dir = 'public/galleries/דיוקן קןרונה ברישום ואקוורל/דיוקן קןרונה ברישום ואקוורל';
const files = fs.readdirSync(dir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

files.forEach(f => {
  const stats = fs.statSync(path.join(dir, f));
  console.log(`${f} : ${stats.size} bytes`);
});
