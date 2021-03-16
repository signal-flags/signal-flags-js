// test/module.test.js

const { version } = require('../../package.json');

const SignalFlags = require('../../dist/signal-flags-loader.min');

describe('The Signal Flags Loader transpiled browser module', () => {
  test('Version should match package.json', () => {
    expect(SignalFlags.version).toBe(version);
  });
});
