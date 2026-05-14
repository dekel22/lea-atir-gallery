import fs from 'fs';

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf8');

// The incorrect URLs that were generated
const badPathPart = '/galleries/ש.ב.ר 2026/';
const goodPathPart = '/galleries/2026- ש.ב.ר רמות מנשה גלריה לאומנות/';

content = content.split(badPathPart).join(goodPathPart);

fs.writeFileSync(filePath, content);
console.log('Fixed URLs for gallery_3 to point to the existing folder.');
