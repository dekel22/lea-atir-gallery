import fs from 'fs';

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf8');

// The incorrect URLs that were generated
const oldPathPart = '/galleries/מבטים של יום יום 6/11/2003/';
const newPathPart = '/galleries/מבטים של יום יום 6-11-2003/';

content = content.split(oldPathPart).join(newPathPart);

fs.writeFileSync(filePath, content);
console.log('Fixed URLs for gallery_1.');
