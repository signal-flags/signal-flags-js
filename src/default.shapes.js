// src/default.shapes.js

function getColor(name, colors) {
  if (name === 'outline') {
    return colors ? colors.outline || 'black' : 'black';
  }
  return colors ? colors[name] || name : name;
}

const shapes = {
  default: {
    shape: 'default',

    // Dimensions must be divisible by 90.
    // Also w - h / 5 must be divisible by 2 for the cross to work.
    size: [240, 180],

    // Draw a border design - note this is not an outline!
    border(design, { w, h, colors }) {
      const [, clrs] = design;
      const parts = [];

      // Draw the border(s) from the outside in.
      // xbw and ybw are the border widths in the x and y dimension.
      const ybw = h / (clrs.length * 2);
      const xbw = w / (clrs.length * 2);
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
      const r = h * 0.3;

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
  },

  pennant: {
    shape: 'pennant',
    size: [360, 180],

    // Draw a circle.
    circle(design, { w, h, colors }) {
      const [, clrs] = design;
      // Make the fly height 1/3 of the height.
      const fh = h / 3;

      const parts = [];

      // Radius.
      const r = h / 4;

      // Centre on the x-axis.
      const cx = w / 3;

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

      // Centre the cross 1/3 of the width across the flag.
      const w2 = w / 3;
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
  },

  swallowtail: {
    shape: 'swallowtail',
    size: [240, 180],

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
  },

  triangle: {
    shape: 'triangle',
    size: [240, 180],

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
      parts.push(`V${yi + yi}H${w}Z"/>\n`);

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
  },
};

export default shapes;
