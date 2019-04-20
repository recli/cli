import { getDirList } from './helpers';
import * as path from 'path';
import { green } from 'colors';
import { prompt } from 'inquirer';
import {
  localEnvCliParam,
  userGeneratorsDir,
  localGeneratorsDir,
} from '../.re-cli.config.json';


const env = process.argv[2] === `--${localEnvCliParam}` ? 'local' : 'user';

// get env from console for making of second menu iteration
const generatorsFolderName = env === 'user' ? userGeneratorsDir : localGeneratorsDir;

const generatorsFolder = path.join(__dirname, `./${generatorsFolderName}`);

const creationQuestions = [
  {
    type: 'list',
    name: 'generator',
    message: 'Please select generator:',
    choices: getDirList(generatorsFolder).map(file =>
      path.basename(file)
    )
  }
];

const init = async () => {
  const answ = (await prompt(creationQuestions)) as { generator: string };

  const fn = require(path.join(
    __dirname,
    `./${generatorsFolderName}`,
    answ.generator,
    'index'
  ));

  const config = fn();
  let current = 0;

  const move = async () => {
    if (config.tasks.length > current) {
      /* Step */
      await config.tasks[current]();
      current += 1;
      /* Next */
      await move();
    } else {
      console.log(`\n${green('  = Have a nice day! =  ')}\n`);
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
