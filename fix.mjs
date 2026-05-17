import fs from 'fs';
import path from 'path';

const fixFile = (file) => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import React, \{/g, 'import {');
  content = content.replace(/import React from 'react';\r?\n?/g, '');
  fs.writeFileSync(file, content);
};

const files = [
  'src/App.jsx',
  'src/components/Footer.jsx',
  'src/components/Navbar.jsx',
  'src/pages/About.jsx',
  'src/pages/Contact.jsx',
  'src/pages/Galleries.jsx',
  'src/pages/Gallery.jsx',
  'src/pages/Home.jsx',
  'src/pages/Success.jsx'
];

files.forEach(f => fixFile(path.join(process.cwd(), f)));

let contact = fs.readFileSync('src/pages/Contact.jsx', 'utf8');
contact = contact.replace(/import \{ useState \} from 'react';\r?\n?/, '');
fs.writeFileSync('src/pages/Contact.jsx', contact);

let eslint = fs.readFileSync('eslint.config.js', 'utf8');
eslint = eslint.replace(/globalIgnores\(\['dist'\]\)/, "globalIgnores(['dist', 'src/data/galleries_temp.js'])");
fs.writeFileSync('eslint.config.js', eslint);

console.log('Fixed ESLint issues');
