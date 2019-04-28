#!/usr/bin/env node
import { green } from "colors";
import path from "path";
import { prompt } from "inquirer";
import { getAvailableGenerators } from "./file";
import { formatError } from "./error";

const init = async () => {
  try {
    require(require.resolve(path.join(process.cwd(), '.recli/config.js')));
  } catch(e) {
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

  const config = generator.run();
  let current = 0;
  const setCurrent = (value: number) => current = value;

  const move = async () => {
    if (config.tasks.length > current) {
      // it can be string
      // it allow us return back or skip some tasks
      const taskOrKey = config.tasks[current];
      let task;

      if (typeof taskOrKey === 'string') {
        current += 1
        task = config.tasks[current];
      } else {
        task = taskOrKey;
      }

      /* Step */
      await config.tasks[current](setCurrent);
      current += 1;

      /* Next */
      await move();
    } else {
      console.log(`\n${green("  = Have a nice day! =  ")}\n`);
      return null;
    }
  };

  move().catch(formatError);
};

init().catch(formatError);
