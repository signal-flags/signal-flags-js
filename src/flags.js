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
function buildFlagSvg({ shape, design, colors, outline, file }) {
  // Get the dimensions for this shape and create the svg for the viewBox.
  const { size } = shape;
  const [w, h] = size;
  let parts = [];
  if (file) {
    parts.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
    parts.push(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">\n`
    );
  } else {
    parts.push(`<svg viewBox="0 0 ${w} ${h}">\n`);
  }

  let hasOutline = false;
  // Add the svg for each part of the design.
  design.forEach((part) => {
    if (part[0] === 'outline') {
      // This is an outline but we have turned it off.
      if (outline === false) return;
      // Remember we have drawn an outline.
      hasOutline = true;
    }
    parts.push(shape[part[0]](part, { w, h, colors }));
  });

  // If we are forcing an outline and we haven't drawn one already, draw it now.
  if (outline && !hasOutline) {
    parts.push(shape.outline([], { w, h, colors }));
  }

  // Close the svg element and return the whole concatenated.
  parts.push('</svg>\n');
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
    if (name == null) {
      // Return svg for all flags.
      const svg = {};
      Object.keys(this.flags.flags).forEach((key) => {
        svg[key] = this.getSvg(key, options);
      });
      return svg;
    }
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
