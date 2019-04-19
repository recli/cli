import path from 'path';
// import glob from 'glob';
import fs from 'fs';
// import _ from 'lodash';
// import pluralize from 'pluralize';

// export const appRoot = (...somePath) => path.join(process.env.PWD, ...somePath);
export const getDirList = (dirPath:string) =>
  fs
    .readdirSync(dirPath)
    .filter(e => fs.statSync(path.join(dirPath, e)).isDirectory());

// export const files = globTpl => glob.sync(globTpl, { nodir: true });

// export const filesExpose = globTpl =>
//   files(globTpl).map(filename => ({
//     filename,
//     content: fs.readFileSync(filename, { encoding: 'utf8' }),
//   }));

// export const dirs = globTpl => {
//   const onlyFiles = files(globTpl);

//   return glob.sync(globTpl).filter(filePath => !onlyFiles.includes(filePath));
// };

// const getDirectories = (srcpath, ignoredFolders, prevPath?) => {
//   const folders = fs
//     .readdirSync(srcpath)
//     .filter(
//       file =>
//         ignoredFolders.indexOf(file) === -1 &&
//         fs.statSync(path.join(srcpath, file)).isDirectory(),
//     );

//   return [].concat(
//     ...folders.map(e =>
//       [].concat(
//         [path.join(prevPath || '', e)],
//         getDirectories(
//           path.join(srcpath, e),
//           ignoredFolders,
//           path.join(prevPath || '', e),
//         ),
//       ),
//     ),
//   );
// };

// export const getFolders = (thePath = '', ignoredFolders = []) =>
//   getDirectories(thePath, ignoredFolders);

// export const srcDir = context =>
//   path.resolve(context.destinationRoot(), context.settings.root || '');

// export const srcFile = context => file => path.resolve(srcDir(context), file);

// export const cwd = context =>
//   path.resolve(srcDir(context), context.settings.cwd);

// export const cwdFile = context => file => path.resolve(cwd(context), file);

// export const prompt = context => (prompts, done) => {
//   const asyncDone = context.async();
//   const answers = {};

//   context.prompt(prompts).then(props => {
//     if (done) {
//       done(props);
//     } else {
//       Object.assign(answers, props);
//     }

//     asyncDone();
//   });

//   return answers;
// };

// export const processFile = (filePath, processMethod) => {
//   let content = fs.readFileSync(filePath, { encoding: 'utf-8' });

//   content = processMethod(content);

//   if (content === undefined) {
//     return;
//   }

//   this.fs.write(filePath, content);
// };

// export const splitAt = index => it => [
//   it.slice(0, index),
//   it.slice(index) || '',
// ];

// export const getRelativePath = (filePath, absuluteFilePath) =>
//   path.relative(path.dirname(filePath), absuluteFilePath);

// export const addRelRequire = context => (
//   absFilePathForPatch,
//   relPath,
//   mdlName,
//   replaceFormatter,
// ) => {
//   let content = fs.readFileSync(absFilePathForPatch, { encoding: 'utf-8' });

//   // /* cli:path */ will set , 'path'
//   content = content.replace(
//     /(\s*)(\/\*.*cli:path.*\*\/)/,
//     `,$1'${relPath}'$1$2`,
//   );

//   const newModuleName = mdlName || `${path.basename(relPath)}`;

//   // /* cli:import */ will set import ModuleName from 'path';
//   const newLocal = /([\t ]*)(\/\*.*cli:import.*\*\/)/;
//   content = content.replace(
//     newLocal,
//     `$1import ${newModuleName} from '${relPath}';\n$1$2`,
//   );

//   // /* cli:value */ will set ModuleName,
//   content = content.replace(
//     /(\s*)(\/\*.*cli:value.*\*\/)/,
//     `$1${newModuleName},$1$2`,
//   );

//   // /* cli:module */ will set , 'ModuleName'
//   content = content.replace(
//     /(\s*)(\/\*.*cli:module.*\*\/)/,
//     `,$1'${newModuleName}'$1$2`,
//   );

//   if (replaceFormatter) {
//     // it mean you can define you own custome rules
//     if (Array.isArray(replaceFormatter)) {
//       replaceFormatter.forEach(rule => {
//         content = content.replace(
//           rule.name,
//           `$1${rule.callback(
//             absFilePathForPatch,
//             relPath,
//             mdlName || newModuleName,
//           )}$1$2`,
//         );
//       });
//     } else {
//       // /* cli:custome */ will set string from replaceFormatter
//       content = content.replace(
//         /(\s*)(\/\*.*cli:custome.*\*\/)/,
//         `$1${replaceFormatter(
//           absFilePathForPatch,
//           relPath,
//           mdlName || newModuleName,
//         )}$1$2`,
//       );
//     }
//   }
//   context.fs.write(absFilePathForPatch, content);
// };

// export const formatClassName = (name = '') =>
//   _.startCase(_.camelCase(name))
//     .split(' ')
//     .join('');

// export const formatCamelCase = (name = '') =>
//   _.camelCase(name)
//     .split(' ')
//     .join('');

// export const formatConstant = (name = '') =>
//   name.toUpperCase().replace(/\\-/g, '_');
// export const formatTitle = (name = '') => _.startCase(_.camelCase(name));
// export const unpluralize = (string = '') => pluralize(string, 1);

// export const copyTplFile = context => (from, absPathTo, data) =>
//   context.fs.copyTpl(
//     context.templatePath(from),
//     absPathTo,
//     Object.assign({}, data, {
//       pluralize,
//       _,
//       formatClassName,
//       formatConstant,
//       formatCamelCase,
//       formatTitle,
//       unpluralize,
//     }),
//   );

// export const askRootFolder = (settings, rootFolderPath) => {
//   const folderPath = path.join(appRoot() || '', rootFolderPath || '', '*');
//   const filterItems = settings.componentsSkipFolders || [];
//   return {
//     type: 'list',
//     name: 'root',
//     message: 'pick component root:',
//     choices: dirs(folderPath)
//       .map(file => path.basename(file))
//       .filter(e => filterItems.indexOf(e) === -1),
//   };
// };

// export const askFolders = (settings, rootFolderPath) => ({
//   type: 'list',
//   name: 'root',
//   message: 'pick component folder:',
//   choices: [''].concat(
//     getFolders(appRoot(rootFolderPath), settings.componentsSkipFolders || []),
//   ),
// });
