// src/load/index.js

// Parse the DOM for auto-load classes.

import SignalFlags from '../index';

const inlineNodes = ['SPAN'];
const classSelector = '.signal-flags';

function insertInto(el, name) {
  const options = {};

  // Check the flag exists.
  if (!SignalFlags.has(name)) return;

  const { offsetHeight } = el;

  // For an inline node, work within the line height.
  if (inlineNodes.includes(el.nodeName)) {
    const width = offsetHeight * (SignalFlags.isPennant(name) ? 1.875 : 1.5);
    el.style.width = `${width}px`;
    el.style.display = 'inline-block';
  }

  // Thicker borders for smaller images.
  if (offsetHeight < 14) {
    options.outline = 4;
  } else if (offsetHeight < 19) {
    options.outline = 3;
  } else if (offsetHeight < 30) {
    options.outline = 2;
  }

  el.innerHTML = SignalFlags.get(name, options);
}

function onLoad() {
  document.querySelectorAll(classSelector).forEach((el) => {
    const name = el.innerHTML;
    if (SignalFlags.has(name)) {
      insertInto(el, name);
    }
  });
}

if (document.readyState === 'loading') {
  // Loading hasn't finished yet.
  document.addEventListener('DOMContentLoaded', onLoad);
} else {
  // `DOMContentLoaded` has already fired.
  onLoad();
}

export default SignalFlags;
