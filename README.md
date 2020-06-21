# Signal Flags

## Usage

### Create flags 'on the fly'
```js
// Get the default set of flags.
const flags = SignalFlags.getFlags();
// Get the Q flag.
const svg = flags.getSvg('q');
// Force a border (Q doesn't normally have one).
const svg = flags.getSvg('q', { border: true });
// Get the A flag - it has a border by default.
const svg = flags.getSvg('a');
// Remove the border.
const svg = flags.getSvg('q', { border: false });
```

## Development

[![Build Status](https://travis-ci.org/opensums/signal-flags.svg?branch=develop)](https://travis-ci.org/opensums/signal-flags/branches)
