// src/load/index.js

// Parse the DOM for auto-load classes.

import SignalFlags from './index';

const classSelector = '.signal-flags';
const imgSelector = 'IMG[alt^="Signal flag "';
const altRegExp = /^Signal flag (\w*)(\W?)(.*)$/;

if (document.readyState === 'loading') {
  // Loading hasn't finished yet.
  document.addEventListener('DOMContentLoaded', update);
} else {
  // `DOMContentLoaded` has already fired.
  update();
}

function update() {
  updateElements();
  updateImgElements();
}

function updateElements() {
  document.querySelectorAll(classSelector).forEach((el) => {
    const name = el.innerHTML;
    if (SignalFlags.has(name)) {
      SignalFlags.insertIntoElement(el, name);
    }
  });
}

function updateImgElements() {
  document.querySelectorAll(imgSelector).forEach((el) => {
    let [, name, sep, alt] = el.alt.match(altRegExp);

    // Allow upper case flag names.
    name = name.toLowerCase();
    if (SignalFlags.has(name)) {
      SignalFlags.insertAsImgSrc(el, name);
    }

    // If there is a separating character...
    if (sep.length > 0) {
      // Replace the alt with the remaining text.
      el.alt = alt;
    }
  });
}

SignalFlags.update = update;

export default SignalFlags;
