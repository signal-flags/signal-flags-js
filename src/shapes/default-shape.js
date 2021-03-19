// src/shapes/default.js

import { getColor } from './helpers';

export const defaultShape = {
  shape: 'default',

  // Dimensions must be divisible by 90.
  // Also w - h / 5 must be divisible by 2 for the cross to work.
  size: {
    default: [240, 180],
    square: [180, 180],
  },

  // Draw a border design - note this is not an outline!
  border(design, { w, h, colors }) {
    const [, clrs] = design;
    const parts = [];
    const { length } = clrs;

    // Draw the border(s) from the outside in.
    // xbw and ybw are the border widths in the x and y dimension.
    let xbw, ybw;
    if (length === 2) {
      // This factor works well for P and S flags.
      ybw = h * 0.3;
      xbw = w * 0.3;
    } else {
      ybw = h / (length * 2);
      xbw = w / (length * 2);
    }
    let xb = 0;
    let yb = 0;
    for (let i = clrs.length - 1; i > 0; i--) {
      parts.push(`<path fill="${getColor(clrs[i], colors)}" d="M${xb},${yb}`);
      parts.push(`H${w - xb}V${h - yb}H${xb}Z`);
      xb += xbw;
      yb += ybw;
      // Draw the 'hole' anti-clockwise so it does not fill.
      parts.push(`M${xb},${yb}`);
      parts.push(`V${h - yb}H${w - xb}V${yb}Z"/>\n`);
    }
    // Draw the centre.
    parts.push(`<path fill="${getColor(clrs[0], colors)}" d="M${xb},${yb}`);
    parts.push(`H${w - xb}V${h - yb}H${xb}Z"/>\n`);
    return parts.join('');
  },

  // Draw a check.
  // Only works for an even number of checks.
  check(design, { w, h, colors }) {
    const [, clrs, nChecks] = design;
    const parts = [];

    // xw and yw are the check widths in the x and y dimension.
    let repeat = nChecks || 2;
    const xw = w / repeat;
    const yw = h / repeat;
    repeat = repeat / 2 - 1;
    let i;
    let x = xw;
    let y = h - yw;
    parts.push(`<path fill="${getColor(clrs[0], colors)}" d="M0,0H${x}V${h}`);
    for (i = 0; i < repeat; i++) {
      x += xw;
      parts.push(`H${x}V${0}`);
      x += xw;
      parts.push(`H${x}V${h}`);
    }
    parts.push(`H${w}V${y}H${0}`);
    for (i = 0; i < repeat; i++) {
      y -= yw;
      parts.push(`V${y}H${w}`);
      y -= yw;
      parts.push(`V${y}H${0}`);
    }
    parts.push(`V${0}"/>\n`);

    x = w - xw;
    y = yw;
    parts.push(
      `<path fill="${getColor(clrs[1], colors)}" d="M${w},0H${x}V${h}`
    );
    for (i = 0; i < repeat; i++) {
      x -= xw;
      parts.push(`H${x}V${0}`);
      x -= xw;
      parts.push(`H${x}V${h}`);
    }
    parts.push(`H${0}V${y}H${w}`);
    for (i = 0; i < repeat; i++) {
      y += yw;
      parts.push(`V${y}H${0}`);
      y += yw;
      parts.push(`V${y}H${w}`);
    }
    parts.push(`V${0}"/>\n`);
    return parts.join('');
  },

  // Draw a circle.
  circle(design, { w, h, colors }) {
    const [, clrs] = design;
    const parts = [];

    // Radius.
    const r = h * 0.25;

    // Draw a rectangle background.
    parts.push(`<path fill="${getColor(clrs[1], colors)}"`);
    parts.push(` d="M0,0H${w}V${h}H0Z`);
    // Draw the cut out centre anti-clockwise so it doesn't fill.
    parts.push(`M${w / 2},${h / 2 - r}`);
    parts.push(`A${r},${r} 0 0 0 ${w / 2 - r},${h / 2}`);
    parts.push(`A${r},${r} 0 1 0 ${w / 2},${h / 2 - r}"/>\n`);
    // Draw the centre.
    parts.push(`<circle fill="${getColor(clrs[0], colors)}"`);
    parts.push(` cx="${w / 2}" cy="${h / 2}" r="${r}"/>\n`);
    return parts.join('');
  },

  // Draw a cross (like a +).
  cross(design, { w, h, colors }) {
    const [, clrs] = design;
    const parts = [];
    // Standard cross width is 1/5 of the height of the flag; this means x and y need
    // to be carefully chosen to avoid long fractions.
    const x0 = h / 5;
    const y0 = x0;
    const x1 = (w - x0) / 2;
    const y1 = (h - y0) / 2;
    // Draw the two limbs of the cross - it doesn't matter that they intersect.
    parts.push(`<path fill="${getColor(clrs[0], colors)}" d="`);
    parts.push(`M${x1},0H${x1 + x0}V${h}H${x1}Z`);
    parts.push(`M0,${y1}H${w}V${y1 + y0}H${0}Z"/>\n`);
    // Draw the four background rectangles.
    parts.push(`<path fill="${getColor(clrs[1], colors)}" d="`);
    parts.push(`M0,0H${x1}V${y1}H0Z`);
    parts.push(`M${x1 + x0},0H${w}V${y1}H${x1 + x0}Z`);
    parts.push(`M0,${y1 + y0}H${x1}V${h}H0Z`);
    parts.push(`M${x1 + x0},${y1 + y0}H${w}V${h}H${x1 + x0}Z"/>\n`);
    return parts.join('');
  },

  // Draw diagonal halves (O).
  diagonalHalves(design, { w, h, colors }) {
    const [, clrs] = design;
    const parts = [];

    // Draw the top right half.
    parts.push(`<path fill="${getColor(clrs[0], colors)}"`);
    parts.push(` d="M0,0L${w},${h}V0Z"/>\n`);
    // Draw the bottom left half.
    parts.push(`<path fill="${getColor(clrs[1], colors)}"`);
    parts.push(` d="M0,0L${w},${h}H0Z"/>\n`);
    return parts.join('');
  },

  // Diagonal quarters (W).
  diagonalQuarters(design, { w, h, colors }) {
    const [, clrs] = design;
    const parts = [];

    // Start at the centre!
    const c = `${w / 2},${h / 2}`;

    // Draw the top quarter.
    parts.push(`<path fill="${getColor(clrs[0], colors)}"`);
    parts.push(` d="M${c}L0,0H${w}Z"/>\n`);
    // Draw the right quarter.
    parts.push(`<path fill="${getColor(clrs[1], colors)}"`);
    parts.push(` d="M${c}L${w},0V${h}Z"/>\n`);
    // Draw the bottom quarter.
    parts.push(`<path fill="${getColor(clrs[2], colors)}"`);
    parts.push(` d="M${c}L${w},${h}H0Z"/>\n`);
    // Draw the left quarter.
    parts.push(`<path fill="${getColor(clrs[3], colors)}"`);
    parts.push(` d="M${c}L0,${h}V0Z"/>\n`);
    return parts.join('');
  },

  // Diagonal stripes (X) - similar to saltire.
  diagonalStripes(design, { w, h, colors }) {
    const [, clrs] = design;
    const parts = [];
    let x = w / 5;
    let y = h / 5;
    const xi = x;
    const yi = y;
    let clr = 0;
    // The first stripe - just a triangle.
    parts.push(`<path fill="${getColor(clrs[0], colors)}"`);
    parts.push(` d="M0,0H${x}L0,${y}Z"/>\n`);
    // Second, third, fourth and fifth stripes.
    for (let i = 0; i < 4; i++) {
      clr = 1 - clr;
      parts.push(`<path fill="${getColor(clrs[clr], colors)}"`);
      parts.push(` d="M${x},0H${x + xi}L0,${y + yi}V${y}Z"/>\n`);
      x += xi;
      y += yi;
    }
    /*
      clr = 1 - clr;
      y = h / 10;
      parts.push(`<path d="M${x},0H${w}V${y}L${w / 10},${h}H0V${h - y}Z`);
      parts.push(`" fill="${getColor(clrs[clr], colors)}"/>\n`);
      x = w / 10;
      */
    x = 0;
    y = 0;
    // Seventh, eighth, ninth and tenth stripes.
    for (let i = 0; i < 4; i++) {
      clr = 1 - clr;
      parts.push(`<path fill="${getColor(clrs[clr], colors)}"`);
      parts.push(` d="M${w},${y}V${y + yi}L${x + xi},${h}H${x}Z"/>\n`);
      x += xi;
      y += yi;
    }
    // The final triangle.
    parts.push(`<path fill="${getColor(clrs[1], colors)}"`);
    parts.push(` d="M${w},${y}V${h}H${x}Z"/>\n`);
    return parts.join('');
  },

  // Draw a diamond.
  diamond(design, { w, h, colors, outline }) {
    const [, clrs] = design;
    const parts = [];
    // Make sure we draw inside any outline.
    const off =
      typeof outline === 'number' ? outline : outline === false ? 0 : 1;

    // Draw a rectangle background.
    const w2 = w / 2;
    const h2 = h / 2;
    parts.push(`<path fill="${getColor(clrs[1], colors)}"`);
    parts.push(` d="M0,0H${w}V${h}H0Z`);
    // Draw the cut out centre anti-clockwise so it doesn't fill.
    parts.push(`M${w2},${off}L${off},${h2}L${w2},${h - off}`);
    parts.push(`L${w - off},${h2}L${w2},${off}"/>\n`);
    // Draw the centre.
    parts.push(`<path fill="${getColor(clrs[0], colors)}"`);
    parts.push(` d="M${w2},${off}L${off},${h2}L${w2},${h - off}`);
    parts.push(`L${w - off},${h2}Z"/>\n`);
    return parts.join('');
  },

  // Draw horizontal stripes.
  horizontal(design, { w, h, colors }) {
    const [, clrs] = design;
    const parts = [];
    const variableHeights = design[2];
    if (variableHeights) {
      // Variable stripe height.
      const sh = h / variableHeights.reduce((sum, stripe) => sum + stripe, 0);
      // t is the top edge of the stripe.
      for (let i = 0, t = 0; i < variableHeights.length; i++) {
        parts.push(`<path fill="${getColor(clrs[i], colors)}" d="M0,${t}`);
        t += variableHeights[i] * sh;
        parts.push(`H${w}V${t}H${0}Z"/>\n`);
      }
      return parts.join('');
    }

    // Fixed stripe height.
    const sh = h / clrs.length;
    // t is the top edge of the stripe.
    for (let t = 0; t < h; t += sh) {
      parts.push(`<path fill="${getColor(clrs[t / sh], colors)}"`);
      parts.push(` d="M0,${t}H${w}V${t + sh}H${0}Z"/>\n`);
    }
    return parts.join('');
  },

  // Draw an outline.
  outline(design, { w, h, colors, outline }) {
    if (outline === false) return;
    const ow = typeof outline === 'number' ? outline : 1;
    const off = ow / 2;
    const color = getColor('outline', colors);
    return [
      `<path fill="none" stroke="${color}" stroke-width="${ow}" `,
      `d="M${off},${off}H${w - off}V${h - off}H${off}Z"/>\n`,
    ].join('');
  },

  // Draw a saltire (like an X).
  saltire(design, { w, h, colors }) {
    const [, clrs] = design;
    const parts = [];
    const x0 = w / 8;
    const y0 = h / 8;
    const x1 = w / 2 - x0;
    const y1 = h / 2 - y0;
    // Draw the two limbs of the cross - it doesn't matter that they intersect.
    parts.push(`<path fill="${getColor(clrs[0], colors)}" d="`);
    parts.push(`M0,0H${x0}L${w},${h - y0}V${h}H${w - x0}L0,${y0}Z`);
    parts.push(`M${w - x0},0H${w}V${y0}L${x0},${h}H0V${h - y0}Z"/>\n`);
    // Draw the four background triangles.
    parts.push(`<path fill="${getColor(clrs[1], colors)}" d="`);
    parts.push(`M${x0},0H${w - x0}L${w / 2},${y1}Z`);
    parts.push(`M${w},${y0}V${h - y0}L${w - x1},${h / 2}Z`);
    parts.push(`M${x0},${h}H${w - x0}L${w / 2},${h - y1}Z`);
    parts.push(`M0,${y0}V${h - y0}L${x1},${h / 2}Z"/>\n`);
    return parts.join('');
  },

  // Draw a field (background).
  solid(design, { w, h, colors }) {
    const [, clr] = design;
    return `<path fill="${getColor(clr, colors)}" d="M0,0H${w}V${h}H0Z"/>\n`;
  },

  // Draw a triangle (RRS change to starboard).
  triangle(design, { w, h, colors }) {
    const [, clrs] = design;
    const parts = [];

    // Height.
    const w2 = w / 2;
    const h2 = h / 2;
    const ht2 = h * 0.375;

    // Draw a rectangle background.
    parts.push(`<path fill="${getColor(clrs[1], colors)}"`);
    parts.push(` d="M0,0H${w}V${h}H0Z`);
    // Draw the cut out centre shape anti-clockwise so it doesn't fill.
    parts.push(`M${w2},${h2 - ht2}L${w2 - ht2},${h2 + ht2}H${w2 + ht2}Z"/>\n`);
    // Draw the centre shape.
    parts.push(`<path fill="${getColor(clrs[0], colors)}" `);
    parts.push(
      `d="M${w2},${h2 - ht2}L${w2 + ht2},${h2 + ht2}H${w2 - ht2}Z"/>\n`
    );
    return parts.join('');
  },

  // Draw vertical stripes.
  vertical(design, { w, h, colors }) {
    const [, clrs] = design;
    // Stripe width.
    const sw = w / clrs.length;
    const parts = [];
    // l is the left edge of the stripe.
    for (let l = 0; l < w; l += sw) {
      parts.push(`<path fill="${getColor(clrs[l / sw], colors)}"`);
      parts.push(` d="M${l},0H${l + sw}V${h}H${l}Z"/>\n`);
    }
    return parts.join('');
  },
};
