import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { galleries } from '../src/data/galleries.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsPath = path.join(__dirname, '..', 'src', 'data', 'galleries.js');

const cherryGallery = galleries.find(g => g.id === 'gallery_2');
if (cherryGallery) {
  cherryGallery.images.forEach(img => {
    if (img.id === 'gallery_2_4') {
      img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
    } else if (img.id === 'gallery_2_5') {
      img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
    } else if (img.id === 'gallery_2_6') {
      img.caption = '100x70 ס"מ | טכניקה: צבע שמן על קרטון';
    } else if (img.id === 'gallery_2_7') {
      img.caption = '50x70 ס"מ | טכניקה: ארבע תמונות בצבעי שמן';
    } else if (img.id === 'gallery_2_8') {
      img.caption = '50x70 ס"מ | טכניקה: דיו';
    } else if (img.id === 'gallery_2_9') {
      img.caption = '50x70 ס"מ | טכניקה: דיו';
    } else if (img.id === 'gallery_2_10') {
      img.caption = '50x70 ס"מ | טכניקה: דיו';
    } else if (img.id === 'gallery_2_1') {
      img.caption = '50x70 ס"מ | טכניקה: דיו';
    } else if (img.id === 'gallery_2_11') {
      img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
    }
  });
}

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(galleries, null, 2) + ';\n';
fs.writeFileSync(jsPath, newContent, 'utf8');
console.log('Successfully added captions to galleries.js.');
