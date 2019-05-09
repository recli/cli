#!/usr/bin/env node
import { green } from "colors";
import path from "path";
import { prompt } from "inquirer";
import { getAvailableGenerators } from "./helpers/file";
import { formatError } from "./error";

const runGenerator = async (generator: any, isNested?: boolean) => {
  const config = generator.run();
  let current = 0;
  const setCurrent = (value: number) => (current = value);

  const move = async (): Promise<any> => {
    if (config.tasks.length > current) {
      // it can be string
      // it allow us return back or skip some tasks
      const taskOrKeyOrGenerator = config.tasks[current];

      if (typeof taskOrKeyOrGenerator === "string") {
        current += 1;
      } else {
        /* Step */
        const resp = await config.tasks[current](setCurrent);
        current += 1;

        // possible that we have nested generator
        // as the task response
        if (resp && resp.generator) {
          config.answers.useGenerator = config.answers.useGenerator || [];
          const nestedConfig = await runGenerator(
            resp.generator,
            true
          );
          config.answers.useGenerator.push(nestedConfig);
        }
      }
      /* Next */
      return await move();
    } else {
      if (!isNested) {
        console.log(`\n${green("  = Have a nice day! =  ")}\n`);
      }
      // return the actual config
      // to be able reuse it nested generators
      return config;
    }
  };

  return await move();
};

const init = async () => {
  try {
    require(require.resolve(path.join(process.cwd(), ".recli/config.js")));
  } catch (e) {
    formatError(e);
    console.error("Re-configuration doesn't found");
  }

  const generatorsList = await getAvailableGenerators();

  const creationQuestions: any = [
    {
      type: "list",
      name: "generator",
      message: "Please select generator:",
      choices: generatorsList
    }
  ];

  const answ = (await prompt(creationQuestions)) as { generator: string };

  const generator = require(answ.generator);

  return runGenerator(generator);
};

init().catch(formatError);
