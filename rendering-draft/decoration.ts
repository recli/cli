import { Question, prompt } from "inquirer";
import path from "path";
import { Hooks } from "./models/Hook";
import { template } from "./template";
import { updateFile as fileUpdate } from "./file";
import { useImport, usePath, useCustom, useModuleName } from "./hooks";

export {
  useImport,
  usePath,
  useCustom,
  useModuleName,
  prompt
}

export const cliOf = (generatorName: string, module: NodeModule, __dirname: string) => {
  const config = {
    name: generatorName,
    tasks: [] as Array<() => any>,
    answers: {} as Answers
  };

  const addQuestion = (inquirerQuestion: Question) => {
    config.tasks.push(async () => {
      console.log('addQuestion')
      const answ = await prompt([inquirerQuestion]);
      Object.assign(config.answers, answ);
    });

    return api;
  };

  const run = () => {
    return config;
  };

  const moveTemplates = (destination: string, templatesPaths: string[]) => {
    config.tasks.push(
      async () => {
        return await Promise.all(
          templatesPaths.map(p => {
            const from = path.join(__dirname, p);
            const to = path.join(__dirname, destination, p);
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

  const updateFile = (filePath: string, getHooks: (answers: Answers) => Hooks) => {
    config.tasks.push(() => {
      const hooks = getHooks(Object.assign({}, config.answers));
      const p = path.join(__dirname, filePath);

      return fileUpdate(p, hooks);
    });

    return api;
  };

  const api = {
    addQuestion,
    moveTemplates,
    updateFile,
  }

  module.exports = run;

  return api;
};