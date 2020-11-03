# Signal Flags

Flag images for International Code of Signals Flags.

## Important information

Signal Flags is Copyright © 2020 [OpenSums](https://opensums.com/) and is licensed under an
[MIT license](https://github.com/signal-flags/signal-flags-js/blob/master/LICENSE).

To the extent possible under law, OpenSums has waived all copyright and related or neighboring
rights to flag designs and images included with this software.

## Installation

To use in an HTML page load from either unpkg...

```html
<script src="https://unpkg.com/signal-flags@2/dist/signal-flags.min.js"></script>
```

... or jsDelivr:

```html
<script
  src = "https://cdn.jsdelivr.net/npm/signal-flags@2/dist/signal-flags.min.js">
</script>
```

To use in Node.js install using npm `npm i signal-flags` or yarn `yarn install signal-flags`

```js
const SignalFlags = require('signal-flags');
```

## Usage

```js
// Get the SVG string for a flag.
SignalFlags.get('a');
// Get the SVG string for a flag with no outline.
SignalFlags.get('a', { outline: false });
// Get the SVG string for a flag as a standalone file.
SignalFlags.get('a', { file: true });
// Get the SVG string for a flag using the `primary` colour set.
SignalFlags.get('a', { colors: SignalFlags.primaryColors });

// Get the SVG strings for all flags (keyed by the flag name).
SignalFlags.all();
// Get the SVG strings for all flags with options.
SignalFlags.all({ outline: false, file: true });

// Get the current configuration.
SignalFlags.config();
// Set the default to no outlines.
SignalFlags.config({ outline: false });
// Set the default colours to the `primary` colour set.
SignalFlags.config('colors', 'primary');
// Set a default colour (leaves other colours unchanged).
SignalFlags.config('colors', { black: '#000' });
```

## Current release v0.9.1

[![Build Status](https://travis-ci.org/signal-flags/signal-flags-js.svg?branch=master)](https://travis-ci.org/signal-flags/signal-flags-js)

## Development

[![Build Status](https://travis-ci.org/signal-flags/signal-flags-js.svg?branch=develop)](https://travis-ci.org/signal-flags/signal-flags-js/branches)

### Working towards v2.0

### Planned for later versions
