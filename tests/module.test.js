// test/module.test.js

const semver = require('./semver-regex');

const SignalFlags = require('../dist/signal-flags.min');

describe('The SignalFlags umd module', () => {
  it('should have a semver version', () => {
    expect(SignalFlags.version).toMatch(semver);
  });
});
