import {cliOf, addQuestion, moveTemplates, updateFile} from 'decoration';
import {usePath, useImport, useModuleName} from 'hooks';

// main function
cliOf (generatorName: string) {}
/* ======================== */


// adding question
addQuestion (inquirerQuestion: Question) {}
/* ======================== */


// moving templates
moveTemplates (destination: string, templatesPaths: string[]) {}
/* ======================== */


// updates file
updateFile (filePath: string, getHooks: (answers: Answers) => Hooks) {}
/* ======================== */


// will set , 'path'
usePath (path: string) {}
/* ======================== */


// will set import moduleName from 'path';
useImport (path: string, moduleName: string) {}
/* ======================== */


// will set moduleName,
useModuleName (moduleName: string) {}
/* ======================== */

