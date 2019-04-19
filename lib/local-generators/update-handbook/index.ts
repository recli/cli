import path from 'path';
import fs from 'fs';
const filesToSearch = [
  'decoration',
  'hooks',
];
let helpersData = [];

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
      title,
      name,
      params
    }
  })

  helpersData = helpersData.concat(methodsData);
})

console.log(helpersData)


// make templates for reading
// get function names
// write to handbook in setted format
