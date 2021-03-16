// src/shapes/helpers.js

export function getColor(name, colors) {
  if (name === 'outline') {
    return colors ? colors.outline || '#000' : '#000';
  }
  return colors ? colors[name] || name : name;
}
