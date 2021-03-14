// src/load/index.js

// Parse the DOM for auto-load classes.

import SignalFlags from './index';

const classSelector = '.signal-flags';
const imgSelector = 'IMG[alt^="Signal flag "';

function onLoad() {
  document.querySelectorAll(imgSelector).forEach((el) => {
    const name = el.alt.slice(12);
    if (SignalFlags.has(name)) {
      SignalFlags.insertAsImgSrc(el, name);
    }
  });

  document.querySelectorAll(classSelector).forEach((el) => {
    const name = el.innerHTML;
    if (SignalFlags.has(name)) {
      SignalFlags.insertIntoElement(el, name);
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
