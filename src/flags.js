// src/flags.js

import defaultFlags from './designs/default.flags';
import defaultShapes from './shapes/default.shapes';

/**
 * Build the SVG for a flag.
 *
 * @param {object} shape A map of functions to draw designs for this shape.
 * @param {mixed[]} design An array of design elements for the flag.
 * @param {object} colors Colours for this flag set.
 * @param {number[]} size The size to draw [width, height].
 */
function buildFlagSvg({ shape, design, colors, border }) {
  // Get the dimensions for this shape and create the svg for the viewBox.
  const { size } = shape;
  const [w, h] = size;
  const parts = [`<svg viewBox="0 0 ${w} ${h}">`];

  let hasBorder = false;
  // Add the svg for each part of the design.
  design.forEach((part) => {
    if (part[0] === 'border') {
      // This is a border but we have turned it off.
      if (border === false) return;
      // Remember we have drawn a border.
      hasBorder = true;
    }
    parts.push(shape[part[0]](part, { w, h, colors }));
  });

  // If we are forcing a border and we haven't drawn one already, draw it now.
  if (border && !hasBorder) {
    parts.push(shape.border([], { w, h, colors }));
  }

  // Close the svg element and return the whole concatenated.
  parts.push('</svg>');
  return parts.join('');
}

class Flags {
  constructor(options) {
    const settings = { ...options };
    this.colors = settings.colors || {};
    this.flags = settings.flags || defaultFlags;
    this.shapes = settings.shapes || defaultShapes;
  }

  getFlag(name) {
    if (name) return this.flags.flags[name];
    return this.flags.flags;
  }

  getSvg(name, options) {
    const { design, shape } = this.flags.flags[name];
    const { shapes, colors } = this;
    return buildFlagSvg({
      // If the flag has no shape use the default shape.
      shape: shapes[shape || 'default'],
      design,
      colors,
      ...options,
    });
  }
}

export default Flags;
