// src/index.js

import { version } from '../package.json';

import flags from './default-flags';
import shapes from './default-shapes';
import { check } from './check';

const defaultColors = {
  outline: '#000', // The default outline is true black.
  white: '#fff',
  blue: '#005EB8', // Pantone 300 C
  green: '#00965E', // Pantone 340 C
  red: '#C8102E', // Pantone 186 C
  yellow: '#FFD100', // Pantone 109 C
  black: '#2D2926', // Pantone Black C
};

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

export function all(options) {
  // Return svg for all flags.
  const all = {};
  Object.keys(this.flags.flags).forEach((key) => {
    all[key] = this.get(key, options);
  });
  return all;
}

// The settings for this SignalFlags object.
export const settings = {
  colors: {...defaultColors},
  outline: true,
};

// Get svg for a signal flag
export function get(name, options) {
  const { design, shape } = this.flags.flags[name];
  const { shapes } = this;
  const { colors, outline } = this.settings;
  return buildFlagSvg({
    // If the flag has no shape use the default shape.
    shape: shapes[shape || 'default'],
    design,
    colors,
    outline,
    ...options,
  });
}

// The current version.
export { version };

// Check the SVG is OK for a flag.
export { check };

export { shapes, flags };
