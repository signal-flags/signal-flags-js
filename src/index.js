// src/index.js

import { version } from '../package.json';

import flags from './default-flags';
import { shapes } from './shapes/index';
import { check } from './check';

// Ponyfill for btoa in node.
const toBase64 =
  typeof btoa === 'undefined' ? (b) => Buffer.from(b).toString('base64') : btoa;

const colorSets = {
  default: {
    outline: '#000', // The default outline is true black.
    black: '#2d2926', // Pantone Black C
    blue: '#005eb8', // Pantone 300 C
    // Consider the Irish flag colours Pantone 347 C #009a44 or 347 U #169b62.
    green: '#00965e', // Pantone 340 C
    red: '#c8102e', // Pantone 186 C
    yellow: '#ffd100', // Pantone 109 C
    white: '#f5f5f5',
    // Consider the Irish flag colours Pantone 151 C #ff8200 or 347 U #ff883e.
    orange: '#e37017', // Arithmetical mean red and yellow best in 'tests'.
  },

  primary: {
    outline: '#000',
    black: '#000',
    blue: '#00f',
    green: '#0f0',
    red: '#f00',
    yellow: '#ff0',
    white: '#fff',
    orange: '#f50', // Close to Pantone Orange C #fe5000
  },
};

// This is used when calculating the height of elements when inserting svg.
const inlineNodes = ['SPAN'];

/**
 * Build the SVG for a flag.
 *
 * @private
 * @param {object} shape A map of functions to draw designs for this shape.
 * @param {mixed[]} design An array of design elements for the flag.
 * @param {object} colors Colours for this flag set.
 * @param {number[]} size The size to draw [width, height].
 */
function buildFlagSvg({ draw, design, colors, outline, file, dataUri, shape }) {
  // Get the dimensions for this shape.
  const [w, h] = (shape && draw.size[shape]) || draw.size.default;

  let parts = [];

  if (file || dataUri) {
    // Add the xml declaration for a file.
    parts.push('<?xml version="1.0" encoding="UTF-8" ?>\n');
    parts.push(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">\n`
    );
  } else {
    // Just the svg tag for a DOM node.
    parts.push(`<svg viewBox="0 0 ${w} ${h}">\n`);
  }

  // Add the tags for each part of the design.
  design.forEach((part) => {
    // Remember some flags (F) need to know about the outline.
    parts.push(draw[part[0]](part, { w, h, colors, outline }));
  });

  // Draw the outline.
  if (outline) {
    parts.push(draw.outline([], { w, h, colors, outline }));
  }

  // Close the svg element with or without a final newline.
  parts.push(file || dataUri ? '</svg>\n' : '</svg>');

  // Return the markup as a dataUri...
  if (dataUri) {
    // ? support %-encoding as an option, although it generates longer strings?
    // 'data:image/svg+xml;utf8,' + encodeURIComponent(...);
    return 'data:image/svg+xml;base64,' + toBase64(parts.join(''));
  }

  // ... or just plain text.
  return parts.join('');
}

/**
 * Get the SVG for all flags.
 *
 * This supports all options available in `get()`.
 *
 * @param {*} options
 * @return {object} The SVG for each flag, keyed by the flag name.
 */
function all(options) {
  // Return svg for all flags.
  const all = {};
  Object.keys(this.flags).forEach((key) => {
    all[key] = this.get(key, options);
  });
  return all;
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
    shapes,
    flags,

    // Allow override in options.
    ...options,
  };
}

// Get svg for a signal flag
function get(
  name,
  { colors: optColors, file, dataUri, outline, shape: optShape } = {}
) {
  // Get the shape (pennant, triangle etc.) and design for this flag.
  const { shape, design, size } = this.flags[name];

  // Use any override size from the flag definition: note this will override
  // the explicit `shape` option. This is only currently used for the AP flag.
  if (size) {
    optShape = size;
  }

  // Get the code to build this shape.
  const { shapes } = this;

  // Set the colours according to the options or defaults.
  let colors;
  if (typeof optColors === 'string') {
    colors = colorSets[optColors] ?? this.settings.colors;
  } else {
    colors = { ...this.settings.colors, ...optColors };
  }

  return buildFlagSvg({
    colors,
    design,
    // If the flag has no shape use the default shape.
    draw: shapes[shape || 'default'],
    file,
    dataUri,
    outline: outline ?? this.settings.outline,
    shape: optShape,
  });
}

/**
 * Get the default settings for a SignalFlags object.
 *
 * @private
 */
function getDefaults() {
  return {
    colors: { ...colorSets.default },
    outline: true,
  };
}

/**
 * Thicker borders for smaller images.
 *
 * @private
 */
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

/**
 * Check if the element has a block-like display style.
 *
 * @private
 */
function isDisplayBlock(el) {
  const { display } = el.style;
  if (!display) return false;
  return display !== 'inline';
}

/**
 * Check a flag design exists.
 *
 * @param {string} name The name of a flag.
 * @return {boolean} True iff the flag has a design.
 */
function has(name) {
  return this.flags[name] != null;
}

/**
 * Insert a flag as a data URI as the `src` of an `IMG` tag.
 *
 * @param {HTMLElement} el   An IMG element.
 * @param {string}      name The name of the flag.
 */
function insertAsImgSrc(el, name, options = {}) {
  // Check the flag exists.
  if (!this.has(name)) return;

  // Spread the options so the object is not mutated.
  // options = { ...options };

  // First check if a height or width is set on the element.
  const setWidth = el.attributes.width?.value;
  const setHeight = el.attributes.height?.value;

  let outline;
  if (setWidth || setHeight) {
    outline = getSuitableOutlineWidth(setWidth, setHeight);
  } else if (isDisplayBlock(el)) {
    // Base the outline on the available width.
    outline = getSuitableOutlineWidth(el.offsetWidth ?? 240);
  } else {
    // If this is an inline element we must set the height.
    console.log(name, el, el.style.display);
    el.height = el.offsetHeight;
    outline = getSuitableOutlineWidth(null, el.offsetHeight);
  }
  el.src = this.get(name, { outline, ...options, dataUri: true });
}

/**
 * Insert a flag as SVG as children of an element.
 *
 * @param {HTMLElement} el   An HTML element that can be a parent.
 * @param {string}      name The name of the flag.
 */
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
 * Check if a 'flag' has a pennant-like (i.e. wider) shape.
 *
 * @param {string}   name The name of the flag.
 * @return {boolean} True iff the flag has a design.
 */
function isPennant(name) {
  return this.flags[name].shape === 'pennant';
}

export default factory();
