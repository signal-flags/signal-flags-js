# Signal Flags

Flag images for International Code of Signals Flags.

## Getting started: Signal Flags Loader

To use the automagic Signal Flags Loader see the
[Example Page](https://signalflags.org/examples/index.html).

## Getting started without the Loader

To use in an HTML page, load from jsDelivr:

```html
<script src="https://cdn.jsdelivr.net/npm/signal-flags@2/dist/signal-flags.min.js"></script>
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
```

## Current release v2.0.1

[![build](https://github.com/signal-flags/signal-flags-js/actions/workflows/build.yaml/badge.svg)](https://github.com/signal-flags/signal-flags-js/actions/workflows/build.yaml)

Changes in v2.0.1

- fix: Loader should run immediately if DOM is already loaded

v2.0 breaks compatibility with the previous release v0.9.1

- new API with `get()` and `all()` methods replacing `getSvg()`

v2.0 introduces the following features and improvements:

- Loader build for browsers with DOM traversal and auto-insertion
- support for IE 11 and some other browsers through Babel
- new 'square' shape option
- new 'primary' colour option
- improved designs for I, P and S flags
- better test coverage
- example HTML page

## Development

[![build](https://github.com/signal-flags/signal-flags-js/actions/workflows/build.yaml/badge.svg?branch=develop)](https://github.com/signal-flags/signal-flags-js/actions/workflows/build.yaml)

### Planned for v2.1

- implement API for changing configuration something like this:

```js
// Get the current configuration.
SignalFlags.config();
// Set the default to no outlines.
SignalFlags.config({ outline: false });
// Set the default colours to the `primary` colour set.
SignalFlags.config('colors', 'primary');
// Set a default colour (leaves other colours unchanged).
SignalFlags.config('colors', { black: '#000' });
```

- better test coverage for `check()` method
- add configuration to `factory()` method
- document and test `has()` and `isPennant()` methods introduced to support
  Loader
- proportional borders in Loader images

### Planned for later versions

- better test coverage for individual designs
- in-browser testing
- fix API for overrides to `flags` (individual flag designs) and `draw`
  (code implementing designs)
- options for Loader images

## Important information

Signal Flags code is Copyright © 2020
[signalflags.org](https://signalflags.org/) and is licensed under an
[MIT license](https://github.com/signal-flags/signal-flags-js/blob/master/LICENSE).

Signal Flags designs and images are in the public domain and to the extent
possible under law,
[signalflags.org](https://signalflags.org/) has waived all copyright and related
or neighboring rights to flag designs and images included with this software.

Signal Flags code, designs and images (together "the software") are provided 'as
is', without warranty of any kind, express or implied, including but not limited
to the warranties of merchantability, fitness for a particular purpose and
noninfringement. In no event shall the authors be liable for any claim, damages
or other liability, whether in an action of contract, tort or otherwise, arising
from, out of or in connection with the software or the use or other dealings in
the software.
