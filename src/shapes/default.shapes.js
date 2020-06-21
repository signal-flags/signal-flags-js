// src/shapes/default.shapes.js

const shapes = {
  default: {
    size: [400, 300],

    // Draw a border.
    border(design, { w, h }) {
      return `<path d="M0.5,0.5H${w - 0.5}V${
        h - 0.5
      }H0Z" stroke="#777" fill="none"/>`;
    },

    // Draw a ground.
    color(design, { w, h }) {
      const [, color] = design;
      return `<path d="M0,0H${w}V${h}H0Z" fill="${color}"/>`;
    },
  },
};

export default shapes;
