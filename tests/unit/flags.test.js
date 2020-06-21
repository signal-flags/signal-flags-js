// test/unit/flags.test.js

import Flags from '../../src/flags';

const SVG = /^<svg view.*<\/svg>$/;
const BORDER = /path d="M0.5,0.5[^>]*fill="none"/;

describe('The default flag set', () => {
  it('should have a q flag', () => {
    const q = new Flags().getFlag('q');
    expect(q.name).toBe('Q');
    expect(q.phonetic).toBe('Quebec');
  });

  it('should generate SVG for the q flag', () => {
    const svg = new Flags().getSvg('q');
    expect(svg).toMatch(SVG);
  });

  describe('Borders', () => {
    it('The Q flag should not have a border by default', () => {
      const svg = new Flags().getSvg('q');
      expect(svg).not.toMatch(BORDER);
    });

    it('The Q flag should have a border if you want one', () => {
      const svg = new Flags().getSvg('q', { border: true });
      expect(svg).toMatch(BORDER);
    });
  });
});
