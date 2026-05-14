import fs from 'fs';

const dir = 'public/galleries/מבטים של יום יום 6-11-2003';
const files = fs.readdirSync(dir).filter(f => f.match(/\.(jpg|jpeg|png)$/i));

// Reorder based on my balanced plan
const order = [
  'מבטים1.jpg', 'מבטים7.jpg', 'מבטים3.jpg', 
  'מבטים10.jpg', 'מבטים4.jpg', 'מבטים11.jpg', 
  'מבטים13.jpg', 'מבטים5.jpg', 'מבטים12.jpg', 
  'מבטים14.jpg', 'מבטים6.jpg', 'מבטים15.jpg', 
  'מבטים16.jpg', 'מבטים8.jpg', 'מבטים17.jpg', 
  'מבטים18.jpg', 'מבטים9.jpg', 'מבטים20.jpg', 
  'מבטים19.jpg', 'מבטים23.jpg', 'מבטים24.jpg', 
  'מבטים21.jpg', 'מבטים25.jpg', 'מבטים26.jpg', 
  'מבטים22.jpg', 'מבטים27.jpg'
];

// Add any missing files at the end
const finalFiles = [...order];
files.forEach(f => {
  if (!finalFiles.includes(f)) finalFiles.push(f);
});

const images = finalFiles.map((f, i) => ({
  id: `gallery_1_${i}`,
  url: `/galleries/מבטים של יום יום 6-11-2003/${f}`,
  alt: f.replace(/\.(jpg|jpeg|png)$/i, '')
}));

const filePath = 'src/data/galleries.js';
let content = fs.readFileSync(filePath, 'utf8');

const start = content.indexOf('\"id\": \"gallery_1\"');
const imagesStart = content.indexOf('\"images\":', start);
const imagesEnd = content.indexOf(']', imagesStart) + 1;

const newImagesStr = '\"images\": ' + JSON.stringify(images, null, 2);
content = content.substring(0, imagesStart) + newImagesStr + content.substring(imagesEnd);

fs.writeFileSync(filePath, content);
console.log('Successfully reordered gallery_1 with ' + images.length + ' images.');
