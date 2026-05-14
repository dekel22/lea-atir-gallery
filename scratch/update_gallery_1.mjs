import fs from 'fs';

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf8');

const oldTitle = '2003. 6.11–   מבטים של יום יום גלריה לאומנות קסטרא חיפה';
const newTitle = 'מבטים של יום יום 6/11/2003';

const oldPath = '/galleries/2003. 6.11–   מבטים של יום יום גלריה לאומנות קסטרא חיפה/';
const newPath = '/galleries/מבטים של יום יום 6-11-2003/';

// Replace all occurrences of the title
content = content.split(oldTitle).join(newTitle);

// Replace all occurrences of the path
content = content.split(oldPath).join(newPath);

fs.writeFileSync(filePath, content);
console.log('Successfully updated gallery_1.');
