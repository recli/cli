import { generatorsDir } from "../helpers";
import path from "path";
import { prompt } from "inquirer";

const creationQuestions = [
  {
    type: "list",
    name: "generator",
    message: "Please select generator:",
    choices: generatorsDir(path.join(__dirname, "./generators")).map(file =>
      path.basename(file)
    )
  }
];

const init = async () => {
  const answ = (await prompt(creationQuestions)) as { generator: string };
  const fn = require(path.join(
    __dirname,
    "./generators",
    answ.generator,
    "index"
  ));

  const config = fn();
  let current = 0;

  const move = async () => {
    if (config.tasks.length > current) {
      await config.tasks[current]();
      current += 1;
      await move();
    } else {
      console.log("done");
      return null;
    }
  };

  try {
    move();
  } catch (err) {
    console.log(err);
  }
};


init();