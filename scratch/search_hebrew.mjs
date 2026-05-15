import fs from 'fs';
import path from 'path';

function searchFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.git') {
        searchFiles(filePath);
      }
    } else {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('בין')) {
        console.log(filePath);
      }
    }
  });
}

searchFiles('.');
