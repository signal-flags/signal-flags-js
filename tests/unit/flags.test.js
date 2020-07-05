// test/unit/flags.test.js

import Flags from '../../src/flags';

const SVG = /^<svg view.*<\/svg>$/;
const OUTLINE = /path d="M0.5,0.5[^>]*fill="none"/;

describe('The default flag set', () => {
  it('should have a q flag', () => {
    const q = new Flags().getFlag('q');
    expect(q.name).toBe('Q');
  });

  it('should generate SVG for the q flag', () => {
    const svg = new Flags().getSvg('q');
    expect(svg.replace(/\n/g, '')).toMatch(SVG);
  });

  describe('Outlines', () => {
    it('The Q flag should not have an outline by default', () => {
      const svg = new Flags().getSvg('q');
      expect(svg).not.toMatch(OUTLINE);
    });

    it('The Q flag should have an outline if you want one', () => {
      const svg = new Flags().getSvg('q', { outline: true });
      expect(svg).toMatch(OUTLINE);
    });
  });
});
