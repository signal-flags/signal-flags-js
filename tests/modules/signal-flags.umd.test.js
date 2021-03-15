// test/signal-flags.umd.test.js

const semver = require('../semver-regex');

const SignalFlags = require('../../dist/signal-flags.umd');

describe('The SignalFlags es2015 umd module', () => {
  it('should have a semver version', () => {
    expect(SignalFlags.version).toMatch(semver);
  });
});
