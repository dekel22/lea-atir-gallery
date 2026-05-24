import fs from 'fs';
const folders = fs.readdirSync('public/galleries');
console.log("Folders in galleries:", folders);
