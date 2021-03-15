// test/module.test.js

const semver = require('../semver-regex');

const SignalFlags = require('../../dist/signal-flags-loader.min');

describe('The Signal Flags Loader transpiled browser module', () => {
  it('should have a semver version', () => {
    expect(SignalFlags.version).toMatch(semver);
  });
});
