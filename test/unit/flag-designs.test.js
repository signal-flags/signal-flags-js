// test/unit/signal-flags.test.js

import SignalFlags from '../../src/index';

const match = {
  ap: 'viewBox="0 0 480 120"',
  starboard: /(M120,22.5L52.5,157.5H187.5Z).+(M120,22.5L187.5,157.5H52.5Z)/s,
  orange: 'path fill="#ff4f00" d="M0,0H240V180H0Z"',
};

describe('Flag designs', () => {
  describe('AP', () => {
    it('should be wider and less tall than other pennants', () => {
      const svg = SignalFlags.get('ap');
      expect(svg).toMatch(match.ap);
    });
  });

  describe('Orange', () => {
    it('should be plain orange', () => {
      const svg = SignalFlags.get('orange');
      expect(svg).toMatch(match.orange);
    });
  });

  describe('Starboard', () => {
    it('should be a green triangle on a cut-out white background', () => {
      const svg = SignalFlags.get('starboard');
      expect(svg).toMatch(match.starboard);
    });
  });
});
