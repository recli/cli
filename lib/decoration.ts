import { Question, prompt } from "inquirer";
import path from "path";
import fs from "fs";
import { Answers, Hooks } from "./models";
import { template } from "./template";
import { updateFile as fileUpdate, rename as anRename } from "./file";
import { useImport, usePath, useCustom, useModuleName } from "./hooks";
import { formatError } from "./error";
import { log, copyTemplateFolderRecursively } from "./helpers";
import { green } from "colors";

export { useImport, usePath, useCustom, useModuleName, prompt };

type TaskType = string | ((setCurrent: (value: number) => number) => any);
type TemplatesPaths = Array<string | {from: string, to: string}> | {(answers: Answers): []};

export const cliOf = (generatorName: string, module: NodeJS.Module) => {
  const __currentDirName = module.paths[0].replace("node_modules", "");

  const config = {
    name: generatorName,
    tasks: [] as Array<TaskType>,
    answers: {} as Answers,
  };

  const ask = (inquirerQuestion: Question) => {
    config.tasks.push(async () => {
      const answ = await prompt([inquirerQuestion]);
      // @ts-ignore
      log([`answer is: ${green(answ[inquirerQuestion.name] || inquirerQuestion.type === 'confirm' ? answ[inquirerQuestion.name] : 'empty string')}`])
      Object.assign(config.answers, answ);
    });

    return api;
  };

  const run = () => config;
  const move = (destination: string, templatesPaths: TemplatesPaths ) => {
    config.tasks.push(async () => {
      return await Promise.all(
        (Array.isArray(templatesPaths) ? templatesPaths  : templatesPaths(Object.assign({}, config.answers))).map(async p => {
          let pathFrom: string;
          let pathTo: string;

          if (typeof p === 'string') {
            const templateFolderPath = path.join(__currentDirName, p);
            const destinationFolderPath = path.join(__currentDirName, destination);
            const isDirectory = fs.lstatSync(templateFolderPath).isDirectory();

            if (isDirectory) {
              return await copyTemplateFolderRecursively(templateFolderPath, destinationFolderPath);
            }

            pathFrom = p;
            pathTo= p;
          } else {
            pathFrom = p.from;
            pathTo = p.to;
          };

            const from = path.join(__currentDirName, pathFrom);
            const to = path.join(__currentDirName, destination, pathTo);
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

  const useHooks = (
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

  const rename = (
    anPath: string,
    newName: (answers: Answers) => string
  ) => {
    config.tasks.push(async () => {
      try {
        const name = newName(Object.assign({}, config.answers));

        return anRename(anPath, name);
      } catch (err) {
        return formatError(err);
      }
    });

    return api;
  };

  const setAnswers = (
    change: (answers: Answers) => Answers
  ) => {
    config.tasks.push(async () => {
      try {
        config.answers = change(Object.assign({}, config.answers));
        log([
          `Answers changed to:`,
          `${green(JSON.stringify(config.answers, null, 4))}`
        ])
      } catch (err) {}
    });

    return api;
  };

  const setKey = (
    key: string
  ) => {
    config.tasks.push(key);

    return api;
  };

  const check = (callback: (answers: Answers, goTo: (key: string) => any) => any) => {
    config.tasks.push(async (setCurrent) => {
      callback(Object.assign({}, config.answers), (key) => {
        const index = config.tasks.findIndex(e => e === key);
        setCurrent(index);
      });
    });

    return api;
  };

  const api = {
    ask,
    move,
    useHooks,
    rename,
    setAnswers,
    setKey,
    check
  };

  module.exports = {
    run,
    name: config.name
  };

  return api;
};
