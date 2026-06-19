import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('dist/assets');
const cssFile = files.find(f => f.endsWith('.css'));
if (cssFile) {
  const content = fs.readFileSync(path.join('dist/assets', cssFile), 'utf8');
  console.log('CSS File:', cssFile);
  
  // Find all rules containing "main"
  const regex = /[^}]*main[^}]*\{[^}]*\}/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    console.log('Match:\n', match[0]);
  }
} else {
  console.log('No CSS file found');
}
