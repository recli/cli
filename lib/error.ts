import PrettyError from "pretty-error";
import { log } from "./helpers";
const pe = new PrettyError();
// @ts-ignore
pe.filter((traceLine: Object | any, lineNumber: number) => {
  // if we know which package this trace line comes from, and it isn't
  if (typeof traceLine.packageName !== 'undefined' && traceLine.packageName !== 'recli') {
     // then skip this line
     return true;
  }
});

export const formatError = (err: Error) => {
  const renderedError = pe.render(err);
  log([renderedError]);
}
