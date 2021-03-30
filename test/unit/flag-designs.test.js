// test/unit/signal-flags.test.js

import SignalFlags from '../../src/index';
import { colors } from '../helpers';

const { red, yellow, white } = colors;

const match = {
  pennant: 'viewBox="0 0 540 180"',
  short: 'viewBox="0 0 360 180"',
  orange: 'path fill="testOrange" d="M0,0H240V180H0Z"',
  s4: new RegExp(
    `${red}.+M0,0L240,90L0,180ZM0,60V120H60V60H0Z.+${yellow}.+M0,60H60V120H0Z`,
    's'
  ),
  tostarboard: /(M0,0H240V180H0ZM120,30L75,150H165Z).+(M120,30L165,150H75Z)/s,
  toport: new RegExp(
    `${white}.+M0,0H240V180H0ZM75,30V150H165V30Z.+${red}.+M75,30H165V150H75Z`,
    's'
  ),
};

describe('Flag designs', () => {
  describe('Short pennants', () => {
    it('should be shorter than default pennants', () => {
      const svg = SignalFlags.get('ap');
      const shortSvg = SignalFlags.get('ap', { shape: 'short' });

      expect(svg).not.toMatch(match.short);
      expect(svg).toMatch(match.pennant);
      expect(shortSvg).toMatch(match.short);
    });
  });

  describe('Orange', () => {
    it('should be plain orange', () => {
      const colors = { orange: 'testOrange' };
      const svg = SignalFlags.get('orange', { colors });
      expect(svg).toMatch(match.orange);
    });
  });

  describe('To port', () => {
    it('should be a red rectangle on a cut-out red background', () => {
      const svg = SignalFlags.get('toport');
      expect(svg).toMatch(match.toport);
    });
  });

  describe('To starboard', () => {
    it('should be a green triangle on a cut-out white background', () => {
      const svg = SignalFlags.get('tostarboard');
      expect(svg).toMatch(match.tostarboard);
    });
  });

  describe('4th Substitute', () => {
    it('should hav a red ground with a yellow square at the hoist', () => {
      const svg = SignalFlags.get('s4');
      expect(svg).toMatch(match.s4);
    });
  });
});
