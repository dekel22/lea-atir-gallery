import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { galleries } from '../src/data/galleries.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const targetPath = path.join(__dirname, '..', 'src', 'data', 'galleries.js');

const targetOrder = [
  'transparent',          // 1. שקר השקיפות
  'silver',               // 2. כסף
  'gallery_1',            // 3. מבטים של יום יום
  'brosh',                // 4. ברוש
  'gallery_6',            // 5. דיוקן קורונה ברישום ואקוארל
  'gallery_0',            // 6. רישום ואני
  'gallery_3',            // 7. ש.ב.ר
  'war-diary',            // 8. יומן מלחמה
  'scenery-pieces',       // 9. פיסות נוף
  'gallery_5',            // 10. באקוורל
  'miki',                 // 11. מיקי
  'almost-black-and-white',// 12. כמעט שחור לבן
  'chemnitz',             // 13. קמניץ
  'between-between',      // 14. בין לבין
  'gallery_7',            // 15. וריאציות על נושא
  'nude',                 // 16. עירום לאורך השנים
  'gallery_2',            // 17. גן הדובדבנים
  'nude-museum',          // 18. עירום מהמוזיאון
  'scenery',              // 19. תפאורות להצגות
  'gallery_4'             // 20. אדם וריבוע (hidden/filtered)
];

const sortedGalleries = [];

// First, put galleries that are in targetOrder in the correct order
targetOrder.forEach(id => {
  const g = galleries.find(item => item.id === id);
  if (g) {
    sortedGalleries.push(g);
  }
});

// Second, put any other galleries that weren't in targetOrder at the end (just in case)
galleries.forEach(g => {
  if (!sortedGalleries.some(item => item.id === g.id)) {
    sortedGalleries.push(g);
  }
});

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(sortedGalleries, null, 2) + ';\n';

fs.writeFileSync(targetPath, newContent, 'utf8');
console.log('Successfully reordered galleries in galleries.js.');
