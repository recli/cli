import fs from "fs";
import path from "path";
import glob from "glob";
import { yellow } from "colors";

import { applyHooksToContent } from "./hooks";
import { log } from "./helpers";
import { Hooks } from "./models/Hook";
import inquirer, { Answers } from "inquirer";
import { GENERATORS_PATH } from "./config";
import { formatError } from "./error";

export const updateFile = async (filePath: string, hooks: Hooks) => {
  try {
    let content = await fs.promises.readFile(filePath, "utf-8");
    content = applyHooksToContent(content, hooks);

    return writeData(filePath, content);
  } catch (err) {
    formatError(err);
  }
};

export const rename = async (anPath: string, newName: string) => {
  try {
    const dirName = path.dirname(anPath);
    const newPath = path.join(dirName, newName);
    log([
      `renamed from: ${yellow(anPath)}`,
      `          to: ${yellow(newPath)}`,
    ])
    return fs.promises.rename(anPath, newPath);
  } catch (err) {
    formatError(err);
  }
};

export const writeData = async (filename: string, data: string) => {
  const dir = path.dirname(filename);
  await fs.promises.mkdir(dir, { recursive: true });

  try {
    await fs.promises.writeFile(filename, data, { flag: "wx" });
    log([`created new file: ${yellow(filename)}`])
  } catch (err) {
    if (err.code == "EEXIST") {
      console.log("File: " + yellow(filename) + " already exists.");
      await inquirer.prompt([
        {
          type: "confirm",
          name: "isOverwrite",
          default: true,
          message: "Overwrite?"
        }
      ]).then(async (answers: Answers) => {
        if (!answers.isOverwrite) {
          return undefined;
        } else {
          log([`overwrited file: ${yellow(filename)}`])
          return fs.promises.writeFile(filename, data);
        }
      }) ;

    } else {
      return err;
    }
  }
};

export const getAvailableGenerators = () => {
  return new Promise(res =>
    glob(GENERATORS_PATH, (err, matches) => {
      if (err) {
        formatError(err);
        res([]);
      } else {
        const generators = matches
          .filter(e => !fs.statSync(e).isDirectory())
          .map(e => {
            const p = path.resolve(process.cwd(), e);
            const m = require(p);
            return {
              name: m.name,
              value: p
            };
          });
        res(generators);
      }
    })
  );
};
