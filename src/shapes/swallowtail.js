// src/shapes/swallowtail.js

import { getColor } from './helpers';

export const swallowtail = {
  shape: 'swallowtail',

  // Dimensions must be divisible by 90.
  size: {
    default: [240, 180],
    square: [180, 180],
  },

  // Draw an outline.
  outline(design, { w, h, colors, outline }) {
    // Make the tail height 1/4 of the width of the flag.
    const th = w * 0.25;

    if (outline === false) return;
    const ow = typeof outline === 'number' ? outline : 1;
    const off = ow / 2;
    const woff = w - off;
    const color = getColor('outline', colors);
    return [
      `<path fill="none" stroke="${color}" stroke-width="${ow}" `,
      `d="M${off},${off}`,
      `H${woff}L${woff - th},${h / 2}L${woff},${h - off}H${off}Z"/>\n`,
    ].join('');
  },

  // Draw a field (background).
  solid(design, { w, h, colors }) {
    // Make the tail 1/4 of the width of the flag.
    const tail = w * 0.25;
    const [, clr] = design;
    return [
      `<path fill="${getColor(clr, colors)}" d="M0,0`,
      `H${w}L${w - tail},${h / 2}L${w},${h}H0Z"/>\n`,
    ].join('');
  },

  // Draw vertical stripes.
  vertical(design, { w, h, colors }) {
    const [, clrs] = design;
    // Make the tail 1/4 of the width of the flag.
    const tail = w * 0.25;
    // Stripe width.
    const sw = w / clrs.length;
    const parts = [];
    // l is the left edge of the stripe.
    for (let l = 0; l < w - sw; l += sw) {
      parts.push(`<path fill="${getColor(clrs[l / sw], colors)}" d="M${l},0`);
      parts.push(`H${l + sw}V${h}H${l}Z"/>\n`);
    }
    // Last stripe has the swallowtail.
    parts.push(`<path fill="${getColor(clrs[clrs.length - 1], colors)}"`);
    parts.push(` d="M${w - sw},0H${w}L${w - tail},${h / 2}L${w},${h}`);
    parts.push(`H${w - sw}Z"/>\n`);
    return parts.join('');
  },
};
