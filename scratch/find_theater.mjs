import fs from 'fs';

const fileContent = fs.readFileSync('src/data/galleries.js', 'utf8');

// Parse the file. We'll use regex to find the start of the object with title "תפאורות להצגות"
// Since galleries is a JS array export, it's safer to just do string manipulation if we know the boundaries,
// or we can just change the sorting in Galleries.jsx.

console.log(fileContent.indexOf('תפאורות להצגות'));
