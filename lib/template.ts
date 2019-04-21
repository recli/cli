import ejs from "ejs";
import fs from "fs";
import { writeData } from "./file";
import { formatError } from "./error";

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
    const templateString = fs.readFileSync(from, "utf-8");
    const renderedResult = ejs.render(templateString, data);

    return writeData(to, renderedResult);
  } catch (err) {
    formatError(err);
  }
};

export { template };
