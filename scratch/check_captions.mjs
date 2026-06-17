import { galleries } from '../src/data/galleries.js';

let count = 0;
let total = 0;
galleries.forEach(g => {
  g.images.forEach(img => {
    if (img.caption) {
      total++;
      if (!img.captionEn) {
        count++;
        console.log(`Gallery: ${g.id}, Image URL: ${img.url}, Hebrew Caption: ${img.caption}`);
      }
    }
  });
});
console.log(`Total with Hebrew caption: ${total}, Missing English caption: ${count}`);
