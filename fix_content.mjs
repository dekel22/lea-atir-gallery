import fs from 'fs';

let content = fs.readFileSync('src/data/galleries.js', 'utf8');

// 1. מבטים של יום יום
content = content.replace(
  'על שהדברים כל כך קלים התהליך הנוכחי',
  'על שהדברים כל כך קלים, התהליך הנוכחי'
);

// 2. שקר השקיפות
content = content.replace(
  'לנושא השקר השקיפות בעבודתי',
  'לנושא השקיפות בעבודתי'
);

// 3. כמעט שחור לבן
content = content.replace(
  'מקור התנועה והתנועה של הדרך',
  'מקור התנועה של הדרך'
);

// 4. עירום מהמוזיאון
content = content.replace(
  'יצירת הנפח או הלחץ',
  'יצירת נפח או הלחץ'
);

// 6. יומן מלחמה
content = content.replace(
  '"longDescription": "היומן נוצר במלחמה האחרונה עם חמס בעזה, עם חיזבאללה בלבנון ועם איראן. מתוך קושי לשמוע כל הזמן',
  '"longDescription": "מתוך קושי לשמוע כל הזמן'
);

// 5. וריאציות על נושא
// Remove items with id: "כמעט שחור לבן5" and "כמעט שחור לבן6".
content = content.replace(
  /[\s]*\{\s*"id":\s*"כמעט שחור לבן[56]"[\s\S]*?\},?/g,
  ''
);

fs.writeFileSync('src/data/galleries.js', content, 'utf8');
console.log('Galleries text updated successfully');
