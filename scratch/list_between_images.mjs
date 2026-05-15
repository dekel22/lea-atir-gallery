import fs from 'fs';
import path from 'path';

const galleryDir = 'public/galleries/בין לבין';
const files = fs.readdirSync(galleryDir);

const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(f));

const images = imageFiles.map((f, i) => {
  const id = `between_between_${i}`;
  const url = `/galleries/בין לבין/${f}`;
  return {
    id,
    url,
    alt: f.replace(/\.[^/.]+$/, ""),
    orientation: "landscape" // Default, will fix later if I can get info
  };
});

console.log(JSON.stringify(images, null, 2));
