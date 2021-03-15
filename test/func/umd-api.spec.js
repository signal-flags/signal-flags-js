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

  describe('all()', () => {
    it('Should return all flags', () => {
      const flags = SignalFlags.all();

      expect(flags).toHaveProperty('a');
      expect(flags).toHaveProperty('z');
      expect(flags).toHaveProperty('n0');
      expect(flags).toHaveProperty('n9');
      expect(flags).toHaveProperty('s3');
      expect(flags).toHaveProperty('green');
      expect(flags).toHaveProperty('greenwhite');
      expect(flags).toHaveProperty('black');
      expect(flags).toHaveProperty('red');
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

    it('Should respect the `outline` option', () => {
      const svg = SignalFlags.get('a');
      const no = SignalFlags.get('a', { outline: false });
      const test = /<path fill="none"/;

      expect(svg).toMatch(test);
      expect(no).not.toMatch(test);
    });

    it('Should respect the `colors: primary` option', () => {
      const svg = SignalFlags.get('a');
      const primary = SignalFlags.get('a', { colors: 'primary' });
      const test = /<path fill="#f5f5f5".*<path fill="#005eb8"/s;

      expect(svg).toMatch(test);
      expect(primary).not.toMatch(test);
      expect(primary).toMatch(/<path fill="#fff".*<path fill="#00f"/s);
    });

    it("Should allow replacing only one color", () => {
      const svg = SignalFlags.get('a');
      const white = SignalFlags.get('a', { colors: { white: '#123' } });
      const test = /<path fill="#f5f5f5".*<path fill="#005eb8"/s;

      expect(svg).toMatch(test);
      expect(white).not.toMatch(test);
      expect(white).toMatch(/<path fill="#123".*<path fill="#005eb8"/s);
    });
  });
});
