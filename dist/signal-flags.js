/** SignalFlags
 * @link https://github.com/opensums/signal-flags
 * @copyright (c) 2020 OpenSums https://opensums.com
 * @license MIT
 * @version 0.2.0-dev
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.SignalFlags = {}));
}(this, (function (exports) { 'use strict';

  var version = "0.2.0-dev";

  // default,flags,yaml
  var defaultFlags = {
    "groups": {
      "numerals": [
        "n1",
        "n2",
        "n3",
        "n4",
        "n5",
        "n6",
        "n7",
        "n8",
        "n9",
        "n0"
      ],
      "alphabet": [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z"
      ],
      "substitutes": [
        "s1",
        "s2",
        "s3",
        "s4"
      ],
      "racing": [
        "red",
        "yellow",
        "blue",
        "green",
        "black",
        "greenwhite",
        "blackwhite"
      ]
    },
    "flags": {
      "a": {
        "name": "A",
        "phonetic": "Alfa",
        "shape": "swallowtail",
        "design": [
          [
            "vertical",
            [
              "white",
              "blue"
            ]
          ],
          [
            "outline"
          ]
        ]
      },
      "b": {
        "name": "B",
        "phonetic": "Bravo",
        "shape": "swallowtail",
        "design": [
          [
            "solid",
            "red"
          ]
        ]
      },
      "c": {
        "name": "C",
        "phonetic": "Charlie",
        "design": [
          [
            "horizontal",
            [
              "blue",
              "white",
              "red",
              "white",
              "blue"
            ]
          ],
          [
            "outline"
          ]
        ]
      },
      "d": {
        "name": "D",
        "phonetic": "Delta",
        "design": [
          [
            "horizontal",
            [
              "yellow",
              "blue",
              "yellow"
            ],
            [
              1,
              3,
              1
            ]
          ]
        ]
      },
      "e": {
        "name": "E",
        "phonetic": "Echo",
        "design": [
          [
            "horizontal",
            [
              "blue",
              "red"
            ]
          ]
        ]
      },
      "g": {
        "name": "G",
        "phonetic": "Golf",
        "design": [
          [
            "vertical",
            [
              "yellow",
              "blue",
              "yellow",
              "blue",
              "yellow",
              "blue"
            ]
          ]
        ]
      },
      "h": {
        "name": "H",
        "phonetic": "Hotel",
        "design": [
          [
            "vertical",
            [
              "white",
              "red"
            ]
          ],
          [
            "outline"
          ]
        ]
      },
      "j": {
        "name": "J",
        "phonetic": "Juliet",
        "design": [
          [
            "horizontal",
            [
              "blue",
              "white",
              "blue"
            ]
          ],
          [
            "outline"
          ]
        ]
      },
      "k": {
        "name": "K",
        "phonetic": "Kilo",
        "design": [
          [
            "vertical",
            [
              "yellow",
              "blue"
            ]
          ]
        ]
      },
      "l": {
        "name": "L",
        "phonetic": "Lima",
        "design": [
          [
            "check",
            [
              "yellow",
              "black"
            ]
          ]
        ]
      },
      "m": {
        "name": "M",
        "phonetic": "Mike",
        "design": [
          [
            "saltire",
            [
              "white",
              "blue"
            ]
          ],
          [
            "outline"
          ]
        ]
      },
      "n": {
        "name": "N",
        "phonetic": "November",
        "design": [
          [
            "check",
            [
              "blue",
              "white"
            ]
          ],
          [
            "outline"
          ]
        ]
      },
      "p": {
        "name": "P",
        "phonetic": "Papa",
        "design": [
          [
            "border",
            [
              "white",
              "blue"
            ]
          ]
        ]
      },
      "q": {
        "name": "Q",
        "phonetic": "Quebec",
        "design": [
          [
            "solid",
            "yellow"
          ]
        ]
      },
      "r": {
        "name": "R",
        "phonetic": "Romeo",
        "design": [
          [
            "cross",
            [
              "yellow",
              "red"
            ]
          ]
        ]
      },
      "s": {
        "name": "S",
        "phonetic": "Sierra",
        "design": [
          [
            "border",
            [
              "blue",
              "white"
            ]
          ],
          [
            "outline"
          ]
        ]
      },
      "t": {
        "name": "T",
        "phonetic": "Tango",
        "design": [
          [
            "vertical",
            [
              "red",
              "white",
              "blue"
            ]
          ],
          [
            "outline"
          ]
        ]
      },
      "u": {
        "name": "U",
        "phonetic": "Uniform",
        "design": [
          [
            "check",
            [
              "red",
              "white"
            ]
          ],
          [
            "outline"
          ]
        ]
      },
      "v": {
        "name": "V",
        "phonetic": "Victor",
        "design": [
          [
            "saltire",
            [
              "red",
              "white"
            ]
          ],
          [
            "outline"
          ]
        ]
      },
      "w": {
        "name": "W",
        "phonetic": "Whiskey",
        "design": [
          [
            "border",
            [
              "red",
              "white",
              "blue"
            ]
          ]
        ]
      },
      "x": {
        "name": "X",
        "phonetic": "X-ray",
        "design": [
          [
            "cross",
            [
              "blue",
              "white"
            ]
          ],
          [
            "outline"
          ]
        ]
      },
      "black": {
        "name": "Black",
        "category": "racing",
        "design": [
          [
            "solid",
            "black"
          ]
        ]
      },
      "blackwhite": {
        "name": "Black and white",
        "category": "racing",
        "design": [
          [
            "check",
            [
              "black",
              "white"
            ]
          ]
        ]
      },
      "blue": {
        "name": "Blue",
        "category": "racing",
        "design": [
          [
            "solid",
            "blue"
          ]
        ]
      },
      "green": {
        "name": "Green",
        "category": "racing",
        "design": [
          [
            "solid",
            "green"
          ]
        ]
      },
      "greenwhite": {
        "name": "Green and white",
        "category": "racing",
        "design": [
          [
            "check",
            [
              "green",
              "white"
            ]
          ]
        ]
      },
      "red": {
        "name": "Red",
        "category": "racing",
        "design": [
          [
            "solid",
            "red"
          ]
        ]
      },
      "yellow": {
        "name": "Yellow",
        "category": "racing",
        "design": [
          [
            "solid",
            "yellow"
          ]
        ]
      }
    },
    "unsupportedFlags": {
      "n9": {
        "shape": "pennant",
        "category": "numeral",
        "design": [
          [
            "quarters",
            [
              "white",
              "black",
              "red",
              "yellow"
            ]
          ]
        ]
      }
    }
  };

  // src/shapes/default.shapes.js

  function getColor(name, colors) {
    return colors ? colors[name] || name : name;
  }

  const shapes = {
    default: {
      // Dimensions must be divisible by 5 otherwise there will be long decimals.
      size: [240, 180],

      // Draw a border design - note this is not an outline!
      border(design, { w, h, colors }) {
        const [, clrs] = design;
        const parts = [];

        // Draw the border(s) from the outside in.
        // xbw and ybw are the border widths in the x and y dimension.
        const xbw = w / (clrs.length * 2);
        const ybw = h / (clrs.length * 2);
        let xb = 0;
        let yb = 0;
        for (let i = clrs.length - 1; i > 0; i--) {
          parts.push(`<path d="M${xb},${yb}`);
          parts.push(`H${w - xb}V${h - yb}H${xb}Z`);
          xb += xbw;
          yb += ybw;
          // Draw the 'hole' anti-clockwise so it does not fill.
          parts.push(`M${xb},${yb}`);
          parts.push(`V${h - yb}H${w - xb}V${yb}Z"`);
          parts.push(` fill="${getColor(clrs[i], colors)}"/>\n`);
        }
        // Draw the centre.
        parts.push(`<path d="M${xb},${yb}`);
        parts.push(`H${w - xb}V${h - yb}H${xb}Z"`);
        parts.push(` fill="${getColor(clrs[0], colors)}"/>\n`);
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
        parts.push(`<path d="M0,0H${x}V${h}`);
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
        parts.push(`V${0}" fill="${getColor(clrs[0], colors)}"/>\n`);

        x = w - xw;
        y = yw;
        parts.push(`<path d="M${w},0H${x}V${h}`);
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
        parts.push(`V${0}" fill="${getColor(clrs[1], colors)}"/>\n`);
        return parts.join('');
      },

      // Draw a field (background).
      solid(design, { w, h, colors }) {
        const [, clr] = design;
        return `<path d="M0,0H${w}V${h}H0Z" fill="${getColor(clr, colors)}"/>\n`;
      },

      // Draw a cross (like a +).
      cross(design, { w, h, colors }) {
        const [, clrs] = design;
        const parts = [];
        // Standard cross width is 1/5 of the length of the flag; this means x and y need
        // to be carefully chosen to avoid long fractions.
        const x0 = h / 5;
        const y0 = x0;
        const x1 = (w - x0) / 2;
        const y1 = (h - y0) / 2;
        // Draw the two limbs of the cross - it doesn't matter that they intersect.
        parts.push(`<path d="`);
        parts.push(`M${x1},0H${x1 + x0}V${h}H${x1}Z`);
        parts.push(`M0,${y1}H${w}V${y1 + y0}H${0}Z`);
        parts.push(`" fill="${getColor(clrs[0], colors)}"/>\n`);
        // Draw the four background rectangles.
        parts.push(` <path d="`);
        parts.push(`M0,0H${x1}V${y1}H0Z`);
        parts.push(`M${x1 + x0},0H${w}V${y1}H${x1 + x0}Z`);
        parts.push(`M0,${y1 + y0}H${x1}V${h}H0Z`);
        parts.push(`M${x1 + x0},${y1 + y0}H${w}V${h}H${x1 + x0}Z`);
        parts.push(`" fill="${getColor(clrs[1], colors)}"/>\n`);
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
            parts.push(`<path d="M0,${t}`);
            t += variableHeights[i] * sh;
            parts.push(`H${w}V${t}H${0}Z"`);
            parts.push(` fill="${getColor(clrs[i], colors)}"/>\n`);
          }
          return parts.join('');
        }

        // Fixed stripe height.
        const sh = h / clrs.length;
        // t is the top edge of the stripe.
        for (let t = 0; t < h; t += sh) {
          parts.push(`<path d="M0,${t}`);
          parts.push(`H${w}V${t + sh}H${0}Z"`);
          parts.push(` fill="${getColor(clrs[t / sh], colors)}"/>\n`);
        }
        return parts.join('');
      },

      // Draw an outline.
      outline(design, { w, h, colors }) {
        return [
          '<path d="M0.5,0.5',
          `H${w - 0.5}V${h - 0.5}H0Z"`,
          ' stroke="black" fill="none"/>\n',
        ].join('');
      },

      // Draw a saltire (like an X).
      saltire(design, { w, h, colors }) {
        const [, clrs] = design;
        const parts = [];
        const x0 = w / 10;
        const y0 = h / 10;
        const x1 = w / 2 - x0;
        const y1 = h / 2 - y0;
        // Draw the two limbs of the cross - it doesn't matter that they intersect.
        parts.push(`<path d="`);
        parts.push(`M0,0H${x0}L${w},${h - y0}V${h}H${w - x0}L0,${y0}Z`);
        parts.push(`M${w - x0},0H${w}V${y0}L${x0},${h}H0V${h - y0}Z`);
        parts.push(`" fill="${getColor(clrs[0], colors)}"/>\n`);
        // Draw the four background triangles.
        parts.push(` <path d="`);
        parts.push(`M${x0},0H${w - x0}L${w / 2},${y1}Z`);
        parts.push(`M${w},${y0}V${h - y0}L${w - x1},${h / 2}Z`);
        parts.push(`M${x0},${h}H${w - x0}L${w / 2},${h - y1}Z`);
        parts.push(`M0,${y0}V${h - y0}L${x1},${h / 2}Z`);
        // parts.push(`M${x1 + x0},0H${w}V${y1}H${x1 + x0}Z`);
        // parts.push(`M0,${y1 + y0}H${x1}V${h}H0Z`);
        // parts.push(`M${x1 + x0},${y1 + y0}H${w}V${h}H${x1 + x0}Z`);
        parts.push(`" fill="${getColor(clrs[1], colors)}"/>\n`);
        return parts.join('');
      },

      // Draw vertical stripes.
      vertical(design, { w, h, colors }) {
        const [, clrs] = design;
        // Stripe width.
        const sw = w / clrs.length;
        const parts = [];
        // l is the left edge of the stripe.
        for (let l = 0; l < w; l += sw) {
          parts.push(`<path d="M${l},0`);
          parts.push(`H${l + sw}V${h}H${l}Z"`);
          parts.push(` fill="${getColor(clrs[l / sw], colors)}"/>\n`);
        }
        return parts.join('');
      },
    },

    swallowtail: {
      size: [240, 180],

      // Draw a field (background).
      solid(design, { w, h, colors }) {
        // Make the tail 1/4 of the width of the flag.
        const tail = w * 0.25;
        const [, clr] = design;
        return [
          '<path d="M0,0',
          `H${w}L${w - tail},${h / 2}L${w},${h}H0Z"`,
          ` fill="${getColor(clr, colors)}"/>\n`,
        ].join('');
      },

      // Draw an outline.
      outline(design, { w, h }) {
        // Make the tail 1/4 of the width of the flag.
        const tail = w * 0.25;
        return [
          '<path d="M0.5,0.5',
          `H${w - 0.5}L${w - tail - 0.5},${h / 2}L${w - 0.5},${h - 0.5}H0Z"`,
          ' stroke="black" fill="none"/>\n',
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
          parts.push(`<path d="M${l},0`);
          parts.push(`H${l + sw}V${h}H${l}Z"`);
          parts.push(` fill="${getColor(clrs[l / sw], colors)}"/>\n`);
        }
        // Last stripe has the swallowtail.
        parts.push(`<path d="M${w - sw},0`);
        parts.push(`H${w}L${w - tail},${h / 2}L${w},${h}H${w - sw}Z"`);
        parts.push(` fill="${getColor(clrs[clrs.length - 1], colors)}"/>\n`);
        return parts.join('');
      },
    },
  };

  // src/flags.js

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
      this.shapes = settings.shapes || shapes;
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

  // src/index.js

  function getFlags(options) {
    return new Flags(options);
  }

  exports.VERSION = version;
  exports.getFlags = getFlags;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=signal-flags.js.map
