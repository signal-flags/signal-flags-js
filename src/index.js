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
    white: '#f5f5f5',
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

// This is used when calculating the height of elements when inserting svg.
const inlineNodes = ['SPAN'];

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

function all(options) {
  // Return svg for all flags.
  const all = {};
  Object.keys(this.flags).forEach((key) => {
    all[key] = this.get(key, options);
  });
  return all;
}

// Get the default settings for a SignalFlags object.
function getDefaults() {
  return {
    colors: { ...colorSets.default },
    outline: true,
  };
}

// Get svg for a signal flag
function get(name, { colors: optColors, file, outline, shape: optShape } = {}) {
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

// Check a flag design exists.
function has(name) {
  return this.flags[name] != null;
}

// Thicker borders for smaller images.
function getSuitableOutlineWidth(width, height) {
  if (height == null) {
    height = width / 1.5;
  }

  // Return undefined in case we are setting a property on an options object.
  if (height == null || height > 29) return undefined;

  if (height < 14) return 4;
  if (height < 19) return 3;

  // 19 <= height < 30
  return 2;
}

function insertIntoElement(el, name) {
  const options = {};

  // Check the flag exists.
  if (!this.has(name)) return;

  const { offsetHeight } = el;

  // For an inline node, work within the line height.
  if (inlineNodes.includes(el.nodeName)) {
    const width = offsetHeight * (this.isPennant(name) ? 1.875 : 1.5);
    el.style.width = `${width}px`;
    el.style.display = 'inline-block';
  }

  options.outline = getSuitableOutlineWidth(null, offsetHeight);

  el.innerHTML = this.get(name, options);
}

/**
 * Insert a flag as the `src` of an IMG tag.
 *
 * @param {HTMLElement} el An IMG element.
 * @param {*} name The name of the flag.
 */
function insertAsImgSrc(el, name) {
  const options = {};

  // Check the flag exists.
  if (!this.has(name)) return;

  // This is the only way to get height and width before rendering.
  const setWidth = el.attributes.width?.value;
  const setHeight = el.attributes.height?.value;

  options.outline = getSuitableOutlineWidth(setWidth, setHeight);

  options.file = true;

  // Base 64 encode the xml string to avoid xml parsing issues.
  el.src = 'data:image/svg+xml;base64,' + btoa(this.get(name, options));
}

// Check if a 'flag' is a pennant.
function isPennant(name) {
  return this.flags[name].shape === 'pennant';
}

function factory(options) {
  return {
    // API constant.
    version,

    // API instance methods.
    all,
    get,
    has,

    insertAsImgSrc,
    insertIntoElement,

    isPennant,

    // API static methods.
    check,
    factory,

    // Not part of the API.
    settings: getDefaults(),
    drawShapes,
    flags,

    // Allow override in options.
    ...options,
  };
}

export default factory();
