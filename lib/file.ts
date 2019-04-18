import fs from "fs";
import { applyHooksToContent } from "./hooks";
import { Hooks } from "./models/Hook";
import inquirer from "inquirer";

export const updateFile = (filePath: string, hooks: Hooks) => {
  let content = fs.readFileSync(filePath, "utf-8");
  content = applyHooksToContent(content, hooks);

  return writeData(filePath, content);
};

export const writeData = (filename: string, data: string) => {
  return new Promise((res, rej) => {
    fs.writeFile(filename, data, { flag: "wx" }, async err => {
      if (err) {
        if (err.code == "EEXIST") {
          console.error("File " + filename + " already exists.");
          const answers = (await inquirer.prompt([
            {
              type: "confirm",
              name: "isOverwrite",
              default: true,
              message: "Overwrite?"
            }
          ])) as { isOverwrite: boolean };

          if (!answers.isOverwrite) {
            res(null);
          } else {
            fs.writeFile(filename, data, () => res(null));
          }
        } else {
          rej(err);
        }
      } else {
        res(null);
      }
    });
  });
};
