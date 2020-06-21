// bin/build-flags.js

const fs = require('fs');
const { resolve } = require('path');

const yaml = require('js-yaml');

const files = ['default.flags.yaml'];

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
