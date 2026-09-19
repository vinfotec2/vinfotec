// Converts source artwork into web-sized WebP files.
//
//   npm run optimize:images -- "C:/path/to/folder" services
//   npm run optimize:images -- "C:/path/to/folder" projects
//
// Source files are expected to be named 1.png, 2.png, ... matching the order
// of the corresponding array in src/data/site.js. Originals are 1-2 MB each,
// far too heavy to ship; this resizes and re-encodes them as WebP.

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const SETS = {
  // Service cards render ~290px wide, so 800px covers 2x displays.
  services: {
    dir: 'public/images/services',
    width: 800,
    names: [
      'app-development',
      'web-development',
      'wordpress-development',
      'salesforce-development',
      'gen-ai-solutions',
      'ui-ux-design',
      'database-security',
      'cybersecurity',
    ],
  },
  // Portfolio images fill half a card and are cropped to roughly square, so
  // they need more height than width alone would suggest.
  projects: {
    dir: 'public/images/projects',
    width: 900,
    names: [
      'ecommerce',
      'fitness',
      'banking',
      'healthcare',
      'restaurant',
      'travel',
    ],
  },
};

const QUALITY = 82;

const [source, setName = 'services'] = process.argv.slice(2);
const set = SETS[setName];

if (!source || !set) {
  console.error(
    `Usage: npm run optimize:images -- "<source folder>" [${Object.keys(SETS).join('|')}]`
  );
  process.exit(1);
}

fs.mkdirSync(set.dir, { recursive: true });

let totalIn = 0;
let totalOut = 0;

for (const [i, name] of set.names.entries()) {
  const input = path.join(source, `${i + 1}.png`);
  if (!fs.existsSync(input)) {
    console.warn(`skipped ${i + 1}.png (not found)`);
    continue;
  }

  const output = path.join(set.dir, `${name}.webp`);
  await sharp(input).resize({ width: set.width }).webp({ quality: QUALITY }).toFile(output);

  const inKb = fs.statSync(input).size / 1024;
  const outKb = fs.statSync(output).size / 1024;
  totalIn += inKb;
  totalOut += outKb;

  console.log(
    `${name.padEnd(24)} ${inKb.toFixed(0).padStart(5)} KB -> ${outKb.toFixed(0).padStart(4)} KB`
  );
}

console.log(
  `\ntotal ${(totalIn / 1024).toFixed(2)} MB -> ${(totalOut / 1024).toFixed(2)} MB ` +
    `(${(100 - (totalOut / totalIn) * 100).toFixed(1)}% smaller)`
);
