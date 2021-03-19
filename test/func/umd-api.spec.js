// test/func/umd-api.js/build-svg.js

const SignalFlags = require('../../.');

const { version } = require('../../package.json');

describe('The UMD module', () => {
  test('Version should match package.json', () => {
    expect(SignalFlags.version).toBe(version);
  });

  it('Should implement has()', () => {
    expect(SignalFlags.has('a')).toBe(true);
    expect(SignalFlags.has('aa')).toBe(false);
  });

  describe('all() should return:', () => {
    const flags = SignalFlags.all();

    test('54 flags in total', () => {
      expect(Object.keys(flags).length).toBe(54);
    });

    test('26 alphabet flags (test a sample)', () => {
      expect(flags).toHaveProperty('a');
      expect(flags).toHaveProperty('z');
    });

    test('10 numeral pennants (test a sample) plus AP', () => {
      expect(flags).toHaveProperty('nap');
      expect(flags).toHaveProperty('n0');
      expect(flags).toHaveProperty('n1');
      expect(flags).toHaveProperty('n9');
    });

    test('A longer AP', () => {
      expect(flags).toHaveProperty('ap');
    });

    test('1st, 2nd, 3rd and 4th sub', () => {
      expect(flags).toHaveProperty('s1');
      expect(flags).toHaveProperty('s2');
      expect(flags).toHaveProperty('s3');
      expect(flags).toHaveProperty('s4');
    });

    test('12 racing flags', () => {
      expect(flags).toHaveProperty('black');
      expect(flags).toHaveProperty('blackwhite');
      expect(flags).toHaveProperty('blue');
      expect(flags).toHaveProperty('green');
      expect(flags).toHaveProperty('greenwhite');
      expect(flags).toHaveProperty('minus');
      expect(flags).toHaveProperty('orange');
      expect(flags).toHaveProperty('plus');
      expect(flags).toHaveProperty('port');
      expect(flags).toHaveProperty('red');
      expect(flags).toHaveProperty('starboard');
      expect(flags).toHaveProperty('yellow');
    });
  });

  describe('get()', () => {
    it('Should return svg for a flag', () => {
      const svg = SignalFlags.get('a');
      expect(svg).toMatch(/^<svg viewBox.*<\/svg>$/s);
    });

    it('Should return an svg file with the `file` option', () => {
      const svg = SignalFlags.get('a', { file: true });
      expect(svg).toMatch(/^<\?xml version.*<\/svg>\n$/s);
    });

    it('Should return a data URI with the `dataUri` option', () => {
      // Line endings are stripped out for a shorter base64 string.
      const fileSvg = SignalFlags.get('a', { file: true }).replace(/\n/g, '');

      const svg = SignalFlags.get('a', { dataUri: true });

      expect(svg).toMatch('data:image/svg+xml;base64,' + btoa(fileSvg));
    });

    it('Should respect the `outline` option', () => {
      const svg = SignalFlags.get('a');
      const no = SignalFlags.get('a', { outline: false });
      const test = /<path fill="none"/;

      expect(svg).toMatch(test);
      expect(no).not.toMatch(test);
    });

    it('Should respect the `shape: square` option', () => {
      const svg = SignalFlags.get('a');
      const square = SignalFlags.get('a', { shape: 'square' });
      const test = /^<svg viewBox="0 0 240 180">.*d="M0,0H120V180H0Z/s;

      expect(svg).toMatch(test);
      expect(square).not.toMatch(test);
      expect(square).toMatch(
        /^<svg viewBox="0 0 180 180">.*d="M0,0H90V180H0Z/s
      );
    });

    it('Should respect the `colors: primary` option', () => {
      const svg = SignalFlags.get('a');
      const primary = SignalFlags.get('a', { colors: 'primary' });
      const test = /<path fill="#f5f5f5".*<path fill="#005eb8"/s;

      expect(svg).toMatch(test);
      expect(primary).not.toMatch(test);
      expect(primary).toMatch(/<path fill="#fff".*<path fill="#00f"/s);
    });

    it('Should allow replacing only one color', () => {
      const svg = SignalFlags.get('a');
      const white = SignalFlags.get('a', { colors: { white: '#123' } });
      const test = /<path fill="#f5f5f5".*<path fill="#005eb8"/s;

      expect(svg).toMatch(test);
      expect(white).not.toMatch(test);
      expect(white).toMatch(/<path fill="#123".*<path fill="#005eb8"/s);
    });
  });
});
