import path from 'path';
let GENERATORS_PATH = "generators/**/index*";

const configure = (fn: () => any, module: NodeJS.Module) => {
  const __currentDirName = module.paths[0].replace('node_modules', '');
  module.require = (p: string) => {
    GENERATORS_PATH = path.resolve(__currentDirName, p);
  };

  fn();
}

export {
  configure,
  GENERATORS_PATH
}
