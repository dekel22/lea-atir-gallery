import fs from 'fs';
const content = fs.readFileSync('src/data/galleries.js', 'utf8');

const lookFor = [
  'הדברים כל כך קלים',
  'שקר השקיפות',
  'התנועה',
  'יצירת ה',
  'יומן מלחמה',
  'נוף'
];

const lines = content.split('\n');
lines.forEach((l, i) => {
  for (const word of lookFor) {
    if (l.includes(word)) {
      console.log(`${i+1}: ${l.trim()}`);
      break;
    }
  }
});
