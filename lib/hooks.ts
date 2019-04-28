import { Hooks } from "./models/Hook";

export const applyHooksToContent = (content: string, hooks: Hooks) => {
  let copyContent = content;

  hooks.map(e => {
    copyContent = copyContent.replace(e.regex, e.content);
  });

  return copyContent;
};

// /* recli:path */ will set , 'path'
// @will set , 'path'
export const usePath = (path: string) => {
  return {
    regex: /(\s*)(\/\*.*recli:use-path.*\*\/)/,
    content: `$1'${path}',$1$2`,
  }
};

// /* recli:import */ will set import moduleName from 'path';
// @will set import moduleName from 'path';
export const useImport = (moduleAs: string, moduleName: string) => {
  return {
    regex: /([\t ]*)(\/\*.*recli:use-import.*\*\/)/,
    content: `$1import ${moduleAs} from '${moduleName}';\n$1$2`,
  }
};

// /* recli:module-name */ will set moduleName,
// @will set moduleName,
export const useModuleName = (moduleName: string) => {
  return {
    regex: /(\s*)(\/\*.*recli:use-module-name.*\*\/)/,
    content: `$1${moduleName},$1$2`,
  }
};

export const useCustom = ({
  regex,
  content
}: {regex: RegExp, content: string}) => {
  return {
    regex: regex,
    content: content,
  }
}
