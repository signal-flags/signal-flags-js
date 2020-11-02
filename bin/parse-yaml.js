// bin/build-flags.js

const { readFile, writeFile } = require('fs').promises;
const { resolve } = require('path');

const yaml = require('js-yaml');
const { format } = require('prettier');
const prettierOptions = require('../.prettierrc');

const outPath = 'src';
const myPath = '..';
const files = ['src/default-flags.yaml'];

// Build one file from YAML into JSON.
async function buildFile(path, outPath) {
  // Read the file in.
  let parsed = await readFile(resolve(__dirname, myPath, path), 'utf8');
  // Convert from yaml into pretty JSON.
  parsed = JSON.stringify(yaml.safeLoad(parsed), null, 2);
  // Add a header to turn it into JS.
  const outFileName =
    path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.')) + '.js';
  parsed = `// ${outFileName}\nexport default ${parsed};\n`;
  // Make it even prettier.
  parsed = format(parsed, prettierOptions);
  // Write it out.
  await writeFile(resolve(__dirname, myPath, outPath, outFileName), parsed);
  return { file: outFileName, size: parsed.length };
}

// Need to set this to avoid deprecation warning when parsing from a string.
prettierOptions.parser = 'babel';
const promises = [];

files.forEach((file) => {
  promises.push(
    buildFile(file, outPath)
      .catch((err) => {
        console.log('Error building', file, err);
        throw err;
      })
      .then((res) => {
        console.log('Built', file, res);
      })
  );
});

Promise.all(promises);
