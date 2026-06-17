import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { galleries } from '../src/data/galleries.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsPath = path.resolve(__dirname, '..', 'src', 'data', 'galleries.js');

function translateCaption(caption) {
  if (!caption) return undefined;
  
  const parts = caption.split('|');
  const translatedParts = parts.map(part => {
    let p = part.trim();
    
    if (p.includes('ס"מ')) {
      p = p.replace('ס"מ', 'cm');
    }
    if (p.startsWith('גודל:')) {
      p = p.replace('גודל:', 'Size:');
    }
    
    const techniquesMap = {
      'טכניקה: צבעי שמן': 'Technique: Oil paints',
      'הזמנה לתערוכה': 'Exhibition invitation',
      'טכניקה: גרפית עם צבעי שמן': 'Technique: Graphite with oil paints',
      'טכניקה: גרפית': 'Technique: Graphite',
      'טכניקה: רישום פחם סינטטי': 'Technique: Synthetic charcoal drawing',
      'טכניקה: אקוורל': 'Technique: Watercolor',
      'טכניקה: אקריליק': 'Technique: Acrylic',
      'טכניקה: אקריליק וגרפית': 'Technique: Acrylic and graphite',
      'טכניקה: פחם סינטטי': 'Technique: Synthetic charcoal',
      'טכניקה: רישום וגרפית': 'Technique: Drawing and graphite',
      'טכניקה: פחם סינטטי שחור': 'Technique: Black synthetic charcoal',
      'טכניקה: גרפית, אחת סנגווין': 'Technique: Graphite, one sanguine',
      'טכניקה: סנגווין': 'Technique: Sanguine',
      'טכניקה: סנגווין ופחם סינטטי': 'Technique: Sanguine and synthetic charcoal',
      'טכניקה: צבע שמן ועיפרון גרפית': 'Technique: Oil paint and graphite pencil',
      'טכניקה: פחמים': 'Technique: Charcoal',
      'טכניקה: שמן וגרפית': 'Technique: Oil and graphite',
      'טכניקה: צבע שמן': 'Technique: Oil paint',
      'טכניקה: אקריליק וגירים': 'Technique: Acrylic and pastels',
      'טכניקה: אקריליק ופחם': 'Technique: Acrylic and charcoal',
      'טכניקה: צבע אקריליק ופחם': 'Technique: Acrylic paint and charcoal',
      'טכניקה: צבעי שמן עם גירים שמנים': 'Technique: Oil paints with oil pastels',
      'טכניקה: עיפרון רך': 'Technique: Soft pencil',
      'טכניקה: אקריליק ופחמים סינטטיים': 'Technique: Acrylic and synthetic charcoal',
      'טכניקה: דיו': 'Technique: Ink',
      'טכניקה: צבע שמן על קרטון': 'Technique: Oil paint on cardboard',
      'טכניקה: ארבע תמונות בצבעי שמן': 'Technique: Four paintings in oil paints',
      'טכניקה: עיפרון גרפית': 'Technique: Graphite pencil',
      'טכניקה: אקריליק וגיר לבן': 'Technique: Acrylic and white chalk',
      'טכניקה: גירים': 'Technique: Pastels',
      'טכניקה: גרפית | מצע: נייר': 'Technique: Graphite | Medium: Paper',
      'טכניקה: אקריליק | מצע: נייר': 'Technique: Acrylic | Medium: Paper',
      'טכניקה: גירים | מצע: נייר חום': 'Technique: Pastels | Medium: Brown paper',
      'מצע: נייר': 'Medium: Paper',
      'מצע: נייר חום': 'Medium: Brown paper'
    };
    
    if (techniquesMap[p]) {
      return techniquesMap[p];
    }
    
    let temp = p;
    temp = temp.replace('טשע תמונות, כל אחת', 'Nine pictures, each');
    temp = temp.replace('תשע תמונות, כל אחת', 'Nine pictures, each');
    temp = temp.replace('שתי תמונות, כל אחת', 'Two pictures, each');
    temp = temp.replace('שלוש תמונות, כל אחת', 'Three pictures, each');
    temp = temp.replace('רושמת', 'Drawing');
    temp = temp.replace("ג'סו מרוח על", 'gesso on');
    temp = temp.replace("ג'סו על", 'gesso on');
    
    temp = temp.replace('טכניקה:', 'Technique:');
    temp = temp.replace('מצע:', 'Medium:');
    temp = temp.replace('נייר חום', 'brown paper');
    temp = temp.replace('נייר', 'paper');
    temp = temp.replace('צבעי שמן', 'oil paints');
    temp = temp.replace('צבע שמן', 'oil paint');
    temp = temp.replace('גרפית', 'graphite');
    temp = temp.replace('פחם סינטטי', 'synthetic charcoal');
    temp = temp.replace('אקוורל', 'watercolor');
    temp = temp.replace('אקריליק', 'acrylic');
    temp = temp.replace('סנגווין', 'sanguine');
    temp = temp.replace('דיו', 'ink');
    temp = temp.replace('גירים', 'pastels');
    temp = temp.replace('עיפרון גרפית', 'graphite pencil');
    temp = temp.replace('פחמים', 'charcoal');
    
    return temp;
  });
  
  return translatedParts.join(' | ');
}

let count = 0;
galleries.forEach(g => {
  g.images.forEach(img => {
    if (img.caption && !img.captionEn) {
      img.captionEn = translateCaption(img.caption);
      count++;
    }
  });
});

const newContent = '// This file contains the configuration for all galleries.\n// You can easily add a new gallery by adding a new object to this array.\n\nexport const galleries = ' + JSON.stringify(galleries, null, 2) + ';\n';
fs.writeFileSync(jsPath, newContent, 'utf8');

console.log(`Successfully added ${count} missing English captions to galleries.js.`);
