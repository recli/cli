import { cyan } from 'colors';
import { ncp } from 'ncp';
import { yellow } from 'colors';
import { formatError } from "../error";

const isTesting = process.argv.includes('--test');
export const log = (messages: string[]) => {
  if (isTesting) messages.forEach(message => console.log(`${cyan('> ')}${message}`));
}

export const copyTemplateFolderRecursively = async (source: string, destination: string) => {
  log([
    `recursively copying folder from: ${yellow(source)}`,
    `                             to: ${yellow(destination)}`,
  ]);
  return await ncp(source, destination, function (err) {
    if (err) {
      return formatError(err);
    }
    return null;
   });
}
