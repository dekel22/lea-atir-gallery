import fs from 'fs';
const folders = fs.readdirSync('public/galleries');
folders.forEach(f => {
  if (f.startsWith('ב')) {
    console.log(`Folder: "${f}", length: ${f.length}, chars: ${[...f].map(c => c.charCodeAt(0).toString(16)).join(' ')}`);
  }
});
