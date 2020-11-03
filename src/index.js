// src/index.js

import { version } from '../package.json';

import flags from './default-flags';
import drawShapes from './draw-shapes';
import { check } from './check';

const colorSets = {
  default: {
    outline: '#000', // The default outline is true black.
    black: '#2d2926', // Pantone Black C
    blue: '#005eb8', // Pantone 300 C
    green: '#00965e', // Pantone 340 C
    red: '#c8102e', // Pantone 186 C
    yellow: '#ffd100', // Pantone 109 C
    white: '#fff',
  },

  primary: {
    outline: '#000',
    black: '#000',
    blue: '#00f',
    green: '#0f0',
    red: '#f00',
    yellow: '#ff0',
    white: '#fff',
  },
};

/**
 * Build the SVG for a flag.
 *
 * @param {object} shape A map of functions to draw designs for this shape.
 * @param {mixed[]} design An array of design elements for the flag.
 * @param {object} colors Colours for this flag set.
 * @param {number[]} size The size to draw [width, height].
 */
function buildFlagSvg({ draw, design, colors, outline, file, shape }) {
  // Get the dimensions for this shape.
  const [w, h] = (shape && draw.size[shape]) || draw.size.default;

  let parts = [];
  if (file) {
    parts.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
    parts.push(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">\n`
    );
  } else {
    parts.push(`<svg viewBox="0 0 ${w} ${h}">\n`);
  }

  // Add the svg for each part of the design.
  design.forEach((part) => {
    // Remember some flags (F) need to know about the outline.
    parts.push(draw[part[0]](part, { w, h, colors, outline }));
  });

  // Draw the outline.
  if (outline) {
    parts.push(draw.outline([], { w, h, colors, outline }));
  }

  // Close the svg element and return the whole concatenated.
  parts.push(file ? '</svg>\n' : '</svg>');
  return parts.join('');
}

export function all(options) {
  // Return svg for all flags.
  const all = {};
  Object.keys(this.flags).forEach((key) => {
    all[key] = this.get(key, options);
  });
  return all;
}

// The settings for this SignalFlags object.
export const settings = {
  colors: { ...colorSets.default },
  outline: true,
};

// Get svg for a signal flag
export function get(
  name,
  { colors: optColors, file, outline, shape: optShape } = {}
) {
  // Get the shape (pennant, triangle etc.) and design for this flag.
  const { shape, design } = this.flags[name];

  // Get the code to build this shape.
  const { drawShapes } = this;

  // Set the colours according to the options or defaults.
  let colors;
  if (typeof optColors === 'string') {
    colors = colorSets[optColors] ?? this.settings.colors;
  } else {
    colors = this.settings.colors;
  }

  return buildFlagSvg({
    colors,
    design,
    // If the flag has no shape use the default shape.
    draw: drawShapes[shape || 'default'],
    file,
    outline: outline ?? this.settings.outline,
    shape: optShape,
  });
}

// The current version.
export { version };

// Check the SVG is OK for a flag.
export { check };

// We must export these so they are in the imported object's scope, although
// they are not part of the API.
export { drawShapes, flags };
