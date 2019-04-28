import ejs from "ejs";
import fs from "fs";
import { yellow, green } from "colors";
import { writeData } from "./file";
import { formatError } from "./error";
import { log } from "./helpers";

const template = async ({
  from,
  to,
  data
}: {
  from: string;
  to: string;
  data: Object;
}) => {
  try {
    log([
      `making template from: ${yellow(from)}`,
      `                  to: ${yellow(to)}`,
      `with params mentioned below:`,
      `${green(JSON.stringify(data, null, 4))}`
    ])
    const templateString = fs.readFileSync(from, "utf-8");
    const renderedResult = ejs.render(templateString, data);

    return writeData(to, renderedResult);
  } catch (err) {
    formatError(err);
  }
};

export { template };
