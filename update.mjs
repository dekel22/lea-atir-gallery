import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsPath = path.join(__dirname, 'src', 'data', 'galleries.js');

import { galleries } from './src/data/galleries.js';

function getAllFiles(dirPath, arrayOfFiles) {
  try {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function(file) {
      if (fs.statSync(dirPath + '/' + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(dirPath, '/', file));
      }
    });
    return arrayOfFiles;
  } catch (e) {
    return arrayOfFiles || [];
  }
}

galleries.forEach((gallery, gIndex) => {
  let folderName = gallery.title;
  
  if (folderName) folderName = decodeURIComponent(folderName);
  
  let dirPath = path.join(__dirname, 'public', 'galleries', folderName);
  
  if (!fs.existsSync(dirPath)) {
    if (gallery.images && gallery.images.length > 0 && gallery.images[0].url.startsWith('/galleries/')) {
        folderName = decodeURIComponent(gallery.images[0].url.split('/')[2]);
        dirPath = path.join(__dirname, 'public', 'galleries', folderName);
    }
  }

  if (!fs.existsSync(dirPath)) {
    console.log('Directory not found for gallery:', gallery.title);
    return;
  }
  
  const allFiles = getAllFiles(dirPath);
  const imagesFiles = allFiles.filter(f => f.match(/\.(jpg|jpeg|png)$/i));
  
  const newImages = imagesFiles.map((f, j) => {
    const relPath = f.split('public')[1].replace(/\\/g, '/');
    return {
      id: gallery.id + '_' + j,
      url: relPath,
      alt: path.basename(f).replace(/\.[^/.]+$/, '')
    };
  });
  
  if (newImages.length > 0) {
    gallery.images = newImages;
    gallery.coverImage = newImages[0].url;
  }
});

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(galleries, null, 2) + ';\n';

fs.writeFileSync(jsPath, newContent, 'utf8');
console.log('Successfully synchronized galleries.js with files on disk.');
