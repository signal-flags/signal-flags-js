// src/shapes/pennant.js

import { getColor } from './helpers';

export const pennant = {
  shape: 'pennant',

  // Dimensions must be divisible by 90.
  size: {
    default: [540, 180],
    short: [360, 180],
  },

  // Draw a circle.
  circle(design, { w, h, colors }) {
    const [, clrs] = design;
    // Make the fly height 1/3 of the height.
    const fh = h / 3;

    const parts = [];

    // Radius.
    const r = h / 4;

    // Centre 3 radii from hoist.
    const cx = r * 3;

    // Draw the background.
    parts.push(`<path fill="${getColor(clrs[1], colors)}" d="M0,0`);
    parts.push(`L${w},${(h - fh) / 2}V${(h + fh) / 2}L0,${h}Z`);
    // Draw the cut out centre anti-clockwise so it doesn't fill.
    parts.push(`M${cx},${h / 2 - r}`);
    parts.push(`A${r},${r} 0 0 0 ${cx - r},${h / 2}`);
    parts.push(`A${r},${r} 0 1 0 ${cx},${h / 2 - r}"/>\n`);
    // Draw the centre.
    parts.push(`<circle fill="${getColor(clrs[0], colors)}"`);
    parts.push(` cx="${cx}" cy="${h / 2}" r="${r}"/>\n`);
    return parts.join('');
  },

  // Draw 2 horizontal stripes.
  horizontal(design, { w, h, colors }) {
    // Make the fly height 1/3 of the height.
    const fh = h / 3;

    const [, clrs] = design;
    const parts = [];

    const h2 = h / 2;
    // Half the fly height.
    const fh2 = fh / 2;

    // Draw the top half.
    parts.push(`<path fill="${getColor(clrs[0], colors)}"`);
    parts.push(` d="M0,0V${h2}H${w}V${h2 - fh2}Z"/>\n`);
    // Draw the bottom half.
    parts.push(`<path fill="${getColor(clrs[1], colors)}"`);
    parts.push(` d="M0,${h}V${h2}H${w}V${h2 + fh2}Z"/>\n`);
    return parts.join('');
  },

  // Draw a Nordic cross.
  nordic(design, { w, h, colors }) {
    const [, clrs] = design;
    const parts = [];
    // Make the fly height 1/3 of the height.
    const fh = h / 3;

    // Standard cross width is 1/5 of the height of the flag; this means x and y need
    // to be carefully chosen to avoid long fractions.
    const x0 = h / 5;
    const y0 = x0;

    // Centre the cross 1/3 of the width across the flag, or the height if less
    const w2 = Math.min(w / 3, h);
    const h2 = h / 2;

    const x1 = w2 - x0 / 2;
    const y1 = (h - y0) / 2;

    // Half the fly height.
    const fh2 = fh / 2;
    // Height factor.
    const heightFactor = (h2 - fh2) / w;
    // Half the height at the left side of the cross.
    const hhl = h2 - heightFactor * x1;
    // Half the height at the right side of the cross.
    const hhr = h2 - heightFactor * (x1 + x0);

    // Draw the two limbs of the cross - it doesn't matter that they intersect.
    parts.push(`<path fill="${getColor(clrs[0], colors)}" d="`);
    parts.push(
      `M${x1 + x0},${h2 - hhr}V${h2 + hhr}L${x1},${h2 + hhl}V${h2 - hhl}Z`
    );
    parts.push(`M0,${y1}H${w}V${y1 + y0}H${0}Z"/>\n`);

    const clr = getColor(clrs[1], colors);
    // Draw the top left quarter.
    parts.push(`<path fill="${clr}" d="M0,0V${y1}H${x1}V${h2 - hhl}Z`);
    // Draw the top right quarter.
    parts.push(`M${x1 + x0},${h2 - hhr}V${y1}H${w}V${h2 - fh2}Z`);
    // Draw the bottom right quarter.
    parts.push(`M${x1 + x0},${h2 + hhr}V${y1 + x0}H${w}V${h2 + fh2}Z`);
    // Draw the bottom left quarter.
    parts.push(`M0,${h}V${y1 + x0}H${x1}V${h2 + hhl}Z"/>\n`);
    return parts.join('');
  },

  // Draw an outline.
  outline(design, { w, h, colors, outline }) {
    // Make the fly height 1/3 of the height.
    const fh = h / 3;

    if (outline === false) return;
    const ow = typeof outline === 'number' ? outline : 1;
    const off = ow / 2;
    const color = getColor('outline', colors);
    return [
      `<path fill="none" stroke="${color}" stroke-width="${ow}" `,
      `d="M${off},${off}L${w - off},${(h - fh) / 2 + off}`,
      `V${(h + fh) / 2 - off}L${off},${h - off}Z"/>\n`,
    ].join('');
  },

  // Quarters (9).
  quarters(design, { w, h, colors }) {
    // Make the fly height 1/3 of the height.
    const fh = h / 3;

    const [, clrs] = design;
    const parts = [];

    // 5/12 works better than 1/2.
    const w2 = (w * 5) / 12;
    const h2 = h / 2;
    // Half the fly height.
    const fh2 = fh / 2;
    // Half the height half way along the flag.
    const hh2 = (7 * h + 5 * fh) / 24;

    // Draw the top left quarter.
    parts.push(`<path fill="${getColor(clrs[0], colors)}"`);
    parts.push(` d="M0,0V${h2}H${w2}V${h2 - hh2}Z"/>\n`);
    // Draw the top right quarter.
    parts.push(`<path fill="${getColor(clrs[1], colors)}"`);
    parts.push(` d="M${w2},${h2 - hh2}V${h2}H${w}V${h2 - fh2}Z"/>\n`);
    // Draw the bottom right quarter.
    parts.push(`<path fill="${getColor(clrs[2], colors)}"`);
    parts.push(` d="M${w2},${h2 + hh2}V${h2}H${w}V${h2 + fh2}Z"/>\n`);
    // Draw the bottom left quarter.
    parts.push(`<path fill="${getColor(clrs[3], colors)}"`);
    parts.push(` d="M0,${h}V${h2}H${w2}V${h2 + hh2}Z"/>\n`);
    return parts.join('');
  },

  // Draw a field (background).
  solid(design, { w, h, colors }) {
    const [, clr] = design;
    // Make the fly height 1/3 of the height.
    const fh = h / 3;
    return [
      '<path d="M0,0',
      `L${w},${(h - fh) / 2}V${(h + fh) / 2}L0,${h}Z"`,
      ` fill="${getColor(clr, colors)}"/>\n`,
    ].join('');
  },

  // Draw vertical stripes.
  vertical(design, { w, h, colors }) {
    const [, clrs] = design;
    // Make the fly height 1/3 of the height.
    const fh = h / 3;
    // Stripe width - add part of the width to the last stripe.
    // const factors = [4.5 / 10, 3 / 10, 2.25 / 10, 1.75 / 10];
    // const sw = Math.round(w * factors[clrs.length - 2]);
    const factors = [5 / 12, 3.5 / 12, 1 / 4, 1 / 5];
    const sw = w * factors[clrs.length - 2];
    // Difference in height per stripe.
    const dh = ((h - fh) * (sw / w)) / 2;
    const parts = [];
    // t is the top left of the stripe.
    let t = 0;
    // l is the left edge of the stripe.
    let l = 0;
    for (let i = 0; i < clrs.length - 1; i++) {
      parts.push(`<path fill="${getColor(clrs[i], colors)}"`);
      parts.push(` d="M${l},${t}`);
      t += dh;
      parts.push(`L${l + sw},${t}V${h - t}L${l},${h - t + dh}Z"/>\n`);
      l += sw;
    }
    // Draw the last stripe
    parts.push(`<path fill="${getColor(clrs[clrs.length - 1], colors)}"`);
    parts.push(` d="M${l},${t}L${w},${(h - fh) / 2}V${(h + fh) / 2}`);
    t += dh;
    parts.push(`L${l},${h - t + dh}Z"/>\n`);
    return parts.join('');
  },
};
