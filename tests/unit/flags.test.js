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

describe('The `viewBox` option', () => {
  const flags = new Flags();
  const viewBox = { pennant: [12, 34] };
  it('should replace a seleted viewBox', () => {
    const svg = flags.getSvg('n1', { viewBox });
    expect(svg).toMatch(/viewBox="0 0 12 34"/);
  });
});

describe('The `file` option', () => {
  const svg = new Flags().getSvg('a', { file: true });
  it('should add the correct markup', () => {
    expect(svg).toMatch(/^<\?xml version="1.0" encoding="UTF-8" \?>\n/);
    expect(svg).toMatch(/<svg xmlns="http:\/\/www.w3.org\/2000\/svg" /);
    expect(svg.endsWith('</svg>\n')).toBe(true);
  });
  it('should add EOL after the closing tag', () => {
    expect(svg.endsWith('</svg>\n')).toBe(true);
  });
});

describe('The checkSvg function', () => {
  const flags = new Flags();
  it('should normally succeed', () => {
    const svg = flags.getSvg('a');
    expect(flags.checkSvg(svg)).toBe(true);
  });
  it('should fail if there is anything after the closing tag', () => {
    const svg = flags.getSvg('a');
    expect(() => flags.checkSvg(`${svg} `)).toThrow(
      'Text after the closing tag'
    );
  });
  it('should fail if there is more than 1 decimal place', () => {
    const svg = flags.getSvg('c', { viewBox: { default: [44, 33] } });
    expect(() => flags.checkSvg(svg)).toThrow('Long decimals');
  });
});
