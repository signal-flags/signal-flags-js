// test/module.test.js

const SignalFlags = require('../dist/signal-flags.min');

const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

describe('The thing', () => {
  it('should have a semver version', () => {
    expect(SignalFlags.VERSION).toMatch(SEMVER);
  });
});
