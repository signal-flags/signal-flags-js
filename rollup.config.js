// rollup.config.js

import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

// Configure for this module.
const { name: packageName, version } = require('./package.json');

const moduleName = 'SignalFlags';
const friendlyName = 'Signal Flags';
const repo = 'https://github.com/signal-flags/signal-flags-js';
const link = 'https://signalflags.org/';

const banner = `/*!
 * ${friendlyName} ${version} ${link}
 * Copyright 2020 SignalFlags https://signalflags.org/
 * Licensed under MIT ${repo}/blob/main/LICENSE
 */`;

const loaderBanner = `/*!
 * ${friendlyName} Loader ${version} ${link}
 * Copyright 2020 SignalFlags https://signalflags.org/
 * Licensed under MIT ${repo}/blob/main/LICENSE
 */`;

module.exports = [
  {
    // A umd build for require('signal-flags').
    input: 'src/index.js',
    plugins: [json()],
    output: [
      {
        file: `dist/${packageName}.umd.js`,
        name: moduleName,
        format: 'umd',
        banner,
        sourcemap: true,
      },
      {
        file: `dist/${packageName}.umd.min.js`,
        name: moduleName,
        format: 'umd',
        banner,
        sourcemap: true,
        plugins: [terser()],
      },
    ],
  },

  {
    // A transpiled iife build for browsers.
    input: 'src/index.js',
    plugins: [json(), babel({ babelHelpers: 'bundled' })],
    output: [
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

  {
    // An transpiled iife build for browsers with DOM parsing and injection.
    input: 'src/load/index.js',
    plugins: [json(), babel({ babelHelpers: 'bundled' })],
    output: [
      {
        file: `dist/${packageName}-loader.min.js`,
        format: 'umd',
        name: moduleName,
        plugins: [terser()],
        banner: loaderBanner,
        sourcemap: true,
      },
    ],
  },
];
