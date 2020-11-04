// src/check.js

const WRONG_LINE_ENDINGS = /[^>]$/m;
const MISSING_LINE_ENDINGS = />./m;
// Used to test for any number with more than 1 digit after the decimal point.
const LONG_DECIMALS = /[0-9]\.[0-9]{2}/;

export function check(svg, { file } = {}) {
  let checkLength;
  if (file) {
    if (!svg.endsWith('</svg>\n')) throw new Error('Text after the last line');
    checkLength = svg.length - 1;
  } else {
    if (!svg.endsWith('</svg>')) throw new Error('Text after the closing tag');
    checkLength = svg.length;
  }
  if (svg.substring(0, checkLength).match(WRONG_LINE_ENDINGS)) {
    throw new Error('Wrong line endings');
  }
  if (svg.match(MISSING_LINE_ENDINGS)) throw new Error('Missing line endings');
  if (svg.match(LONG_DECIMALS)) throw new Error('Long decimals');
  return true;
}
