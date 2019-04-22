import path from 'path';
import { formatError } from './error';

let INTERNAL_GENERATORS_PATH = ["generators/**/index*"];

let EXTERNAL_GENERATORS_PATH:string[] = [];
let GENERATORS_PATH = INTERNAL_GENERATORS_PATH;

const configure = (fn: () => any, module: NodeJS.Module) => {
  const __currentDirName = path.dirname(module.filename);

  module.require = (p: string) => {
    // Turn on possibility to include external modules
    // with generators like
    // require('my-module')
    try {
      const m = require.resolve(p);
      try {
        require(m);
      } catch(e) {
        formatError(e);
      }
    } catch (err) {
      EXTERNAL_GENERATORS_PATH.push(path.join(__currentDirName, p));
      GENERATORS_PATH = EXTERNAL_GENERATORS_PATH;
    }
  };

  fn();
}

export {
  configure,
  GENERATORS_PATH
}
