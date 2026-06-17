import { galleries } from '../src/data/galleries.js';

galleries.forEach(g => {
  console.log(`Gallery: ${g.id} (${g.title})`);
  g.images.slice(0, 10).forEach(img => {
    console.log(`  - URL: ${img.url}`);
    if (img.caption) console.log(`    Caption: ${img.caption}`);
  });
});
