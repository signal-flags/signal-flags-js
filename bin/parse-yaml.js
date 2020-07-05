// bin/build-flags.js

const fs = require('fs');
const { resolve } = require('path');

const yaml = require('js-yaml');

const files = ['default.flags.yaml'];

// Get document, or throw exception on error
try {
  const inPath = resolve(__dirname, '..', 'designs');
  const outPath = resolve(__dirname, '..', 'src');
  files.forEach((file) => {
    const inFile = fs.readFileSync(resolve(inPath, file), 'utf8');
    const json = JSON.stringify(yaml.safeLoad(inFile), null, 2);
    const outFileName = file.split('.');
    const outFile = `// ${outFileName}\nexport default ${json};\n`;
    outFileName[outFileName.length - 1] = 'js';
    fs.writeFileSync(resolve(outPath, outFileName.join('.')), outFile);
  });
} catch (e) {
  console.log(e);
}
