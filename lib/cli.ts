#!/usr/bin/env node
import { green } from "colors";
import path from "path";
import { prompt } from "inquirer";
import { getAvailableGenerators } from "./file";
import { formatError } from "./error";

const init = async () => {
  try {
    console.log(process.cwd(), path.join(process.cwd(), '.re-cli/config.js'));
    require(require.resolve(path.join(process.cwd(), '.re-cli/config.js')));
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

  const move = async () => {
    if (config.tasks.length > current) {
      /* Step */
      await config.tasks[current]();
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
