import { Hooks } from "./models/Hook";

export const applyHooksToContent = (content: string, hooks: Hooks) => {
  let copyContent = content;

  hooks.map(e => {
    copyContent = copyContent.replace(e.regex, e.content);
  });

  return copyContent;
};

// /* re-cli:path */ will set , 'path'
// @will set , 'path'
export const usePath = (path: string) => {
  return {
    regex: /(\s*)(\/\*.*re-cli:use-path.*\*\/)/,
    content: `$1'${path}',$1$2`,
  }
};

// /* re-cli:import */ will set import moduleName from 'path';
// @will set import moduleName from 'path';
export const useImport = (moduleAs: string, moduleName: string) => {
  return {
    regex: /([\t ]*)(\/\*.*re-cli:use-import.*\*\/)/,
    content: `$1import ${moduleAs} from '${moduleName}';\n$1$2`,
  }
};

// /* re-cli:module-name */ will set moduleName,
// @will set moduleName,
export const useModuleName = (moduleName: string) => {
  return {
    regex: /(\s*)(\/\*.*re-cli:use-module-name.*\*\/)/,
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
