// test/unit/signal-flags.test.js

import SignalFlags from '../../src/index';

const match = {
  ap: 'viewBox="0 0 480 120"',
};

describe('Flag designs', () => {
  describe('AP', () => {
    it('should be wider and less tall', () => {
      const ap = SignalFlags.get('ap');
      expect(ap).toMatch(match.ap);
    });
  });
});
