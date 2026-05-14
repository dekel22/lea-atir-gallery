import fs from 'fs';

const oldPath = 'public/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות';
const newPath = 'public/galleries/ש.ב.ר 2026';

if (fs.existsSync(oldPath)) {
  fs.renameSync(oldPath, newPath);
  console.log('Successfully renamed folder.');
} else {
  console.log('Old folder not found.');
}

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf8');

const oldTitle = '2026- ש.ב.ר רמות מנשה גלריה לאומנות';
const newTitle = 'ש.ב.ר 2026';

const oldPathPart = '/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/';
const newPathPart = '/galleries/ש.ב.ר 2026/';

content = content.split(oldTitle).join(newTitle);
content = content.split(oldPathPart).join(newPathPart);

fs.writeFileSync(filePath, content);
console.log('Successfully updated galleries.js.');
