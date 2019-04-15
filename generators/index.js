import generators from 'yeoman-generator';
import path from 'path';
import colors from 'colors';

import * as helpers from '../helpers';

// eslint-disable-next-line
console.log(`${helpers.appRoot()}/package.json`);

const settings = {
  root: '',
  cwd: '',
  componentsSkipFolders: [
    'bin',
    'build',
    'cli',
    'docs',
    'public',
    'tools',
    'typings',
    'node_modules',
  ],
};

module.exports = generators.extend({
  _NAME: '',
  settings,
  prompts() {
    this.log(
      colors.gray(
        `\n${'-'.repeat(44)}\n${' '.repeat(15)} CLI 1.0.0 ™\n${'-'.repeat(
          44,
        )}\n`,
      ),
    );

    helpers.prompt(this)(
      [
        {
          type: 'list',
          name: 'generator',
          message: 'what do you want to do?:',
          choices: helpers
            .generatorsDir(path.join(__dirname))
            .map(file => path.basename(file)),
        },
      ],
      props => {
        this.composeWith(path.resolve(__dirname, props.generator));
      },
    );
  },
});
