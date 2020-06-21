// src/index.js

import { version as VERSION } from '../package.json';
import Flags from './flags';

export { VERSION };

export function getFlags(options) {
  return new Flags(options);
}
