import fs from 'fs';
import path from 'path';

function getImageSize(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    if (buffer[0] === 0xFF && buffer[1] === 0xD8) { // JPEG
      let pos = 2;
      while (pos < buffer.length) {
        if (buffer[pos] !== 0xFF) return null;
        const marker = buffer[pos + 1];
        if (marker >= 0xC0 && marker <= 0xC3) {
          return {
            height: buffer.readUInt16BE(pos + 5),
            width: buffer.readUInt16BE(pos + 7)
          };
        }
        pos += 2 + buffer.readUInt16BE(pos + 2);
      }
    } else if (buffer[0] === 0x89 && buffer[1] === 0x50) { // PNG
      return {
        width: buffer.readUInt32BE(16),
        height: buffer.readUInt32BE(20)
      };
    }
  } catch (e) {}
  return null;
}

const filePath = 'src/data/galleries.js';
let fileContent = fs.readFileSync(filePath, 'utf8');
const arrayStart = fileContent.indexOf('[');
const arrayEnd = fileContent.lastIndexOf(']') + 1;
const galleries = JSON.parse(fileContent.substring(arrayStart, arrayEnd));

for (const gallery of galleries) {
  for (const img of gallery.images) {
    const fullPath = path.join('public', img.url);
    const size = getImageSize(fullPath);
    if (size) {
      img.orientation = size.width > size.height ? 'landscape' : 'portrait';
    } else {
      img.orientation = 'portrait'; // default
    }
  }
}

const newContent = '// This file contains the configuration for all galleries.\n' +
                   '// You can easily add a new gallery by adding a new object to this array.\n\n' +
                   'export const galleries = ' + JSON.stringify(galleries, null, 2) + ';';
fs.writeFileSync(filePath, newContent);
console.log('Added orientation to all images.');
