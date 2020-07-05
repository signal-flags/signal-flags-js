// test/unit/flags.test.js

import Flags from '../../src/flags';

const OUTLINE = /path d="M0.5,0.5[^>]*fill="none"/;
const WHITE = /fill="white"/;
const WRONG_LINE_ENDINGS = /[^>]$/m;
const MISSING_LINE_ENDINGS = />./m;

// Used to test for any number with more than 1 digit after the decimal point.
const LONG_DECIMALS = /[0-9]\.[0-9]{2}/;

const svg = new Flags().getSvg();
const svgEntries = Object.entries(svg);

describe('The default flag set', () => {
  test('flags should have an outline by default iff they have white on the outside', () => {
    const flags = new Flags().getSvg(null, { colors: false });
    Object.entries(flags).forEach(([key, svg]) => {
      // P, W and N2 have white but it is surrounded by another colour.
      if (svg.match(WHITE) && ['p', 'w', 'n2'].includes(key) === false) {
        expect(`Flag ${key}: ${svg}`).toMatch(OUTLINE);
      } else {
        expect(`Flag ${key}: ${svg}`).not.toMatch(OUTLINE);
      }
    });
  });

  test('there should be line endings', () => {
    svgEntries.forEach(([key, svg]) => {
      const str = `Flag ${key}: ${svg}`;
      expect(str.endsWith('</svg>')).toBe(true);
      expect(str).not.toMatch(WRONG_LINE_ENDINGS);
      expect(str).not.toMatch(MISSING_LINE_ENDINGS);
    });
  });

  test('there should be no long decimals', () => {
    svgEntries.forEach(([key, svg]) => {
      expect(`Flag ${key}: ${svg}`).not.toMatch(LONG_DECIMALS);
    });
  });
});
