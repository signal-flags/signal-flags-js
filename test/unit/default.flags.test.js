// test/unit/default-flags.test.js

import SignalFlags from '../../src/index';

describe('All flag designs', () => {
  it('should pass the checks', () => {
    Object.values(SignalFlags.all()).forEach((svg) => {
      expect(SignalFlags.check(svg)).toBe(true);
    });
  });

  it('should pass the checks with the square option', () => {
    Object.values(SignalFlags.all({ shape: 'square' })).forEach((svg) => {
      expect(SignalFlags.check(svg)).toBe(true);
    });
  });

  describe('Pennant designs', () => {
    it('should pass the checks with the long option', () => {
      Object.values(
        SignalFlags.all({ type: 'pennant', shape: 'long' })
      ).forEach((svg) => {
        expect(SignalFlags.check(svg)).toBe(true);
      });
    });
  });
});
