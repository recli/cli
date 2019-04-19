import path from 'path';
import fs from 'fs';
import { isModuleSpecifier } from '@babel/types';
const filesToSearch = [
  'decoration',
  'hooks',
];
let helpersData = [];
const handbookLocation = path.join(__dirname, '../create-handbook/handbook.js');
filesToSearch.forEach(filename => {
  const fileAsString = fs.readFileSync(path.join(__dirname, `../../${filename}.ts`), 'utf-8');
  const getRequiredDataRegExp = new RegExp(/\/\/ @(.*)\n?( *)?(export)?( )?(const) ([A-z]{0,}) = \(([A-z: ,\(\)=>]{0,})\)/g);
  const getTitlesRegExp = new RegExp(/\/\/ @(.*)/);
  const getParamsRegExp = new RegExp(/const ([A-z]{0,}) = \(([A-z: ,\(\)=>]{0,})\)/);

  const data = fileAsString.match(getRequiredDataRegExp);
  const methodsData = data.map(match => {
    const title = getTitlesRegExp.exec(match)[1];
    const [str, name, paramsStr] = getParamsRegExp.exec(match);
    const params = paramsStr.split(',');

    return {
      parent: filename,
      title,
      name,
      params
    }
  })

  helpersData = helpersData.concat(methodsData);
})

let header = '';
const modulePaths = {};
let handbookContent = '';

helpersData.forEach(method => {
  if (!modulePaths[method.parent]) modulePaths[method.parent] = [];
  modulePaths[method.parent].push(method.name);
  return handbookContent += `
// ${method.title}
${method.name} (${method.params}) {}
/* ======================== */

`
}, handbookContent)

if (Object.keys(modulePaths).length) {
  for(let parent in modulePaths) {
    header += `import {${modulePaths[parent].join(', ')}} from '${parent}';\n`
  }
};

handbookContent = header + handbookContent;
fs.writeFileSync(handbookLocation, handbookContent)
// console.log(helpersData)


// make templates for reading
// get function names
// write to handbook in setted format
