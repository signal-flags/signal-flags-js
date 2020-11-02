// src/check.js

const CHECK_WRONG_LINE_ENDINGS = /[^>]$/m;
const CHECK_MISSING_LINE_ENDINGS = />./m;
// Used to test for any number with more than 1 digit after the decimal point.
const CHECK_LONG_DECIMALS = /[0-9]\.[0-9]{2}/;

export function check(svg, options) {
  let checkLength;
  if (options && options['file']) {
    if (!svg.endsWith('</svg>\n')) throw new Error('Text after the last line');
    checkLength = svg.length - 1;
  } else {
    if (!svg.endsWith('</svg>')) throw new Error('Text after the closing tag');
    checkLength = svg.length;
  }
  if (svg.substring(0, checkLength).match(CHECK_WRONG_LINE_ENDINGS)) {
    throw new Error('Wrong line endings');
  }
  if (svg.match(CHECK_MISSING_LINE_ENDINGS)) throw new Error('Missing line endings');
  if (svg.match(CHECK_LONG_DECIMALS)) throw new Error('Long decimals');
  return true;
}
