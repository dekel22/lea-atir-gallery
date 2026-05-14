import fs from 'fs';
import path from 'path';

// Minimal JPEG/PNG size parser
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
  } else if (buffer[0] === 0x89 && buffer[1] === 0x50) { // PNG
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20)
    };
  }
  return null;
}

const dir = 'public/galleries/מבטים של יום יום 6-11-2003';
const files = fs.readdirSync(dir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

const info = files.map(f => {
  const size = getImageSize(path.join(dir, f));
  return {
    file: f,
    ...size,
    orientation: size ? (size.width > size.height ? 'landscape' : 'portrait') : 'unknown'
  };
});

console.log(JSON.stringify(info, null, 2));
