// test/unit/index.test.js

import * as SignalFlags from '../../src/index';

import semver from '../semver-regex';

const match = {
  semver,
  outline: '<path fill="none" stroke="#000" stroke-width="1"',
  q: '<path fill="#FFD100" d="M0,0H240V180H0Z"/>',
};

describe('SignalFlags', () => {
  it('should have a semver version', () => {
    expect(SignalFlags.version).toMatch(match.semver);
  });

  describe('get', () => {
    it('should get svg for a q flag', () => {
      const q = SignalFlags.get('q');
      expect(q).toMatch(match.q);
    });

    it('should have outlines by default', () => {
      const q = SignalFlags.get('q');
      expect(q).toMatch(match.outline);
    });
  });
});
