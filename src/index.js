// src/index.js

import { version } from '../package.json';

import flags from './default-flags';
import drawShapes from './default-shapes';
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
function buildFlagSvg({ draw, design, colors, outline, file, viewBox }) {

  // Get the dimensions for this shape.
  let size;
  if (viewBox && viewBox[draw.shape]) {
    size = viewBox[draw.shape];
  } else {
    size = draw.size;
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
      draw[part[0]](part, { w, h, colors, outline })
    );
  });

  // If we are forcing an outline and we haven't drawn one already, draw it now.
  if (outline && !hasOutline) {
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
  colors: {...colorSets.default},
  outline: true,
};

// Get svg for a signal flag
export function get(name, options = {}) {
  // Get the shape (pennant, triangle etc.) and design for this flag.
  const { shape, design } = this.flags[name];

  // Get the code to build this shape.
  const { drawShapes } = this;
  const { outline } = this.settings;
  const { colors: optColors } = options;

  let colors;
  if (typeof optColors === 'string') {
    colors = colorSets[optColors] ?? this.settings.colors;
  } else {
    colors = this.settings.colors;
  }

  return buildFlagSvg({
    // If the flag has no shape use the default shape.
    draw: drawShapes[shape || 'default'],
    design,
    outline,
    ...options,
    colors,
  });
}

// The current version.
export { version };

// Check the SVG is OK for a flag.
export { check };

// We must export these so they are in the imported object's scope, although
// they are not part of the API.
export { drawShapes, flags };
