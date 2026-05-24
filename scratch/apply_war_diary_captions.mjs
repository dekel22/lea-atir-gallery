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

// Reset changes on galleries.js to prevent accumulation of incorrect captions
// We can do this by discarding current changes using git checkout, or just parsing the file
// But since we just want to run it on the clean git version, let's read the file again.
// To do this, we can run 'git checkout src/data/galleries.js' first or we can just let the script run on a clean copy.
// Let's make the script self-contained and run checkout if we want, or we can just let node script run after checkout.
// Actually, we can run checkout using run_command, or we can just rewrite galleries.js.
// Since we want galleries.js to be clean, let's run git checkout src/data/galleries.js first in the command line,
// then execute this script.

const jsonString = content.substring(arrayStart + 'export const galleries ='.length).trim().replace(/;$/, '');
const galleries = JSON.parse(jsonString);

const gallery = galleries.find(g => g.id === 'war-diary');
if (!gallery) {
  console.error("war-diary gallery not found in array!");
  process.exit(1);
}

// Map filenames to captions:
gallery.images.forEach(img => {
  const url = img.url;
  if (url.endsWith('/יומן מלחמה מגן דוד.jpg') || url.endsWith('/יומןמלחמה מגן דוד.jpg')) {
    img.caption = '29x21 ס"מ | טכניקה: פחם סינטטי שחור';
  } else if (url.endsWith('/יומן מלחמה1.jpg')) {
    img.caption = 'תשע תמונות, כל אחת 21x29 ס"מ | טכניקה: גרפית, אחת סנגווין';
  } else if (url.endsWith('/יומן מלחמה2.jpg')) {
    img.caption = 'שתי תמונות, כל אחת 21x29 ס"מ | טכניקה: פחם סינטטי';
  } else if (url.endsWith('/יומן מלחמה3.jpg')) {
    img.caption = 'שתי תמונות, כל אחת 21x29 ס"מ | טכניקה: פחם סינטטי';
  } else if (url.endsWith('/יומן מלחמה4.jpg')) {
    img.caption = 'שלוש תמונות, כל אחת 21x29 ס"מ | טכניקה: סנגווין';
  } else if (url.endsWith('/יומן מלחמה5.jpg')) {
    img.caption = '21x29 ס"מ | טכניקה: סנגווין';
  } else if (url.endsWith('/יומן מלחמה6.jpg')) {
    img.caption = 'שתי תמונות, כל אחת 21x29 ס"מ | טכניקה: סנגווין';
  } else if (url.endsWith('/יומן מלחמה8.jpg')) {
    img.caption = 'שתי תמונות, כל אחת 21x29 ס"מ | טכניקה: פחם סינטטי שחור';
  } else if (url.endsWith('/יומן מלחמה10.jpg')) {
    img.caption = 'רושמת | טכניקה: סנגווין';
  } else if (url.endsWith('/יומן מלחמה11.jpg')) {
    img.caption = 'רושמת | טכניקה: סנגווין';
  } else if (url.endsWith('/יומן מלחמה12.jpg')) {
    img.caption = '21x29 ס"מ | טכניקה: פחם סינטטי שחור';
  } else if (url.endsWith('/יומן מלחמה13.jpg')) {
    img.caption = '21x29 ס"מ | טכניקה: סנגווין ופחם סינטטי';
  } else if (url.endsWith('/יומן מלחמה14.jpg')) {
    img.caption = '21x29 ס"מ | טכניקה: פחם סינטטי שחור';
  } else if (url.endsWith('/יומן מלחמה16.jpg')) {
    img.caption = '21x29 ס"מ | טכניקה: פחם סינטטי';
  } else if (url.endsWith('/יומן מלחמה17.jpg')) {
    img.caption = '21x29 ס"מ | טכניקה: פחם סינטטי';
  } else if (url.endsWith('/יומן מלחמה18.jpg')) {
    img.caption = '21x29 ס"מ | טכניקה: פחם סינטטי';
  } else if (url.endsWith('/יומן מלחמה19.jpg')) {
    img.caption = '21x29 ס"מ | טכניקה: פחם סינטטי';
  } else if (url.endsWith('/יומן מלחמה21.jpg')) {
    img.caption = '21x29 ס"מ | טכניקה: פחם סינטטי';
  } else if (url.endsWith('/יומן מלחמה22.jpg')) {
    img.caption = '21x29 ס"מ | טכניקה: פחם סינטטי';
  } else if (url.endsWith('/יונן מלחמה15.jpg')) {
    img.caption = '21x29 ס"מ | טכניקה: סנגווין ופחם סינטטי';
  } else if (url.endsWith('/קיר יומן מלחמה בתערוכה.jpg')) {
    img.caption = '240x120 ס"מ';
  } else if (url.endsWith('/קיר יומן מלחמה2.jpg')) {
    img.caption = '240x120 ס"מ';
  } else {
    console.warn("Unmatched image url:", url);
  }
});

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(galleries, null, 2) + ';\n';

fs.writeFileSync(targetPath, newContent, 'utf8');
console.log('Successfully updated war-diary captions in galleries.js.');
