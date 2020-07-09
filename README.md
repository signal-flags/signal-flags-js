# Signal Flags

Flag images for International Code of Signals Flags.

## Important information

Signal Flags is Copyright © 2020 [OpenSums](https://opensums.com/) and is licensed under an
[MIT license](https://github.com/signal-flags/signal-flags-js/blob/master/LICENSE).

To the extent possible under law, OpenSums has waived all copyright and related or neighboring rights to flag designs and images included with or generated by this software.

## Installation

To use in an HTML page load from either unpkg...

```html
<script src="https://unpkg.com/signal-flags@0.9/dist/signal-flags.min.js"></script>
```

... or jsDelivr:

```html
<script> src="https://cdn.jsdelivr.net/npm/signal-flags@0.9/dist/signal-flags.min.js"</script>
```

To use in Node.js install using npm `npm i signal-flags` or yarn `yarn install signal-flags`

```js
const SignalFlags = require('signal-flags');
```

## Usage
```js
// Get the default set of flags.
const flags = SignalFlags.getFlags();
// Get the Q flag.
const q = flags.getSvg('q');
// Force an outline (Q doesn't normally have one).
const qo = flags.getSvg('q', { outline: true });
// Get the Numeral 1 pennant - it has an outline by default.
const n1 = flags.getSvg('n1');
// Remove the outline.
const n1n = flags.getSvg('n1', { outline: false });
// Get all flags with default settings.
const all = flags.getSvg();
// Get all flags showing default options.
const square = flags.getSvg(null, {
  outline: null, // true to force an outline, false to force no outline
  colors: [], // an array of colour values'
  viewBox: [], // an array of viewBox size overrides for shapes
  file: false, // true to add xml and xmlns declarations for use as a standalone file
});
```

## Development

### Current release v0.9.0
[![Build Status](https://travis-ci.org/signal-flags/signal-flags-js.svg?branch=master)](https://travis-ci.org/signal-flags/signal-flags-js)

### Development branch
[![Build Status](https://travis-ci.org/signal-flags/signal-flags-js.svg?branch=develop)](https://travis-ci.org/signal-flags/signal-flags-js/branches)

### Roadmap

- Blocking v1.0.0
  - Refactor concept of 'default' shapes - only one function with options.
  - Remove 'default' border on flags.
  - Refactor yaml so design becomes an object of shape options.
  - Everything as an option - including colours, border width.
  - Consider renaming colors to clrs - no, the term color is defined in SVG
- Deferred
  - Include and document options
  - One path per colour

#### Consider
