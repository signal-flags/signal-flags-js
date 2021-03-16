// src/shapes/triangle.js

import { getColor } from './helpers';

export const triangle = {
  shape: 'triangle',

  // Dimensions must be divisible by 90.
  size: {
    default: [240, 180],
  },

  // Draw a border design (not an outline).
  border(design, { w, h, colors }) {
    const [, clrs] = design;
    const parts = [];

    const h2 = h / 2;
    // The factor in xi must be half that in yi. Note the similarity to vertical.
    const yi = h / 4.8;
    const xi = w / 2.4;

    // Draw the inner part.
    parts.push(`<path fill="${getColor(clrs[0], colors)}"`);
    parts.push(` d="M0,${yi}V${h - yi}L${w - xi},${h2}Z"/>\n`);
    // Draw the outer part leaving a hole for the inner part.
    parts.push(`<path fill="${getColor(clrs[1], colors)}"`);
    parts.push(` d="M0,0L${w},${h2}L0,${h}Z`);
    parts.push(`M0,${yi}V${h - yi}L${w - xi},${h2}L0,${yi}"/>\n`);

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
      `d="M${off},${off}L${w - off},${h / 2 + off}L${off},${h - off}Z"/>\n`,
    ].join('');
  },

  // Draw 3 horizontal stripes.
  horizontal(design, { w, h, colors }) {
    const [, clrs] = design;
    const parts = [];

    const yi = h / clrs.length;
    const h2 = h / 2;
    const xi = (w * 2) / clrs.length;
    // Draw the top stripe.
    parts.push(`<path fill="${getColor(clrs[0], colors)}" d="M0,0`);
    parts.push(`V${yi}H${xi}Z"/>\n`);
    // Draw the middle stripe.
    parts.push(`<path fill="${getColor(clrs[1], colors)}" d="M0,${yi}`);
    parts.push(`V${yi + yi}H${xi}L${w},${h2}L${xi},${yi}Z"/>\n`);
    // Draw the bottom stripe.
    parts.push(`<path fill="${getColor(clrs[2], colors)}" d="M0,${h}`);
    parts.push(`V${yi + yi}H${xi}Z"/>\n`);

    return parts.join('');
  },

  // Draw 2 vertical stripes.
  vertical(design, { w, h, colors }) {
    const [, clrs] = design;
    // Stripe width.
    const sw = w / 2.4;
    // Difference in height per stripe.
    const dh = h / 4.8;
    const parts = [];
    // l is the left edge of the stripe.
    parts.push(`<path fill="${getColor(clrs[0], colors)}"`);
    parts.push(` d="M0,0`);
    parts.push(`L${sw},${dh}V${h - dh}L0,${h}Z"/>\n`);
    // Last stripe goes to a point.
    parts.push(`<path fill="${getColor(clrs[1], colors)}"`);
    parts.push(` d="M${sw},${dh}L${w},${h / 2}L${sw},${h - dh}Z"/>\n`);
    return parts.join('');
  },
};
