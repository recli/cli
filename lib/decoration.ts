import { Question, prompt } from "inquirer";
import path from "path";
import { Answers, Hooks } from "./models";
import { template } from "./template";
import { updateFile as fileUpdate } from "./file";
import { useImport, usePath, useCustom, useModuleName } from "./hooks";
import { formatError } from "./error";
import { log } from "./helpers";
import { green } from "colors";
export { useImport, usePath, useCustom, useModuleName, prompt };

export const cliOf = (generatorName: string, module: NodeJS.Module) => {
  const __currentDirName = module.paths[0].replace("node_modules", "");

  const config = {
    name: generatorName,
    tasks: [] as Array<() => any>,
    answers: {} as Answers,
  };

  const addQuestion = (inquirerQuestion: Question) => {
    config.tasks.push(async () => {
      const answ = await prompt([inquirerQuestion]);
      // @ts-ignore
      log([`answer is: ${green(answ[inquirerQuestion.name] || inquirerQuestion.type === 'confirm' ? answ[inquirerQuestion.name] : 'empty string')}`])
      Object.assign(config.answers, answ);
    });

    return api;
  };

  const run = () => config;

  const moveTemplates = (destination: string, templatesPaths: string[]) => {
    config.tasks.push(async () => {
      return await Promise.all(
        templatesPaths.map(async p => {
          const from = path.join(__currentDirName, p);
          const to = path.join(__currentDirName, destination, p);
          try {
            return template({
              from,
              to,
              data: config.answers
            });
          }
          catch (err) {
            return formatError(err);
          }
        })
      );
    });

    return api;
  };

  const updateFile = (
    filePath: string,
    getHooks: (answers: Answers) => Hooks
  ) => {
    config.tasks.push(async () => {
      const hooks = getHooks(Object.assign({}, config.answers));
      const p = path.join(__currentDirName, filePath);

      try {
        return fileUpdate(p, hooks);
      } catch (err) {
        return formatError(err);
      }
    });

    return api;
  };

  const api = {
    addQuestion,
    moveTemplates,
    updateFile
  };

  module.exports = {
    run,
    name: config.name
  };

  return api;
};
