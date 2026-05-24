import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetPath = path.resolve(__dirname, '..', 'src', 'data', 'galleries.js');

// Read existing galleries.js content
let content = fs.readFileSync(targetPath, 'utf8');

const arrayStart = content.indexOf('export const galleries =');
if (arrayStart === -1) {
  console.error("export statement not found!");
  process.exit(1);
}

const jsonString = content.substring(arrayStart + 'export const galleries ='.length).trim().replace(/;$/, '');
const galleries = JSON.parse(jsonString);

const gallery = galleries.find(g => g.id === 'transparent');
if (!gallery) {
  console.error("transparent gallery not found in array!");
  process.exit(1);
}

// Map filenames to captions:
gallery.images.forEach(img => {
  const url = img.url;
  if (url.includes('שקופים1.jpg')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים2.jpg')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים3.JPG')) {
    img.caption = '90x45 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים4.JPG')) {
    img.caption = '90x45 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים5.jpg')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים6.jpg')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים7.jpg')) {
    img.caption = '100x80 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים8.jpg')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן'; // Corrected typo 120x09 to 120x90
  } else if (url.includes('שקופים9.JPG')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים10.jpg')) {
    img.caption = '100x80 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים11.JPG')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים12.jpg')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים13.jpg')) {
    img.caption = '100x80 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים14.jpg')) {
    img.caption = '120x80 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים15.jpg')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים16.jpg')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים17.JPG')) {
    img.caption = '120x80 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים18.jpg')) {
    img.caption = '80x60 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים19.jpg')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים20.JPG')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקופים21.jpg')) {
    img.caption = '60x80 ס"מ | טכניקה: צבעי שמן';
  } else if (url.includes('שקר השקיפות2.JPG')) {
    img.caption = '120x90 ס"מ | טכניקה: צבעי שמן'; // Maps to שקר השקיפות 2 / שקופים 2
  } else {
    console.warn("Unmatched image url:", url);
  }
});

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(galleries, null, 2) + ';\n';

fs.writeFileSync(targetPath, newContent, 'utf8');
console.log('Successfully updated transparent captions in galleries.js.');
