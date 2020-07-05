// rollup.config.js

import { terser } from 'rollup-plugin-terser';

import json from '@rollup/plugin-json';

// Configure for this module.
const { name: packageName, version } = require('./package.json');
const moduleName = 'SignalFlags';
const banner = `/** ${moduleName}
 * @link https://github.com/opensums/${packageName}
 * @copyright (c) 2020 OpenSums https://opensums.com
 * @license MIT
 * @version ${version}
 */`;

module.exports = [
  {
    input: 'src/index.js',
    plugins: [json()],
    output: [
      {
        file: `dist/${packageName}.js`,
        name: moduleName,
        format: 'umd',
        banner,
        sourcemap: true,
      },
      {
        file: `dist/${packageName}.min.js`,
        format: 'umd',
        name: moduleName,
        plugins: [terser()],
        banner,
        sourcemap: true,
      },
    ],
  },
];
