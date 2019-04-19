import { Question, prompt } from "inquirer";
import path from "path";
import fs from "fs";
import { Answers, Hooks } from "./models";
import { template } from "./template";
import { updateFile as fileUpdate } from "./file";
import { useImport, usePath, useCustom, useModuleName } from "./hooks";
import { handbookFunctionTemplate } from "./helpers";

export {
  useImport,
  usePath,
  useCustom,
  useModuleName,
  prompt
}

// @main function
export const cliOf = (generatorName: string) => {
  const currentGenPath = path.join(__dirname, '/generators', generatorName);
  const config = {
    name: generatorName,
    tasks: [] as Array<() => any>,
    answers: {} as Answers
  };

  // @adding question
  const addQuestion = (inquirerQuestion: Question) => {
    config.tasks.push(async () => {
      const answ = await prompt([inquirerQuestion]);
      Object.assign(config.answers, answ);
    });

    return api;
  };

  const run = () => config;

  // @moving templates
  const moveTemplates = (destination: string, templatesPaths: string[]) => {
    config.tasks.push(
      async () => {
        return await Promise.all(
          templatesPaths.map(p => {
            const from = path.join(currentGenPath, p);
            const to = path.join(currentGenPath, destination, p);
            return template({
              from,
              to,
              data: config.answers
            });
          })
          )
        }
        );

        return api;
      };

  // @updates file
  const updateFile = (filePath: string, getHooks: (answers: Answers) => Hooks) => {
    config.tasks.push(() => {
      const hooks = getHooks(Object.assign({}, config.answers));
      const p = path.join(currentGenPath, filePath);

      return fileUpdate(p, hooks);
    });

    return api;
  };


  // I need to review code below

  const updateHandbook = () => {
    config.tasks.push(async () => {
      const filesToSearch = [
        'decoration',
        'hooks',
      ];
      let helpersData = [];
      const handbookLocation = path.join(__dirname, './local-generators/create-handbook/handbook.js');

      filesToSearch.forEach(filename => {
        const fileAsString = fs.readFileSync(path.join(__dirname, `./${filename}.ts`), 'utf-8');
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
        return handbookContent += handbookFunctionTemplate(method.title, method.name, method.params)
      }, handbookContent)

      if (Object.keys(modulePaths).length) {
        for(let parent in modulePaths) {
          header += `import {${modulePaths[parent].join(', ')}} from '${parent}';\n`
        }
      };

      handbookContent = header + handbookContent;
      fs.writeFileSync(handbookLocation, handbookContent)
    })

    return api;
  };

  const api = {
    addQuestion,
    moveTemplates,
    updateFile,
    updateHandbook,
  }

  module.parent.exports = run;

  return api;
};


