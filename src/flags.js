// src/flags.js

import defaultFlags from './default.flags';
import defaultShapes from './default.shapes';

const WRONG_LINE_ENDINGS = /[^>]$/m;
const MISSING_LINE_ENDINGS = />./m;

// Used to test for any number with more than 1 digit after the decimal point.
const LONG_DECIMALS = /[0-9]\.[0-9]{2}/;

const defaultColors = {
  outline: '#000', // The default outline is true black.
  white: '#fff',
  blue: '#005EB8', // Pantone 300 C
  green: '#00965E', // Pantone 340 C
  red: '#C8102E', // Pantone 186 C
  yellow: '#FFD100', // Pantone 109 C
  black: '#2D2926', // Pantone Black C
};

function audit(svg, options) {
  let checkLength;
  if (options && options['file']) {
    if (!svg.endsWith('</svg>\n')) throw new Error('Text after the last line');
    checkLength = svg.length - 1;
  } else {
    if (!svg.endsWith('</svg>')) throw new Error('Text after the closing tag');
    checkLength = svg.length;
  }
  if (svg.substring(0, checkLength).match(WRONG_LINE_ENDINGS)) {
    throw new Error('Wrong line endings');
  }
  if (svg.match(MISSING_LINE_ENDINGS)) throw new Error('Missing line endings');
  if (svg.match(LONG_DECIMALS)) throw new Error('Long decimals');
  return true;
}

/**
 * Build the SVG for a flag.
 *
 * @param {object} shape A map of functions to draw designs for this shape.
 * @param {mixed[]} design An array of design elements for the flag.
 * @param {object} colors Colours for this flag set.
 * @param {number[]} size The size to draw [width, height].
 */
function buildFlagSvg({ shape, design, colors, outline, file, viewBox }) {
  // Get the dimensions for this shape and create the svg for the viewBox.
  let size;
  if (viewBox && viewBox[shape.shape]) {
    size = viewBox[shape.shape];
  } else {
    size = shape.size;
  }
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

  let calculatedColors = colors;
  if (!calculatedColors) {
    calculatedColors = colors === false ? {} : defaultColors;
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
    parts.push(
      shape[part[0]](part, { w, h, colors: calculatedColors, outline })
    );
  });

  // If we are forcing an outline and we haven't drawn one already, draw it now.
  if (outline && !hasOutline) {
    parts.push(shape.outline([], { w, h, colors: calculatedColors, outline }));
  }

  // Close the svg element and return the whole concatenated.
  parts.push(file ? '</svg>\n' : '</svg>');
  return parts.join('');
}

class Flags {
  constructor(options) {
    const settings = { ...options };
    this.colors = settings.colors;
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

  checkSvg(svg, options) {
    return audit(svg, options);
  }
}

export default Flags;
