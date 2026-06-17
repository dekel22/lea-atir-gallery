import { galleries } from '../src/data/galleries.js';

const techniques = new Set();
const fullCaptions = new Set();

galleries.forEach(g => {
  g.images.forEach(img => {
    if (img.caption) {
      fullCaptions.add(img.caption);
      const parts = img.caption.split('|');
      if (parts.length > 1) {
        techniques.add(parts[1].trim());
      } else {
        techniques.add(img.caption.trim());
      }
    }
  });
});

console.log("=== UNIQUE TECHNIQUES ===");
techniques.forEach(t => console.log(t));
console.log(`\nTotal unique techniques: ${techniques.size}`);
console.log(`Total unique captions: ${fullCaptions.size}`);
