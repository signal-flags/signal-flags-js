// test/unit/signal-flags.test.js

import SignalFlags from '../../src/index';

import semver from '../semver-regex';

const match = {
  semver,
  outline: '<path fill="none" stroke="#000" stroke-width="1"',
  q: '<path fill="#ffd100" d="M0,0H240V180H0Z"/>',
  primary: '<path fill="#ff0"',
  square: '<path fill="#ffd100" d="M0,0H180V180H0Z"/>',
};

describe('SignalFlags', () => {
  it('should have a semver version', () => {
    expect(SignalFlags.version).toMatch(match.semver);
  });

  describe('get()', () => {
    it('should get svg for a q flag', () => {
      const q = SignalFlags.get('q');
      expect(q).toMatch(match.q);
    });

    it('should have outlines by default', () => {
      const q = SignalFlags.get('q');
      expect(q).toMatch(match.outline);
    });

    test('outlines should be optional', () => {
      const q = SignalFlags.get('q', { outline: false });
      expect(q).not.toMatch(match.outline);
    });

    it('should have a primary colours option', () => {
      const z = SignalFlags.get('z', { colors: 'primary' });
      expect(z).toMatch(match.primary);
    });

    it('should have a square shape option', () => {
      const q = SignalFlags.get('q', { shape: 'square' });
      expect(q).toMatch(match.square);
    });
  });

  describe('all()', () => {
    it('should get svg for all flags', () => {
      const flags = SignalFlags.all();
      expect(flags.q).toMatch(match.q);
    });
  });

  describe('check()', () => {
    it('should check an svg tag', () => {
      const q = SignalFlags.get('q');
      expect(SignalFlags.check(q)).toBe(true);
    });

    it('should check an svg file', () => {
      const options = { file: true };
      const q = SignalFlags.get('q', options);
      expect(SignalFlags.check(q, options)).toBe(true);
    });
  });

  describe('config()', () => {});

  describe.skip('isType()', () => {
    // Needs tests.
  });

  describe.skip('buildSvg()', () => {
    describe.skip('the `shape` option', () => {
      it('should work with `shape: [x, y]`', () => {});
    });
  });
});
