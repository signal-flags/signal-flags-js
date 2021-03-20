// test/unit/signal-flags.test.js

import SignalFlags from '../../src/index';

const match = {
  ap: 'viewBox="0 0 480 120"',
  orange: 'path fill="testOrange" d="M0,0H240V180H0Z"',
  s4: /(M0,0L240,90L0,180ZM0,60V120H60V60H0Z).*(M0,60H60V120H0Z)/s,
  starboard: /(M120,22.5L52.5,157.5H187.5Z).+(M120,22.5L187.5,157.5H52.5Z)/s,
};

describe('Flag designs', () => {
  describe('AP', () => {
    it('should be wider and less tall than other pennants', () => {
      const svg = SignalFlags.get('ap', { shape: 'long' });
      expect(svg).toMatch(match.ap);
    });
  });

  describe('Orange', () => {
    it('should be plain orange', () => {
      const colors = { orange: 'testOrange' };
      const svg = SignalFlags.get('orange', { colors });
      expect(svg).toMatch(match.orange);
    });
  });

  describe('Starboard', () => {
    it('should be a green triangle on a cut-out white background', () => {
      const svg = SignalFlags.get('starboard');
      expect(svg).toMatch(match.starboard);
    });
  });

  describe('4th Substitute', () => {
    it('should hav a red ground with a yellow square at the hoist', () => {
      const svg = SignalFlags.get('s4');
      expect(svg).toMatch(match.s4);
    });
  });
});
