// test/signal-flags.min.test.js

const { version } = require('../../package.json');

const SignalFlags = require('../../dist/signal-flags.min');

describe('The SignalFlags transipiled browser module', () => {
  test('Version should match package.json', () => {
    expect(SignalFlags.version).toBe(version);
  });
});
