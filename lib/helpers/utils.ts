import { cyan } from 'colors';

const isTesting = process.argv.includes('--test');
export const log = (messages: string[]) => {
  if (isTesting) messages.forEach(message => console.log(`${cyan('> ')}${message}`));
}
