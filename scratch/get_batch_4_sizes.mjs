import fs from 'fs';
import path from 'path';

function getImageSize(filePath) {
  const buffer = fs.readFileSync(filePath);
  if (buffer[0] === 0xFF && buffer[1] === 0xD8) { // JPEG
    let pos = 2;
    while (pos < buffer.length) {
      if (buffer[pos] !== 0xFF) return null;
      const marker = buffer[pos + 1];
      if (marker >= 0xC0 && marker <= 0xC3) {
        return {
          height: buffer.readUInt16BE(pos + 5),
          width: buffer.readUInt16BE(pos + 7)
        };
      }
      pos += 2 + buffer.readUInt16BE(pos + 2);
    }
  }
  return null;
}

const mediaFiles = [
  "media__1781427871679.jpg",
  "media__1781427871736.jpg",
  "media__1781427871743.jpg",
  "media__1781427871761.jpg"
];

console.log("=== NEW MEDIA UPLOADS ===");
mediaFiles.forEach(f => {
  const size = getImageSize(path.join('scratch', f));
  console.log(`${f}: ${size ? `${size.width}x${size.height}` : 'unknown'}`);
});

console.log("\n=== ORIGINAL GALLERY FILES ===");
const origFiles = fs.readdirSync('scratch').filter(f => f.startsWith('orig_') && f.endsWith('.jpg'));
origFiles.forEach(f => {
  const size = getImageSize(path.join('scratch', f));
  console.log(`${f}: ${size ? `${size.width}x${size.height}` : 'unknown'}`);
});
