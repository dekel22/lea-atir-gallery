import fs from 'fs';
import path from 'path';

function listFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      listFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const galleriesPath = 'public/galleries';
const allFiles = listFiles(galleriesPath);
console.log(JSON.stringify(allFiles, null, 2));
