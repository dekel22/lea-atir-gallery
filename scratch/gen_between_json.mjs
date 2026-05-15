import fs from 'fs';
import path from 'path';

const galleryDir = 'public/galleries/בין לבין';
const files = fs.readdirSync(galleryDir);

const imageFiles = files.filter(f => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(f));

// I'll just assume landscape for now or try to use a dummy check
// Since I don't have an easy way to check orientation without a library
// I'll just list them all.

const images = imageFiles.map((f, i) => {
  const url = `/galleries/בין לבין/${f}`;
  return {
    id: `between_${i}`,
    url,
    alt: f.replace(/\.[^/.]+$/, ""),
    orientation: "landscape"
  };
});

console.log(JSON.stringify(images, null, 2));
