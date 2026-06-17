import { galleries } from '../src/data/galleries.js';

const parsed = galleries.map(g => {
  let year = null;
  // Try to find 4-digit year in title
  let match = g.title.match(/\b(19\d{2}|20\d{2})\b/);
  if (match) {
    year = parseInt(match[1]);
  } else {
    // Try to find in description
    match = g.description.match(/\b(19\d{2}|20\d{2})\b/);
    if (match) {
      year = parseInt(match[1]);
    } else {
      // Try to find in longDescription
      match = g.longDescription ? g.longDescription.match(/\b(19\d{2}|20\d{2})\b/) : null;
      if (match) {
        year = parseInt(match[1]);
      }
    }
  }
  return { id: g.id, title: g.title, year };
});

console.log(JSON.stringify(parsed, null, 2));
