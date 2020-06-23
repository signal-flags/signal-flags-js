// bin/build-flags.js

const fs = require('fs');
const { resolve } = require('path');

const { getFlags, VERSION } = require('../dist/signal-flags');

const flags = getFlags();
const svgFlags = flags.getSvg(null, {
  outline: true,
  file: true,
  colors: {
    white: '#fff', // Just dark enough to work with no border.
    // white: '#eee', // Just dark enough to work with no border.
    blue: '#0033A0', // Pantone 286 Heraldic blue.
    green: '#4A7729', // Pantone 364 Green
    red: '#C8102E', // Pantone 186 Red
    yellow: '#FFC72C', // Pantone 123 deep yellow. Attractive, not as bright.
    black: '#111',
  },
});
const outFileId = '240x180';
const outBase = resolve(__dirname, '..', 'dist', 'assets', 'flags');
const outPath = resolve(outBase, `svg-${outFileId}`);

try {
  fs.mkdirSync(outPath, { recursive: true });
} catch (e) {
  // It already existed.
}

Object.entries(svgFlags).forEach(([key, svg]) => {
  const category = flags.flags.flags[key].category || 'flag';
  const outFileName = `${category}-${key}-${outFileId}.svg`;
  const outFile = svg;
  fs.writeFileSync(resolve(outPath, outFileName), outFile);
});

/*
// const files = ['default.flags.yaml'];

// Get document, or throw exception on error
try {
  const inPath = resolve(__dirname, '..', 'designs');
  const outPath = resolve(__dirname, '..', 'src', 'designs');
  files.forEach((file) => {
    const inFile = fs.readFileSync(resolve(inPath, file), 'utf8');
    const json = JSON.stringify(yaml.safeLoad(inFile));
    const outFile = `export default ${json};`;
    const outFileName = file.split('.');
    outFileName[outFileName.length - 1] = 'js';
    fs.writeFileSync(resolve(outPath, outFileName.join('.')), outFile);
  });
} catch (e) {
  console.log(e);
}
*/
