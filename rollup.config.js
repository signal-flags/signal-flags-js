// rollup.config.js

import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

// Configure for this module.
const { name: packageName, version } = require('./package.json');
const moduleName = 'SignalFlags';
const repo = 'https://github.com/signal-flags/signal-flags-js';
const banner = `/** ${moduleName}
 * @link ${repo}
 * @copyright (c) 2020 OpenSums https://opensums.com/
 * @license MIT ${repo}/blob/master/LICENSE
 * @version ${version}
 */`;

module.exports = [
  {
    input: 'src/index.js',
    plugins: [json(), babel({ babelHelpers: 'bundled' })],
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
